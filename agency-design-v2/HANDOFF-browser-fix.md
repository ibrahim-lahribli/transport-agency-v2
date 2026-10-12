# Handoff — fixing the browser-engine problems (WebKit + bundled Chromium)

Self-contained brief for another agent. Everything below was verified on this machine on 2026-10-10; do not re-diagnose from scratch, and do not fall into the traps listed in section 4.

- Project root: `C:\projects\design\agency-design`
- QA harness: `qa/` (isolated `package.json`, Playwright installed in `qa/node_modules`)
- App dev server: `http://127.0.0.1:8443` (already running)
- Browsers: `C:\Users\lahribli\AppData\Local\ms-playwright\`

## 1. Current state

| Engine | State |
| --- | --- |
| chromium (bundled, `chromium-1248`, v156.0.8078.4) | **WORKS** |
| chrome (system, v154) | WORKS — this is what the audit runs on (`channel: 'chrome'`) |
| firefox (`firefox-1555`, v157.0) | **WORKS** — installed this session |
| webkit (`webkit-2370`) | **BLOCKED by Windows Smart App Control** |

Verification script: `cd qa && node tmp/probe-engines.mjs` — it launches each engine, loads the app, reads the H1 and counts console errors, then writes `qa/tmp/engines.json`. Expected output after a fix: `webkit ... WORKS`.

Full diagnosis with evidence: `qa/BROWSERS.md`.

## 2. Issue A — "bundled Chromium blocked by host policy": already fixed

The original `spawn UNKNOWN` was **a half-finished download**, not host policy. The `chromium-1248` folder was still being written when the first probe ran.

If you ever see `spawn UNKNOWN` again:

```bash
cd qa
npx playwright install chromium          # idempotent; reports nothing when complete
node -e "const{chromium}=require('playwright');chromium.launch({headless:true,timeout:30000}).then(async b=>{console.log('OK',b.version());await b.close()})"
```

If the install prints progress bars, it was incomplete — let it finish, then re-run. Only if that fails should you consider removing `C:\Users\lahribli\AppData\Local\ms-playwright\chromium-1248` and re-downloading.

## 3. Issue B — WebKit: root cause and the only fixes

### What it looks like

```
browserType.launch: Host system is missing dependencies!
Full list of missing libraries:
    icuin77.dll
    libsharpyuv.dll
```

### The real cause

The DLLs are present and valid (`webkit-2370/icuin77.dll`, 2,997,760 bytes, valid `MZ` header). **Windows refuses to load them** because they are unsigned and Smart App Control is in Evaluation mode.

Proof (re-run any of it):

```powershell
# -> "Error: An Application Control policy has blocked this file."
& "$env:LOCALAPPDATA\ms-playwright\winldd-1007\PrintDeps.exe" "$env:LOCALAPPDATA\ms-playwright\webkit-2370\icuin77.dll"

# Event log: Code Integrity 3033/3077 "did not meet the Microsoft signing level requirements"
Get-WinEvent -LogName 'Microsoft-Windows-CodeIntegrity/Operational' -MaxEvents 40 |
  Where-Object { $_.Id -in 3033,3077 } | Select-Object -First 5 TimeCreated, Message

# The smoking gun: 1 = Smart App Control Evaluation mode
(Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy').VerifiedAndReputablePolicyState
Get-CimInstance -Namespace root\Microsoft\Windows\DeviceGuard -ClassName Win32_DeviceGuard |
  Select-Object UsermodeCodeIntegrityPolicyEnforcementStatus   # = 2 (enforced)

# Ruled out: AppLocker has no rules, and there is no machine WDAC policy
Get-AppLockerPolicy -Effective -Xml        # 31 bytes (empty)
Test-Path 'C:\Windows\System32\SiPolicy.p7b'   # False
```

`icuin77.dll` is `NotSigned`, as are `libsharpyuv.dll`, `Playwright.exe` and `PrintDeps.exe`. System Chrome is signed by Google and loads fine.

### Fix option 1 — disable Smart App Control (needs the machine owner)

UI: Windows Security → App & browser control → Smart App Control → **Off**, then reboot.

Equivalent, requires an **elevated** shell:

```powershell
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' -Name VerifiedAndReputablePolicyState -Value 0
Restart-Computer
```

**This is one-way** — Windows only re-enables SAMC via a reset/reinstall — and it weakens a system security feature. **Do not run it yourself**: ask the user first and get an explicit yes, then use the elevation flow rather than `sudo`/`Start-Process -Verb RunAs` in the ordinary shell.

After the reboot: `cd qa && node tmp/probe-engines.mjs` → `webkit ... WORKS`.

### Fix option 2 — accept three engines (no action needed)

Chromium + Chrome + Firefox all pass and are verified. WebKit stays unavailable. Nothing to do.

### Fix option 3 — run WebKit in Linux instead (no Windows policy change)

WSL is **not installed** (`wsl --status` says so) and Docker is not on `PATH`, so this needs a setup the user has not approved: `wsl.exe --install` (reboot, distro download) then Playwright's Linux WebKit inside it, pointing the dev-server URL at the Windows host via the resolvable host IP. Only pursue this if the user asks for WebKit without touching SAMC.

## 4. Traps — things that will NOT fix it

1. **Re-installing the browsers** does not help. The files are intact; Windows blocks them.
2. **Moving the browser folder / changing `PLAYWRIGHT_BROWSERS_PATH`** does not help. Verified with a three-way matrix — host in ms-playwright with the DLL in `%TEMP%`, host in `%TEMP%` with the DLL in ms-playwright, and both in `%TEMP%` — **blocked in all three combinations**. The block is per-file, not per-path.
3. **`PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1`** bypasses Playwright's dependency checker, and WebKit's process does spawn (pid returned) — but it dies immediately, because the real WebKit binaries are blocked too. Do not report this as a fix.
4. **`icuin77.dll` is not missing.** Do not download a random copy of it from the internet: it is a system-policy block, not a missing-dependency problem, and adding third-party DLLs will not change the policy decision (and is a supply-chain risk).
5. WebKit has **no signed Windows build** from Playwright, so signing is not an escape hatch either.

## 5. Environment facts

- Playwright browsers live in `%LOCALAPPDATA%\ms-playwright`; `winldd-1007\PrintDeps.exe` is Playwright's own dependency checker (use it to reproduce the block).
- Harness engines to date: audit and scenario runs use `channel: 'chrome'` (system Chrome 154). Firefox and bundled Chromium were smoke-tested only (page load, H1, 0 console errors) — **no full 63-scenario run has been done on them**; do not claim cross-engine results without running `node run-scenarios.mjs` per engine.
- The dev server is a Vite dev server on `:8443`; the harness writes to `qa/screens/`, `qa/axe/`, `qa/results.json`, `qa/scenarios.json`.
- Running `qa/run-audit.mjs` and `qa/run-scenarios.mjs` at the same time causes HMR full-reloads (the audit writes PNGs under `qa/`, which the Vite watcher sees) and can kill a scenario mid-assertion. Run them sequentially.
