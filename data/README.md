# Visual Style Data

This folder contains machine-readable visual direction data for WeirdPress theme creation.

## Files

- `design-aesthetics.json` is the large Aesthetic Atlas catalog used by the static site.
- `visual-style-database.json` is the earlier compact WordPress style catalog.
- `visual-style-database.schema.json` describes the catalog shape.

## How To Use

For broad exploration, open the site in `site/` and browse `design-aesthetics.json` through the gallery UI.

For theme generation, pick an aesthetic by `id`, then map its fields into a block theme:

- `palette.colors` -> `settings.color.palette` in `theme.json`
- `typography` -> `settings.typography.fontFamilies`, font sizes, and global text styles
- `layout` -> template structure, `contentSize`, `wideSize`, spacing presets, and navigation behavior
- `visualDNA` -> core art-direction rules
- `themeAngles` -> starter block patterns and theme-generation priorities
- `promptSeed` -> a fast prompt starter for generating a matching WordPress theme

## WordPress Notes

The database is aimed at modern block themes and current `theme.json` concepts. It references WordPress documentation for theme.json, color presets, and typography presets in the catalog `sourceNotes`.

Use these styles as design systems, not page decorations. A generated theme should choose one style, build a coherent `theme.json`, create a small set of high-quality patterns, and verify the result in the browser across desktop and mobile.
