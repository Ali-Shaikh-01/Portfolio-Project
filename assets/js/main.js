// typing animation words in the hero
const typedWords = [
  "Backend Developer",
  "Real-Time Systems",
  "Full Stack Learner"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const current = typedWords[wordIndex];
  isDeleting ? charIndex-- : charIndex++;
  el.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typedWords.length;
    delay = 350;
  }

  setTimeout(typeText, delay);
}

// scroll reveal using IntersectionObserver
function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// stagger delay on grid children so they cascade in
function staggerReveal() {
  const parents = [".skills-grid", ".projects-row", ".contact-links"];
  parents.forEach((sel) => {
    const parent = document.querySelector(sel);
    if (!parent) return;
    parent.querySelectorAll(".reveal").forEach((child, i) => {
      child.style.transitionDelay = `${i * 75}ms`;
    });
  });
}

// navbar gets a background after scrolling past 50px
function setupNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });
}

// hamburger for mobile
function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// highlight active nav link as user scrolls
function setupActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    links.forEach((link) => {
      const matches = link.getAttribute("href") === `#${current}`;
      link.style.color = matches ? "var(--text)" : "";
    });
  }, { passive: true });
}

// very subtle tilt on the featured project card
function setupCardTilt() {
  const cards = document.querySelectorAll(".project-featured");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
        perspective(1200px)
        rotateX(${-y * 1.5}deg)
        rotateY(${x * 1.5}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeText();
  setupReveal();
  staggerReveal();
  setupNavbar();
  setupMobileMenu();
  setupActiveNav();
  setupCardTilt();

  // hero fades in first without waiting for scroll
  const heroReveal = document.querySelector(".hero .reveal");
  if (heroReveal) setTimeout(() => heroReveal.classList.add("visible"), 80);
});