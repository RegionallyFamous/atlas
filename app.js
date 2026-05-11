const state = {
  aesthetics: [],
  filtered: [],
  category: "All",
  energy: "All",
  era: "All",
  search: "",
  sort: "name",
  shuffleSeed: 0,
  activePrompt: "",
  generatedMockups: new Set()
};

const els = {
  gallery: document.querySelector("#gallery"),
  coverageLabel: document.querySelector("#coverageLabel"),
  coverageBar: document.querySelector("#coverageBar"),
  spotlightRail: document.querySelector("#spotlightRail"),
  searchInput: document.querySelector("#searchInput"),
  categorySelect: document.querySelector("#categorySelect"),
  eraSelect: document.querySelector("#eraSelect"),
  sortSelect: document.querySelector("#sortSelect"),
  searchButton: document.querySelector("#searchButton"),
  energyFilters: document.querySelector("#energyFilters"),
  shuffleButton: document.querySelector("#shuffleButton"),
  resetButton: document.querySelector("#resetButton"),
  emptyState: document.querySelector("#emptyState"),
  detailPanel: document.querySelector("#detailPanel"),
  detailPreview: document.querySelector("#detailPreview"),
  detailMeta: document.querySelector("#detailMeta"),
  detailTitle: document.querySelector("#detailTitle"),
  detailSummary: document.querySelector("#detailSummary"),
  detailSwatches: document.querySelector("#detailSwatches"),
  detailDNA: document.querySelector("#detailDNA"),
  detailTypography: document.querySelector("#detailTypography"),
  detailLayout: document.querySelector("#detailLayout"),
  detailTexture: document.querySelector("#detailTexture"),
  detailMotion: document.querySelector("#detailMotion"),
  detailBestFor: document.querySelector("#detailBestFor"),
  detailThemeAngles: document.querySelector("#detailThemeAngles"),
  detailPrompt: document.querySelector("#detailPrompt"),
  copyPromptButton: document.querySelector("#copyPromptButton"),
  openMockupLink: document.querySelector("#openMockupLink")
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function hash(value) {
  let h = 2166136261;
  for (const char of value) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function cssVars(colors) {
  return colors.map((color, index) => `--c${index}: ${color}`).join("; ");
}

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
    nav: ["Product", "Docs", "Pricing"],
    eyebrow: "Live product system",
    cta: "Start",
    cards: ["Workflow", "Metrics", "Integrations"]
  },
  "Graphic Movements": {
    nav: ["Posters", "Type", "Archive"],
    eyebrow: "Campaign system",
    cta: "View",
    cards: ["Issue", "Studio", "Signal"]
  },
  "Internet Culture": {
    nav: ["Index", "Links", "Guestbook"],
    eyebrow: "Online visual world",
    cta: "Enter",
    cards: ["Shrine", "Feed", "Loop"]
  },
  "Editorial Print": {
    nav: ["Latest", "Features", "Archive"],
    eyebrow: "Publication theme",
    cta: "Read",
    cards: ["Lead", "Essay", "Notes"]
  },
  "Commerce Hospitality": {
    nav: ["Shop", "Menu", "Visit"],
    eyebrow: "Storefront theme",
    cta: "Book",
    cards: ["Feature", "Hours", "Offer"]
  },
  "Art Object": {
    nav: ["Works", "Artists", "Visit"],
    eyebrow: "Gallery theme",
    cta: "Inquire",
    cards: ["Work", "Show", "Detail"]
  },
  "Interiors Architecture": {
    nav: ["Projects", "Studio", "Contact"],
    eyebrow: "Project portfolio",
    cta: "Open",
    cards: ["Plan", "Site", "Material"]
  },
  "Fashion Beauty": {
    nav: ["Lookbook", "Shop", "Journal"],
    eyebrow: "Editorial commerce",
    cta: "Shop",
    cards: ["Look", "Texture", "Drop"]
  },
  "Tech Futurism": {
    nav: ["Systems", "Labs", "Data"],
    eyebrow: "Future interface",
    cta: "Deploy",
    cards: ["Signal", "Model", "Grid"]
  },
  "Craft Material": {
    nav: ["Objects", "Process", "Market"],
    eyebrow: "Maker theme",
    cta: "Browse",
    cards: ["Batch", "Material", "Story"]
  },
  "Civic Institutional": {
    nav: ["Services", "Search", "Contact"],
    eyebrow: "Public site",
    cta: "Find",
    cards: ["Apply", "Hours", "Updates"]
  },
  "Entertainment Events": {
    nav: ["Lineup", "Schedule", "Tickets"],
    eyebrow: "Event theme",
    cta: "Tickets",
    cards: ["Stage", "Pass", "Map"]
  }
};

const featuredIds = [
  "neo-brutalist-app",
  "quiet-luxury",
  "y2k-chrome",
  "swiss-international",
  "vaporwave"
];

function mockupImageUrl(id) {
  return `assets/aesthetic-mockups-webp/${encodeURIComponent(id)}.webp`;
}

function previewContent(item) {
  return contentByCategory[item.category] || contentByCategory["Web UI"];
}

function shortName(name) {
  const words = name.split(/\s+/);
  return words.length > 2 ? words.slice(0, 2).join(" ") : name;
}

function sitePreviewMarkup(item, extraClass = "") {
  if (state.generatedMockups.has(item.id)) {
    return `
      <div class="site-preview generated-thumb ${extraClass}" style="${cssVars(item.palette.colors)}; --mockup-image: url('${mockupImageUrl(item.id)}')"></div>
    `;
  }

  const content = previewContent(item);
  const layout = layoutByCategory[item.category] || "product";
  const title = shortName(item.name);
  const dna = item.visualDNA.slice(0, 3);
  const cards = content.cards.map((card, index) => {
    const label = dna[index] || card;
    return `
      <span class="mock-card mock-card-${index + 1}">
        <span class="mock-media"></span>
        <span class="mock-card-title">${escapeHtml(card)}</span>
        <span class="mock-line"></span>
        <span class="mock-line short"></span>
        <span class="mock-caption">${escapeHtml(label)}</span>
      </span>
    `;
  }).join("");

  return `
    <div class="site-preview ${item.previewStyle} ${layout} ${extraClass}" style="${cssVars(item.palette.colors)}">
      <span class="mock-browser">
        <span></span><span></span><span></span>
      </span>
      <span class="mock-nav">
        <span class="mock-logo">${escapeHtml(title.slice(0, 1))}</span>
        <span class="mock-nav-links">
          ${content.nav.map((link) => `<span>${escapeHtml(link)}</span>`).join("")}
        </span>
        <span class="mock-nav-action">${escapeHtml(content.cta)}</span>
      </span>
      <span class="mock-hero">
        <span class="mock-copy">
          <span class="mock-kicker">${escapeHtml(content.eyebrow)}</span>
          <span class="mock-title">${escapeHtml(title)}</span>
          <span class="mock-text">${escapeHtml(item.summary)}</span>
          <span class="mock-button">${escapeHtml(content.cta)}</span>
        </span>
        <span class="mock-visual">
          <span class="mock-visual-inner"></span>
          <span class="mock-visual-chip chip-one"></span>
          <span class="mock-visual-chip chip-two"></span>
        </span>
      </span>
      <span class="mock-content">
        ${cards}
      </span>
      <span class="mock-footer">
        <span>${escapeHtml(item.category)}</span>
        <span>${escapeHtml(item.era)}</span>
        <span>${escapeHtml(item.energy)}</span>
      </span>
    </div>
  `;
}

function swatchesMarkup(colors) {
  return colors.map((color) => `<span style="background:${color}" title="${color}"></span>`).join("");
}

function uniq(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function renderFilterChips(container, values, activeValue, type) {
  container.innerHTML = ["All", ...values].map((value) => {
    const active = value === activeValue ? " active" : "";
    return `<button class="chip${active}" type="button" data-filter-type="${type}" data-filter-value="${escapeHtml(value)}">${escapeHtml(value)}</button>`;
  }).join("");
}

function renderFilters() {
  const categories = uniq(state.aesthetics.map((item) => item.category));
  const energies = uniq(state.aesthetics.map((item) => item.energy));
  const eras = uniq(state.aesthetics.map((item) => item.era));

  renderFilterChips(els.energyFilters, energies, state.energy, "energy");
  els.categorySelect.innerHTML = ["All", ...categories].map((category) => {
    const selected = category === state.category ? " selected" : "";
    return `<option value="${escapeHtml(category)}"${selected}>${escapeHtml(category)}</option>`;
  }).join("");
  els.eraSelect.innerHTML = ["All", ...eras].map((era) => {
    const selected = era === state.era ? " selected" : "";
    return `<option value="${escapeHtml(era)}"${selected}>${escapeHtml(era)}</option>`;
  }).join("");
}

function matchesSearch(item, query) {
  if (!query) return true;
  const haystack = [
    item.name,
    item.category,
    item.era,
    item.energy,
    item.summary,
    item.palette.name,
    item.typography,
    item.layout,
    item.tags.join(" "),
    item.visualDNA.join(" ")
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function sortItems(items) {
  const sorted = [...items];
  if (state.shuffleSeed) {
    return sorted.sort((a, b) => hash(`${a.id}-${state.shuffleSeed}`) - hash(`${b.id}-${state.shuffleSeed}`));
  }
  return sorted.sort((a, b) => {
    if (state.sort === "generated") {
      const generatedDelta = Number(state.generatedMockups.has(b.id)) - Number(state.generatedMockups.has(a.id));
      if (generatedDelta !== 0) return generatedDelta;
      return a.name.localeCompare(b.name);
    }
    if (state.sort === "category") {
      return `${a.category} ${a.name}`.localeCompare(`${b.category} ${b.name}`);
    }
    if (state.sort === "energy") {
      return `${a.energy} ${a.name}`.localeCompare(`${b.energy} ${b.name}`);
    }
    if (state.sort === "era") {
      return `${a.era} ${a.name}`.localeCompare(`${b.era} ${b.name}`);
    }
    return a.name.localeCompare(b.name);
  });
}

function applyFilters() {
  const query = state.search.trim().toLowerCase();
  const filtered = state.aesthetics.filter((item) => {
    const categoryMatch = state.category === "All" || item.category === state.category;
    const energyMatch = state.energy === "All" || item.energy === state.energy;
    const eraMatch = state.era === "All" || item.era === state.era;
    return categoryMatch && energyMatch && eraMatch && matchesSearch(item, query);
  });
  state.filtered = sortItems(filtered);
  renderGallery();
}

function cardMarkup(item) {
  const tags = item.tags.slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const hasImage = state.generatedMockups.has(item.id) ? ' data-has-image="true"' : "";
  return `
    <button class="card" type="button" data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}"${hasImage}>
      ${sitePreviewMarkup(item)}
      <span class="card-body">
        <span class="card-title-row">
          <h2>${escapeHtml(item.name)}</h2>
          <span class="index">${String(item.collectionIndex).padStart(3, "0")}</span>
        </span>
        <span class="meta">${escapeHtml(item.category)} · ${escapeHtml(item.era)} · ${escapeHtml(item.energy)}</span>
        <span class="swatches">${swatchesMarkup(item.palette.colors)}</span>
        <span class="summary">${escapeHtml(item.summary)}</span>
        <span class="tags">${tags}</span>
      </span>
    </button>
  `;
}

function renderSpotlight() {
  const featured = featuredIds
    .map((id) => state.aesthetics.find((item) => item.id === id))
    .filter((item) => item && state.generatedMockups.has(item.id));
  const fallback = state.aesthetics
    .filter((item) => state.generatedMockups.has(item.id) && !featured.some((featuredItem) => featuredItem.id === item.id))
    .slice(0, Math.max(0, 5 - featured.length));
  const items = [...featured, ...fallback].slice(0, 5);
  els.spotlightRail.innerHTML = items.map((item) => `
    <button class="spotlight-card" type="button" data-open-detail data-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}">
      <span class="spotlight-image" style="--mockup-image: url('${mockupImageUrl(item.id)}')"></span>
      <span class="spotlight-meta">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.category)} · ${escapeHtml(item.energy)}</span>
      </span>
    </button>
  `).join("");
}

function renderGallery() {
  const generatedCount = state.aesthetics.filter((item) => state.generatedMockups.has(item.id)).length;
  const coverage = state.aesthetics.length ? Math.round((generatedCount / state.aesthetics.length) * 100) : 0;
  els.coverageLabel.textContent = `${generatedCount.toLocaleString()} / ${state.aesthetics.length.toLocaleString()}`;
  els.coverageBar.style.width = `${coverage}%`;
  els.emptyState.hidden = state.filtered.length > 0;
  els.gallery.hidden = state.filtered.length === 0;
  els.gallery.innerHTML = state.filtered.map(cardMarkup).join("");
  renderSpotlight();
}

function setList(el, values) {
  el.innerHTML = values.map((value) => `<li>${escapeHtml(value)}</li>`).join("");
}

function showDetail(id) {
  const item = state.aesthetics.find((entry) => entry.id === id);
  if (!item) return;

  els.detailPreview.outerHTML = sitePreviewMarkup(item, "detail-preview").replace(
    "<div",
    '<div id="detailPreview"'
  );
  els.detailPreview = document.querySelector("#detailPreview");
  els.detailMeta.textContent = `${item.category} · ${item.era} · ${item.energy} · ${item.palette.name}`;
  els.detailTitle.textContent = item.name;
  els.detailSummary.textContent = item.summary;
  els.detailSwatches.innerHTML = swatchesMarkup(item.palette.colors);
  els.detailDNA.textContent = item.visualDNA.join(", ");
  els.detailTypography.textContent = item.typography;
  els.detailLayout.textContent = item.layout;
  els.detailTexture.textContent = item.texture;
  els.detailMotion.textContent = item.motion;
  setList(els.detailBestFor, item.bestFor);
  setList(els.detailThemeAngles, item.themeAngles);
  els.detailPrompt.textContent = item.promptSeed;
  els.openMockupLink.href = `mockup.html?id=${encodeURIComponent(item.id)}`;
  state.activePrompt = item.promptSeed;
  els.copyPromptButton.textContent = "Copy Prompt";

  els.detailPanel.classList.add("open");
  els.detailPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  els.detailPanel.classList.remove("open");
  els.detailPanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function resetFilters() {
  state.category = "All";
  state.energy = "All";
  state.era = "All";
  state.search = "";
  state.sort = "name";
  state.shuffleSeed = 0;
  els.searchInput.value = "";
  els.categorySelect.value = "All";
  els.sortSelect.value = "name";
  renderFilters();
  applyFilters();
}

async function copyPrompt() {
  if (!state.activePrompt) return;
  try {
    await navigator.clipboard.writeText(state.activePrompt);
    els.copyPromptButton.textContent = "Copied";
  } catch {
    els.copyPromptButton.textContent = "Copy failed";
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    state.shuffleSeed = 0;
    applyFilters();
  });

  els.categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    state.shuffleSeed = 0;
    applyFilters();
  });

  els.eraSelect.addEventListener("change", (event) => {
    state.era = event.target.value;
    state.shuffleSeed = 0;
    applyFilters();
  });

  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    state.shuffleSeed = 0;
    applyFilters();
  });

  document.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter-type]");
    if (chip) {
      state[chip.dataset.filterType] = chip.dataset.filterValue;
      state.shuffleSeed = 0;
      renderFilters();
      applyFilters();
      return;
    }

    const card = event.target.closest(".card[data-id], [data-open-detail][data-id]");
    if (card) {
      showDetail(card.dataset.id);
      return;
    }

    if (event.target.closest("[data-close-detail]")) {
      closeDetail();
    }
  });

  els.shuffleButton.addEventListener("click", () => {
    state.shuffleSeed = Date.now();
    applyFilters();
  });

  els.searchButton.addEventListener("click", () => {
    state.search = els.searchInput.value;
    state.shuffleSeed = 0;
    applyFilters();
  });

  els.resetButton.addEventListener("click", resetFilters);
  els.copyPromptButton.addEventListener("click", copyPrompt);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDetail();
  });
}

async function init() {
  bindEvents();
  const [response, manifestResponse] = await Promise.all([
    fetch("data/design-aesthetics.json?v=20260510-root"),
    fetch("data/mockup-manifest.json?v=20260510-search")
  ]);
  if (!response.ok) {
    throw new Error(`Unable to load aesthetics database: ${response.status}`);
  }
  if (manifestResponse.ok) {
    const manifest = await manifestResponse.json();
    state.generatedMockups = new Set(
      manifest.items.filter((item) => item.status === "generated").map((item) => item.id)
    );
  }
  const database = await response.json();
  state.aesthetics = database.aesthetics;
  state.filtered = database.aesthetics;
  renderFilters();
  applyFilters();
}

init().catch((error) => {
  els.emptyState.hidden = false;
  els.gallery.hidden = true;
  els.emptyState.querySelector("h2").textContent = "Catalog failed to load";
  els.emptyState.querySelector("p").textContent = error.message;
});
