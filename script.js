// Shared interactions for the Prism & Motion website
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      });
    });
  }

  document.querySelectorAll(".current-year, #year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Portfolio lightbox (Home page only)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightbox = document.getElementById("closeLightbox");

  function closeImage() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".portfolio-tile").forEach(tile => {
      const openImage = () => {
        if (!tile.dataset.image) return;
        lightboxImg.src = tile.dataset.image;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
        if (closeLightbox) closeLightbox.focus();
      };
      tile.addEventListener("click", openImage);
      tile.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage();
        }
      });
    });

    if (closeLightbox) closeLightbox.addEventListener("click", closeImage);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeImage();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeImage();
    });
  }

  // Contact form opens the visitor's email application.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const interest = form.elements.interest.value.trim();
      const message = form.elements.message.value.trim();

      const subject = encodeURIComponent("Enquiry from " + name + " — Prism & Motion");
      const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nInterested in: " + interest +
        "\n\nProject details:\n" + message
      );

      const note = document.getElementById("formNote");
      if (note) note.textContent = "Opening Gmail with your enquiry ready. Review it, then press Send in Gmail.";

      // Open Gmail's compose window with the enquiry details pre-filled.
      const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent("prismandmotion@gmail.com") +
        "&su=" + subject +
        "&body=" + body;
      window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Demo product cart for the Services page.
  let cart = [];
  const cartCount = document.getElementById("cartCount");
  const toast = document.getElementById("toast");

  function updateCart() {
    if (cartCount) {
      cartCount.textContent = cart.length + (cart.length === 1 ? " item added" : " items added");
    }
  }

  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2300);
  }

  document.querySelectorAll("[data-add-product]").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-add-product");
      if (!name) return;
      cart.push(name);
      updateCart();
      showToast(name + " added to your selection.");
    });
  });

  const clearCart = document.getElementById("clearCart");
  if (clearCart) {
    clearCart.addEventListener("click", () => {
      if (!cart.length) {
        showToast("Your selection is already empty.");
        return;
      }
      cart = [];
      updateCart();
      showToast("Your selection has been cleared.");
    });
  }
});
