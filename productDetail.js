/* =====================================================
   WOODWELL Interior – Product Detail Logic (productDetail.js)
   ===================================================== */

   
(function () {
  "use strict";

  /* ── DARK MODE ─────────────────────────────────── */
  (function () {
    if (localStorage.getItem("ww_theme") === "dark")
      document.documentElement.classList.add("dark");
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) btn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("ww_theme",
        document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
  })();

  /* ── CART BADGE ─────────────────────────────────── */
  function getCartCount() { return parseInt(localStorage.getItem("ww_cart_count") || "0", 10); }
  function setCartCount(n) {
    localStorage.setItem("ww_cart_count", n);
    document.querySelectorAll(".cart-badge").forEach(el => { el.textContent = n; });
  }
  setCartCount(getCartCount());

  /* ── TOAST ──────────────────────────────────────── */
  function showToast(msg) {
    let t = document.getElementById("pd-toast");
    if (!t) {
      t = document.createElement("div"); t.id = "pd-toast";
      t.style.cssText = "position:fixed;bottom:96px;right:32px;z-index:9999;background:#D4AF37;color:#000;font-weight:700;padding:12px 22px;border-radius:8px;font-size:13px;box-shadow:0 8px 32px rgba(0,0,0,.3);transform:translateY(20px);opacity:0;transition:all .3s ease;pointer-events:none;";
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.transform = "translateY(0)"; t.style.opacity = "1";
    clearTimeout(t._t); t._t = setTimeout(() => { t.style.transform = "translateY(20px)"; t.style.opacity = "0"; }, 2800);
  }

  /* ── IMAGE GALLERY ──────────────────────────────── */
  const mainImg = document.getElementById("main-product-img");
  const thumbs = document.querySelectorAll(".thumb-img");
  const prevGal = document.getElementById("gallery-prev");
  const nextGal = document.getElementById("gallery-next");
  let galIndex = 0;
  const galSrcs = [...thumbs].map(t => t.src);

  function setGalImage(i) {
    galIndex = (i + galSrcs.length) % galSrcs.length;
    if (mainImg) mainImg.src = galSrcs[galIndex];
    thumbs.forEach((t, idx) => {
      t.style.borderColor = idx === galIndex ? "#D4AF37" : "transparent";
    });
  }

  thumbs.forEach((t, i) => t.addEventListener("click", () => setGalImage(i)));
  if (prevGal) prevGal.addEventListener("click", () => setGalImage(galIndex - 1));
  if (nextGal) nextGal.addEventListener("click", () => setGalImage(galIndex + 1));

  /* ── COLOR SELECTOR ─────────────────────────────── */
  const colorLabel = document.getElementById("selected-color-label");
  document.querySelectorAll(".color-swatch").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("ring-2", "ring-primary"));
      this.classList.add("ring-2", "ring-primary");
      if (colorLabel) colorLabel.textContent = this.dataset.colorName || "";
    });
  });

  /* ── TAB SWITCHER ───────────────────────────────── */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function activateTab(id) {
    tabBtns.forEach(b => {
      const active = b.dataset.tab === id;
      b.classList.toggle("border-primary", active);
      b.classList.toggle("border-transparent", !active);
      b.classList.toggle("text-slate-500", !active);
      b.style.fontWeight = active ? "700" : "500";
    });
    tabPanels.forEach(p => { p.style.display = p.dataset.panel === id ? "" : "none"; });
  }

  tabBtns.forEach(b => b.addEventListener("click", () => activateTab(b.dataset.tab)));
  if (tabBtns.length) activateTab(tabBtns[0].dataset.tab);

  /* ── ADD TO CART ────────────────────────────────── */
  const addCartBtn = document.getElementById("add-to-cart-btn");
  if (addCartBtn) {
    addCartBtn.addEventListener("click", function () {
      setCartCount(getCartCount() + 1);
      showToast("Added to cart 🛒");
      this.textContent = "✓ ADDED";
      this.style.background = "#16a34a"; this.style.color = "#fff";
      setTimeout(() => {
        this.innerHTML = `<span class="material-symbols-outlined">shopping_cart</span> ADD TO CART`;
        this.style.background = ""; this.style.color = "";
      }, 1800);
    });
  }

  /* ── ADD BUNDLE TO CART ─────────────────────────── */
  const bundleBtn = document.getElementById("add-bundle-btn");
  if (bundleBtn) {
    bundleBtn.addEventListener("click", () => {
      setCartCount(getCartCount() + 3);
      showToast("Bundle added to cart 🛒 (3 items)");
    });
  }

  /* ── BUY NOW ─────────────────────────────────────── */
  const buyNowBtn = document.getElementById("buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const productName = document.querySelector("h1")?.textContent?.trim() || "Sofa";
      buyNowBtn.textContent = "PROCESSING...";
      setTimeout(() => {
        window.location.href = `a5_consuktancy_page.html?interest=${encodeURIComponent(productName)}`;
      }, 1500);
    });
  }

  /* ── WRITE A REVIEW MODAL ───────────────────────── */
  const writeRevBtn = document.getElementById("write-review-btn");
  if (writeRevBtn) {
    writeRevBtn.addEventListener("click", () => {
      openReviewModal();
    });
  }

  function openReviewModal() {
    let overlay = document.getElementById("review-modal-overlay");
    if (overlay) { overlay.style.display = "flex"; return; }

    overlay = document.createElement("div");
    overlay.id = "review-modal-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px;";

    overlay.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:32px;max-width:480px;width:100%;position:relative;color:#0f172a;">
        <button id="close-review-modal" style="position:absolute;top:16px;right:16px;font-size:20px;background:none;border:none;cursor:pointer;">✕</button>
        <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;margin-bottom:6px;">Write a Review</h2>
        <p style="font-size:13px;color:#64748b;margin-bottom:20px;">Share your experience with this product.</p>
        <div style="margin-bottom:16px;">
          <label style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;">Your Rating</label>
          <div id="star-row" style="display:flex;gap:6px;margin-top:8px;font-size:28px;cursor:pointer;">
            ${[1, 2, 3, 4, 5].map(n => `<span class="rev-star" data-v="${n}" style="color:#d1d5db;">★</span>`).join("")}
          </div>
        </div>
        <div style="margin-bottom:16px;">
          <label style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;">Your Name</label>
          <input id="rev-name" type="text" placeholder="e.g. Priya Sharma" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;box-sizing:border-box;">
        </div>
        <div style="margin-bottom:20px;">
          <label style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;">Your Review</label>
          <textarea id="rev-text" rows="3" placeholder="What did you love about this product?" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;resize:none;box-sizing:border-box;"></textarea>
        </div>
        <button id="submit-review-btn" style="width:100%;background:#D4AF37;color:#000;font-weight:700;padding:14px;border:none;border-radius:8px;font-size:14px;cursor:pointer;letter-spacing:.08em;">SUBMIT REVIEW</button>
        <p id="rev-error" style="color:#ef4444;font-size:12px;margin-top:8px;display:none;"></p>
      </div>`;

    document.body.appendChild(overlay);

    // Star interaction
    let selectedStars = 0;
    const stars = overlay.querySelectorAll(".rev-star");
    stars.forEach(s => {
      s.addEventListener("mouseenter", () => highlightStars(+s.dataset.v));
      s.addEventListener("mouseleave", () => highlightStars(selectedStars));
      s.addEventListener("click", () => { selectedStars = +s.dataset.v; highlightStars(selectedStars); });
    });
    function highlightStars(n) {
      stars.forEach(s => { s.style.color = +s.dataset.v <= n ? "#D4AF37" : "#d1d5db"; });
    }

    overlay.querySelector("#close-review-modal").addEventListener("click", () => { overlay.style.display = "none"; });
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.style.display = "none"; });

    overlay.querySelector("#submit-review-btn").addEventListener("click", () => {
      const name = overlay.querySelector("#rev-name").value.trim();
      const text = overlay.querySelector("#rev-text").value.trim();
      const err = overlay.querySelector("#rev-error");
      if (!selectedStars || !name || !text) {
        err.textContent = "Please fill in all fields and select a rating."; err.style.display = "block"; return;
      }
      overlay.style.display = "none";
      showToast("Review submitted! Thank you 🙏");
    });
  }

  /* ── URL PARAM: Read ?id ─────────────────────────── */
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (productId) {
    // Could load product data dynamically; for now just log
    console.log("Viewing product ID:", productId);
  }

})();
