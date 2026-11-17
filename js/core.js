/*
 * Общая логика сайта ML (вариант дизайна): состояние, калькулятор, форма,
 * слайдер «до/после», анимации появления. Разметку собирает js/view.js,
 * весь контент берётся из js/config.js.
 */
(() => {
  const site = window.ML_SITE;
  const view = window.ML_VIEW;
  if (!site || !view) return;

  const ALL = "Все";
  const priceMap = new Map(site.priceList.map((i) => [i.key, i]));
  const groups = [...new Set(site.priceList.map((i) => i.group))];
  const state = {
    selected: [],
    category: ALL,
    form: { name: "", phone: "", car: "", consent: false },
    formTried: false,
    formSending: false,
    formDone: false,
    mapUnlocked: false,
  };

  const ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "chevrons-left-right": '<path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/>',
    "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.904l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',
    menu: '<path d="M4 8h16"/><path d="M4 16h16"/>',
  };

  const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const icon = (name, cls = "ico", filled = false) =>
    `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const vkIcon = (cls = "ico") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.785 16.241s.288-.032.436-.192c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.599-.19 1.367 1.26 2.18 1.814.616.42 1.084.327 1.084.327l2.176-.03s1.138-.071.598-.964c-.044-.073-.314-.661-1.614-1.869-1.361-1.264-1.179-1.059.46-3.245.997-1.332 1.396-2.145 1.272-2.493-.118-.332-.847-.244-.847-.244l-2.449.015s-.182-.025-.316.056c-.131.079-.216.263-.216.263s-.386 1.028-.9 1.902c-1.084 1.842-1.518 1.939-1.696 1.825-.413-.266-.31-1.068-.31-1.638 0-1.78.27-2.52-.526-2.712-.265-.064-.46-.106-1.138-.113-.87-.009-1.606.003-2.023.207-.278.136-.492.44-.362.457.161.022.525.098.718.363.25.343.241 1.114.241 1.114s.143 2.126-.334 2.389c-.328.182-.778-.19-1.744-1.887-.495-.868-.869-1.828-.869-1.828s-.072-.176-.2-.27c-.156-.115-.374-.151-.374-.151l-2.328.015s-.35.01-.478.162c-.114.136-.009.417-.009.417s1.816 4.247 3.872 6.385c1.885 1.96 4.026 1.831 4.026 1.831h.972z"/></svg>`;
  const formatPrice = (n) => `${n.toLocaleString("ru-RU").replace(/\s/g, "\u00a0")}\u00a0₽`;
  const picture = ({ src, srcSmall, alt = "", width, height, cls = "", eager = false, sizes }) =>
    `<picture class="${cls}">${srcSmall ? `<source media="(max-width: 767px)" srcset="${esc(srcSmall)}">` : ""}<img src="${esc(src)}" alt="${esc(alt)}" width="${width}" height="${height}" loading="${eager ? "eager" : "lazy"}" decoding="async" draggable="false"></picture>`;
  const tel = (p) => p.replace(/[^\d+]/g, "");
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = () => window.matchMedia("(hover: none), (pointer: coarse)").matches;

  function booking() {
    const items = state.selected.map((k) => priceMap.get(k)).filter(Boolean);
    return {
      items,
      total: items.reduce((s, i) => s + (i.price ?? 0), 0),
      hasOnRequest: items.some((i) => i.price === undefined),
      isSelected: (k) => state.selected.includes(k),
    };
  }

  /* ——— Телефон ——— */
  const PHONE_PREFIX = "+7 (";
  function digitsFromPhone(value) {
    const t = value.trim();
    if (t.startsWith("+7")) return t.slice(2).replace(/\D/g, "").slice(0, 10);
    let d = t.replace(/\D/g, "");
    if (d.length === 11 && (d.startsWith("8") || d.startsWith("7"))) d = d.slice(1);
    return d.slice(0, 10);
  }
  function formatPhone(value) {
    const t = value.trim();
    if (["7", "8", "+"].includes(t)) return PHONE_PREFIX;
    const d = digitsFromPhone(value);
    if (!d) return t === PHONE_PREFIX.trim() ? PHONE_PREFIX : "";
    let out = PHONE_PREFIX + d.slice(0, 3);
    if (d.length > 3) out += ") " + d.slice(3, 6);
    if (d.length > 6) out += "-" + d.slice(6, 8);
    if (d.length > 8) out += "-" + d.slice(8, 10);
    return out;
  }
  function validateForm(f) {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Укажите имя";
    if (!f.phone.trim()) e.phone = "Укажите телефон";
    else if (digitsFromPhone(f.phone).length !== 10) e.phone = "Номер неполный";
    if (!f.consent) e.consent = "Нужно согласие на обработку персональных данных";
    return e;
  }

  const ctx = {
    site, state, ALL, groups, priceMap, esc, icon, vkIcon, formatPrice, picture, tel, booking, isTouch,
    errors: () => (state.formTried ? validateForm(state.form) : {}),
  };

  /* ——— Обновление динамических зон ——— */
  function region(name) {
    document.querySelectorAll(`[data-region="${name}"]`).forEach((el) => {
      el.innerHTML = view.regions[name](ctx);
    });
  }
  function syncSelection() {
    const b = booking();
    document.querySelectorAll("[data-toggle-item]").forEach((el) => {
      const on = b.isSelected(el.dataset.toggleItem);
      el.setAttribute("aria-pressed", String(on));
      el.toggleAttribute("data-selected", on);
    });
    Object.keys(view.regions)
      .filter((r) => r !== "reqList" && r !== "reqForm")
      .forEach(region);
  }
  function toggleItem(key) {
    if (!priceMap.has(key)) return;
    const i = state.selected.indexOf(key);
    if (i >= 0) state.selected.splice(i, 1);
    else state.selected.push(key);
    syncSelection();
  }
  function refreshForm() {
    region("reqForm");
  }

  function goForm() {
    const el = document.getElementById("lead-form-anchor") || document.getElementById("request");
    el?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
    setTimeout(() => document.getElementById("lead-name")?.focus({ preventScroll: true }), 600);
  }

  /* ——— События ——— */
  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-toggle-item],[data-category],[data-remove-item],[data-clear],[data-go-form],[data-reset-form],[data-cookie-accept],[data-menu],[data-unlock-map],[data-scroll],[data-review-dir],[data-nav-link]");
      if (!t) return;
      if (t.hasAttribute("data-toggle-item")) toggleItem(t.dataset.toggleItem);
      else if (t.hasAttribute("data-category")) {
        state.category = t.dataset.category;
        document.querySelectorAll("[data-category]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.category === state.category)));
        region("reqList");
        syncSelection();
      } else if (t.hasAttribute("data-remove-item")) {
        state.selected = state.selected.filter((k) => k !== t.dataset.removeItem);
        syncSelection();
      } else if (t.hasAttribute("data-clear")) {
        state.selected = [];
        syncSelection();
      } else if (t.hasAttribute("data-go-form")) goForm();
      else if (t.hasAttribute("data-reset-form")) {
        state.form = { name: "", phone: "", car: "", consent: false };
        state.formTried = false;
        state.formDone = false;
        refreshForm();
      } else if (t.hasAttribute("data-cookie-accept")) {
        try { localStorage.setItem("ml-cookie-consent", "1"); } catch (_) {}
        document.getElementById("cookie-banner")?.setAttribute("hidden", "");
      } else if (t.hasAttribute("data-menu")) setMenu(!document.body.classList.contains("menu-open"));
      else if (t.hasAttribute("data-nav-link")) setMenu(false);
      else if (t.hasAttribute("data-unlock-map")) {
        state.mapUnlocked = true;
        t.remove();
      } else if (t.hasAttribute("data-scroll")) {
        const track = document.getElementById(t.dataset.scroll);
        if (track) {
          const step = track.querySelector("li")?.getBoundingClientRect().width || track.clientWidth * 0.8;
          track.scrollBy({ left: Number(t.dataset.dir) * (step + 24), behavior: reduced() ? "auto" : "smooth" });
        }
      } else if (t.hasAttribute("data-review-dir")) stepReview(Number(t.dataset.reviewDir));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
    });

    document.addEventListener("input", (e) => {
      const el = e.target;
      const key = el.dataset && el.dataset.field;
      if (!key) return;
      if (key === "consent") state.form.consent = el.checked;
      else if (key === "phone") {
        const prev = state.form.phone;
        let next = formatPhone(el.value);
        if (prev === PHONE_PREFIX && el.value === PHONE_PREFIX.slice(0, -1)) next = "";
        state.form.phone = next;
        el.value = next;
      } else state.form[key] = el.value;
    });
    document.addEventListener("change", (e) => {
      if (e.target.dataset && e.target.dataset.field === "consent") state.form.consent = e.target.checked;
    });
    document.addEventListener("focusin", (e) => {
      if (e.target.id === "lead-phone" && !e.target.value) {
        e.target.value = PHONE_PREFIX;
        state.form.phone = PHONE_PREFIX;
      }
    });
    document.addEventListener("focusout", (e) => {
      if (e.target.id === "lead-phone" && e.target.value === PHONE_PREFIX) {
        e.target.value = "";
        state.form.phone = "";
      }
    });

    document.addEventListener("submit", async (e) => {
      if (e.target.id !== "lead-form") return;
      e.preventDefault();
      state.formTried = true;
      const errors = validateForm(state.form);
      if (Object.keys(errors).length) {
        refreshForm();
        const first = ["name", "phone", "consent"].find((k) => errors[k]);
        document.getElementById({ name: "lead-name", phone: "lead-phone", consent: "lead-consent" }[first])?.focus();
        return;
      }
      state.formSending = true;
      refreshForm();
      const b = booking();
      try {
        await site.submitLead({
          name: state.form.name,
          phone: state.form.phone,
          car: state.form.car,
          items: b.items.map((i) => ({ key: i.key, title: i.title, group: i.group, price: i.price ?? null })),
          total: b.total,
          hasOnRequest: b.hasOnRequest,
        });
        state.formSending = false;
        state.formDone = true;
        refreshForm();
      } catch (err) {
        state.formSending = false;
        refreshForm();
        alert("Не получилось отправить заявку. Попробуйте ещё раз.");
        console.error(err);
      }
    });
  }

  /* ——— Меню ——— */
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    const btn = document.querySelector("[data-menu]");
    btn?.setAttribute("aria-expanded", String(open));
    btn?.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    const panel = document.getElementById("mobile-menu");
    if (panel) {
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    }
  }

  /* ——— Отзывы (слайдер, если вид его использует) ——— */
  let reviewIndex = 0;
  function stepReview(dir) {
    const slides = [...document.querySelectorAll("[data-review-slide]")];
    if (!slides.length) return;
    reviewIndex = (reviewIndex + dir + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.toggleAttribute("data-active", i === reviewIndex);
      s.setAttribute("aria-hidden", String(i !== reviewIndex));
    });
    const counter = document.querySelector("[data-review-counter]");
    if (counter) counter.textContent = String(reviewIndex + 1).padStart(2, "0");
    const bar = document.querySelector("[data-review-progress]");
    if (bar) bar.style.setProperty("--p", (reviewIndex + 1) / slides.length);
  }

  /* ——— До / после ——— */
  function bindBeforeAfter() {
    document.querySelectorAll("[data-ba]").forEach((frame) => {
      const handle = frame.querySelector("[data-ba-handle]");
      const set = (pct) => {
        const v = Math.max(0, Math.min(100, pct));
        frame.style.setProperty("--pos", v + "%");
        handle?.setAttribute("aria-valuenow", String(Math.round(v)));
        handle?.setAttribute("aria-valuetext", `После: ${Math.round(v)}%`);
      };
      const fromEvent = (e) => {
        const r = frame.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 100);
      };
      let drag = false;
      frame.addEventListener("pointerdown", (e) => {
        drag = true;
        frame.setPointerCapture(e.pointerId);
        fromEvent(e);
      });
      frame.addEventListener("pointermove", (e) => drag && fromEvent(e));
      const stop = () => (drag = false);
      frame.addEventListener("pointerup", stop);
      frame.addEventListener("pointercancel", stop);
      handle?.addEventListener("keydown", (e) => {
        const cur = Number(handle.getAttribute("aria-valuenow")) || 50;
        if (e.key === "ArrowLeft") { set(cur - 5); e.preventDefault(); }
        if (e.key === "ArrowRight") { set(cur + 5); e.preventDefault(); }
        if (e.key === "Home") { set(0); e.preventDefault(); }
        if (e.key === "End") { set(100); e.preventDefault(); }
      });
    });
  }

  /* ——— Появление и счётчики ——— */
  function bindReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = Number(el.dataset.count).toFixed(Number(el.dataset.decimals || 0))));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          en.target.querySelectorAll("[data-count]").forEach(countUp);
          io.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }
  function countUp(el) {
    const target = Number(el.dataset.count);
    const dec = Number(el.dataset.decimals || 0);
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function bindHeader() {
    const onScroll = () => document.body.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function cookieBanner() {
    const banner = document.getElementById("cookie-banner");
    if (!banner) return;
    try {
      if (localStorage.getItem("ml-cookie-consent") === "1") return;
    } catch (_) {}
    setTimeout(() => banner.removeAttribute("hidden"), 1200);
  }

  function init() {
    document.getElementById("app").innerHTML = view.page(ctx);
    Object.keys(view.regions).forEach(region);
    syncSelection();
    stepReview(0);
    bind();
    bindBeforeAfter();
    bindReveal();
    bindHeader();
    cookieBanner();
    view.afterRender && view.afterRender(ctx);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
