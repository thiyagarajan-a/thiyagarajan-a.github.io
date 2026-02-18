(function () {
  const body = document.body;
  const page = body.getAttribute("data-page");

  const navLinks = document.querySelectorAll(".nav-link[data-page]");
  navLinks.forEach((link) => {
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const header = document.querySelector(".site-header");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 28) {
        header.classList.add("compact");
      } else {
        header.classList.remove("compact");
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const counters = document.querySelectorAll("[data-count]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (counters.length > 0) {
    const runCounter = (el) => {
      const target = Number(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      if (!Number.isFinite(target)) return;
      if (prefersReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = 900;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const value = Math.floor(target * p);
        el.textContent = `${value}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.45 }
      );
      counters.forEach((c) => counterObserver.observe(c));
    } else {
      counters.forEach((c) => runCounter(c));
    }
  }

  const yearNode = document.querySelector("[data-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const website = String(data.get("website") || "").trim();

      status.className = "status";

      if (website) {
        status.textContent = "Thanks. Your message was received.";
        status.classList.add("success");
        form.reset();
        return;
      }

      if (!name || !email || !message) {
        status.textContent = "Please fill in all required fields.";
        status.classList.add("error");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.classList.add("error");
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const bodyText = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n");
      const body = encodeURIComponent(bodyText);

      status.textContent = "Opening your email client...";
      status.classList.add("success");

      window.location.href = `mailto:thiyagamcitp@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }
})();
