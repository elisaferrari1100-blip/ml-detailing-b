/**
 * Контент и настройки сайта студии ML.
 * Меняйте тексты, цены и фото здесь — разметка соберётся сама.
 *
 * Отправка заявок: реализуйте window.ML_SITE.submitLead(payload).
 * По умолчанию форма в демонстрационном режиме (заявки никуда не уходят).
 */
window.ML_SITE = {
  /**
   * Публичный адрес сайта. Сейчас стоит ЗАГЛУШКА.
   * Перед публикацией замените на ваш домен и выполните:
   *   python3 tools/set-domain.py https://ваш-домен.ru
   * Скрипт обновит это поле, index.html, legal/*.html, robots.txt,
   * sitemap.xml и site.webmanifest.
   */
  siteUrl: "https://example.ru",

  brand: {
    name: "ML",
    short: "ML",
    heroWords: ["ML"],
    kicker: "Детейлинг · Нижний Новгород",
    slogan: "Забота о вашем автомобиле на профессиональном уровне!",
    city: "Нижний Новгород",
    logoMark: "./brand/logo-flat-v9-mark.webp",
    logoLockup: "./brand/logo-flat-v9.webp",
    logoPng: "./brand/logo-512.png",
    logoHero: "./brand/logo-flat-v9.webp",
    logoHeroPng: "./brand/logo-flat-v9.png",
    logoMarkPng: "./brand/logo-flat-v9-mark.png",
    ogImage: "./brand/og-1200x630.png",
  },

  seo: {
    title: "Детейлинг в Нижнем Новгороде — студия ML | тонировка, бронирование плёнкой, химчистка",
    description: "Студия детейлинга ML в Нижнем Новгороде (ул. Коминтерна, 43А, корп. 2): тонировка от 2 500 ₽, бронирование кузова плёнкой, химчистка салона, полировка фар, антихром, мойка двигателя. Пн–Пт 10:00–20:00. Запись: +7 (999) 120-44-88.",
    keywords: "детейлинг Нижний Новгород, тонировка Нижний Новгород, бронирование плёнкой, полиуретановая плёнка, химчистка салона, полировка фар, антихром, антидождь, мойка двигателя, детейлинг-студия ML, Коминтерна 43А",
  },

  social: {
    vk: {
      url: "https://vk.ru/mldetailing",
      name: "ML Detailing",
      title: "Мы ВКонтакте",
      description: "Детейлинг-центр «ML» — забота о вашем автомобиле на профессиональном уровне!",
      cta: "Открыть сообщество",
    },
  },

  /**
   * Юридические реквизиты — ШАБЛОНЫ. Не вымышлены: заполните реальные данные перед публикацией.
   */
  legal: {
    legalName: "[ИП ФИО]",
    inn: "[ИНН]",
    ogrn: "[ОГРН/ОГРНИП]",
    email: "[email]",
    phone: "[телефон]",
    docsUpdated: "16.11.2026",
  },
  theme: {
    accent: "#e5b869",
    accentLight: "#f3d9a4",
    accentDeep: "#b98b3e",
    background: "#070709",
    surface: "#101115",
  },
  fonts: {
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Unbounded:wght@400;500;600;700&display=swap",
    display: "'Unbounded', ui-sans-serif, system-ui, sans-serif",
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
  },
  hero: {
    narrow: {
      bg: "./images/hero/narrow-bg.webp",
      car: "./images/hero/narrow-car.webp",
      width: 1080,
      height: 1080,
      alt: "Автомобиль в студии ML",
      focusX: 0.49,
      focusY: 0.545,
      textTop: 0.258,
      textSize: 0.106,
      carTop: 0.329,
    },
    wide: {
      bg: "./images/hero/wide-bg.webp",
      car: "./images/hero/wide-car.webp",
      width: 2400,
      height: 2400,
      focusX: 0.498,
      focusY: 0.4,
      textTop: 0.225,
      textSize: 0.106,
      bg4k: "./images/hero/wide-bg-4k.webp",
      car4k: "./images/hero/wide-car-4k.webp",
    },
  },
  nav: [
    { href: "#works", label: "Работы" },
    { href: "#services", label: "Услуги" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
    { href: "#request", label: "Цены" },
  ],
  strips: {
    services: [
      "Тонировка",
      "Мойка",
      "Стёкла",
      "Бронирование плёнкой",
      "Химчистка салона",
      "Антихром",
      "Полировка и защита фар",
    ],
    brand: ["ML", "Detailing", "Нижний Новгород", "Нижний Новгород", "ML", "Detailing"],
  },
  sections: {
    works: {
      eyebrow: "Наши работы",
      title: "Поток работ",
      lead: "Автомобили клиентов студии — фото с Яндекс Карт.",
    },
    services: {
      eyebrow: "Услуги",
      title: "Что мы делаем с автомобилем",
      lead: "Основные направления студии.",
      hintDesktop: "Нажмите на услугу, чтобы открыть подробности",
      hintTouch: "Откройте услугу, чтобы добавить её в заявку",
    },
    cases: { eyebrow: "Разбор работ", title: "Процесс и результат" },
    beforeAfter: {
      eyebrow: "До и после",
      title: "Разница видна сразу",
      lead: "Настоящие фото из студии.",
    },
    reviews: { eyebrow: "Отзывы", title: "Нам доверяют автомобили" },
    location: { eyebrow: "Как добраться", title: "Как нас найти" },
    request: {
      eyebrow: "Калькулятор",
      title: "Соберите заявку",
      lead: "Отметьте услуги — сразу увидите ориентир по цене. Точную стоимость назовут после осмотра.",
      standard: {
        title: "Как считается цена",
        text: "Цены — ориентир по прайсу студии на Яндекс Картах. Точная стоимость зависит от автомобиля.",
      },
      totalNote: "ориентир по прайсу студии",
    },
  },
  about: {
    eyebrow: "О студии",
    title: "ML",
    text: "Нижний Новгород, ул. Коминтерна, 43А, корп. 2",
  },
  stats: [
    {
      key: "rating",
      value: 5,
      decimals: 1,
      suffix: " ★",
      label: "на Яндекс Картах",
      description: "Средняя оценка студии по 88 оценкам.",
    },
    {
      key: "ratings",
      value: 88,
      label: "оценок клиентов",
      description: "Оценки, которые клиенты поставили студии на Яндекс Картах.",
    },
    {
      key: "reviews",
      value: 78,
      label: "отзывов",
      description: "Отзывы клиентов на Яндекс Картах.",
    },
    {
      key: "services",
      value: 7,
      label: "позиций в прайсе",
      description: "Услуги с ценами, опубликованные студией.",
    },
  ],
  worksRow1: [
    { key: "work-00", badge: "Porsche Panamera", src: "./images/works/work-00.webp", srcSmall: "./images/works/work-00-800.webp", alt: "Porsche Panamera — ML", width: 1280, height: 800 },
    { key: "work-01", badge: "Mercedes-Benz G-Class", src: "./images/works/work-01.webp", srcSmall: "./images/works/work-01-800.webp", alt: "Mercedes-Benz G-Class — ML", width: 1280, height: 800 },
    { key: "work-02", badge: "Mercedes-Benz CLS", src: "./images/works/work-02.webp", srcSmall: "./images/works/work-02-800.webp", alt: "Mercedes-Benz CLS — ML", width: 1280, height: 800 },
    { key: "work-03", badge: "Работа студии", src: "./images/works/work-03.webp", srcSmall: "./images/works/work-03-800.webp", alt: "Работа студии — ML", width: 1280, height: 800 },
    { key: "work-04", badge: "Работа студии", src: "./images/works/work-04.webp", srcSmall: "./images/works/work-04-800.webp", alt: "Работа студии — ML", width: 1280, height: 800 },
  ],
  worksRow2: [
    { key: "work-05", badge: "Mercedes-Benz S-Class", src: "./images/works/work-05.webp", srcSmall: "./images/works/work-05-800.webp", alt: "Mercedes-Benz S-Class — ML", width: 1280, height: 800 },
    { key: "work-06", badge: "Porsche Cayenne", src: "./images/works/work-06.webp", srcSmall: "./images/works/work-06-800.webp", alt: "Porsche Cayenne — ML", width: 912, height: 570 },
    { key: "work-07", badge: "Работа студии", src: "./images/works/work-07.webp", srcSmall: "./images/works/work-07-800.webp", alt: "Работа студии — ML", width: 1280, height: 800 },
    { key: "work-08", badge: "Работа студии", src: "./images/works/work-08.webp", srcSmall: "./images/works/work-08-800.webp", alt: "Работа студии — ML", width: 960, height: 600 },
    { key: "work-09", badge: "Работа студии", src: "./images/works/work-09.webp", srcSmall: "./images/works/work-09-800.webp", alt: "Работа студии — ML", width: 961, height: 601 },
  ],
  services: [
    {
      key: "ppf",
      title: "Бронирование плёнкой",
      description: "Защита кузова полиуретановой плёнкой: весь кузов или зоны риска (капот, бампер, фары, пороги). Плёнка держит сколы и мелкие царапины, лак остаётся как с завода.",
      priceItem: "ppf-x0",
      image: { src: "./images/services/ppf.webp", srcSmall: "./images/services/ppf-800.webp", alt: "Бронирование плёнкой — работа студии ML", width: 1024, height: 1280 },
    },
    {
      key: "tint",
      title: "Тонировка",
      description: "Тонировка стёкол автомобиля. В прайсе студии: тонировка переднего полукруга автомобиля, тонировка боковых стекол, тонировка заднего полукруга автомобиля.",
      priceItem: "tint-3",
      price: "от 2\u00a0500\u00a0₽",
      image: { src: "./images/services/tint.webp", srcSmall: "./images/services/tint-800.webp", alt: "Тонировка — работа студии ML", width: 960, height: 1200 },
    },
    {
      key: "interior",
      title: "Химчистка салона",
      description: "Полная химчистка салона: сиденья, потолок, ковры и пол, пластик. Убираем пятна и соляные разводы.",
      priceItem: "interior-x0",
      image: { src: "./images/services/interior.webp", srcSmall: "./images/services/interior-800.webp", alt: "Химчистка салона — работа студии ML", width: 961, height: 1201 },
    },
    {
      key: "optics",
      title: "Полировка и защита фар",
      description: "Полировка помутневших фар и защита плёнкой: прозрачный пластик, светопропускание не меняется.",
      priceItem: "optics-x0",
      image: { src: "./images/services/optics.webp", srcSmall: "./images/services/optics-800.webp", alt: "Полировка и защита фар — работа студии ML", width: 1024, height: 1280 },
    },
    {
      key: "styling",
      title: "Антихром",
      description: "Оклейка хромированных элементов чёрной плёнкой: молдинги, решётка, окантовка окон. Обратимо, родной хром под плёнкой цел.",
      priceItem: "styling-x0",
      image: { src: "./images/services/styling.webp", srcSmall: "./images/services/styling-800.webp", alt: "Антихром — работа студии ML", width: 1024, height: 1280 },
    },
    {
      key: "wash",
      title: "Мойка двигателя",
      description: "Детейлинг-мойка подкапотного пространства с консервацией: двигатель и отсек чистые, пластик и резина защищены.",
      priceItem: "wash-0",
      price: "от 3\u00a0500\u00a0₽",
      image: { src: "./images/services/wash.webp", srcSmall: "./images/services/wash-800.webp", alt: "Мойка двигателя — работа студии ML", width: 768, height: 960 },
    },
  ],
  /* Пустой массив скрывает блок «Разбор работ», как на оригинальном сайте. */
  cases: [],
  beforeAfter: [
    {
      key: "pair-0",
      title: "Мойка двигателя",
      caption: "Подкапотное пространство до и после детейлинг-мойки с консервацией.",
      before: { src: "./images/before-after/pair-0-before.webp", alt: "Мойка двигателя: до работ", width: 1400, height: 1789 },
      after: { src: "./images/before-after/pair-0-after.webp", alt: "Мойка двигателя: после работ", width: 1400, height: 1789 },
    },
  ],
  reviewSummary: { rating: "5.0", text: "на основе 88 оценок в Яндекс Картах" },
  reviews: [
    {
      key: "r0",
      author: "Даниил Романов",
      initials: "ДР",
      rating: 5,
      text: "Езжу в эту студию уже не первый раз — и ни разу не разочаровался! В последний визит делал тонировку — всё, как всегда, на высшем уровне: аккуратно, быстро, без каких‑либо дефектов. Мастера знают своё дело, общаются вежливо и всегда подскажут, если есть вопросы. Видно, что работают с душой. Однозначно 5 звёзд и моя искренняя рекомендация!",
      source: "Яндекс Карты",
    },
    {
      key: "r1",
      author: "Дима Перлов",
      initials: "ДП",
      rating: 5,
      text: "«Если хотите сделать тонировку один раз и забыть — вам сюда. Ребята приклеили пленку аккуратно, формовку заднего сложного стекла на Ауди сделали с первого раза без брака. Визуально машина стала эстетичнее а пленка лежит как родная краска. Никаких \"паутинок\". Сделали быстро, ценник честный, гарантия на руках. Сервис уровня А+».",
      source: "Яндекс Карты",
      rawQuoted: true,
    },
    {
      key: "r2",
      author: "Наталия Д.",
      initials: "НД",
      rating: 5,
      text: "Обратилась за детейлинг мойкой автомобиля, чистота как в операционной. \nТак же решила передлать заднюю полусферу, выбрала 5% тонировку, ребята сделали быстро и самое главное качественно.\nВсе объяснили и показали.\nОднозначно рекомендую и буду обращаться снова👍",
      source: "Яндекс Карты",
    },
    {
      key: "r3",
      author: "александр м.",
      initials: "АМ",
      rating: 5,
      text: "Посетил на этот раз мойку, (комплекс) по предварительной записи без ожиданий в назначенное время что очень удобно. Качественно намыли ( двумя видами пены) доп обработкой особо загрязненных мест, пылесос, протирки, дверные проемы, чернение резины…\nАвто выехал как новое, парни молодцы, рекомендую.",
      source: "Яндекс Карты",
    },
    {
      key: "r4",
      author: "Александр Волков",
      initials: "АВ",
      rating: 5,
      text: "Оставлял машину в химчистку салона и мойку мотора. Ребята молодцы, отлично справились. Салон был грязный, особенно пол весь в соленых белых разводах. Теперь как новый. Ещё и фары отполировали в подарок!👍 Круто! Желаю удачи и процветания!",
      source: "Яндекс Карты",
    },
    {
      key: "r5",
      author: "Дарья Власова",
      initials: "ДВ",
      rating: 5,
      text: "Записывались только на тонировку, но ребята молодцы - подсказали, что новую машину лучше сразу обклеить бронепленкой. Сделали всё супер класс! Мастера своего дела, работают быстро и аккуратно. Теперь и стекла тонированные, и кузов под защитой. Огромное спасибо, рекомендую!",
      source: "Яндекс Карты",
    },
  ],
  contacts: {
    studioName: "ML",
    address: "Нижний Новгород, ул. Коминтерна, 43А, корп. 2",
    district: "Нижний Новгород, улица Коминтерна, 43А, корп. 2",
    schedule: "Пн–Пт 10:00–20:00",
    scheduleNote: "",
    yandexOrgUrl: "https://yandex.ru/maps/org/ml/13418438493/",
    yandexWidgetUrl: "https://yandex.ru/map-widget/v1/?ll=43.885406%2C56.3449&z=16&pt=43.885406,56.3449,pm2rdm&l=map",
    phone: "+7 (999) 120-44-88",
  },
  priceList: [
    { key: "tint-2", group: "Тонировка", title: "Тонировка переднего полукруга автомобиля", note: "Тонировка переднего полукруга автомобиля — это затемнение лобового и передних боковых стёкол, которое решает сразу несколько задач: снижает нагрев салона в жару, защищает глаза водителя от яркого солнца или от лишних глаз.", price: 5000 },
    { key: "tint-3", group: "Тонировка", title: "Тонировка боковых стекол", note: "Тонировка боковых стекол", price: 2500 },
    { key: "tint-4", group: "Тонировка", title: "Тонировка заднего полукруга автомобиля", note: "Тонировка заднего полукруга для комфорта и защиты от солнца. Подбираем плёнку под ваш автомобиль, аккуратно работаем с обогревом.", price: 5000 },
    { key: "wash-0", group: "Мойка", title: "Детейлинг мойка подкапотного пространства с консервацией", note: "Детейлинг мойка подкапотного пространства с консервацией от 3.500₽, стоимость зависит от степени загрязнения и класса автомобиля.", price: 3500 },
    { key: "wash-1", group: "Мойка", title: "Детейлинг Мойка", note: "Уход за кузовом и салоном автомобиля", price: 500 },
    { key: "glass-5", group: "Стёкла", title: "Чистка водного камня", price: 500 },
    { key: "glass-6", group: "Стёкла", title: "Антидождь", note: "Антидождь от 1.500₽", price: 1500 },
    { key: "ppf-x0", group: "Бронирование плёнкой", title: "Бронирование кузова целиком" },
    { key: "ppf-x1", group: "Бронирование плёнкой", title: "Бронирование зон риска" },
    { key: "ppf-x2", group: "Бронирование плёнкой", title: "Бронирование фар" },
    { key: "interior-x0", group: "Химчистка салона", title: "Полная химчистка салона" },
    { key: "interior-x1", group: "Химчистка салона", title: "Химчистка сидений" },
    { key: "styling-x0", group: "Антихром", title: "Антихром" },
    { key: "optics-x0", group: "Полировка и защита фар", title: "Полировка фар" },
    { key: "optics-x1", group: "Полировка и защита фар", title: "Защита фар плёнкой" },
  ],

  /**
   * Единственная точка подключения отправки заявок.
   * Сейчас демонстрационный режим: только пауза, без сети.
   * Чтобы включить отправку, замените тело функции, например:
   *
   *   return fetch("/api/leads", {
   *     method: "POST",
   *     headers: { "Content-Type": "application/json" },
   *     body: JSON.stringify(payload),
   *   }).then((r) => { if (!r.ok) throw new Error("Ошибка отправки"); });
   *
   * payload: { name, phone, car, items, total, hasOnRequest }
   */
  async submitLead(payload) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("ML_SITE demo lead (не отправлено):", payload);
  },
};
