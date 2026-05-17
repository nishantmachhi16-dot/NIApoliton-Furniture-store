/* =====================================================
   WOODWELL Interior – Home Page Logic (home.js)
   ===================================================== */

(function () {
  "use strict";

   
  /* ── 0. PRELOADER ───────────────────────────────── */
  // Prevent scrolling while loading
  document.body.style.overflow = "hidden";

  window.addEventListener("load", function () {
    const preloader = document.getElementById("ww-preloader");
    if (preloader) {
      // Smooth fade out
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";

      // Remove from DOM and restore scrolling after transition
      setTimeout(() => {
        preloader.remove();
        document.body.style.overflow = "";
      }, 1000);
    } else {
      document.body.style.overflow = "";
    }
  });
   
  /* ── 1. DARK-MODE PERSISTENCE ───────────────────── */
  const html = document.documentElement;

  function applyTheme() {
    const saved = localStorage.getItem("ww_theme");
    if (saved === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }

  function toggleTheme() {
    html.classList.toggle("dark");
    localStorage.setItem("ww_theme", html.classList.contains("dark") ? "dark" : "light");
  }

  applyTheme();

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  /* ── 2. CART BADGE (shared via localStorage) ─────── */
  function getCartCount() {
    return parseInt(localStorage.getItem("ww_cart_count") || "0", 10);
  }

  function setCartCount(n) {
    localStorage.setItem("ww_cart_count", n);
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
    });
  }

  // Initialise badge on load
  setCartCount(getCartCount());

  // "Add to Cart" buttons on featured product cards
  document.querySelectorAll(".btn-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const count = getCartCount() + 1;
      setCartCount(count);
      showToast("Item added to cart 🛒");
    });
  });

  /* ── 3. TOAST NOTIFICATION ───────────────────────── */
  function showToast(msg, type = "success") {
    let toast = document.getElementById("ww-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ww-toast";
      toast.style.cssText = `
        position:fixed;bottom:96px;right:32px;z-index:9999;
        background:#D4AF37;color:#000;font-weight:700;
        padding:12px 20px;border-radius:8px;font-size:13px;
        box-shadow:0 8px 32px rgba(0,0,0,.3);
        transform:translateY(20px);opacity:0;
        transition:all .3s ease;pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.transform = "translateY(20px)";
      toast.style.opacity = "0";
    }, 2800);
  }

  /* ── 4. LIVE SEARCH (header input) ──────────────── */
  const searchInput = document.getElementById("home-search");
  const productCards = document.querySelectorAll(".product-card");

  if (searchInput && productCards.length) {
    searchInput.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      productCards.forEach((card) => {
        const name = (card.dataset.name || card.querySelector("h3")?.textContent || "").toLowerCase();
        card.closest(".product-card-wrapper")
          ? (card.closest(".product-card-wrapper").style.display = name.includes(q) || !q ? "" : "none")
          : (card.style.display = name.includes(q) || !q ? "" : "none");
      });
    });
  }

  /* ── 5. NEW-ARRIVALS CAROUSEL ────────────────────── */
  const carouselTrack = document.getElementById("arrivals-track");
  const prevBtn = document.getElementById("arrivals-prev");
  const nextBtn = document.getElementById("arrivals-next");

  if (carouselTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const items = carouselTrack.querySelectorAll(".product-card");
    const visibleCount = () => (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1);

    function updateCarousel() {
      const maxIndex = Math.max(0, items.length - visibleCount());
      currentIndex = Math.min(currentIndex, maxIndex);
      const cardWidth = items[0]?.offsetWidth + 32 || 0; // 32 = gap
      carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
      prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
      nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
    }

    prevBtn.addEventListener("click", () => { currentIndex = Math.max(0, currentIndex - 1); updateCarousel(); });
    nextBtn.addEventListener("click", () => { currentIndex++; updateCarousel(); });
    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  /* ── 6. CATEGORY NAVIGATION ──────────────────────── */
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", function () {
      const cat = this.dataset.category || "";
      window.location.href = `a2_Product_List.html`;
    });
    item.style.cursor = "pointer";
  });

  /* ── 7. NEWSLETTER VALIDATION ────────────────────── */
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailEl = newsletterForm.querySelector('input[type="email"]');
      const val = emailEl?.value?.trim();
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      showToast("You're subscribed! Welcome to LUXE. 🎉");
      if (emailEl) emailEl.value = "";
    });
  }

  // Standalone newsletter send button (not inside a <form>)
  const newsletterBtn = document.getElementById("newsletter-send-btn");
  const newsletterInput = document.getElementById("newsletter-input");
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener("click", function () {
      const val = newsletterInput.value.trim();
      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      showToast("You're subscribed! Welcome to LUXE. 🎉");
      newsletterInput.value = "";
    });
  }

  /* ── 8. SCROLL-REVEAL (IntersectionObserver) ─────── */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  /* ── 9. "BOOK CONSULTATION" BANNER BUTTON ─────────── */
  const consultBtn = document.getElementById("book-consult-btn");
  if (consultBtn) {
    consultBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "a5_consuktancy_page.html";
    });
  }

  /* ── 10. EXPLORE COLLECTION hero CTA ──────────────── */
  const exploreBtn = document.getElementById("explore-collection-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "a2_Product_List.html";
    });
  }

})();
