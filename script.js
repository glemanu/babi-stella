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

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});
