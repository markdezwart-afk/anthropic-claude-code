(function () {
  "use strict";

  const data = Array.isArray(window.VACATURES) ? window.VACATURES.slice() : [];

  const state = {
    category: "all",
    minScore: 0,
    sort: "score-desc",
    search: "",
    selectedId: null,
  };

  const els = {
    tbody: document.getElementById("table-body"),
    empty: document.getElementById("empty-state"),
    title: document.getElementById("page-title"),
    scoreSlider: document.getElementById("score-slider"),
    scoreVal: document.getElementById("score-val"),
    sortSelect: document.getElementById("sort-select"),
    search: document.getElementById("search-input"),
    navItems: document.querySelectorAll(".nav-item"),
    layout: document.querySelector(".layout"),
    detail: document.getElementById("detail-panel"),
    detailBody: document.getElementById("detail-body"),
    detailClose: document.getElementById("detail-close"),
    detailLink: document.getElementById("detail-link"),
  };

  const labels = {
    all: "Alle vacatures",
    financieel: "Financieel",
    sociaal: "Sociaal",
    ecologisch: "Ecologisch",
  };

  // ---------- Rendering ----------
  function scoreColor(score) {
    if (score >= 75) return "var(--score-high)";
    if (score >= 50) return "var(--score-mid)";
    return "var(--score-low)";
  }

  function scoreCell(score) {
    const s = Number(score) || 0;
    return `<div class="score">
      <div class="score-bar"><div class="score-fill" style="width:${s}%;background:${scoreColor(s)}"></div></div>
      <div class="score-num">${s}</div>
    </div>`;
  }

  // Days until deadline, or null if missing/invalid. Negative = expired.
  function daysUntil(deadline) {
    if (!deadline) return null;
    const d = new Date(deadline);
    if (isNaN(d.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return Math.round((d - today) / 86400000);
  }

  function formatDeadline(deadline) {
    const d = new Date(deadline);
    if (isNaN(d.getTime())) return deadline;
    return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  }

  function deadlineCell(deadline) {
    if (!deadline) {
      return `<span class="deadline deadline-unknown" title="Deadline onbekend">—</span>`;
    }
    const days = daysUntil(deadline);
    const label = formatDeadline(deadline);
    if (days === null) {
      return `<span class="deadline deadline-unknown">${escapeHtml(deadline)}</span>`;
    }
    if (days < 0) {
      return `<span class="deadline deadline-expired" title="Verlopen ${-days} dagen geleden">${escapeHtml(label)}</span>`;
    }
    if (days <= 7) {
      return `<span class="deadline deadline-urgent" title="Nog ${days} dag(en)">${escapeHtml(label)}</span>`;
    }
    if (days <= 30) {
      return `<span class="deadline deadline-soon" title="Nog ${days} dagen">${escapeHtml(label)}</span>`;
    }
    return `<span class="deadline deadline-normal" title="Nog ${days} dagen">${escapeHtml(label)}</span>`;
  }

  function updateCounts() {
    const countBy = { all: data.length, financieel: 0, sociaal: 0, ecologisch: 0 };
    data.forEach(v => { if (countBy[v.categorie] != null) countBy[v.categorie]++; });
    Object.keys(countBy).forEach(k => {
      const el = document.getElementById("count-" + k);
      if (el) el.textContent = countBy[k];
    });
  }

  function filtered() {
    let list = data.slice();
    if (state.category !== "all") list = list.filter(v => v.categorie === state.category);
    if (state.minScore > 0) list = list.filter(v => (Number(v.score) || 0) >= state.minScore);
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(v =>
        (v.titel || "").toLowerCase().includes(q) ||
        (v.bedrijf || "").toLowerCase().includes(q) ||
        (v.locatie || "").toLowerCase().includes(q) ||
        (v.kernverantwoordelijkheden || []).join(" ").toLowerCase().includes(q)
      );
    }
    switch (state.sort) {
      case "score-asc":  list.sort((a,b) => (a.score||0) - (b.score||0)); break;
      case "score-desc": list.sort((a,b) => (b.score||0) - (a.score||0)); break;
      case "deadline-asc": list.sort((a,b) => {
        // Nearest upcoming deadline first; expired after upcoming; unknown last.
        const da = daysUntil(a.deadline);
        const db = daysUntil(b.deadline);
        const rank = x => x === null ? 2 : (x < 0 ? 1 : 0);
        const ra = rank(da), rb = rank(db);
        if (ra !== rb) return ra - rb;
        if (da === null && db === null) return 0;
        // Within upcoming: ascending. Within expired: most recently expired first.
        return da - db;
      }); break;
      case "titel":      list.sort((a,b) => (a.titel||"").localeCompare(b.titel||"")); break;
      case "bedrijf":    list.sort((a,b) => (a.bedrijf||"").localeCompare(b.bedrijf||"")); break;
    }
    return list;
  }

  function renderTable() {
    const list = filtered();
    if (list.length === 0) {
      els.tbody.innerHTML = "";
      els.empty.hidden = false;
      return;
    }
    els.empty.hidden = true;
    els.tbody.innerHTML = list.map(v => `
      <tr data-id="${v.id}" class="${state.selectedId === v.id ? "selected" : ""}">
        <td class="cell-title">${escapeHtml(v.titel || "(zonder titel)")}</td>
        <td>${escapeHtml(v.bedrijf || "—")}</td>
        <td><span class="badge badge-${v.categorie}">${labels[v.categorie] || v.categorie}</span></td>
        <td>${scoreCell(v.score)}</td>
        <td>${deadlineCell(v.deadline)}</td>
        <td class="cell-muted">${escapeHtml(v.locatie || "—")}</td>
        <td class="cell-muted">${escapeHtml(v.salaris_indicatie || "—")}</td>
      </tr>
    `).join("");
    els.tbody.querySelectorAll("tr").forEach(tr => {
      tr.addEventListener("click", () => openDetail(tr.dataset.id));
    });
  }

  // ---------- Detail ----------
  function openDetail(id) {
    const v = data.find(x => x.id === id);
    if (!v) return;
    state.selectedId = id;
    els.layout.classList.add("detail-open");
    els.detail.setAttribute("aria-hidden", "false");
    els.detailLink.href = v.url || "#";

    const scoreRows = v.score_breakdown ? `
      <div class="score-block">
        <div class="score-row"><span class="label">Vaardigheden</span><span class="val">${v.score_breakdown.vaardigheden ?? "—"} / 40</span></div>
        <div class="score-row"><span class="label">Ervaring</span><span class="val">${v.score_breakdown.ervaring ?? "—"} / 30</span></div>
        <div class="score-row"><span class="label">Drijfveer</span><span class="val">${v.score_breakdown.drijfveer ?? "—"} / 20</span></div>
        <div class="score-row"><span class="label">Praktisch</span><span class="val">${v.score_breakdown.praktisch ?? "—"} / 10</span></div>
        <div class="score-row score-total"><span class="label">Totaal</span><span class="val">${v.score} / 100</span></div>
      </div>` : `
      <div class="score-block">
        <div class="score-row score-total"><span class="label">Match-score</span><span class="val">${v.score} / 100</span></div>
      </div>`;

    els.detailBody.innerHTML = `
      <span class="badge badge-${v.categorie}">${labels[v.categorie] || v.categorie}</span>
      <h2>${escapeHtml(v.titel || "")}</h2>
      <div class="company">${escapeHtml(v.bedrijf || "")}</div>

      ${scoreRows}

      <div class="field-grid">
        <div class="k">Locatie</div><div class="v">${escapeHtml(v.locatie || "—")}</div>
        <div class="k">Salaris</div><div class="v">${escapeHtml(v.salaris_indicatie || "—")}</div>
        <div class="k">Deadline</div><div class="v">${deadlineCell(v.deadline)}</div>
        <div class="k">Type</div><div class="v">${escapeHtml(v.type_organisatie || "—")}</div>
        <div class="k">Bron</div><div class="v">${escapeHtml(v.bron || "—")}</div>
        ${v.b_corp_gecertificeerd != null ? `<div class="k">B-Corp</div><div class="v">${v.b_corp_gecertificeerd ? "Ja" + (v.b_corp_score ? " ("+v.b_corp_score+")" : "") : "Nee"}</div>` : ""}
      </div>

      ${v.waarom_match || v.impact_toelichting ? `
        <div class="section-h">Waarom deze match</div>
        <p>${escapeHtml(v.waarom_match || v.impact_toelichting)}</p>` : ""}

      ${v.aandachtspunten ? `
        <div class="section-h">Aandachtspunten / gaps</div>
        <p>${escapeHtml(v.aandachtspunten)}</p>` : ""}

      ${v.kernverantwoordelijkheden?.length ? `
        <div class="section-h">Kernverantwoordelijkheden</div>
        <ul>${v.kernverantwoordelijkheden.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}

      ${v.gevraagde_ervaring?.length ? `
        <div class="section-h">Gevraagde ervaring</div>
        <ul>${v.gevraagde_ervaring.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : ""}
    `;
    renderTable();
  }

  function closeDetail() {
    state.selectedId = null;
    els.layout.classList.remove("detail-open");
    els.detail.setAttribute("aria-hidden", "true");
    renderTable();
  }

  // ---------- Events ----------
  els.navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      els.navItems.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.category = btn.dataset.category;
      els.title.textContent = labels[state.category];
      renderTable();
    });
  });

  els.scoreSlider.addEventListener("input", e => {
    state.minScore = Number(e.target.value);
    els.scoreVal.textContent = state.minScore;
    renderTable();
  });

  els.sortSelect.addEventListener("change", e => {
    state.sort = e.target.value;
    renderTable();
  });

  els.search.addEventListener("input", e => {
    state.search = e.target.value.trim();
    renderTable();
  });

  els.detailClose.addEventListener("click", closeDetail);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDetail(); });

  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  // ---------- Init ----------
  updateCounts();
  renderTable();
})();
