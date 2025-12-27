(() => {
  "use strict";

  // =========================
  // AOS init
  // =========================
  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({
      duration: 800,
      once: false,
    });
  }

  // =========================
  // Helpers
  // =========================
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // =========================
  // MOBILE MENU (hamburger)
  // =========================
  const menuBtn = qs("#menuBtn");
  const mobileMenu = qs("#mobileMenu");
  const iconHamburger = qs("#iconHamburger");
  const iconClose = qs("#iconClose");

  function setMobileMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));

    if (iconHamburger && iconClose) {
      iconHamburger.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isOpen = !mobileMenu.classList.contains("hidden");
    setMobileMenu(!isOpen);
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", toggleMobileMenu);

    // Close mobile menu when click a link
    qsa("#mobileMenu a.nav-link").forEach((a) => {
      a.addEventListener("click", () => setMobileMenu(false));
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobileMenu(false);
    });

    // Close if resize to md+
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileMenu(false);
    });
  }

  // =========================
  // NAV ACTIVE UNDERLINE (click + scrollspy) — FIXED
  // =========================
  const navLinks = qsa('a.nav-link[href^="#"]');

  // dedupe id (karena desktop+mobile nav duplicate)
  const ids = [];
  const seen = new Set();
  for (const a of navLinks) {
    const id = (a.getAttribute("href") || "").slice(1);
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }

  const sections = ids
    .map((id) => {
      try {
        return qs(`#${CSS.escape(id)}`);
      } catch {
        return qs(`#${id}`);
      }
    })
    .filter(Boolean);

  function setActiveNavById(id) {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("is-active", href === `#${id}`);
    });
  }

  // Initial active
  const hashId = (location.hash || "").replace("#", "");
  const initialId =
    (hashId && sections.some((s) => s.id === hashId) ? hashId : "") ||
    (sections[0] ? sections[0].id : "");
  if (initialId) setActiveNavById(initialId);

  // On click: immediate highlight
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      const id = (a.getAttribute("href") || "").slice(1);
      if (id) setActiveNavById(id);
    });
  });

  // Robust scrollspy (tanpa IntersectionObserver) → tidak bias ke section pendek
  const HEADER_OFFSET = 88;
  let ticking = false;

  function updateActiveByScroll() {
    if (!sections.length) return;

    let currentId = sections[0].id;

    // pilih section terakhir yang top-nya sudah lewat header
    for (const sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top - HEADER_OFFSET <= 1) {
        currentId = sec.id;
      } else {
        break;
      }
    }

    if (currentId) setActiveNavById(currentId);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateActiveByScroll();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateActiveByScroll();

  // =========================
  // PRINCIPAL TABLE
  // =========================
  const principals = [
    { no: 1, name: "ADI PERKASA", product: 'SOES “ARJUNA”' },
    { no: 2, name: "ALADDIN SARANA INDONESIA", product: 'SABUN MANDI “CITRA” & “DEA”' },
    { no: 3, name: "ALPHA MAKMUR MANDIRI", product: 'MINUMAN “ZOLA ES SALJU”' },
    { no: 4, name: "AMAN INDAH MAKMUR", product: 'POPOK BAYI “FLUFFY”, “MOMMY HAPPY” & POPOK DEWASA “IDEAL”' },
    { no: 5, name: "ANTABOGA PANGAN NUSANTARA", product: "SRINAGA SAUCE" },
    { no: 6, name: "BINTANG WALET", product: 'CAMILAN “TELOKU” & “POP KRON”' },
    { no: 7, name: "BUDI DJAJA", product: "THE CELUP & KERING BANDULAN" },
    { no: 8, name: "DAYA MUDA AGUNG", product: 'FACE CARE “HIMALAYA”' },
    { no: 9, name: "DOMINO SUKSES BERSAMA", product: 'KERTAS NASI “NYAMAN”' },
    { no: 10, name: "DRAGON PRIMA FARMA", product: 'OBAT BEBAS “DRAGON”' },
    { no: 11, name: "ENAK JAYA MAKMUR", product: 'BUMBU MASAK “ENAK ECO”' },
    { no: 12, name: "FKS PANGAN NUSANTARA", product: 'TEPUNG “BOLA DELI”' },
    { no: 13, name: "FUMAKILLA NOMOS", product: 'OBAT ANTI NYAMUK “NOMOS”' },
    { no: 14, name: "HAN’EI ABADI GROUP", product: 'BUMBU PENYEDAP “OMBAK”' },
    { no: 15, name: "IGLO INDONESIA", product: 'BAHAN MAKANAN & BUMBU DAPUR “58”' },
    { no: 16, name: "INDRACO GLOBAL INDONESIA", product: 'KOPI BUBUK “UANG MAS”' },
    { no: 17, name: "INTERNUSA FOOD", product: 'SNACK “CUCU” & PERMEN “PARAGO”' },
    { no: 18, name: "KITSURYO SEJAHTERA ABADI", product: 'PERMEN MARSHMALLOW “SILKYS”' },
    { no: 19, name: "LAUTAN BOGA PRATAMA", product: 'BUMBU TABUR “MAMAQU”' },
    { no: 20, name: "LUCKY MOM INDONESIA", product: 'POPOK BAYI “MAKUKU” & POPOK DEWASA “PARENTY”' },
    { no: 21, name: "MAKMUR ARTHA CEMERLANG", product: 'JELLY “DONALD”' },
    { no: 22, name: "MEGA LIGHTERINDO INTERNUSA", product: 'KOREK API “M2000”' },
    { no: 23, name: "MILKO BAVERAGE INDUSTRY", product: 'SUSU “MILKYMOO”' },
    { no: 24, name: "MIRASA FOOD INDUSTRY", product: 'SNACK “PAYUNG”, “MR.PHO”, & “ARGO”' },
    { no: 25, name: "MUSTIKA DIGDAYA", product: 'KECAP MANIS “KIPAS SATE”' },
    { no: 26, name: "PRIORITAS JAYA INDONESIA", product: 'FACE & BODY CARE “THAI”' },
    { no: 27, name: "PUSAN MANIS MULIA", product: 'PERMEN “PUSAN”' },
    { no: 28, name: "SARI GANDUM SUKSES ABADI", product: 'TEPUNG TAPIOKA “SG 8”' },
    { no: 29, name: "SATORIA AGRO INDUSTRI", product: 'COOKIES “RICHWELL”' },
    { no: 30, name: "SEHAT SUKSES SEJAHTERA", product: 'MINUMAN “GO SWEET”' },
    { no: 31, name: "SINAR MEADOW INTERNATIONAL INDONESIA", product: 'MARGARINE “MOTHER CHOICE”' },
    { no: 32, name: "SUMBER RASA", product: 'MIE PIPIH “MIE CAP NONA”' },
    { no: 33, name: "SUNTA SURYA MAKMUR", product: 'SUSU KENTAL MANIS “MILK BARN”' },
    { no: 34, name: "SURYAJAYA BUMI KENCANA", product: 'BUMBU PENYEDAP “META KALDU”' },
    { no: 35, name: "TABURA GENTRI NUSANTARA", product: 'BUMBU DAPUR “TABURA”' },
    { no: 36, name: "TARUNA KUSUMA PURI NUSA", product: 'KAPAS “MODIS”' },
    { no: 37, name: "TRIJAYA TISSUE", product: 'TISSUE “GREEN” & “LEGACY”' },
    { no: 38, name: "TROPIKA PERMATA INDAH", product: 'SNACK “CIKCIK”' },
    { no: 39, name: "ULAM TIBA HALIM", product: 'MINUMAN SERBUK “MARIMAS”' },
    { no: 40, name: "USAHA PANGAN SEJAHTERA", product: 'MIE SOHUN “BIRU SAK CAP” & MIE KERING CAP “89”' },
  ];

  const tbody = qs("#principalRows");
  const search = qs("#search");
  const count = qs("#count");

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderPrincipal(items) {
    if (!tbody || !count) return;
    count.textContent = String(items.length);

    tbody.innerHTML = items
      .map(
        (x) => `
        <tr class="hover:bg-slate-50 cursor-pointer" data-name="${escapeHtml(x.name)}">
          <td class="px-4 py-3 text-slate-700">${x.no}</td>
          <td class="px-4 py-3 font-semibold text-slate-900">${escapeHtml(x.name)}</td>
          <td class="px-4 py-3 text-slate-700">${escapeHtml(x.product)}</td>
        </tr>
      `
      )
      .join("");
  }

  renderPrincipal(principals);

  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      if (!q) return renderPrincipal(principals);

      const filtered = principals.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.product.toLowerCase().includes(q) ||
          String(x.no).includes(q)
      );
      renderPrincipal(filtered);
    });
  }

  if (tbody) {
    tbody.addEventListener("click", async (e) => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      const name = tr.getAttribute("data-name") || "";

      try {
        await navigator.clipboard.writeText(name);
        tr.classList.add("bg-[#f3c24c]/20");
        setTimeout(() => tr.classList.remove("bg-[#f3c24c]/20"), 600);
      } catch (_) {}
    });
  }

  // =========================
  // MODAL MAP + AUTO ROUTE
  // =========================
  const OFFICES = {
    jember: {
      title: "CV. LAJU JAYA MAKMUR JEMBER",
      address: "Mencek, Serut, Kec. Panti, Kabupaten Jember, Jawa Timur 68153",
      mapsShare: "https://maps.app.goo.gl/W7poB1XEddAyVBy58",
    },
    banyuwangi: {
      title: "CV. LAJU JAYA MAKMUR BANYUWANGI",
      address:
        "Jl. Banyuwangi, Dusun Sidorejo Wetan, Yosomulyo, Kec. Gambiran, Banyuwangi 68486",
      mapsShare: "https://maps.app.goo.gl/x7VLDoCTFWcMU3Ai6",
    },
  };

  const mapModal = qs("#mapModal");
  const modalClose = qs("#modalClose");
  const modalTitle = qs("#modalTitle");
  const modalSubtitle = qs("#modalSubtitle");
  const modalAddress = qs("#modalAddress");
  const modalStatus = qs("#modalStatus");
  const modalMapFrame = qs("#modalMapFrame");
  const btnOpenMaps = qs("#btnOpenMaps");
  const btnFallbackRoute = qs("#btnFallbackRoute");

  let activeOfficeKey = null;

  function setStatus(msg) {
    if (modalStatus) modalStatus.textContent = msg;
  }

  function openDirectionsUrl(url) {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    return !!w;
  }

  function attemptAutoRoute(office) {
    if (!office) return;

    if (!navigator.geolocation) {
      setStatus(
        "Browser kamu tidak mendukung Geolocation. Gunakan tombol “Rute dari lokasi saya” atau “Buka lokasi di Google Maps”."
      );
      return;
    }

    setStatus("Meminta izin lokasi...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const directionsUrl =
          "https://www.google.com/maps/dir/?api=1" +
          "&origin=" +
          encodeURIComponent(lat + "," + lng) +
          "&destination=" +
          encodeURIComponent(office.address) +
          "&travelmode=driving";

        const opened = openDirectionsUrl(directionsUrl);
        if (opened) {
          setStatus("Lokasi didapat. Rute Google Maps dibuka di tab baru.");
        } else {
          setStatus(
            "Lokasi didapat, tapi browser memblokir tab baru. Klik tombol “Rute dari lokasi saya” untuk membuka rute manual."
          );
        }
      },
      (err) => {
        let msg =
          "Gagal membaca lokasi. Gunakan tombol “Rute dari lokasi saya” atau “Buka lokasi di Google Maps”.";
        if (err && err.code === 1) msg = "Izin lokasi ditolak. " + msg;
        if (err && err.code === 2) msg = "Lokasi tidak tersedia. " + msg;
        if (err && err.code === 3) msg = "" + msg;

        setStatus(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  function openModal(officeKey) {
    const office = OFFICES[officeKey];
    if (!office || !mapModal) return;

    activeOfficeKey = officeKey;

    if (modalTitle) modalTitle.textContent = office.title;
    if (modalSubtitle) modalSubtitle.textContent = "Google Maps • Preview & Navigasi";
    if (modalAddress) modalAddress.textContent = office.address;

    if (modalMapFrame) {
      const embedUrl =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(office.address) +
        "&output=embed";
      modalMapFrame.src = embedUrl;
    }

    if (btnOpenMaps) btnOpenMaps.href = office.mapsShare;

    if (btnFallbackRoute) {
      const fallback =
        "https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=" +
        encodeURIComponent(office.address) +
        "&travelmode=driving";
      btnFallbackRoute.href = fallback;
    }

    setStatus(
      "Sedang mencoba ambil lokasi untuk membuka rute otomatis. Jika gagal/ditolak, gunakan tombol “Rute (My Location)”."
    );

    mapModal.classList.remove("hidden");
    mapModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");

    attemptAutoRoute(office);
  }

  function closeModal() {
    if (!mapModal) return;

    mapModal.classList.add("hidden");
    mapModal.setAttribute("aria-hidden", "true");
    if (modalMapFrame) modalMapFrame.src = "about:blank";
    activeOfficeKey = null;
    document.body.classList.remove("overflow-hidden");
  }

  qsa(".js-office").forEach((el) => {
    el.addEventListener("click", () => openModal(el.dataset.office));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(el.dataset.office);
      }
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (mapModal) {
    mapModal.addEventListener("click", (e) => {
      const close = e.target.getAttribute("data-close");
      if (close === "overlay") closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mapModal && !mapModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // =========================
  // BACK TO TOP
  // =========================
  const backToTop = qs("#backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;
    const show = window.scrollY > 500;
    backToTop.classList.toggle("hidden", !show);
    backToTop.classList.toggle("flex", show);
  }

  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
