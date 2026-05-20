const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionVideo = document.querySelector("[data-motion-video]");
const navToggles = document.querySelectorAll("[data-nav-toggle]");

function syncMotionPreference(event) {
  if (!motionVideo) return;

  if (event.matches) {
    motionVideo.pause();
    motionVideo.removeAttribute("autoplay");
  } else {
    motionVideo.setAttribute("autoplay", "");
    motionVideo.play().catch(() => {});
  }
}

syncMotionPreference(reduceMotion);
reduceMotion.addEventListener("change", syncMotionPreference);

navToggles.forEach((toggle) => {
  const header = toggle.closest(".topbar, .contact-header");
  const links = header.querySelectorAll(".nav-pill a");

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Άνοιγμα μενού");
    });
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  navToggles.forEach((toggle) => {
    const header = toggle.closest(".topbar, .contact-header");
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Άνοιγμα μενού");
  });
});
