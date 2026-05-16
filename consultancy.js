/* =====================================================
   NIApoliton Interior – Consultancy Page Logic (consultancy.js)
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

  /* ── URL PARAM: pre-fill interest ──────────────── */
  (function () {
    const params  = new URLSearchParams(window.location.search);
    const interest = params.get("interest");
    if (!interest) return;
    // Inject a pre-filled note below the form heading
    const heading = document.getElementById("form-heading");
    if (heading) {
      const note = document.createElement("p");
      note.style.cssText = "margin-top:6px;font-size:13px;color:#D4AF37;font-weight:600;";
      note.textContent = `📦 Pre-selected interest: ${decodeURIComponent(interest)}`;
      heading.parentNode.insertBefore(note, heading.nextSibling);
    }
    // Also set hidden field if present
    const hiddenField = document.getElementById("interest-field");
    if (hiddenField) hiddenField.value = decodeURIComponent(interest);
  })();

  /* ── SMOOTH SCROLL TO FORM ──────────────────────── */
  const scrollToFormBtn = document.getElementById("scroll-to-form-btn");
  const formSection     = document.getElementById("consult-form-section");
  if (scrollToFormBtn && formSection) {
    scrollToFormBtn.addEventListener("click", (e) => {
      e.preventDefault();
      formSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ── FORM VALIDATION ────────────────────────────── */
  const form       = document.getElementById("consult-form");
  const submitBtn  = document.getElementById("form-submit-btn");
  const successBox = document.getElementById("form-success");

  function getField(id) { return document.getElementById(id); }

  function showError(id, msg) {
    const el = document.getElementById(id + "-error");
    if (el) { el.textContent = msg; el.style.display = msg ? "block" : "none"; }
    const field = getField(id);
    if (field) field.style.borderColor = msg ? "#ef4444" : "";
  }

  function clearError(id) { showError(id, ""); }

  // Real-time blur validation
  function attachBlur(id, validator) {
    const el = getField(id);
    if (!el) return;
    el.addEventListener("blur", () => validator(el.value.trim()));
    el.addEventListener("input", () => clearError(id));
  }

  attachBlur("name-field",  v => v.length < 2   ? showError("name-field",  "Please enter your full name.") : clearError("name-field"));
  attachBlur("phone-field", v => !/^\+?[\d\s\-]{8,15}$/.test(v) ? showError("phone-field", "Enter a valid phone number.") : clearError("phone-field"));
  attachBlur("email-field", v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? showError("email-field", "Enter a valid email address.") : clearError("email-field"));

  function validate() {
    let ok = true;
    const name  = getField("name-field")?.value.trim()  || "";
    const phone = getField("phone-field")?.value.trim() || "";
    const email = getField("email-field")?.value.trim() || "";
    const city  = getField("city-field")?.value         || "";
    const slot  = getField("slot-field")?.value         || "";

    if (name.length < 2)                             { showError("name-field",  "Please enter your full name.");    ok = false; }
    if (!/^\+?[\d\s\-]{8,15}$/.test(phone))         { showError("phone-field", "Enter a valid phone number.");     ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  { showError("email-field", "Enter a valid email address.");    ok = false; }
    if (!city)                                       { showError("city-field",  "Please select your city.");        ok = false; }
    if (!slot)                                       { showError("slot-field",  "Please choose a preferred time."); ok = false; }

    return ok;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      // Animate button → loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<svg class="animate-spin inline w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="60" stroke-dashoffset="20"/></svg> Booking…`;
      }

      // Simulate network delay
      setTimeout(() => {
        if (submitBtn) submitBtn.style.display = "none";
        if (successBox) {
          successBox.style.display = "flex";
          successBox.innerHTML = `
            <div style="text-align:center;padding:24px 0;">
              <div style="font-size:56px;margin-bottom:12px;">🎉</div>
              <h3 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:8px;">Consultation Booked!</h3>
              <p style="font-size:14px;color:#64748b;margin-bottom:20px;">
                Thank you, <strong>${getField("name-field")?.value.trim()}</strong>! 
                Our designer will contact you within 24 hours.
              </p>
              <a href="a2_Product_List.html" style="display:inline-block;background:#D4AF37;color:#000;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:13px;letter-spacing:.08em;">BROWSE PRODUCTS →</a>
            </div>`;
        }
      }, 1600);
    });
  }

  /* ── STATS COUNTER ANIMATION ────────────────────── */
  function animateCount(el, target, suffix) {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = start.toLocaleString() + suffix;
      if (start >= target) clearInterval(timer);
    }, 24);
  }

  const statsSection = document.getElementById("stats-section");
  if (statsSection && "IntersectionObserver" in window) {
    let fired = false;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        document.querySelectorAll(".stat-count").forEach(el => {
          const raw    = el.dataset.target || "0";
          const suffix = el.dataset.suffix || "";
          animateCount(el, parseInt(raw, 10), suffix);
        });
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

})();
