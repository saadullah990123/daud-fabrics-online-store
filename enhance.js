/* =====================================================================
   ENHANCEMENTS.JS
   Additive script — load this AFTER navbar.js / script.js on each page.
   Adds: WhatsApp floating button, scroll-in animations, "added to cart"
   pulse feedback, and the order-tracking demo logic.
   Does not touch or override any of your existing scripts.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------------- 1. WhatsApp floating button ---------------- */
  var WHATSAPP_NUMBER = "923275363509";
  var WHATSAPP_MESSAGE = "Hi! I have a question about a product on Daud Fabrics.";

  function injectWhatsAppButton() {
    if (document.querySelector(".whatsapp-float")) return; // avoid duplicates

    var link = document.createElement("a");
    link.className = "whatsapp-float";
    link.href =
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Chat with us on WhatsApp");
    link.innerHTML =
      '<svg viewBox="0 0 32 32" fill="#fff" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.293.62 4.44 1.7 6.29L3 29l7.4-2.15a12.42 12.42 0 0 0 5.6 1.35h.001c6.894 0 12.499-5.607 12.499-12.5C28.5 8.607 22.895 3 16.001 3zm0 22.7h-.001a10.16 10.16 0 0 1-5.176-1.42l-.371-.22-4.39 1.276 1.293-4.28-.242-.39A10.14 10.14 0 0 1 5.7 15.5c0-5.688 4.62-10.3 10.302-10.3 2.75 0 5.336 1.073 7.283 3.02a10.23 10.23 0 0 1 3.015 7.28c0 5.687-4.62 10.2-10.299 10.2zm5.652-7.646c-.31-.155-1.833-.905-2.117-1.008-.284-.104-.49-.155-.697.155-.207.31-.8 1.008-.982 1.216-.181.207-.362.233-.672.078-.31-.155-1.309-.483-2.494-1.54-.922-.822-1.545-1.837-1.727-2.147-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.181.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.697-1.68-.955-2.3-.252-.605-.508-.523-.697-.533l-.594-.01c-.207 0-.543.078-.827.388-.284.31-1.086 1.06-1.086 2.586s1.112 3 1.267 3.207c.155.207 2.19 3.345 5.307 4.69.741.32 1.32.512 1.771.655.744.237 1.42.204 1.955.124.596-.089 1.833-.75 2.092-1.474.258-.724.258-1.345.181-1.474-.078-.13-.284-.207-.594-.362z"/>' +
      "</svg>";

    var tooltip = document.createElement("span");
    tooltip.className = "whatsapp-tooltip";
    tooltip.textContent = "Chat with us!";

    document.body.appendChild(link);
    document.body.appendChild(tooltip);
  }

  /* ---------------- 2. Scroll-in animation ---------------- */
  function initScrollAnimations() {
    var targets = document.querySelectorAll("[data-animate]");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Auto-tag common repeating blocks so you don't have to hand-edit every page.
  // Safe no-ops if these selectors don't exist on a given page.
  function autoTagAnimatable() {
    var autoSelectors = [
      ".product-card",
      ".gallery-item",
      ".review-card",
      ".product-section h2",
      ".section-title",
    ];
    autoSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        if (!el.hasAttribute("data-animate")) {
          el.setAttribute("data-animate", "up");
          el.style.transitionDelay = Math.min(i * 60, 400) + "ms";
        }
      });
    });
  }

  /* ---------------- 3. "Added to cart" pulse feedback ---------------- */
  function initAddToCartFeedback() {
    document.querySelectorAll(".add-to-cart-btn, .add-cart-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.remove("enh-pulse");
        // reflow to restart animation if clicked repeatedly
        void btn.offsetWidth;
        btn.classList.add("enh-pulse");

        var original = btn.textContent;
        btn.dataset.original = btn.dataset.original || original;
        btn.textContent = "ADDED ✓";
        setTimeout(function () {
          btn.textContent = btn.dataset.original;
        }, 1200);
      });
    });
  }

  /* ---------------- 4. Track Order demo logic ---------------- */
  // Demo-only: reads orders saved to localStorage under "df_orders".
  // Wire this up to your real backend's GET /api/orders/:orderNumber
  // once the Next.js API is live — replace the localStorage lookup below
  // with a fetch() call.
  function initTrackOrderForm() {
    var form = document.getElementById("track-order-form");
    if (!form) return;

    var resultBox = document.getElementById("track-order-result");
    var emptyBox = document.getElementById("track-order-empty");
    var steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var orderNumber = document.getElementById("track-order-number").value.trim();
      if (!orderNumber) return;

      var stored = {};
      try {
        stored = JSON.parse(localStorage.getItem("df_orders") || "{}");
      } catch (err) {
        stored = {};
      }

      var order = stored[orderNumber];
      resultBox.classList.remove("show");
      emptyBox.classList.remove("show");

      if (!order) {
        emptyBox.classList.add("show");
        emptyBox.textContent =
          "We couldn't find order " + orderNumber + ". Please check the number and try again.";
        return;
      }

      var currentIndex = steps.indexOf(order.status || "Pending");
      var stepsHtml = steps
        .map(function (s, i) {
          return (
            '<li class="' + (i <= currentIndex ? "done" : "") + '">' + s + "</li>"
          );
        })
        .join("");

      resultBox.innerHTML =
        '<div class="track-order-result-header">' +
        "<span>Order " + orderNumber + "</span>" +
        "<span>" + (order.status || "Pending") + "</span>" +
        "</div>" +
        '<ul class="track-order-steps">' + stepsHtml + "</ul>";
      resultBox.classList.add("show");
    });
  }

  /* ---------------- Init on DOM ready ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    injectWhatsAppButton();
    autoTagAnimatable();
    initScrollAnimations();
    initAddToCartFeedback();
    initTrackOrderForm();
  });
})();
