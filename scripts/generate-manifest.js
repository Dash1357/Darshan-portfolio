#!/usr/bin/env node
/*
 * Scans public/assets/<category>/<series> and writes src/content/manifest.json
 * with type + dimensions for every media file. Run after adding content:
 *
 *     npm run manifest
 *
 * Images are measured with image-size. Video dimensions use ffprobe when
 * available; otherwise they fall back to 0 (the grid then sizes them 3:2).
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const sizeOf = require("image-size");

const ROOT = path.join(__dirname, "..", "public", "assets");
const OUT = path.join(__dirname, "..", "src", "content", "manifest.json");
const IMG = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const VID = new Set([".mp4", ".webm", ".mov"]);
const SKIP_TOP = new Set(["home"]);

function videoDims(p) {
  try {
    const out = execFileSync("ffprobe", [
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=width,height", "-of", "csv=p=0", p,
    ]).toString().trim();
    const [w, h] = out.split(",").map(Number);
    return { w: w || 0, h: h || 0 };
  } catch {
    return { w: 0, h: 0 };
  }
}

const manifest = {};
for (const cat of fs.readdirSync(ROOT)) {
  if (SKIP_TOP.has(cat)) continue;
  const catDir = path.join(ROOT, cat);
  if (!fs.statSync(catDir).isDirectory()) continue;
  for (const series of fs.readdirSync(catDir).sort()) {
    const sDir = path.join(catDir, series);
    if (!fs.statSync(sDir).isDirectory()) continue;
    const items = [];
    for (const f of fs.readdirSync(sDir).sort()) {
      const ext = path.extname(f).toLowerCase();
      const p = path.join(sDir, f);
      if (IMG.has(ext)) {
        const { width: w, height: h } = sizeOf(p);
        items.push({ file: f, type: "image", w, h });
      } else if (VID.has(ext)) {
        const { w, h } = videoDims(p);
        items.push({ file: f, type: "video", w, h });
      }
    }
    if (items.length) manifest[`${cat}/${series}`] = items;
  }
}

fs.writeFileSync(OUT, JSON.stringify(manifest, null, 1));
console.log(
  `manifest written: ${Object.keys(manifest).length} series, ` +
  `${Object.values(manifest).reduce((n, v) => n + v.length, 0)} items`
);
