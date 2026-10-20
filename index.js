document.getElementById("year").textContent = new Date()
  .getFullYear()
  .toString();

const THEME_STORAGE_KEY = "portfolio-theme";
const themeButtons = document.querySelectorAll(".theme-toggle-btn");

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) return stored;
  return "auto";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  themeButtons.forEach((btn) => {
    if (btn.dataset.themeValue === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function initTheme() {
  const theme = getPreferredTheme();
  setTheme(theme);
}

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.themeValue;
    setTheme(theme);
  });
});

initTheme();

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = mobileNav.querySelectorAll("a");

function toggleMobileMenu() {
  const isOpen = mobileNav.classList.toggle("open");
  mobileMenuBtn.setAttribute("aria-expanded", isOpen);
}

function closeMobileMenu() {
  mobileNav.classList.remove("open");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (e) => {
  if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    closeMobileMenu();
  }
});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 50);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
