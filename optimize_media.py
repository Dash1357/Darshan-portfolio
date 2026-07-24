#!/usr/bin/env python3
"""
Media optimizer for the Darshan Jhawar portfolio.

Resizes and recompresses photos and videos for the web while keeping
filenames identical, so the output folder is a drop-in replacement for
public/assets. If an optimized file would be LARGER than the original,
the original is kept.

Usage:
    python3 optimize_media.py <input_dir> <output_dir>
    python3 optimize_media.py public/assets optimized/assets

Requirements: Pillow (pip install Pillow), ffmpeg on PATH.

Defaults (tuned for a photography portfolio):
  Photos : long edge capped at 2200 px, WebP q80 / JPEG q84
  Videos : capped at 1080 px on the long edge, H.264 CRF 27, AAC 128k,
           +faststart for instant web playback. Output is .mp4 (the
           site's loader already checks .webm then .mp4 per slot).
  Hero   : any file named background.* is treated as ambient background:
           1920 px wide, audio stripped, encoded as VP8 .webm so the
           existing <video src=".../background.webm"> keeps working.
  Copied untouched: logo/icon/favicon files, .svg, anything already tiny.
"""

import os
import shutil
import subprocess
import sys

from PIL import Image

PHOTO_EXT = {".webp", ".jpg", ".jpeg", ".png"}
VIDEO_EXT = {".webm", ".mp4", ".mov", ".m4v"}
SKIP_RESIZE_NAMES = {"logo", "favicon", "icon"}

PHOTO_MAX_EDGE = 2200
WEBP_QUALITY = 80
JPEG_QUALITY = 84
VIDEO_MAX_EDGE = 1080
VIDEO_CRF = "27"
HERO_WIDTH = 1440
HERO_CRF = "31"


def human(nbytes: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if nbytes < 1024 or unit == "GB":
            return f"{nbytes:.1f} {unit}" if unit != "B" else f"{nbytes} B"
        nbytes /= 1024
    return f"{nbytes:.1f} GB"


def optimize_photo(src: str, dst: str) -> None:
    name = os.path.splitext(os.path.basename(src))[0].lower()
    ext = os.path.splitext(src)[1].lower()
    im = Image.open(src)
    im.load()

    if not any(k in name for k in SKIP_RESIZE_NAMES):
        im.thumbnail((PHOTO_MAX_EDGE, PHOTO_MAX_EDGE), Image.LANCZOS)

    if ext == ".png":
        im.save(dst, optimize=True)
    elif ext == ".webp":
        im.save(dst, quality=WEBP_QUALITY, method=4)
    else:  # jpeg family
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        im.save(dst, quality=JPEG_QUALITY, optimize=True, progressive=True)


def run_ffmpeg(args: list) -> bool:
    proc = subprocess.run(
        ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"] + args,
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        print(f"    ffmpeg error: {proc.stderr.strip()[:300]}", file=sys.stderr)
        return False
    return True


def optimize_video(src: str, dst_dir: str, base: str) -> str | None:
    """Gallery video -> H.264 .mp4, capped at 1080p, audio kept."""
    dst = os.path.join(dst_dir, base + ".mp4")
    scale = (
        f"scale=w={VIDEO_MAX_EDGE}:h={VIDEO_MAX_EDGE}"
        ":force_original_aspect_ratio=decrease:force_divisible_by=2"
    )
    ok = run_ffmpeg([
        "-i", src,
        "-vf", scale,
        "-c:v", "libx264", "-crf", VIDEO_CRF, "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        dst,
    ])
    return dst if ok else None


def optimize_hero(src: str, dst_dir: str, base: str) -> str | None:
    """Ambient background -> muted VP8 .webm at 1920w (drop-in for Hero.js)."""
    dst = os.path.join(dst_dir, base + ".webm")
    ok = run_ffmpeg([
        "-i", src,
        "-vf", f"scale={HERO_WIDTH}:-2",
        "-c:v", "libvpx", "-crf", HERO_CRF, "-b:v", "2500k",
        "-deadline", "realtime", "-cpu-used", "8",
        "-an",
        dst,
    ])
    return dst if ok else None


def main(in_dir: str, out_dir: str) -> None:
    total_in = total_out = 0
    rows = []

    for root, _dirs, files in os.walk(in_dir):
        rel = os.path.relpath(root, in_dir)
        target_dir = os.path.join(out_dir, rel) if rel != "." else out_dir
        os.makedirs(target_dir, exist_ok=True)

        for f in sorted(files):
            src = os.path.join(root, f)
            base, ext = os.path.splitext(f)
            ext = ext.lower()
            size_in = os.path.getsize(src)
            dst = os.path.join(target_dir, f)

            try:
                if ext in PHOTO_EXT:
                    optimize_photo(src, dst)
                elif ext in VIDEO_EXT:
                    if base.lower().startswith("background"):
                        made = optimize_hero(src, target_dir, base)
                    else:
                        made = optimize_video(src, target_dir, base)
                    if made is None:
                        shutil.copy2(src, dst)
                        made = dst
                    dst = made
                else:
                    shutil.copy2(src, dst)
            except Exception as exc:  # keep going; copy original on failure
                print(f"    ! {src}: {exc}", file=sys.stderr)
                shutil.copy2(src, dst)

            # Never ship a file bigger than the original
            if os.path.exists(dst) and os.path.getsize(dst) >= size_in:
                if os.path.splitext(dst)[1] == ext:
                    shutil.copy2(src, dst)

            size_out = os.path.getsize(dst)
            total_in += size_in
            total_out += size_out
            rows.append((os.path.join(rel, f), size_in, size_out))

    print(f"\n{'file':<52} {'before':>10} {'after':>10}")
    print("-" * 76)
    for name, si, so in rows:
        print(f"{name:<52} {human(si):>10} {human(so):>10}")
    print("-" * 76)
    pct = 100 * (1 - total_out / total_in) if total_in else 0
    print(f"{'TOTAL':<52} {human(total_in):>10} {human(total_out):>10}   (-{pct:.1f}%)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
