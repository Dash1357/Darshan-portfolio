import fs from "fs";
import path from "path";
import { CATEGORIES, SITE, HOME, bySlug } from "./site";
import manifest from "./manifest.json";

/*
 * Content wiring is the failure mode this project actually has. The workflow is
 * optimize -> drop into public/assets/<category>/<series>/ -> `npm run manifest`
 * -> add the series to site.js. Skip a step and nothing throws: the page just
 * renders an empty series or the media is orphaned and never shown. These tests
 * pin site.js, manifest.json and the files on disk to each other.
 */

const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");
const allSeries = CATEGORIES.flatMap((c) =>
  c.series.map((s) => ({ ...s, category: c.slug }))
);

describe("categories", () => {
  it("exposes the five published categories", () => {
    expect(CATEGORIES).toHaveLength(5);
  });

  it("has unique slugs", () => {
    const slugs = CATEGORIES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(CATEGORIES.map((c) => [c.slug, c]))(
    "%s carries every field the UI reads",
    (_slug, category) => {
      expect(category.name).toBeTruthy();
      expect(category.blurb).toBeTruthy();
      expect(category.tile).toMatch(/^\/assets\//);
      // Nav and tile accents both read these; a missing one renders
      // `borderBottomColor: undefined` and the active state vanishes.
      expect(category.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(category.colorHi).toMatch(/^#[0-9a-f]{6}$/i);
      expect(Array.isArray(category.series)).toBe(true);
      expect(category.series.length).toBeGreaterThan(0);
    }
  );

  it("resolves every slug through bySlug", () => {
    CATEGORIES.forEach((c) => expect(bySlug(c.slug)).toBe(c));
  });

  it("returns undefined for an unknown slug, so Gallery can 404", () => {
    expect(bySlug("not-a-category")).toBeUndefined();
  });

  it.each(CATEGORIES.map((c) => [c.slug, c.tile]))(
    "%s tile image exists on disk",
    (_slug, tile) => {
      expect(fs.existsSync(path.join(PUBLIC_DIR, tile))).toBe(true);
    }
  );
});

describe("series <-> manifest wiring", () => {
  it("every series folder in site.js exists in the manifest", () => {
    // Fails when a series is added to site.js but `npm run manifest`
    // was never run.
    const missing = allSeries
      .filter((s) => !manifest[s.folder])
      .map((s) => `${s.category}: ${s.folder}`);
    expect(missing).toEqual([]);
  });

  it("every manifest folder is referenced by a series", () => {
    // Fails when media is dropped into public/assets and indexed but no
    // series in site.js points at it, so it never renders anywhere.
    const referenced = new Set(allSeries.map((s) => s.folder));
    const orphaned = Object.keys(manifest).filter((f) => !referenced.has(f));
    expect(orphaned).toEqual([]);
  });

  it("no series folder is used twice", () => {
    const folders = allSeries.map((s) => s.folder);
    expect(new Set(folders).size).toBe(folders.length);
  });

  it("every series has a title and a non-empty folder", () => {
    allSeries.forEach((s) => {
      expect(s.title).toBeTruthy();
      expect(s.folder).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+$/);
    });
  });

  it("each series folder is nested under its own category", () => {
    allSeries.forEach((s) => {
      expect(s.folder.split("/")[0]).toBe(s.category);
    });
  });
});

describe("manifest entries", () => {
  const entries = Object.entries(manifest);

  it("is not empty", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries)("%s holds at least one media item", (_folder, items) => {
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it("every item has a file, a type and real dimensions", () => {
    // MasonryGrid sizes each figure from w/h. A zero or missing dimension
    // collapses the tile, so this guards the layout as much as the data.
    const bad = [];
    entries.forEach(([folder, items]) => {
      items.forEach((item) => {
        const ok =
          typeof item.file === "string" &&
          item.file.length > 0 &&
          ["video", "image"].includes(item.type) &&
          Number.isFinite(item.w) &&
          Number.isFinite(item.h) &&
          item.w > 0 &&
          item.h > 0;
        if (!ok) bad.push(`${folder}/${item.file ?? "(no file)"}`);
      });
    });
    expect(bad).toEqual([]);
  });

  it("every referenced media file exists on disk", () => {
    const missing = [];
    entries.forEach(([folder, items]) => {
      items.forEach((item) => {
        const file = path.join(PUBLIC_DIR, "assets", folder, item.file);
        if (!fs.existsSync(file)) missing.push(`${folder}/${item.file}`);
      });
    });
    expect(missing).toEqual([]);
  });
});

describe("site copy", () => {
  it("keeps the contact email in exactly one place", () => {
    expect(SITE.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("has the manifesto line the hero renders", () => {
    expect(HOME.manifesto).toBeTruthy();
  });
});

describe("no duplicate media within a series", () => {
  /*
   * Reported by a tester as "photos repeat, and the ones side by side are the
   * same". Three exact copies had crept into sports/btm-fc and more into
   * birds and stretch, so the same frame rendered twice within one screen.
   * Hash every referenced file and fail if a series carries the same image
   * twice. Scoped per folder on purpose: a category tile in assets/home
   * legitimately reuses a gallery photo, and that must stay allowed.
   */
  const crypto = require("crypto");

  it.each(Object.entries(manifest))("%s has no repeated frame", (folder, items) => {
    const seen = new Map();
    const dupes = [];
    items.forEach((item) => {
      const file = path.join(PUBLIC_DIR, "assets", folder, item.file);
      if (!fs.existsSync(file)) return; // covered by the on-disk test above
      const hash = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex");
      if (seen.has(hash)) dupes.push(`${item.file} is identical to ${seen.get(hash)}`);
      else seen.set(hash, item.file);
    });
    expect(dupes).toEqual([]);
  });
});
