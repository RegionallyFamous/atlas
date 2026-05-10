const els = {
  root: document.querySelector("#mockupRoot"),
  select: document.querySelector("#mockupSelect"),
  prev: document.querySelector("#prevButton"),
  next: document.querySelector("#nextButton")
};

const state = {
  aesthetics: [],
  activeIndex: 0,
  generatedMockups: new Set()
};

const layoutByCategory = {
  "Web UI": "product",
  "Graphic Movements": "poster-site",
  "Internet Culture": "web-culture",
  "Editorial Print": "publication",
  "Commerce Hospitality": "commerce",
  "Art Object": "gallery-site",
  "Interiors Architecture": "architecture",
  "Fashion Beauty": "fashion",
  "Tech Futurism": "dashboard",
  "Craft Material": "maker",
  "Civic Institutional": "civic",
  "Entertainment Events": "event"
};

const contentByCategory = {
  "Web UI": {
    nav: ["Product", "Solutions", "Docs", "Pricing"],
    eyebrow: "Live product system",
    cta: "Start Free",
    secondary: "View Demo",
    heroLead: "A complete product homepage direction with interface proof, feature modules, and conversion-ready sections.",
    proof: ["Conversion-ready hero", "Reusable block patterns", "Product evidence"],
    sections: ["Workflow Builder", "Metrics Console", "Integration Library"],
    featureTitle: "The interface becomes the brand.",
    indexTitle: "Core Product Blocks"
  },
  "Graphic Movements": {
    nav: ["Posters", "Campaigns", "Type", "Archive"],
    eyebrow: "Campaign system",
    cta: "View Work",
    secondary: "Open Archive",
    heroLead: "A poster-led site direction with aggressive type, campaign hierarchy, and strong visual recall.",
    proof: ["Poster logic", "Type system", "Campaign modules"],
    sections: ["Lead Poster", "Signal Type", "Archive Wall"],
    featureTitle: "A site that behaves like a living campaign wall.",
    indexTitle: "Poster System"
  },
  "Internet Culture": {
    nav: ["Index", "Feed", "Links", "Guestbook"],
    eyebrow: "Online visual world",
    cta: "Enter",
    secondary: "Browse Index",
    heroLead: "A subculture-heavy site direction with screen-native texture, playful references, and deep archive energy.",
    proof: ["Community signal", "Link garden", "Archive texture"],
    sections: ["Shrine Page", "Signal Feed", "Loop Archive"],
    featureTitle: "The homepage feels discovered, not merely visited.",
    indexTitle: "Internet Rooms"
  },
  "Editorial Print": {
    nav: ["Latest", "Features", "Columns", "Archive"],
    eyebrow: "Publication theme",
    cta: "Read Feature",
    secondary: "See Archive",
    heroLead: "A magazine-grade WordPress direction with issue structure, story rhythm, captions, and archive depth.",
    proof: ["Lead story", "Issue index", "Reading system"],
    sections: ["Cover Story", "Field Notes", "Essay Stack"],
    featureTitle: "Reading rhythm, hierarchy, and editorial confidence.",
    indexTitle: "This Issue"
  },
  "Commerce Hospitality": {
    nav: ["Shop", "Story", "Visit", "Reserve"],
    eyebrow: "Storefront theme",
    cta: "Book Now",
    secondary: "Browse Menu",
    heroLead: "A conversion-ready storefront or hospitality homepage with real product/place structure and clear actions.",
    proof: ["Immediate booking path", "Product story", "Trust details"],
    sections: ["Featured Offer", "Hours & Location", "Seasonal Story"],
    featureTitle: "The brand, the place, and the action stay visible.",
    indexTitle: "Featured Experiences"
  },
  "Art Object": {
    nav: ["Works", "Artists", "Exhibitions", "Visit"],
    eyebrow: "Gallery theme",
    cta: "Inquire",
    secondary: "View Works",
    heroLead: "A gallery-style homepage with object-first pacing, captions, and refined collection browsing.",
    proof: ["Object focus", "Caption discipline", "Inquiry path"],
    sections: ["Featured Work", "Current Show", "Artist Note"],
    featureTitle: "Give the work space, then give it context.",
    indexTitle: "Selected Works"
  },
  "Interiors Architecture": {
    nav: ["Projects", "Practice", "Journal", "Contact"],
    eyebrow: "Project portfolio",
    cta: "Open Project",
    secondary: "Studio Profile",
    heroLead: "An architecture-grade portfolio direction with project facts, image sequencing, and material clarity.",
    proof: ["Project archive", "Material palette", "Studio credibility"],
    sections: ["Plan Detail", "Site Study", "Material Board"],
    featureTitle: "Spatial rhythm translated into a WordPress theme.",
    indexTitle: "Project Studies"
  },
  "Fashion Beauty": {
    nav: ["Lookbook", "Shop", "Journal", "Campaign"],
    eyebrow: "Editorial commerce",
    cta: "Shop Drop",
    secondary: "View Lookbook",
    heroLead: "A fashion or beauty homepage direction with image-led hierarchy, collection logic, and aspirational pacing.",
    proof: ["Lookbook hero", "Texture detail", "Launch system"],
    sections: ["Hero Look", "Texture Story", "Limited Drop"],
    featureTitle: "A visual merchandising system with editorial lift.",
    indexTitle: "Collection Edit"
  },
  "Tech Futurism": {
    nav: ["Systems", "Labs", "Data", "Deploy"],
    eyebrow: "Future interface",
    cta: "Deploy",
    secondary: "Read Spec",
    heroLead: "A speculative technology homepage with dashboard evidence, metrics, technical surfaces, and trust structure.",
    proof: ["System status", "Data modules", "Speculative material"],
    sections: ["Signal Grid", "Model State", "Control Room"],
    featureTitle: "Futurism grounded in interface evidence.",
    indexTitle: "System Modules"
  },
  "Craft Material": {
    nav: ["Objects", "Process", "Market", "Journal"],
    eyebrow: "Maker theme",
    cta: "Browse Objects",
    secondary: "See Process",
    heroLead: "A tactile WordPress direction with material details, process storytelling, and maker-commerce structure.",
    proof: ["Material proof", "Process story", "Batch logic"],
    sections: ["Current Batch", "Material Note", "Studio Story"],
    featureTitle: "The making process becomes the navigation system.",
    indexTitle: "Studio Objects"
  },
  "Civic Institutional": {
    nav: ["Services", "Search", "Resources", "Contact"],
    eyebrow: "Public service site",
    cta: "Find Service",
    secondary: "Get Updates",
    heroLead: "An accessible institutional homepage with task-first navigation, clear service cards, and readable public information.",
    proof: ["Search-first access", "Accessible states", "Service clarity"],
    sections: ["Apply", "Office Hours", "Public Updates"],
    featureTitle: "The fastest path to the task is the design.",
    indexTitle: "Top Services"
  },
  "Entertainment Events": {
    nav: ["Lineup", "Schedule", "Venue", "Tickets"],
    eyebrow: "Event theme",
    cta: "Get Tickets",
    secondary: "View Schedule",
    heroLead: "A ticket-ready event homepage with lineup hierarchy, schedule blocks, venue cues, and repeated purchase paths.",
    proof: ["Lineup wall", "Ticket path", "Schedule clarity"],
    sections: ["Main Stage", "Pass Tiers", "Venue Map"],
    featureTitle: "Poster energy with usable event logistics.",
    indexTitle: "Event Blocks"
  }
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cssVars(colors) {
  return colors.map((color, index) => `--c${index}: ${color}`).join("; ");
}

function shortName(name) {
  const words = name.split(/\s+/);
  return words.length > 3 ? words.slice(0, 3).join(" ") : name;
}

function contentFor(item) {
  return contentByCategory[item.category] || contentByCategory["Web UI"];
}

function layoutFor(item) {
  return layoutByCategory[item.category] || "product";
}

function listMarkup(values) {
  return values.map((value) => `<li>${escapeHtml(value)}</li>`).join("");
}

function swatchesMarkup(colors) {
  return colors.map((color) => `<span style="background:${color}"><b>${escapeHtml(color)}</b></span>`).join("");
}

function cardGrid(item, content) {
  return content.sections.map((section, index) => {
    const dna = item.visualDNA[index] || item.tags[index] || section;
    return `
      <article class="full-card">
        <div class="full-card-media media-${index + 1}">
          <span></span><span></span><span></span>
        </div>
        <p class="full-card-kicker">${escapeHtml(item.tags[index] || item.category)}</p>
        <h3>${escapeHtml(section)}</h3>
        <p>${escapeHtml(dna)} becomes a reusable WordPress pattern with matching spacing, type, and block styling.</p>
      </article>
    `;
  }).join("");
}

function visualPanel(item) {
  const dna = item.visualDNA.slice(0, 4);
  return `
    <div class="hero-art">
      <div class="art-window">
        <span class="art-dot dot-one"></span>
        <span class="art-dot dot-two"></span>
        <span class="art-dot dot-three"></span>
        <div class="art-stage">
          <span class="art-shape shape-one"></span>
          <span class="art-shape shape-two"></span>
          <span class="art-shape shape-three"></span>
          <span class="art-shape shape-four"></span>
        </div>
      </div>
      <div class="floating-panel panel-one">
        <strong>${escapeHtml(dna[0] || "Visual system")}</strong>
        <span></span><span></span>
      </div>
      <div class="floating-panel panel-two">
        <strong>${escapeHtml(dna[1] || "Theme pattern")}</strong>
        <span></span>
      </div>
    </div>
  `;
}

function fullMockupMarkup(item) {
  if (state.generatedMockups.has(item.id)) {
    return generatedImageMockupMarkup(item);
  }

  const content = contentFor(item);
  const layout = layoutFor(item);
  const title = shortName(item.name);
  const proof = content.proof.map((proofItem, index) => `
    <div>
      <strong>${String(index + 1).padStart(2, "0")}</strong>
      <span>${escapeHtml(proofItem)}</span>
    </div>
  `).join("");
  const palette = swatchesMarkup(item.palette.colors);
  const dnaList = listMarkup(item.visualDNA.slice(0, 6));

  return `
    <article class="full-site ${item.previewStyle} ${layout}" style="${cssVars(item.palette.colors)}">
      <nav class="full-nav">
        <a class="full-logo" href="#">${escapeHtml(title.slice(0, 1))}</a>
        <div class="full-nav-links">
          ${content.nav.map((link) => `<a href="#">${escapeHtml(link)}</a>`).join("")}
        </div>
        <a class="full-nav-cta" href="#">${escapeHtml(content.cta)}</a>
      </nav>

      <section class="full-hero">
        <div class="hero-copy">
          <p class="full-eyebrow">${escapeHtml(content.eyebrow)} · ${escapeHtml(item.era)}</p>
          <h1>${escapeHtml(item.name)}</h1>
          <p class="hero-lede">${escapeHtml(content.heroLead)} ${escapeHtml(item.summary)}</p>
          <div class="hero-actions">
            <a class="primary-action" href="#">${escapeHtml(content.cta)}</a>
            <a class="secondary-action" href="#">${escapeHtml(content.secondary)}</a>
          </div>
        </div>
        ${visualPanel(item)}
      </section>

      <section class="proof-strip" aria-label="Theme proof points">
        ${proof}
      </section>

      <section class="feature-section">
        <div>
          <p class="full-eyebrow">${escapeHtml(item.category)}</p>
          <h2>${escapeHtml(content.featureTitle)}</h2>
        </div>
        <p>${escapeHtml(item.layout)} The design direction uses ${escapeHtml(item.typography.toLowerCase())}, ${escapeHtml(item.texture.toLowerCase())}, and ${escapeHtml(item.motion.toLowerCase())}.</p>
      </section>

      <section class="content-grid" aria-label="${escapeHtml(content.indexTitle)}">
        <div class="section-heading">
          <p class="full-eyebrow">${escapeHtml(content.indexTitle)}</p>
          <h2>Reusable WordPress Sections</h2>
        </div>
        <div class="card-grid">
          ${cardGrid(item, content)}
        </div>
      </section>

      <section class="split-showcase">
        <div class="palette-panel">
          <p class="full-eyebrow">${escapeHtml(item.palette.name)}</p>
          <h2>Palette And Theme Tokens</h2>
          <div class="full-swatches">${palette}</div>
        </div>
        <div class="dna-panel">
          <p class="full-eyebrow">Visual DNA</p>
          <ul>${dnaList}</ul>
        </div>
      </section>

      <section class="editorial-band">
        <div class="band-media">
          <span></span><span></span><span></span>
        </div>
        <div>
          <p class="full-eyebrow">Theme Angle</p>
          <h2>${escapeHtml(item.themeAngles[0].replace(/^Hero: /, ""))}</h2>
          <p>${escapeHtml(item.themeAngles[1])}</p>
        </div>
      </section>

      <section class="final-cta">
        <p class="full-eyebrow">${escapeHtml(item.energy)} energy</p>
        <h2>Use this as a WordPress theme direction.</h2>
        <p>${escapeHtml(item.promptSeed)}</p>
        <a class="primary-action" href="#">Generate Theme</a>
      </section>

      <footer class="full-footer">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.category)}</span>
        <span>${escapeHtml(item.era)}</span>
        <span>${String(item.collectionIndex).padStart(3, "0")}</span>
      </footer>
    </article>
  `;
}

function generatedImageMockupMarkup(item) {
  const imageUrl = `assets/aesthetic-mockups-webp/${encodeURIComponent(item.id)}.webp`;
  return `
    <article class="generated-mockup-page" style="${cssVars(item.palette.colors)}">
      <section class="generated-intro">
        <div>
          <p class="full-eyebrow">${escapeHtml(item.category)} · ${escapeHtml(item.era)} · ${escapeHtml(item.energy)}</p>
          <h1>${escapeHtml(item.name)}</h1>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <a class="primary-action" href="${imageUrl}" target="_blank" rel="noopener">Open Image</a>
      </section>
      <figure class="generated-frame">
        <img src="${imageUrl}" alt="${escapeHtml(item.name)} WordPress homepage mockup">
      </figure>
      <section class="split-showcase generated-notes">
        <div class="palette-panel">
          <p class="full-eyebrow">${escapeHtml(item.palette.name)}</p>
          <h2>Palette And Tokens</h2>
          <div class="full-swatches">${swatchesMarkup(item.palette.colors)}</div>
        </div>
        <div class="dna-panel">
          <p class="full-eyebrow">Visual DNA</p>
          <ul>${listMarkup(item.visualDNA.slice(0, 6))}</ul>
        </div>
      </section>
    </article>
  `;
}

function setActiveIndex(index, updateUrl = true) {
  const count = state.aesthetics.length;
  state.activeIndex = ((index % count) + count) % count;
  const item = state.aesthetics[state.activeIndex];
  els.root.innerHTML = fullMockupMarkup(item);
  els.select.value = item.id;
  document.title = `${item.name} · Full Mockup`;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("id", item.id);
    window.history.replaceState({}, "", url);
  }
  window.scrollTo(0, 0);
}

function renderPicker() {
  els.select.innerHTML = state.aesthetics.map((item) => (
    `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(item.category)}</option>`
  )).join("");
}

async function init() {
  const [response, manifestResponse] = await Promise.all([
    fetch("data/design-aesthetics.json"),
    fetch("data/mockup-manifest.json")
  ]);
  if (!response.ok) throw new Error(`Could not load aesthetics: ${response.status}`);
  if (manifestResponse.ok) {
    const manifest = await manifestResponse.json();
    state.generatedMockups = new Set(
      manifest.items.filter((item) => item.status === "generated").map((item) => item.id)
    );
  }
  const database = await response.json();
  state.aesthetics = database.aesthetics;
  renderPicker();

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  const foundIndex = Math.max(0, state.aesthetics.findIndex((item) => item.id === requestedId));
  setActiveIndex(foundIndex, requestedId !== state.aesthetics[foundIndex]?.id);

  els.select.addEventListener("change", () => {
    const index = state.aesthetics.findIndex((item) => item.id === els.select.value);
    setActiveIndex(index);
  });

  els.prev.addEventListener("click", () => setActiveIndex(state.activeIndex - 1));
  els.next.addEventListener("click", () => setActiveIndex(state.activeIndex + 1));
}

init().catch((error) => {
  els.root.innerHTML = `
    <section class="mockup-error">
      <h1>Mockup failed to load</h1>
      <p>${escapeHtml(error.message)}</p>
    </section>
  `;
});
