/* =====================================================
   WOODWELL Interior – Product List Logic (productList.js)
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
  function syncCartBadge() {
    const n = parseInt(localStorage.getItem("ww_cart_count") || "0", 10);
    document.querySelectorAll(".cart-badge").forEach(el => { el.textContent = n; });
  }
  syncCartBadge();

  /* ── PRODUCT DATA ──────────────────────────────── */
  const PRODUCTS = [
    {
      id: 1, name: "Everett Mid-Century Beds", price: 1899, original: 2450, seats: 2, material: "leather", color: "stone", badge: "Up to 70% Off", newest: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR5g4y03E0VoENWtnPcLGvJJOyL-juXkDmbpkcSm5Vy_zjAevri7a5VRPZ6HBME3fMoButbJEYCONJW2MlBtpMcSShQqwIjuAvIT739ddTJ0sL5wbyHvkBxkmd2v7nQSQGDBW9PasW2OCelCE0IORm88mTKGAjhigAgUpeeCAjQUbRHEga1LQ9C4bSnVbHtyhyxuxst8o9d9zzCJ5gLRjZ3_dzKS08Gzhj_zj-gvUVArFE9ST2ht03-hQuPDJopEPlAd6e6vIVEx4"
    },
    {
      id: 2, name: "Camden Velvet Dining", price: 2250, original: 3100, seats: 2, material: "velvet", color: "emerald", badge: "BESTSELLER", newest: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKGVMTCBLtxL_al0lfXXM2kjJQIpJmtqHC0Dfz5x04mt_yYLMOIsz43E2rqgyjeRxr8LW75Q7mkxz6dQoXCf_KlvP8xG62pIbGRt6jAUxVOl84bdb2JDsJ6nE_-y14_WCz0Vxfpk9AhWhT8_lT2o-Zvw_vfGCGF89NVV2OUGzcRn0MXSNYgHWXkIeAfOMgsF116nm5BIQssCTDtrf56Ae_Xv8gqftOqw_H0fB8yl0cBzPIQgw8EM6wr8xaIjIK6r2qHYI5cEJ9A-Q"
    },
    {
      id: 3, name: "Aurelius Cognac Leather Sofa", price: 4599, original: 5200, seats: 3, material: "leather", color: "brown", badge: "", newest: false,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPYNhDMB2VLtedzZkfbjyFkC1TFXHVT3vdD4pTt7V_8ZzDfQnHlO1PdmkMLBZ4OzRE2CUGg1VbSTlBOEeeBpcJ4Y7l0dlPCHBoGHoNoosuz-Tx0kP-T9ypu0UYsIMm5LOGfB4kS_5MrLd5VdwEfoTuGX2-QztI40PEHLwbrS3xJkAy7xarH1wcMNfM55-wH8iLoiqol692v0D4J89-JuORrucCnzn9VH-V2wDG98V478xLiKxxmclnvsvg7BBp7YP-LBAuMwympZI"
    },
    {
      id: 4, name: "Palazzo Modular Dining", price: 5800, original: 6500, seats: 4, material: "linen", color: "stone", badge: "", newest: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD087J_U1ifRl6im0X6f9zfRoWReE3kE8NjA0pYirR7wXjVzDRDHMbV1qNbsmyvQOQB81B61vG2zKulWg2ieUtDH0jzk6EivdrVDMwRtnm3QbfvbRIa0hntVGpoFkgl5E3qghUg1jUSAR-oJftWD7ub-qr-B67NCj8ZP3Rmg_i-zkCe7n-JBmUuflpLgPgef2KOFKU008aP72iAwJjMfKk8xg9qWPnLpyYT1OgqPm7K-GDPyAku7luj6gpqy6oOnujhQtmUaiAmfXw"
    },
    {
      id: 5, name: "Sloane Ivory Curved Decor", price: 3999, original: 4800, seats: 3, material: "velvet", color: "stone", badge: "", newest: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCShI25Zn9q3Uu3nNDyD4GQCmYok4pU27RhLIrV3p9G2JBNZYTUrT7FzYAFK4_NYw2JnmPXWQZuxD5iJCZ_mv98Tuoa095VvlwObJRZWDURtQHnLR_dqoVZunELakEMUJdVgheVsmAhI4Mt4pw9ZMapwleBtoeaMXzXadjDPewLIdUYDT5C6xKImhlQJCgQTzT7HWQPXX8MDdJdVxwPg0UupKxCw46T9S86M0Gwsww_SLIC-S1M8IvFB6ahDBw3XXrNS1Ccnveb8aA"
    },
    {
      id: 6, name: "Vera Emerald Velvet Lighting", price: 2450, original: 2900, seats: 2, material: "velvet", color: "charcoal", badge: "", newest: true,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvG2wb_merwu9JVmLrlWDryUPYimaHhiBg2wLnP8gCpsQWXVS4AvGDczt9U5zf9ZjXOXzoxT83I8o47yc62FIOXjUw8_UtpHUdo5BXs3CwCdvV2J0htVwp9wEeMTNuYuNp3wxMt0urmkg6cQleUNAqPx8g8DE8GSZvS2qAUHFFtaqLFKy13RwA5Azh0QRdierBt859WZPldR7jIR9lMhgi-Z7DLgISkd1luLaZ1ZFzMuejdNlu6IDE38Mh29yfuUrAdR5LHxfMwaw"
    },
  ];

  const ITEMS_PER_PAGE = 6;
  let state = {
    sort: "popularity",
    priceRanges: [],
    seats: null,
    material: null,
    color: null,
    page: 1,
    wishlist: JSON.parse(localStorage.getItem("ww_wishlist") || "[]"),
  };

  /* ── READ URL PARAMS ───────────────────────────── */
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("category");
  if (catParam) {
    const catMap = { sofas: "leather", velvet: "velvet", linen: "linen" };
    if (catMap[catParam.toLowerCase()]) state.material = catMap[catParam.toLowerCase()];
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = catParam.charAt(0).toUpperCase() + catParam.slice(1);
  }

  /* ── HELPERS ───────────────────────────────────── */
  function priceOk(price, ranges) {
    if (!ranges.length) return true;
    return ranges.some(r => {
      if (r === "under1000") return price < 1000;
      if (r === "1000-2500") return price >= 1000 && price <= 2500;
      if (r === "2500-5000") return price > 2500 && price <= 5000;
      if (r === "5000plus") return price > 5000;
      return true;
    });
  }

  function filtered() {
    let list = PRODUCTS.filter(p =>
      priceOk(p.price, state.priceRanges) &&
      (!state.seats || p.seats === state.seats) &&
      (!state.material || p.material === state.material) &&
      (!state.color || p.color === state.color)
    );
    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (state.sort === "newest") list.sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
    return list;
  }

  /* ── RENDER CARDS ──────────────────────────────── */
  const grid = document.getElementById("product-grid");

  function cardHTML(p) {
    const wished = state.wishlist.includes(p.id);
    return `
    <div class="group">
      <div class="relative overflow-hidden bg-slate-100 dark:bg-card-dark aspect-[4/5] mb-4">
        <img alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${p.img}"/>
        <button class="wl-btn absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity" data-id="${p.id}">
          <span class="material-icons-outlined text-xl ${wished ? "text-red-500" : ""}">${wished ? "favorite" : "favorite_border"}</span>
        </button>
        ${p.badge ? `<div class="absolute top-4 left-4 bg-primary text-black px-2 py-1 text-[10px] font-bold">${p.badge}</div>` : ""}
        <div class="vd-btn absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-primary text-black font-bold text-center cursor-pointer" data-id="${p.id}">VIEW DETAILS</div>
      </div>
      <h3 class="font-display text-lg font-bold mb-1">${p.name}</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-tighter">${p.seats} Seater · ${p.material}</p>
      <div class="flex items-center space-x-2">
        <span class="text-primary font-bold text-lg">$${p.price.toLocaleString()}</span>
        <span class="text-slate-400 line-through text-sm">$${p.original.toLocaleString()}</span>
      </div>
    </div>`;
  }

  function render() {
    if (!grid) return;
    const all = filtered();
    const total = Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE));
    state.page = Math.min(state.page, total);
    const slice = all.slice((state.page - 1) * ITEMS_PER_PAGE, state.page * ITEMS_PER_PAGE);

    grid.innerHTML = slice.length
      ? slice.map(cardHTML).join("")
      : `<p class="col-span-3 text-center text-slate-400 py-20 text-lg">No products match your filters.</p>`;

    grid.querySelectorAll(".wl-btn").forEach(btn => {
      btn.addEventListener("click", e => { e.stopPropagation(); toggleWL(+btn.dataset.id); render(); });
    });

    grid.querySelectorAll(".vd-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id, 10);
        const pageMap = {
          1: "a3_1_product_Detail_Everett_Mid-Century_Beds.html",
          2: "a3_2_product_Detail_Camden_Velvet_TVunits.html",
          3: "a3_3_product_Detail_Aurelius_Cognac_Leather_Sofa.html",
          4: "a3_4_product_Detail_Palazzo_Modular_Dining.html",
          5: "a3_5_product_Detail_Sloane_Ivory_Curved_Decor.html",
          6: "a3_6_product_Detail_Vera_Emerald_Velvet_Lighting.html"
        };
        const pageName = pageMap[id];
        if (pageName) {
          setTimeout(() => {
            window.location.href = pageName;
          }, 1000);
        }
      });
    });

    renderPager(total);
  }

  /* ── WISHLIST ──────────────────────────────────── */
  function toggleWL(id) {
    const i = state.wishlist.indexOf(id);
    i === -1 ? state.wishlist.push(id) : state.wishlist.splice(i, 1);
    localStorage.setItem("ww_wishlist", JSON.stringify(state.wishlist));
  }

  /* ── PAGINATION ────────────────────────────────── */
  const pager = document.getElementById("pagination");
  function renderPager(total) {
    if (!pager) return;
    pager.innerHTML = "";
    const mkBtn = (icon, disabled, onClick) => {
      const b = document.createElement("button");
      b.innerHTML = `<span class="material-icons-outlined">${icon}</span>`;
      b.className = "w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-border-dark hover:border-primary transition-colors";
      b.disabled = disabled; b.style.opacity = disabled ? "0.4" : "1";
      b.addEventListener("click", onClick);
      return b;
    };
    pager.appendChild(mkBtn("chevron_left", state.page === 1, () => { state.page--; render(); }));
    for (let i = 1; i <= total; i++) {
      const b = document.createElement("button");
      b.className = `w-10 h-10 flex items-center justify-center border font-bold text-sm ${i === state.page ? "bg-primary text-black border-primary" : "border-slate-200 dark:border-border-dark hover:border-primary"}`;
      b.textContent = i;
      b.addEventListener("click", () => { state.page = i; render(); });
      pager.appendChild(b);
    }
    pager.appendChild(mkBtn("chevron_right", state.page === total, () => { state.page++; render(); }));
  }

  /* ── FILTER EVENTS ─────────────────────────────── */
  document.querySelectorAll(".price-filter").forEach(cb => {
    cb.addEventListener("change", () => {
      state.priceRanges = [...document.querySelectorAll(".price-filter:checked")].map(x => x.dataset.range);
      state.page = 1; render();
    });
  });

  document.querySelectorAll(".seating-btn").forEach(b => {
    b.addEventListener("click", () => {
      const v = parseInt(b.dataset.seats);
      state.seats = state.seats === v ? null : v;
      document.querySelectorAll(".seating-btn").forEach(x =>
        x.classList.toggle("border-primary", parseInt(x.dataset.seats) === state.seats));
      state.page = 1; render();
    });
  });

  document.querySelectorAll(".material-filter").forEach(cb => {
    cb.addEventListener("change", () => {
      state.material = cb.checked ? cb.dataset.material : null;
      document.querySelectorAll(".material-filter").forEach(x => { if (x !== cb) x.checked = false; });
      state.page = 1; render();
    });
  });

  document.querySelectorAll(".color-btn").forEach(b => {
    b.addEventListener("click", () => {
      state.color = state.color === b.dataset.color ? null : b.dataset.color;
      document.querySelectorAll(".color-btn").forEach(x =>
        x.style.outline = x.dataset.color === state.color ? "3px solid #D4AF37" : "");
      state.page = 1; render();
    });
  });

  /* ── SORT ──────────────────────────────────────── */
  const sortSel = document.getElementById("sort-select");
  if (sortSel) {
    sortSel.addEventListener("change", () => {
      const m = { "Popularity": "popularity", "Price: Low to High": "price-asc", "Price: High to Low": "price-desc", "Newest Arrivals": "newest" };
      state.sort = m[sortSel.value] || "popularity"; state.page = 1; render();
    });
  }

  render();
})();
