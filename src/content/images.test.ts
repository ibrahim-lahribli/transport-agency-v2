import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ARTWORK_IMAGE_NAMES, SERVICE_IMAGE_IDS, getServiceImage } from "./images";

const validKinds = ["card", "hero", "gallery"] as const;

describe("getServiceImage: service slots", () => {
  it.each(SERVICE_IMAGE_IDS.map((id) => [id]))(
    "maps %s to its card/hero/gallery service slot",
    (id) => {
      for (const kind of validKinds) {
        const path = getServiceImage(id, kind);
        expect(path).toMatch(/^\/images\/services\/[a-z0-9-]+\.jpg$/);
        expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
      }
    },
  );

  it("never selects the generic fallback for a known service id", () => {
    expect(SERVICE_IMAGE_IDS).toHaveLength(15);
    for (const id of SERVICE_IMAGE_IDS) {
      expect(getServiceImage(id, "card")).not.toBe(getServiceImage("~missing~", "card"));
    }
  });
});

describe("getServiceImage: fallback for unknown ids", () => {
  it("falls back by nothing for a totally unknown id", () => {
    expect(getServiceImage("~missing~", "card")).toBe("/images/coast.jpg");
    expect(getServiceImage("~missing~", "hero")).toBe("/images/hero.jpg");
  });
});

describe("getServiceImage: design artwork slots", () => {
  it("exposes exactly the seven design artwork names", () => {
    expect([...ARTWORK_IMAGE_NAMES].sort()).toEqual(
      ["beach", "boats", "city", "cliffs", "coast", "hero", "road"].sort(),
    );
  });

  it.each(["hero", "coast", "beach", "boats", "city", "cliffs", "road"])(
    "artwork %s resolves to an existing public image file",
    (name) => {
      const path = getServiceImage(`artwork:${name}`, "card");
      expect(path).toBe(`/images/${name}.jpg`);
      expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
    },
  );
});
