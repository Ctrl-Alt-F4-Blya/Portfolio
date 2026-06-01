const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const projectsGrid = document.querySelector("#projectsGrid");
const year = document.querySelector("#year");
const profilePhoto = document.querySelector(".profile-photo");
const profileImg = document.querySelector(".profile-photo img");
const logoMark = document.querySelector(".logo-mark");

year.textContent = new Date().getFullYear();

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

function createProjectCard(project) {
  const fallback = ` 
    </div>
  `;

  const imageBlock = project.image
    ? `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML=\`${fallback.replaceAll("`", "\\`")}\`">`
    : fallback;

  const tags = (project.tags || [])
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  const linkHref = project.github || project.link || "#";
  const link = `
    <div class="project-actions">
      <a class="github-button" href="${linkHref}" target="_blank" rel="noopener">
        Перейти на GitHub
      </a>
    </div>
  `;

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

projectsGrid.innerHTML = (window.PORTFOLIO_PROJECTS || [])
  .map(createProjectCard)
  .join("");

if (!projectsGrid.innerHTML.trim()) {
  projectsGrid.innerHTML = `<p class="section-subtitle">Добавь проекты в файл data/projects.js.</p>`;
}

let hoverCount = 0;

if (profilePhoto) {
  profilePhoto.addEventListener("mouseenter", () => {
    hoverCount += 1;

    if (hoverCount < 3) {
      profilePhoto.classList.remove("is-jumping");
      void profilePhoto.offsetWidth;
      profilePhoto.classList.add("is-jumping");
    } else {
      profilePhoto.classList.add("is-star");
    }
  });

  profilePhoto.addEventListener("animationend", () => {
    profilePhoto.classList.remove("is-jumping");
  });
}

const floatingPhoto = document.createElement("div");
floatingPhoto.className = "floating-profile-photo";
floatingPhoto.innerHTML = `<img src="assets/photos/my-photo.png" alt="Моё фото">`;
document.body.appendChild(floatingPhoto);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function updateFloatingPhoto() {
  if (!profilePhoto || !logoMark) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const startScroll = 40;
  const endScroll = 560;
  const progress = clamp((scrollY - startScroll) / (endScroll - startScroll), 0, 1);

  if (progress <= 0) {
    floatingPhoto.classList.remove("active");
    profilePhoto.classList.remove("is-scroll-hidden");
    return;
  }

  const originalRect = profilePhoto.getBoundingClientRect();
  const logoRect = logoMark.getBoundingClientRect();

  const startSize = Math.min(profilePhoto.offsetWidth, 360);
  const endSize = Math.max(logoRect.width, 42);

  const startLeft = originalRect.left;
  const startTop = originalRect.top;
  const endLeft = logoRect.left + (logoRect.width - endSize) / 2;
  const endTop = logoRect.top + (logoRect.height - endSize) / 2;

  const currentSize = lerp(startSize, endSize, progress);
  const currentLeft = lerp(startLeft, endLeft, progress);
  const currentTop = lerp(startTop, endTop, progress);

  floatingPhoto.classList.add("active");
  profilePhoto.classList.add("is-scroll-hidden");

  floatingPhoto.style.width = `${currentSize}px`;
  floatingPhoto.style.height = `${currentSize}px`;
  floatingPhoto.style.left = `${currentLeft}px`;
  floatingPhoto.style.top = `${currentTop}px`;

  if (profilePhoto.classList.contains("is-star")) {
    floatingPhoto.style.borderRadius = progress > 0.65 ? "0" : "50%";
    floatingPhoto.style.clipPath = progress > 0.65
      ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
      : "circle(50% at 50% 50%)";
  } else {
    floatingPhoto.style.borderRadius = "50%";
    floatingPhoto.style.clipPath = "circle(50% at 50% 50%)";
  }
}

window.addEventListener("scroll", updateFloatingPhoto, { passive: true });
window.addEventListener("resize", updateFloatingPhoto);
updateFloatingPhoto();
