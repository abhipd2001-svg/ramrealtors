(() => {
  "use strict";

  const business = window.BUSINESS || {};
  const nav = document.querySelector(".primary-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const year = document.getElementById("current-year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.alt = image.alt ? `${image.alt} (image unavailable)` : "";
      image.removeAttribute("src");
    }, { once: true });
  });

  const digits = (value) => String(value || "").replace(/\D/g, "");
  const phone = digits(business.phone);
  const whatsapp = digits(business.whatsapp);
  const phoneTargets = document.querySelectorAll("[data-contact='phone']");
  phoneTargets.forEach((target) => {
    if (phone) {
      const link = document.createElement("a");
      link.href = `tel:+${phone}`;
      link.textContent = business.phone;
      target.replaceWith(link);
      const container = link.closest(".configured-phone");
      if (container) container.hidden = false;
    } else {
      const container = target.closest(".configured-phone");
      if (container) container.hidden = true;
    }
  });

  document.querySelectorAll("[data-contact='email']").forEach((target) => {
    if (business.email) {
      const link = document.createElement("a");
      link.href = `mailto:${business.email}`;
      link.textContent = business.email;
      target.replaceWith(link);
      const container = link.closest(".configured-email");
      if (container) container.hidden = false;
    } else {
      const container = target.closest(".configured-email");
      if (container) container.hidden = true;
    }
  });

  const whatsappUrl = (message) => whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    : "";
  document.querySelectorAll(".js-header-call, .js-contact-call, .js-floating-call").forEach((link) => {
    if (phone) {
      link.href = `tel:+${phone}`;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });
  document.querySelectorAll(".js-header-whatsapp, .js-footer-whatsapp, .js-contact-whatsapp, .js-floating-whatsapp").forEach((link) => {
    if (whatsapp) {
      link.href = whatsappUrl("Hello Ram Realtors, I would like to discuss a property requirement in South Delhi.");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  document.querySelectorAll(".js-whatsapp-form").forEach((button) => {
    if (!whatsapp) {
      button.hidden = true;
      return;
    }
    button.addEventListener("click", () => {
      const form = button.closest("form");
      if (!form || !form.reportValidity()) return;
      const title = button.dataset.form === "property-owner" ? "Property owner inquiry" : "Property search inquiry";
      const fields = new FormData(form);
      const lines = [...fields.entries()]
        .filter(([key, value]) => key !== "form-name" && key !== "bot-field" && String(value).trim())
        .map(([key, value]) => `${key.replaceAll("-", " ")}: ${String(value).trim()}`);
      const url = whatsappUrl(`Hello Ram Realtors, I have a ${title.toLowerCase()}.\n\n${lines.join("\n")}`);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelectorAll("form[data-netlify='true']").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const status = form.querySelector(".form-status");
      const submitButton = form.querySelector("button[type='submit']");
      if (!status || !submitButton) return;

      status.hidden = true;
      status.classList.remove("is-success", "is-error");
      submitButton.disabled = true;
      const submitLabel = submitButton.textContent;
      submitButton.textContent = "Sending...";

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (!response.ok) throw new Error(`Form submission failed (${response.status}).`);

        form.reset();
        status.textContent = "Thank you! Your inquiry was successfully submitted. We’ll contact you using the details you provided.";
        status.classList.add("is-success");
      } catch (error) {
        console.error("Unable to submit inquiry form.", error);
        status.textContent = "We couldn’t submit your inquiry. Please try again, or contact us directly by phone, WhatsApp or email.";
        status.classList.add("is-error");
      } finally {
        status.hidden = false;
        status.focus();
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
      }
    });
  });
})();
