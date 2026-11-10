const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

/* ---------- Selector dropdowns (theme & language) ---------- */

const dropdowns = document.querySelectorAll(".selector-dropdown");

function closeDropdown(dropdown) {
  const menu = dropdown.querySelector(".selector-menu");
  const btn = dropdown.querySelector(".selector-btn");
  if (menu) menu.hidden = true;
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function closeAllDropdowns() {
  dropdowns.forEach(closeDropdown);
}

dropdowns.forEach((dropdown) => {
  const btn = dropdown.querySelector(".selector-btn");
  const menu = dropdown.querySelector(".selector-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const willOpen = menu.hidden;
    closeAllDropdowns();
    if (willOpen) {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest(".selector-option")) {
      closeDropdown(dropdown);
    }
  });

  menu.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const options = [...menu.querySelectorAll(".selector-option")];
    const current = options.indexOf(document.activeElement);
    const next =
      e.key === "ArrowDown"
        ? (current + 1) % options.length
        : (current - 1 + options.length) % options.length;
    options[next].focus();
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".selector-dropdown")) {
    closeAllDropdowns();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const open = document.querySelector(".selector-dropdown .selector-menu:not([hidden])");
    if (open) {
      closeAllDropdowns();
      open.closest(".selector-dropdown").querySelector(".selector-btn").focus();
    }
  }
});

/* ---------- Theme ---------- */

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_LABEL_KEYS = { light: "themeLight", dark: "themeDark", auto: "themeAuto" };
const themeSelector = document.getElementById("theme-selector");
const themeIcon = document.getElementById("theme-icon");
const themeName = document.getElementById("theme-name");
const themeOptions = themeSelector
  ? themeSelector.querySelectorAll(".selector-option[data-theme-value]")
  : [];

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) return stored;
  return "auto";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  themeOptions.forEach((btn) => {
    const active = btn.dataset.themeValue === theme;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  const activeOption = themeSelector.querySelector(
    `.selector-option[data-theme-value="${theme}"]`
  );
  const iconSource = activeOption && activeOption.querySelector(".option-icon");
  if (themeIcon && iconSource) {
    themeIcon.innerHTML = iconSource.innerHTML;
  }

  if (themeName) {
    const label = window.portfolioI18n?.t?.(THEME_LABEL_KEYS[theme]);
    if (label) themeName.textContent = label;
  }
}

function initTheme() {
  setTheme(getPreferredTheme());
}

themeOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTheme(btn.dataset.themeValue);
  });
});

initTheme();

/* ---------- Mobile menu ---------- */

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

function toggleMobileMenu() {
  const isOpen = mobileNav.classList.toggle("open");
  mobileMenuBtn.setAttribute("aria-expanded", isOpen);
}

function closeMobileMenu() {
  mobileNav.classList.remove("open");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
}

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

/* ---------- Scroll animations ---------- */

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
