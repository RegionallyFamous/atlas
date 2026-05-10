# WeirdPress Aesthetic Atlas

This workspace now includes a static site for browsing hundreds of visual design aesthetics.

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/site/`.

The deployed GitHub Pages entry point is the repository root, which redirects to `/site/`.

## Key Files

- `site/index.html` - catalog interface.
- `site/styles.css` - responsive gallery, high-fidelity mini site previews, and detail mockups.
- `site/app.js` - search, filters, shuffle, category-aware WordPress-style previews, and detail panel.
- `site/mockup.html` - full-page generated homepage mockup for any aesthetic via `?id=`.
- `site/mockup.css` - high-fidelity full mockup layouts and visual treatments.
- `site/mockup.js` - renders the selected aesthetic as a complete WordPress-style homepage.
- `assets/aesthetic-mockups-webp/` - web-optimized imagegen mockups used by the published atlas.
- `assets/ui-webp/` - optimized generated UI artwork for the atlas masthead.
- `assets/aesthetic-mockups/` - local source PNG mockups, intentionally not required for the published site.
- `data/imagegen-mockup-prompts.json` - prompt manifest for generating image mockups for all 390 aesthetics.
- `data/design-aesthetics.json` - generated database with 390 aesthetics.
- `scripts/generate-aesthetics-data.mjs` - source generator for the database.
- `scripts/build-imagegen-prompt-manifest.mjs` - rebuilds the imagegen prompt/status manifest.

## Regenerate Data

```bash
node scripts/generate-aesthetics-data.mjs
```
