import fs from "node:fs";
import path from "node:path";

const dataPath = path.join("data", "design-aesthetics.json");
const outPath = path.join("data", "mockup-manifest.json");
const db = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function promptFor(item) {
  const palette = item.palette.colors.join(", ");
  return [
    "Use case: ui-mockup",
    "Asset type: high-fidelity WordPress theme homepage mockup",
    `Primary request: Create a polished full-page visual mockup of a WordPress homepage using the ${item.name} aesthetic.`,
    "Scene/backdrop: A browser-like website screenshot, not a mood board. The page should look like a real WordPress theme homepage someone could build: header navigation, hero, feature sections, post/card grid, call-to-action band, and footer.",
    "Style/medium: high-fidelity web design mockup, crisp UI, editorial homepage composition, raster image.",
    "Composition/framing: portrait-oriented full-page website screenshot, 1440px wide feel, showing the top hero and several sections below. Use realistic spacing, responsive layout logic, and visible section hierarchy.",
    `Visual direction: ${item.summary} Visual DNA: ${item.visualDNA.join(", ")}.`,
    `WordPress theme elements: top nav with site title, menu links, primary button; large hero title area; feature/query cards; latest posts section; reusable block-pattern style sections; newsletter/CTA band; footer. Best for: ${item.bestFor.join(", ")}.`,
    `Typography/layout notes: ${item.typography}; ${item.layout}.`,
    `Color palette: ${item.palette.name}; ${palette}.`,
    `Materials/textures/motion cues: ${item.texture}; ${item.motion}.`,
    `Text constraints: Use short readable labels related to the style, including "${item.name}", "Theme Preview", "Patterns", "Latest Posts", "Subscribe", and one clear call to action. Avoid long paragraphs.`,
    "Avoid: wireframe boxes, generic dashboard UI unless the aesthetic is dashboard/product-specific, abstract-only mood board, illegible tiny text, dark unreadable overlays, stock-photo hero, low-fidelity placeholders, watermark, browser chrome from a real product."
  ].join("\n");
}

const existing = new Set();
const assetsDir = path.join("assets", "aesthetic-mockups");
if (fs.existsSync(assetsDir)) {
  for (const file of fs.readdirSync(assetsDir)) {
    if (file.endsWith(".png")) existing.add(file.replace(/\.png$/, ""));
  }
}

const manifest = {
  schemaVersion: "1.0.0",
  purpose: "Prompt manifest for high-fidelity WordPress homepage mockups for every Aesthetic Atlas entry.",
  outputDirectory: "assets/aesthetic-mockups",
  generatedCount: existing.size,
  totalCount: db.aesthetics.length,
  items: db.aesthetics.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    imagePath: `assets/aesthetic-mockups/${item.id}.png`,
    status: existing.has(item.id) ? "generated" : "pending",
    prompt: promptFor(item)
  }))
};

fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${manifest.items.length} prompts to ${outPath}`);
console.log(`${manifest.generatedCount} generated, ${manifest.totalCount - manifest.generatedCount} pending`);
