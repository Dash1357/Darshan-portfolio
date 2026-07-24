# Darshan Jhawar Portfolio — v2

Dark-gallery redesign: cinematic video hero, living category tiles,
native-ratio masonry galleries with a fullscreen lightbox, category
colour system, manifest-driven content, SEO + social previews.

## Deploy (first time)

1. Back up your current repo folder (just in case).
2. Delete everything inside your local `Darshan-portfolio` folder
   **except the `.git` folder**, then copy the contents of this zip in.
3. Run:

   ```
   npm install
   npm start          # check it locally at http://localhost:3000
   ```

4. Ship it:

   ```
   git add -A
   git commit -m "v2: redesign + optimized media + manifest architecture"
   git push
   ```

   Vercel redeploys automatically.

### Optional: shrink the repo itself

Your git *history* still contains the old 1 GB of media. If you want a
light repo (recommended before adding lots of new content), run this
once — it rewrites history to just the new state:

```
git checkout --orphan v2
git add -A
git commit -m "v2: fresh start with optimized media"
git branch -D main
git branch -m main
git push -f origin main
```

(Vercel keeps working — it follows the branch, not the history.)

## Adding new content (the new workflow)

1. Optimize the batch on your computer:

   ```
   python3 optimize_media.py <raw_folder> <ready_folder>
   ```

2. Drop the ready files into `public/assets/<category>/<new-series>/`.
   Any filenames work now — no numbering rules.
3. Regenerate the manifest:

   ```
   npm run manifest
   ```

4. Open `src/content/site.js` and add one entry to that category's
   `series` list — title, description, folder. Done. Commit and push.

To change the homepage hero: replace `public/assets/home/hero.mp4`
(and `hero-poster.jpg`), or point `HOME.heroVideo` in `site.js`
somewhere else. Keep it under ~25 seconds and ~6 MB.

## Still on you (from the audit)

- [ ] Confirm the contact email (currently `heman.jhawar@gmail.com`) —
      it's set in one place: `src/content/site.js`.
- [ ] Buy a domain (e.g. `darshanjhawar.com`), connect it in Vercel,
      then update the URLs in `public/index.html` (og:url, og:image),
      `public/robots.txt`, and `public/sitemap.xml`.
- [ ] Send proof lines (event/client names), a portrait + short bio,
      and your best 20–30 s of footage for a proper showreel hero.
- [ ] Shoot a short wildlife clip so that tile can come alive too.

## Where things live

```
src/content/site.js        ← ALL text, contacts, categories, colours
src/content/manifest.json  ← generated media index (npm run manifest)
src/pages/Home.js          ← cinematic hero + living tiles
src/pages/Gallery.js       ← every category page (data-driven)
src/components/            ← Nav, Footer, MasonryGrid, Lightbox, Reveal
scripts/generate-manifest.js
```
