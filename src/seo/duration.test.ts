import { describe, expect, it } from "vitest";

import { formatIsoDuration } from "./duration";

describe("formatIsoDuration", () => {
  it("formats whole hours", () => {
    expect(formatIsoDuration(6)).toBe("PT6H");
  });

  it("formats hours and minutes", () => {
    expect(formatIsoDuration(4.25)).toBe("PT4H15M");
  });

  it("carries minutes into hours instead of emitting H60M", () => {
    expect(formatIsoDuration(3.995)).toBe("PT4H");
    expect(formatIsoDuration(5.999)).toBe("PT6H");
  });

  it("formats sub-hour durations as minutes", () => {
    expect(formatIsoDuration(0.5)).toBe("PT30M");
  });

  it("returns null when there is no real duration", () => {
    expect(formatIsoDuration(undefined)).toBeNull();
    expect(formatIsoDuration(0)).toBeNull();
    expect(formatIsoDuration(Number.NaN)).toBeNull();
  });
});
