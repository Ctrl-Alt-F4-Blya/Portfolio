const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const projectsGrid = document.querySelector("#projectsGrid");
const photosGrid = document.querySelector("#photosGrid");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

function createProjectCard(project) {
  const imageBlock = project.image
    ? `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;project-placeholder&quot;>${project.title}</div>'">`
    : `<div class="project-placeholder">${project.title}</div>`;

  const tags = (project.tags || [])
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  const link = project.link && project.link !== "#"
    ? `<a class="project-link" href="${project.link}" target="_blank" rel="noopener">Открыть проект →</a>`
    : `<span class="project-link">Ссылка будет добавлена позже</span>`;

  return `
    <article class="project-card">
      <div class="project-image">${imageBlock}</div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${tags}</div>
        ${link}
      </div>
    </article>
  `;
}

function createPhotoCard(photo) {
  if (!photo.src) {
    return `
      <article class="photo-card">
        <div class="photo-empty">Добавь фото в assets/photos и пропиши путь в data/photos.js</div>
      </article>
    `;
  }

  return `
    <article class="photo-card">
      <img src="${photo.src}" alt="${photo.alt || "Фото проекта"}" loading="lazy">
    </article>
  `;
}

projectsGrid.innerHTML = (window.PORTFOLIO_PROJECTS || [])
  .map(createProjectCard)
  .join("");

photosGrid.innerHTML = (window.PORTFOLIO_PHOTOS || [])
  .map(createPhotoCard)
  .join("");

if (!projectsGrid.innerHTML.trim()) {
  projectsGrid.innerHTML = `<p class="section-subtitle">Добавь проекты в файл data/projects.js.</p>`;
}

if (!photosGrid.innerHTML.trim()) {
  photosGrid.innerHTML = `
    <article class="photo-card">
      <div class="photo-empty">Пока фото не добавлены. Загрузи изображения в assets/photos и укажи их в data/photos.js.</div>
    </article>
  `;
}
