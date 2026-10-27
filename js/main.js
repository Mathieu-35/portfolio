/* Interactions de la page : menu, thème, progression, lien actif, apparition au scroll. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const root = document.documentElement;

  /* ---------- Menu mobile ---------- */
  const nav = $("#menu");
  const burger = $("#burger");

  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };

  burger.addEventListener("click", () =>
    setMenu(!nav.classList.contains("open")),
  );
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#menu, #burger")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      burger.focus();
    }
  });

  /* ---------- Thème (le thème initial est posé dans le <head>) ---------- */
  const themeButton = $("#theme");

  const renderTheme = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    themeButton.setAttribute("aria-pressed", dark);
    themeButton.setAttribute(
      "aria-label",
      dark ? "Activer le mode clair" : "Activer le mode sombre",
    );
    themeButton.querySelector(".theme-label").textContent = dark
      ? "Mode clair"
      : "Mode sombre";
  };

  themeButton.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      /* stockage indisponible : le choix n'est pas mémorisé */
    }
    renderTheme();
  });
  renderTheme();

  /* ---------- Défilement fluide vers les sections (accélération puis décélération) ---------- */
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let scrollFrame = 0;

  const scrollToY = (target) => {
    cancelAnimationFrame(scrollFrame);
    const start = scrollY;
    const distance = target - start;
    if (!distance) return;
    const duration = Math.min(1400, Math.max(700, Math.abs(distance) * 0.5));
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) scrollFrame = requestAnimationFrame(step);
    };
    scrollFrame = requestAnimationFrame(step);
  };

  // Si le visiteur reprend la main (molette, doigt, clavier), on arrête l'animation.
  ["wheel", "touchstart", "keydown"].forEach((type) =>
    addEventListener(type, () => cancelAnimationFrame(scrollFrame), {
      passive: true,
    }),
  );

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    const section = link && document.getElementById(link.hash.slice(1));
    if (!section) return;
    event.preventDefault();

    const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const top =
      section.id === "accueil"
        ? 0
        : section.getBoundingClientRect().top + scrollY - offset;
    scrollToY(Math.max(0, Math.min(top, root.scrollHeight - innerHeight)));

    history.pushState(null, "", link.hash);
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
  });

  /* ---------- Photo 3D : inclinaison selon la souris + reflet ---------- */
  const photo = $(".photo-3d");
  if (photo && matchMedia("(hover: hover)").matches) {
    const tilt = photo.querySelector(".photo-tilt");
    const hero = $("#accueil");
    const clamp = (value) => Math.max(-1, Math.min(1, value));

    hero.addEventListener("pointermove", (event) => {
      const box = photo.getBoundingClientRect();
      const x = clamp((event.clientX - (box.left + box.width / 2)) / (innerWidth / 2));
      const y = clamp((event.clientY - (box.top + box.height / 2)) / (innerHeight / 2));
      tilt.style.setProperty("--ry", `${(x * 18).toFixed(1)}deg`);
      tilt.style.setProperty("--rx", `${(-y * 14).toFixed(1)}deg`);
      photo.style.setProperty("--gx", `${((event.clientX - box.left) / box.width) * 100}%`);
      photo.style.setProperty("--gy", `${((event.clientY - box.top) / box.height) * 100}%`);
      photo.classList.add("tilting");
    });

    hero.addEventListener("pointerleave", () => {
      tilt.style.removeProperty("--rx");
      tilt.style.removeProperty("--ry");
      photo.classList.remove("tilting");
    });
  }

  /* ---------- Barre de progression ---------- */
  const progress = $(".scroll-progress");
  let ticking = false;

  const updateProgress = () => {
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };

  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true },
  );
  updateProgress();

  /* ---------- Lien de navigation actif ---------- */
  const links = [...nav.querySelectorAll("a")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  links.forEach((link) => {
    const section = $(link.getAttribute("href"));
    if (section) sectionObserver.observe(section);
  });

  /* ---------- Cascade : rang de chaque élément dans sa grille (--i) et de chaque étiquette (--t) ---------- */
  document
    .querySelectorAll(".projects-grid, .skills-grid, .timeline")
    .forEach((group) =>
      [...group.children].forEach((child, index) =>
        child.style.setProperty("--i", index),
      ),
    );
  document.querySelectorAll(".tags").forEach((list) =>
    [...list.children].forEach((tag, index) =>
      tag.style.setProperty("--t", index),
    ),
  );

  /* ---------- Halo qui suit la souris sur les cartes (écrans avec souris uniquement) ---------- */
  if (matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card, .skill").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const box = element.getBoundingClientRect();
        element.style.setProperty("--mx", `${event.clientX - box.left}px`);
        element.style.setProperty("--my", `${event.clientY - box.top}px`);
      });
    });
  }

  /* ---------- Apparition au scroll ---------- */
  const revealed = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealed.forEach((element) => element.classList.add("in"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    revealed.forEach((element) => revealObserver.observe(element));
  }

  /* ---------- Année du footer ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
