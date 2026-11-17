/* Вариант B — «Light gallery». Разметка страницы; логика — в js/core.js. */
window.ML_VIEW = (() => {
  const n2 = (i) => String(i + 1).padStart(2, "0");
  const INK_MARK = "./brand/logo-flat-v9-mark-ink";

  function label(c, text, num) {
    return `<p class="label">${num ? `<span>${num}</span>` : ""}${c.esc(text)}</p>`;
  }
  function markInk(c, cls = "brand-mark") {
    return `<picture><source type="image/webp" srcset="${INK_MARK}.webp"><img class="${cls}" src="${INK_MARK}.png" width="320" height="223" alt="${c.esc(c.site.brand.name)} — детейлинг"></picture>`;
  }
  function markLight(c, cls) {
    const b = c.site.brand;
    return `<picture><source type="image/webp" srcset="${c.esc(b.logoMark)}"><img class="${cls}" src="${c.esc(b.logoMarkPng)}" width="320" height="223" alt="${c.esc(b.name)} — детейлинг"></picture>`;
  }
  function arrows(c, id, labelText) {
    return `<div class="arrows"><button type="button" class="round" data-scroll="${id}" data-dir="-1" aria-label="${labelText}: назад">${c.icon("arrow-left")}</button><button type="button" class="round" data-scroll="${id}" data-dir="1" aria-label="${labelText}: вперёд">${c.icon("arrow-right")}</button></div>`;
  }

  function header(c) {
    const s = c.site;
    const vk = s.social?.vk;
    return `<header class="site-header">
      <div class="wrap header-row">
        <a href="#hero" class="brand" aria-label="${c.esc(s.brand.name)} — на главную">${markInk(c)}</a>
        <nav class="nav" aria-label="Разделы"><ul>${s.nav.map((i) => `<li><a href="${c.esc(i.href)}">${c.esc(i.label)}</a></li>`).join("")}</ul></nav>
        <div class="header-actions">
          ${vk ? `<a class="round round--sm" href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me" aria-label="Мы ВКонтакте">${c.vkIcon()}</a>` : ""}
          <a class="btn btn-ink btn-sm" href="#request">Записаться</a>
          <button type="button" class="menu-btn" data-menu aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню"><span></span><span></span></button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" hidden>
        <nav aria-label="Разделы (мобильное меню)"><ul>${s.nav.map((i, k) => `<li><a href="${c.esc(i.href)}" data-nav-link>${c.esc(i.label)}<span>${n2(k)}</span></a></li>`).join("")}</ul></nav>
        <div class="mm-foot">
          <a class="btn btn-ink" href="#request" data-nav-link>Записаться</a>
          <a href="tel:${c.tel(s.contacts.phone)}">${c.esc(s.contacts.phone)}</a>
          ${vk ? `<a href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me">Мы ВКонтакте</a>` : ""}
        </div>
      </div>
    </header>`;
  }

  function hero(c) {
    const s = c.site;
    const { narrow: n, wide: w } = s.hero;
    return `<section id="hero" class="hero" aria-labelledby="hero-title">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <h1 id="hero-title" class="sr-only">ML Detailing — детейлинг в Нижнем Новгороде</h1>
          <p class="kicker">${c.esc(s.brand.kicker)}</p>
          <p class="hero-title">${c.esc(s.brand.slogan || s.seo.title)}</p>
          <div class="hero-cta">
            <a class="btn btn-ink" href="#request">Записаться ${c.icon("arrow-right")}</a>
            <a class="btn btn-ghost" href="#works">Смотреть работы</a>
          </div>
          <dl class="hero-meta">
            <div><dt>Адрес</dt><dd>${c.esc(s.contacts.address)}</dd></div>
            <div><dt>Режим</dt><dd>${c.esc(s.contacts.schedule)}</dd></div>
            <div><dt>Телефон</dt><dd><a href="tel:${c.tel(s.contacts.phone)}">${c.esc(s.contacts.phone)}</a></dd></div>
          </dl>
        </div>
        <div class="hero-frame" id="hero-frame">
          <picture><source media="(min-width: 768px)" srcset="${c.esc(w.bg)}"><img class="hl hl-bg" src="${c.esc(n.bg)}" alt="" width="${n.width}" height="${n.height}" fetchpriority="high"></picture>
          <picture class="hero-logo-pic" aria-hidden="true"><source type="image/webp" srcset="${c.esc(s.brand.logoHero)}"><img class="hero-logo" src="${c.esc(s.brand.logoHeroPng)}" alt="" width="806" height="562"></picture>
          <picture><source media="(min-width: 768px)" srcset="${c.esc(w.car)}"><img class="hl hl-car" src="${c.esc(n.car)}" alt="${c.esc(n.alt)}" width="${n.width}" height="${n.height}" fetchpriority="high"></picture>
          <span class="frame-tag">${c.esc(s.reviewSummary.rating)} ${c.icon("star", "ico", true)} <small>${c.esc(s.reviewSummary.text)}</small></span>
        </div>
      </div>
    </section>`;
  }

  function works(c) {
    const s = c.site;
    const all = [...s.worksRow1, ...s.worksRow2];
    if (!all.length) return "";
    const d = s.sections.works;
    const cards = all
      .map(
        (w, i) => `<li class="g-item ${i % 3 === 1 ? "g-item--tall" : ""}">
          <figure>
            <div class="g-img">${c.picture({ src: w.src, srcSmall: w.srcSmall, alt: w.alt, width: w.width, height: w.height })}</div>
            <figcaption><span>${n2(i)}</span>${c.esc(w.badge)}</figcaption>
          </figure>
        </li>`
      )
      .join("");
    return `<section id="works" class="section works" aria-labelledby="works-title">
      <div class="wrap">
        <div class="head" data-reveal>
          <div>${label(c, d.eyebrow, "01")}<h2 id="works-title" class="h2">${c.esc(d.title)}</h2></div>
          <div class="head-side"><p class="lead">${c.esc(d.lead)}</p>${arrows(c, "works-track", "Работы")}</div>
        </div>
      </div>
      <ul class="gallery" id="works-track" tabindex="0" aria-label="Работы студии" data-reveal>${cards}</ul>
    </section>`;
  }

  function about(c) {
    const s = c.site;
    const stats = s.stats
      .map((st) => {
        const suffix = st.suffix ?? "";
        const star = suffix.includes("★");
        return `<li>
          <p class="stat-num"><span class="sr-only">${st.value.toFixed(st.decimals ?? 0)}${c.esc(suffix)}</span><span aria-hidden="true"><span data-count="${st.value}" data-decimals="${st.decimals ?? 0}">${(0).toFixed(st.decimals ?? 0)}</span>${star ? `<em>★</em>` : c.esc(suffix)}</span></p>
          <p class="stat-label">${c.esc(st.label)}</p>
          <p class="stat-desc">${c.esc(st.description)}</p>
        </li>`;
      })
      .join("");
    return `<section id="about" class="section about" aria-labelledby="about-title">
      <div class="wrap">
        <div class="about-top" data-reveal>
          ${label(c, s.about.eyebrow, "02")}
          <h2 id="about-title" class="about-title">${c.esc(s.about.title)}</h2>
          <div class="about-copy">
            <p class="about-text">${c.esc(s.about.text)}</p>
          </div>
        </div>
        <div class="band" data-reveal>
          <img src="./images/backdrops/hex-ceiling.webp" alt="" width="1600" height="1000" loading="lazy">
          <p class="band-quote">${c.esc(s.social?.vk?.description || "")}</p>
        </div>
        <ul class="stats" data-reveal>${stats}</ul>
      </div>
    </section>`;
  }

  function services(c) {
    const s = c.site;
    const d = s.sections.services;
    const cards = s.services
      .map((svc, i) => {
        const item = c.priceMap.get(svc.priceItem);
        const has = !!(svc.price || (item && item.price !== undefined));
        const price = svc.price || (has ? `от\u00a0${c.formatPrice(item.price)}` : "по запросу");
        return `<article class="card" data-reveal>
          <div class="card-img">${c.picture({ src: svc.image.src, srcSmall: svc.image.srcSmall, alt: svc.image.alt, width: svc.image.width, height: svc.image.height })}<span class="card-n">${n2(i)}</span></div>
          <div class="card-body">
            <div class="card-row"><h3 class="card-title">${c.esc(svc.title)}</h3><span class="card-price ${has ? "" : "is-muted"}">${c.esc(price)}</span></div>
            <p class="card-desc">${c.esc(svc.description)}</p>
            <button type="button" class="toggle" data-toggle-item="${c.esc(svc.priceItem)}" aria-pressed="false">
              <span class="t-off">${c.icon("plus")} Добавить в заявку</span><span class="t-on">${c.icon("check")} В заявке</span>
            </button>
          </div>
        </article>`;
      })
      .join("");
    return `<section id="services" class="section" aria-labelledby="services-title">
      <div class="wrap svc-layout">
        <div class="svc-aside">
          <div class="sticky" data-reveal>
            ${label(c, d.eyebrow, "03")}
            <h2 id="services-title" class="h2">${c.esc(d.title)}</h2>
            <p class="lead">${c.esc(d.lead)} Добавляйте услуги в заявку — смета соберётся в калькуляторе.</p>
            <a class="btn btn-ghost" href="#request">К калькулятору ${c.icon("arrow-right")}</a>
          </div>
        </div>
        <div class="cards">${cards}</div>
      </div>
    </section>`;
  }

  function beforeAfter(c) {
    const s = c.site;
    if (!s.beforeAfter.length) return "";
    const d = s.sections.beforeAfter;
    const p = s.beforeAfter[0];
    const frames = s.beforeAfter
      .map(
        (pr) => `<figure class="ba">
          <div class="ba-frame" data-ba style="aspect-ratio:${pr.before.width}/${pr.before.height};--pos:50%">
            <img class="ba-img" src="${c.esc(pr.before.src)}" alt="${c.esc(pr.before.alt)}" width="${pr.before.width}" height="${pr.before.height}" loading="lazy" draggable="false">
            <img class="ba-img ba-after" src="${c.esc(pr.after.src)}" alt="${c.esc(pr.after.alt)}" width="${pr.after.width}" height="${pr.after.height}" loading="lazy" draggable="false">
            <span class="ba-tag ba-tag-b" aria-hidden="true">До</span><span class="ba-tag ba-tag-a" aria-hidden="true">После</span>
            <span class="ba-line" aria-hidden="true"></span>
            <span class="ba-handle" data-ba-handle role="slider" tabindex="0" aria-label="Сравнение до и после: ${c.esc(pr.title)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="После: 50%">${c.icon("chevrons-left-right")}</span>
          </div>
          <figcaption class="sr-only">${c.esc(pr.title)}: ${c.esc(pr.caption)}</figcaption>
        </figure>`
      )
      .join("");
    return `<section id="before-after" class="section ba-sec" aria-labelledby="ba-title">
      <div class="wrap ba-grid">
        <div class="ba-media" data-reveal>${frames}</div>
        <div class="ba-copy" data-reveal>
          ${label(c, d.eyebrow, "04")}
          <h2 id="ba-title" class="h2">${c.esc(d.title)}</h2>
          <p class="lead">${c.esc(d.lead)}</p>
          <div class="ba-cap"><p class="ba-cap-t">${c.esc(p.title)}</p><p>${c.esc(p.caption)}</p></div>
          <p class="hint">${c.icon("chevrons-left-right")} Потяните разделитель, чтобы сравнить</p>
        </div>
      </div>
    </section>`;
  }

  function stars(c, n, labelText) {
    return `<span class="stars" role="img" aria-label="${c.esc(labelText)}">${Array.from({ length: n }, () => c.icon("star", "ico", true)).join("")}</span>`;
  }

  function reviews(c) {
    const s = c.site;
    if (!s.reviews.length) return "";
    const d = s.sections.reviews;
    const cards = s.reviews
      .map(
        (r) => `<li class="rv">
          <div class="rv-top">${stars(c, r.rating, `Оценка ${r.rating} из 5`)}<span class="rv-src">${c.esc(r.source)}</span></div>
          <blockquote>${c.esc(r.text).replace(/\n/g, "<br>")}</blockquote>
          <div class="rv-who"><span class="rv-av" aria-hidden="true">${c.esc(r.initials)}</span><span class="rv-name">${c.esc(r.author)}</span></div>
        </li>`
      )
      .join("");
    return `<section id="reviews" class="section reviews" aria-labelledby="reviews-title">
      <div class="wrap">
        <div class="head" data-reveal>
          <div>${label(c, d.eyebrow, "05")}<h2 id="reviews-title" class="h2">${c.esc(d.title)}</h2></div>
          <div class="head-side">
            <div class="score"><span class="score-n">${c.esc(s.reviewSummary.rating)}</span><span>${stars(c, Math.round(Number(s.reviewSummary.rating)), `Оценка ${s.reviewSummary.rating} из 5`)}<small>${c.esc(s.reviewSummary.text)}</small></span></div>
            ${arrows(c, "reviews-track", "Отзывы")}
          </div>
        </div>
      </div>
      <ul class="rv-track" id="reviews-track" tabindex="0" aria-label="Отзывы клиентов" data-reveal>${cards}</ul>
    </section>`;
  }

  function contacts(c) {
    const s = c.site;
    const ct = s.contacts;
    const vk = s.social?.vk;
    return `<section id="contacts" class="section" aria-labelledby="contacts-title">
      <div class="wrap">
        <div class="head head--solo" data-reveal>${label(c, s.sections.location.eyebrow, "06")}<h2 id="contacts-title" class="h2">${c.esc(s.sections.location.title)}</h2></div>
        <div class="contacts" data-reveal>
          <div class="c-info">
            <dl class="c-list">
              <div><dt>${c.icon("map-pin")} Адрес</dt><dd>${c.esc(ct.address)}</dd></div>
              <div><dt>${c.icon("clock")} Режим работы</dt><dd>${c.esc(ct.schedule)}${c.esc(ct.scheduleNote)}</dd></div>
              <div><dt>${c.icon("phone")} Телефон</dt><dd><a href="tel:${c.tel(ct.phone)}">${c.esc(ct.phone)}</a></dd></div>
            </dl>
            <div class="btn-row">
              <a class="btn btn-ink" href="#request">Записаться ${c.icon("arrow-right")}</a>
              <a class="btn btn-ghost" href="${c.esc(ct.yandexOrgUrl)}" target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах ${c.icon("arrow-up-right")}</a>
            </div>
            ${vk ? `<a class="vk" href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me"><span class="vk-ico">${c.vkIcon()}</span><span><b>${c.esc(vk.title)}</b><span>${c.esc(vk.name)} — ${c.esc(vk.description)}</span></span><span class="vk-go">${c.esc(vk.cta)} ${c.icon("arrow-up-right")}</span></a>` : ""}
          </div>
          <div class="map">
            <iframe src="${c.esc(ct.yandexWidgetUrl)}" title="${c.esc(ct.studioName)} на картах" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            <span class="map-label" aria-hidden="true"><i></i>${c.esc(ct.studioName)} · ${c.esc(ct.address.replace(/^Нижний Новгород,\s*/, ""))}</span>
            ${c.isTouch() ? `<button type="button" class="map-lock" data-unlock-map><span>Нажмите, чтобы двигать карту</span></button>` : ""}
          </div>
        </div>
        <div class="band band--cta" data-reveal>
          <img src="./images/backdrops/box-corridor.webp" alt="" width="1600" height="1000" loading="lazy">
          <div class="band-row">
            <div><p class="band-k">${c.esc(ct.schedule)}</p><p class="band-t">${c.esc(ct.address)}</p></div>
            <div class="band-act"><a class="btn btn-paper" href="#request">Записаться ${c.icon("arrow-right")}</a><a class="band-phone" href="tel:${c.tel(ct.phone)}">${c.esc(ct.phone)}</a></div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function request(c) {
    const s = c.site;
    const d = s.sections.request;
    const pills = [c.ALL, ...c.groups].map((g) => `<button type="button" class="pill" data-category="${c.esc(g)}" aria-pressed="${g === c.state.category}">${c.esc(g)}</button>`).join("");
    return `<section id="request" class="section request" aria-labelledby="request-title">
      <div class="wrap">
        <div class="head" data-reveal>
          <div>${label(c, d.eyebrow, "07")}<h2 id="request-title" class="h2">${c.esc(d.title)}</h2></div>
          <div class="head-side"><p class="lead">${c.esc(d.lead)}</p></div>
        </div>
        <div class="req" data-reveal>
          <div class="req-main">
            <div class="pills" role="group" aria-label="Категории услуг">${pills}</div>
            <div class="req-list" data-region="reqList"></div>
          </div>
          <aside class="req-panel" aria-label="Смета работ">
            <div class="panel-head"><h3>Смета работ</h3><span class="count" data-region="reqCount"></span></div>
            <div data-region="reqSelected"></div>
            <div data-region="reqTotal"></div>
            <div class="panel-note"><p class="pn-title">${c.icon("check")} ${c.esc(d.standard.title)}</p><p>${c.esc(d.standard.text)}</p></div>
            <div id="lead-form-anchor" data-region="reqForm"></div>
          </aside>
        </div>
      </div>
      <div class="req-dock" data-region="reqDock"></div>
    </section>`;
  }

  function footer(c) {
    const s = c.site;
    const lg = s.legal || {};
    const vk = s.social?.vk;
    const docs = [
      ["./legal/privacy.html", "Политика обработки персональных данных"],
      ["./legal/consent.html", "Согласие на обработку ПДн"],
      ["./legal/terms.html", "Пользовательское соглашение"],
      ["./legal/cookies.html", "Политика cookie"],
      ["./legal/offer.html", "Публичная оферта"],
    ];
    return `<footer class="footer">
      <div class="wrap">
        <div class="footer-top">
          <p class="footer-big">Детейлинг в Нижнем Новгороде: тонировка, бронирование плёнкой, химчистка салона.</p>
          <a class="btn btn-paper" href="#request">Записаться ${c.icon("arrow-right")}</a>
        </div>
        <div class="footer-grid">
          <div><a href="#hero" aria-label="${c.esc(s.brand.name)} — на главную">${markLight(c, "footer-mark")}</a></div>
          <div><p class="f-h">Разделы</p><ul>${s.nav.map((i) => `<li><a href="${c.esc(i.href)}">${c.esc(i.label)}</a></li>`).join("")}</ul></div>
          <div><p class="f-h">Контакты</p><ul>
            <li>${c.esc(s.contacts.address)}</li><li>${c.esc(s.contacts.schedule)}</li>
            <li><a href="tel:${c.tel(s.contacts.phone)}">${c.esc(s.contacts.phone)}</a></li>
            ${vk ? `<li><a href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me">Мы ВКонтакте</a></li>` : ""}
          </ul></div>
          <div><p class="f-h">Документы</p><ul>${docs.map(([h, l]) => `<li><a href="${h}">${c.esc(l)}</a></li>`).join("")}</ul></div>
          <div><p class="f-h">Реквизиты</p><ul>
            <li class="ph">${c.esc(lg.legalName || "[ИП ФИО]")}</li>
            <li>ИНН: <span class="ph">${c.esc(lg.inn || "[ИНН]")}</span></li>
            <li>ОГРН/ОГРНИП: <span class="ph">${c.esc(lg.ogrn || "[ОГРН/ОГРНИП]")}</span></li>
            <li>E-mail: <span class="ph">${c.esc(lg.email || "[email]")}</span></li>
            <li>Телефон: <span class="ph">${c.esc(lg.phone || "[телефон]")}</span></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${c.esc(s.contacts.studioName)} · ${c.esc(s.brand.city)}</span>
          <span><a href="./legal/cookies.html">Cookie</a> · <a href="./legal/offer.html">Цены не являются публичной офертой</a></span>
        </div>
      </div>
    </footer>`;
  }

  function cookie() {
    return `<div id="cookie-banner" class="cookie" hidden role="dialog" aria-label="Уведомление об использовании cookie">
      <p>Мы используем cookie, чтобы сайт работал стабильно и было удобнее пользоваться формой заявки. Подробности — в <a href="./legal/cookies.html">политике cookie</a>.</p>
      <button type="button" class="btn btn-ink btn-sm" data-cookie-accept>Понятно</button>
    </div>`;
  }

  const plural = (n) => (n % 10 === 1 && n % 100 !== 11 ? "позиция" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "позиции" : "позиций");

  const regions = {
    reqList(c) {
      const items = c.state.category === c.ALL ? c.site.priceList : c.site.priceList.filter((i) => i.group === c.state.category);
      return items
        .map(
          (i) => `<button type="button" class="row" data-toggle-item="${c.esc(i.key)}" aria-pressed="false">
            <span class="row-text"><span class="row-group">${c.esc(i.group)}</span><span class="row-title">${c.esc(i.title)}</span>${i.note && i.note !== i.title ? `<span class="row-note">${c.esc(i.note)}</span>` : ""}</span>
            <span class="row-price">${i.price === undefined ? `<span class="is-muted">по запросу</span>` : `<small>от</small> ${c.formatPrice(i.price)}`}</span>
            <span class="row-check" aria-hidden="true">${c.icon("plus")}${c.icon("check")}</span>
          </button>`
        )
        .join("");
    },
    reqCount(c) {
      const n = c.booking().items.length;
      return `${n} ${plural(n)}`;
    },
    reqDock(c) {
      const b = c.booking();
      if (!b.items.length) return "";
      return `<div class="dock-in"><span class="dock-n">Смета · ${b.items.length}</span><span class="dock-sum">${b.total > 0 ? `от ${c.formatPrice(b.total)}` : "по запросу"}</span><button type="button" class="dock-btn" data-go-form>К заявке ${c.icon("arrow-right")}</button></div>`;
    },
    reqSelected(c) {
      const b = c.booking();
      if (!b.items.length) return `<p class="sel-empty">Отметьте услуги в списке — смета соберётся здесь.</p>`;
      return `<ul class="sel">${b.items
        .map((i) => `<li><span class="sel-t">${c.esc(i.title)}<small>${c.esc(i.group)}</small></span><span class="sel-p">${i.price === undefined ? "по запросу" : c.formatPrice(i.price)}</span><button type="button" class="sel-x" data-remove-item="${c.esc(i.key)}" aria-label="Убрать: ${c.esc(i.title)}">${c.icon("x")}</button></li>`)
        .join("")}</ul><button type="button" class="link-btn" data-clear>Очистить</button>`;
    },
    reqTotal(c) {
      const b = c.booking();
      return `<div class="total"><p class="total-label">Расчётная стоимость</p><p class="total-sum" aria-live="polite">${b.total > 0 ? `<small>от</small> ${c.formatPrice(b.total)}` : "—"}</p><p class="total-note">* ${c.esc(c.site.sections.request.totalNote)}${b.hasOnRequest ? "; позиции «по запросу» мастер оценит на осмотре" : ""}</p></div>`;
    },
    reqForm(c) {
      const st = c.state;
      if (st.formDone) {
        return `<div class="done" role="status">${c.icon("circle-check", "ico done-ico")}<h3>Заявка принята</h3><p>Мы перезвоним, чтобы подтвердить время.</p><p class="small">Данные пока никуда не отправляются: форма работает в демонстрационном режиме.</p><button type="button" class="btn btn-paper btn-sm" data-reset-form>Отправить ещё одну</button></div>`;
      }
      const e = c.errors();
      const f = (id, key, lbl, opt, attrs) => `<div class="field ${e[key] ? "has-err" : ""}">
        <label for="${id}">${c.esc(lbl)}${opt ? " <span>(необязательно)</span>" : ""}</label>
        <input id="${id}" value="${c.esc(st.form[key])}" ${e[key] ? `aria-invalid="true" aria-describedby="${id}-err"` : ""} ${attrs}>
        ${e[key] ? `<p class="err" id="${id}-err">${c.esc(e[key])}</p>` : ""}
      </div>`;
      return `<form id="lead-form" class="form" novalidate>
        ${f("lead-name", "name", "Ваше имя", false, 'type="text" autocomplete="name" data-field="name"')}
        ${f("lead-phone", "phone", "Телефон", false, 'type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" data-field="phone"')}
        ${f("lead-car", "car", "Марка и модель авто", true, 'type="text" placeholder="Например, Mazda 6" data-field="car"')}
        <label class="consent ${e.consent ? "has-err" : ""}"><input type="checkbox" id="lead-consent" data-field="consent" ${st.form.consent ? "checked" : ""} ${e.consent ? 'aria-invalid="true"' : ""}><span class="cbox" aria-hidden="true">${c.icon("check")}</span><span>Я даю <a href="./legal/consent.html" target="_blank" rel="noopener">согласие на обработку персональных данных</a> и принимаю <a href="./legal/privacy.html" target="_blank" rel="noopener">политику конфиденциальности</a>.</span></label>
        ${e.consent ? `<p class="err">${c.esc(e.consent)}</p>` : ""}
        <button type="submit" class="btn btn-paper btn-block" ${st.formSending ? "disabled" : ""}>${st.formSending ? "Отправляем…" : `Отправить заявку ${c.icon("arrow-right")}`}</button>
      </form>`;
    },
  };

  function page(c) {
    return `<a class="skip" href="#works">Перейти к содержанию</a>
      ${header(c)}
      <main>
        ${hero(c)}
        ${works(c)}
        ${about(c)}
        ${services(c)}
        ${beforeAfter(c)}
        ${reviews(c)}
        ${contacts(c)}
        ${request(c)}
      </main>
      ${footer(c)}
      ${cookie()}`;
  }

  function afterRender(c) {
    const frame = document.getElementById("hero-frame");
    if (!frame) return;
    const place = () => {
      const narrow = window.innerWidth < 768;
      const p = narrow ? c.site.hero.narrow : c.site.hero.wide;
      const W = frame.clientWidth;
      const H = frame.clientHeight;
      const sc = Math.max(W / p.width, H / p.height);
      const dh = p.height * sc;
      const dw = p.width * sc;
      const oy = (H - dh) * p.focusY;
      const ox = (W - dw) * p.focusX;
      const fs = p.textSize * dh;
      frame.style.setProperty("--obj", `${p.focusX * 100}% ${p.focusY * 100}%`);
      frame.classList.toggle("is-narrow", narrow);
      if (narrow) {
        frame.style.setProperty("--logo-h", `${Math.min(H * 0.17, W * 0.3)}px`);
        frame.style.setProperty("--logo-top", `${H * 0.12}px`);
      } else {
        frame.style.setProperty("--logo-h", `${fs * 1.3}px`);
        frame.style.setProperty("--logo-top", `${oy + p.textTop * dh + fs * 0.3}px`);
      }
      frame.style.setProperty("--logo-x", `${ox + dw * 0.5}px`);
    };
    place();
    window.addEventListener("resize", place, { passive: true });
    /* Перетаскивание галерей мышью */
    document.querySelectorAll(".gallery, .rv-track").forEach((track) => {
      let down = false, sx = 0, sl = 0, moved = false;
      track.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse") return;
        down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
        track.classList.add("is-drag");
      });
      window.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = sl - dx;
      });
      window.addEventListener("pointerup", () => { down = false; track.classList.remove("is-drag"); });
      track.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    });
  }

  return { page, regions, afterRender };
})();
