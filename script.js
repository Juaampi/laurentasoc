const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    if (navLinks.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Ajusta el aspecto del header al hacer scroll.
const handleHeaderState = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 18);
};

handleHeaderState();
window.addEventListener("scroll", handleHeaderState, { passive: true });

// Revela elementos suavemente cuando entran en pantalla.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18
});

revealItems.forEach((item) => observer.observe(item));
