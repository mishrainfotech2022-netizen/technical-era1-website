const grid = document.getElementById("project-grid");
const searchInput = document.getElementById("search");
const filtersEl = document.getElementById("filters");
const countEl = document.getElementById("project-count");
const emptyEl = document.getElementById("empty-state");
document.getElementById("year").textContent = new Date().getFullYear();

let activeCategory = "All";
const categories = ["All", ...new Set((PROJECTS || []).map(p => p.category).filter(Boolean))];

function safeUrl(url) {
  if (!url) return "";
  return /^(https?:\/\/|projects\/)/i.test(url) ? url : "";
}
function makeAction(label, url, secondary = false) {
  const clean = safeUrl(url);
  if (!clean) return "";
  return `<a class="action ${secondary ? "secondary" : ""}" href="${clean}" ${clean.startsWith("http") ? 'target="_blank" rel="noopener"' : "download"}>${label}</a>`;
}
function renderFilters() {
  filtersEl.innerHTML = categories.map(category =>
    `<button class="filter ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">${category}</button>`
  ).join("");
  filtersEl.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    renderFilters();
    renderProjects();
  }));
}
function renderProjects() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = (PROJECTS || []).filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const text = [project.title, project.description, project.category, project.components].join(" ").toLowerCase();
    return matchesCategory && text.includes(term);
  });
  countEl.textContent = `${visible.length} project${visible.length === 1 ? "" : "s"}`;
  emptyEl.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(project => `
    <article class="project-card">
      <div class="card-top"><span class="project-icon">${project.icon || "⚙️"}</span><span class="category">${project.category || "Project"}</span></div>
      <h3>${project.title || "Untitled project"}</h3>
      <p>${project.description || ""}</p>
      <div class="components">${project.components || ""}</div>
      <div class="card-actions">
        ${makeAction("↓ Source Code", project.code)}
        ${makeAction("⌁ Circuit", project.circuit, true)}
        ${makeAction("▶ Tutorial", project.tutorial, true)}
      </div>
    </article>`).join("");
}
searchInput.addEventListener("input", renderProjects);
renderFilters();
renderProjects();
