(function () {
  const NICHES = [
    { slug: "productivity", label: { ru: "Продуктивность", en: "Productivity" } },
    { slug: "habit-tracker", label: { ru: "Трекер привычек", en: "Habit Tracker" } },
    { slug: "finance", label: { ru: "Финансы", en: "Finance" } },
    { slug: "ai-chat", label: { ru: "AI-чат", en: "AI Chat" } },
    { slug: "fitness", label: { ru: "Фитнес", en: "Fitness" } }
  ];

  const COPY = {
    ru: {
      badge: "Закрытая beta",
      heroTitle: "Ежедневные сигналы с рынка приложений",
      heroLead: "IndieRadar следит за публичными данными App Store и Google Play в вашей нише и присылает компактную ежедневную сводку в Telegram — плюс полный отчёт на сайте.",
      ctaTelegram: "Открыть Telegram-бота",
      ctaBrowse: "Смотреть все ниши",
      heroNote: "Для инди-разработчиков мобильных приложений. Все отчёты открыты на сайте без регистрации — плюс ежедневная сводка в Telegram.",
      featuresTitle: "Что приходит каждый день",
      featuresIntro: "Меньше ручного мониторинга стора. Больше структурированных сигналов, на которые можно опираться.",
      feature1Title: "Темы из отзывов",
      feature1Body: "Жалобы и похвалы в отзывах конкурентов — баги, цена, нехватка функций.",
      feature2Title: "Приоритетные сигналы",
      feature2Body: "Что изменилось за 24 часа: новые приложения, обновления, заметные сдвиги.",
      feature3Title: "Полная сводка на сайте",
      feature3Body: "Пульс в Telegram ведёт на читаемый отчёт с оглавлением, еженедельным обзором и детализацией по приложениям.",
      browseIntro: "Открывайте ежедневные и еженедельные сводки и карточки приложений — без подписки и входа.",
      howTitle: "Как это работает",
      step1: "Откройте @IndieRadarBot и выберите язык и нишу — или сразу смотрите отчёты на сайте.",
      step2: "Получайте компактную ежедневную сводку в Telegram, когда есть значимые изменения.",
      step3: "Переходите на полный отчёт — ежедневный, еженедельный или темы по каждому приложению.",
      tagline: "Публичные ежедневные сводки по нишам App Store и Google Play",
      allNiches: "Все ниши",
      openDaily: "Ежедневная сводка",
      openWeekly: "Еженедельная сводка",
      apps: "Приложения",
      updated: "Обновлено",
      loading: "Загрузка…",
      home: "Все ниши",
      daily: "Ежедневная",
      weekly: "Еженедельная",
      noApps: "Список приложений пуст",
      footer: "Публичные данные из стора · без регистрации",
      telegram: "Telegram-бот",
      loadError: "Не удалось загрузить ниши.",
      reportLoadError: "Не удалось загрузить отчёт.",
      reportNotFound: "Данные отчёта не найдены.",
      exampleLabel: "Пример:",
      exampleOr: "или",
      periodWeek: " · неделя",
      appFallback: "Приложение",
      languageAria: "Язык",
      periodNavAria: "Период отчёта",
      nicheAnchorsAria: "Переход к нише",
      backToTop: "Наверх"
    },
    en: {
      badge: "Closed beta",
      heroTitle: "Daily signals from your app market",
      heroLead: "IndieRadar monitors public App Store and Google Play data in your niche and sends a compact daily brief in Telegram — plus a full report on the web.",
      ctaTelegram: "Open Telegram bot",
      ctaBrowse: "Browse all niches",
      heroNote: "Built for solo indie mobile devs. All reports are open on the web — no sign-up. Daily brief in Telegram too.",
      featuresTitle: "What you get every day",
      featuresIntro: "Less manual store scrolling. More structured signals you can act on.",
      feature1Title: "Review themes",
      feature1Body: "Clustered pain points and praise from competitor reviews — bugs, pricing, missing features.",
      feature2Title: "Priority signals",
      feature2Body: "What changed in the last 24 hours: new apps, updates, and shifts worth noticing.",
      feature3Title: "Full brief on the web",
      feature3Body: "Telegram pulse links to a readable report with TOC, weekly view, and per-app drill-down.",
      browseIntro: "Open daily, weekly, and per-app reports — no subscription or login.",
      howTitle: "How it works",
      step1: "Open @IndieRadarBot and pick language + niche — or browse reports on the web right away.",
      step2: "Get a compact daily brief in Telegram when something meaningful changed.",
      step3: "Follow links to the full report — daily, weekly, or per-app themes.",
      tagline: "Public daily briefs for App Store and Google Play niches",
      allNiches: "All niches",
      openDaily: "Daily brief",
      openWeekly: "Weekly brief",
      apps: "Apps",
      updated: "Updated",
      loading: "Loading…",
      home: "All niches",
      daily: "Daily",
      weekly: "Weekly",
      noApps: "No exported apps",
      footer: "Public store data · no sign-up",
      telegram: "Telegram bot",
      loadError: "Failed to load niches.",
      reportLoadError: "Unable to load report.",
      reportNotFound: "Report data not found.",
      exampleLabel: "Example:",
      exampleOr: "or",
      periodWeek: " · week",
      appFallback: "App",
      languageAria: "Language",
      periodNavAria: "Report period",
      nicheAnchorsAria: "Jump to niche",
      backToTop: "Back to top"
    }
  };

  const LANG_KEY = "indieradar.lang";

  function getLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "ru" || saved === "en") {
        return saved;
      }
    } catch {
      // ignore
    }

    return (navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "en";
  }

  function setLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  }

  function t(lang, key) {
    return COPY[lang]?.[key] ?? COPY.en[key] ?? key;
  }

  function nicheLabel(niche, lang) {
    return niche.label[lang] ?? niche.label.en;
  }

  function reportHref(nicheSlug, locale, options) {
    options = options || {};
    const base = "/report/" + nicheSlug + "/" + locale;

    if (options.appId) {
      return base + "/app/" + encodeURIComponent(options.appId) + "/";
    }

    if (options.period === "week") {
      return base + "/week/";
    }

    return base + "/";
  }

  function dataRoot() {
    return new URL("data/reports/", window.location.href);
  }

  async function fetchJson(relativePath) {
    const url = new URL(relativePath, dataRoot());
    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    return response.json();
  }

  async function fetchNicheBundle(nicheSlug, locale) {
    const daily = await fetchJson(nicheSlug + "/" + locale + "/daily.json");
    const manifest = await fetchJson(nicheSlug + "/" + locale + "/manifest.json");
    return { daily, manifest };
  }

  function formatGeneratedAt(value, locale) {
    if (!value) {
      return "—";
    }

    return new Date(value).toLocaleString(locale === "ru" ? "ru-RU" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function parseReportPath(pathname) {
    pathname = pathname || window.location.pathname;
    const match = pathname.match(/^\/report\/([^/]+)\/(ru|en)(?:\/(week|app\/([^/]+)))?\/?$/);

    if (!match) {
      return null;
    }

    return {
      appId: match[3] === "app" && match[4] ? decodeURIComponent(match[4]) : null,
      locale: match[2],
      niche: match[1],
      period: match[3] === "week" ? "week" : null
    };
  }

  function parseReportQuery(search) {
    search = search || window.location.search;
    const params = new URLSearchParams(search);
    const q = params.get("q");

    if (q) {
      const parts = q.split("/").filter(Boolean);
      const niche = parts[0] || "productivity";
      const locale = parts[1] === "ru" || parts[1] === "en" ? parts[1] : "ru";

      if (parts[2] === "week") {
        return { appId: null, locale, niche, period: "week" };
      }

      if (parts[2] === "app" && parts[3]) {
        return { appId: parts.slice(3).join("/"), locale, niche, period: null };
      }

      return { appId: null, locale, niche, period: null };
    }

    return {
      appId: params.get("app"),
      locale: params.get("locale") === "en" ? "en" : "ru",
      niche: params.get("niche") || "productivity",
      period: params.get("period") === "week" ? "week" : null
    };
  }

  function mountLangSwitch(container, onChange, lang) {
    lang = lang || getLang();
    container.innerHTML =
      '<div class="lang-switch" role="group" aria-label="' + escapeHtml(t(lang, "languageAria")) + '">' +
      '<button type="button" data-lang="ru" aria-pressed="' + (lang === "ru") + '">RU</button>' +
      '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
      "</div>";

    container.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        const next = button.getAttribute("data-lang");
        if (next === "ru" || next === "en") {
          setLang(next);
          onChange(next);
        }
      });
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function nicheAnchorId(slug) {
    return "niche-" + slug;
  }

  function measureScrollOffset() {
    let offset = 12;
    const header = document.querySelector(".site-header");

    if (header) {
      offset += header.getBoundingClientRect().height;
    }

    if (document.body.classList.contains("report-page")) {
      const nicheTabs = document.getElementById("niche-tabs");
      const periodNav = document.getElementById("period-nav");

      if (nicheTabs) {
        offset += nicheTabs.getBoundingClientRect().height;
      }

      if (periodNav) {
        offset += periodNav.getBoundingClientRect().height;
      }
    }

    return offset;
  }

  function scrollToAnchor(raw, behavior) {
    if (!raw) {
      return false;
    }

    const target = document.getElementById(decodeURIComponent(raw));

    if (!target) {
      return false;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - measureScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: behavior || "smooth" });
    return true;
  }

  function bindInPageAnchors(container) {
    if (!container) {
      return;
    }

    if (container._anchorClickHandler) {
      container.removeEventListener("click", container._anchorClickHandler);
    }

    container._anchorClickHandler = function (event) {
      const link = event.target.closest('a[href^="#"]');

      if (!link || !container.contains(link)) {
        return;
      }

      const raw = link.getAttribute("href")?.slice(1);

      if (!raw || !document.getElementById(decodeURIComponent(raw))) {
        return;
      }

      event.preventDefault();
      scrollToAnchor(raw, "smooth");
      history.replaceState(null, "", window.location.pathname + window.location.search + "#" + encodeURIComponent(raw));
    };

    container.addEventListener("click", container._anchorClickHandler);
  }

  function bindDocumentAnchors() {
    if (document._documentAnchorHandler) {
      return;
    }

    document._documentAnchorHandler = function (event) {
      const link = event.target.closest('a[href^="#"]');

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const raw = href.slice(1);

      if (!document.getElementById(decodeURIComponent(raw))) {
        return;
      }

      event.preventDefault();
      scrollToAnchor(raw, "smooth");
      history.replaceState(null, "", window.location.pathname + window.location.search + "#" + encodeURIComponent(raw));
    };

    document.addEventListener("click", document._documentAnchorHandler);
  }

  function renderSiteHeader(target, options) {
    options = options || {};
    const lang = options.lang || getLang();
    const homeHref = options.homeHref || "./";
    const strings = COPY[lang];

    target.innerHTML =
      '<div class="site-header-inner">' +
      '<a class="logo" href="' + homeHref + '">Indie<span>Radar</span></a>' +
      '<div class="site-header-actions">' +
      '<span class="site-tagline">' + strings.tagline + "</span>" +
      '<div data-lang-switch></div>' +
      "</div></div>";

    mountLangSwitch(target.querySelector("[data-lang-switch]"), options.onLangChange || function () {
      window.location.reload();
    }, lang);
  }

  function renderNicheTabs(target, options) {
    const lang = options.locale || getLang();
    const activeNiche = options.activeNiche;
    const locale = options.locale;
    const homeHref = options.homeHref || "./";

    const tabs = NICHES.map(function (niche) {
      const active = niche.slug === activeNiche ? " is-active" : "";
      const href = reportHref(niche.slug, locale, { period: options.period === "week" ? "week" : null });
      return '<a class="niche-tab' + active + '" href="' + href + '">' + nicheLabel(niche, lang) + "</a>";
    }).join("");

    target.innerHTML =
      '<nav class="niche-tabs" aria-label="' + t(lang, "allNiches") + '">' +
      '<a class="niche-tab niche-tab-home" href="' + homeHref + '">' + t(lang, "home") + "</a>" +
      tabs +
      "</nav>";
  }

  function renderPeriodNav(target, options) {
    const lang = options.locale || getLang();
    const dailyActive = !options.appId && options.period !== "week" ? " is-active" : "";
    const weeklyActive = !options.appId && options.period === "week" ? " is-active" : "";

    target.innerHTML =
      '<nav class="period-nav" aria-label="' + escapeHtml(t(lang, "periodNavAria")) + '">' +
      '<a class="period-link' + dailyActive + '" href="' + reportHref(options.niche, options.locale) + '">' + t(lang, "daily") + "</a>" +
      '<a class="period-link' + weeklyActive + '" href="' + reportHref(options.niche, options.locale, { period: "week" }) + '">' + t(lang, "weekly") + "</a>" +
      "</nav>";
  }

  async function renderAppSidebar(target, options) {
    const lang = options.locale || getLang();
    target.innerHTML = '<p class="sidebar-muted">' + t(lang, "loading") + "</p>";

    const manifest = await fetchJson(options.niche + "/" + options.locale + "/manifest.json");
    const apps = (manifest && manifest.apps) || [];

    if (apps.length === 0) {
      target.innerHTML = '<p class="sidebar-muted">' + t(lang, "noApps") + "</p>";
      return;
    }

    const items = apps.map(function (app) {
      const active = app.id === options.activeAppId ? " is-active" : "";
      const href = reportHref(options.niche, options.locale, { appId: app.id });
      return '<a class="app-link' + active + '" href="' + href + '"><span class="app-rank">' + app.number + ".</span> " + escapeHtml(app.name) + "</a>";
    }).join("");

    target.innerHTML =
      '<div class="sidebar-title">' + t(lang, "apps") + "</div>" +
      '<div class="app-list">' + items + "</div>";
  }

  function mountReportChrome() {
    const route = parseReportPath();

    if (!route) {
      return null;
    }

    setLang(route.locale);
    document.documentElement.lang = route.locale;

    const header = document.querySelector(".site-header");

    if (header) {
      renderSiteHeader(header, {
        homeHref: "/",
        lang: route.locale,
        onLangChange: function (nextLang) {
          if (nextLang !== "ru" && nextLang !== "en") {
            return;
          }

          if (nextLang === route.locale) {
            return;
          }

          window.location.href = reportHref(route.niche, nextLang, {
            appId: route.appId,
            period: route.period
          });
        }
      });
    }

    const navWraps = document.querySelectorAll(".site-nav-wrap");

    if (navWraps[0]) {
      renderNicheTabs(navWraps[0], {
        activeNiche: route.niche,
        homeHref: "/",
        locale: route.locale,
        period: route.period
      });
    }

    if (navWraps[1] && !route.appId) {
      renderPeriodNav(navWraps[1], {
        locale: route.locale,
        niche: route.niche,
        period: route.period
      });
    }

    return route;
  }

  function mountBackToTop(options) {
    options = options || {};
    let lang = options.lang || getLang();
    let button = document.querySelector(".back-to-top");

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "back-to-top";
      button.innerHTML =
        '<svg class="back-to-top-icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
        '<rect class="back-to-top-bg" x="4" y="4" width="40" height="40" rx="11"></rect>' +
        '<path class="back-to-top-arrow" d="M16 27 L24 19 L32 27" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
        "</svg>";
      button.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      document.body.appendChild(button);

      window.addEventListener("scroll", function () {
        const visible = window.scrollY >= 320;
        button.hidden = !visible;
        button.classList.toggle("is-visible", visible);
      }, { passive: true });
    }

    function applyLabel(nextLang) {
      lang = nextLang || lang;
      button.setAttribute("aria-label", t(lang, "backToTop"));
      button.setAttribute("title", t(lang, "backToTop"));
    }

    applyLabel(lang);
    button.hidden = window.scrollY < 320;
    button.classList.toggle("is-visible", window.scrollY >= 320);

    return {
      setLang: applyLabel
    };
  }

  window.IndieRadarSite = {
    COPY: COPY,
    NICHES: NICHES,
    bindDocumentAnchors: bindDocumentAnchors,
    bindInPageAnchors: bindInPageAnchors,
    escapeHtml: escapeHtml,
    fetchJson: fetchJson,
    fetchNicheBundle: fetchNicheBundle,
    formatGeneratedAt: formatGeneratedAt,
    getLang: getLang,
    mountReportChrome: mountReportChrome,
    mountBackToTop: mountBackToTop,
    mountLangSwitch: mountLangSwitch,
    nicheAnchorId: nicheAnchorId,
    nicheLabel: nicheLabel,
    parseReportPath: parseReportPath,
    parseReportQuery: parseReportQuery,
    renderAppSidebar: renderAppSidebar,
    renderNicheTabs: renderNicheTabs,
    renderPeriodNav: renderPeriodNav,
    renderSiteHeader: renderSiteHeader,
    reportHref: reportHref,
    scrollToAnchor: scrollToAnchor,
    setLang: setLang,
    t: t
  };
})();
