(function () {
  // Keep labels in sync with services/analyzer/src/nicheLabels.ts
  // Keep in sync with services/analyzer/src/nicheLabels.ts NICHE_SLUGS (finance/ai-chat soft-dropped for Free egress).
  const NICHES = [
    { slug: "productivity", label: { ru: "Продуктивность", en: "Productivity", es: "Productividad", de: "Produktivität", fr: "Productivité" } },
    { slug: "habit-tracker", label: { ru: "Трекер привычек", en: "Habit Tracker", es: "Hábitos", de: "Gewohnheiten", fr: "Habitudes" } },
    { slug: "fitness", label: { ru: "Фитнес", en: "Fitness", es: "Fitness", de: "Fitness", fr: "Fitness" } }
  ];
  const SUPPORTED_LANGS = ["ru", "en", "es", "de", "fr"];
  const DATE_TAGS = { ru: "ru-RU", en: "en-US", es: "es-ES", de: "de-DE", fr: "fr-FR" };

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
      focus: "Focus",
      noApps: "Список приложений пуст",
      footer: "Публичные данные из стора · без регистрации",
      telegram: "Telegram-бот",
      loadError: "Не удалось загрузить ниши.",
      reportLoadError: "Не удалось загрузить отчёт.",
      reportNotFound: "Данные отчёта не найдены.",
      exampleLabel: "Пример:",
      exampleOr: "или",
      periodWeek: " · неделя",
      periodFocus: " · focus",
      appFallback: "Приложение",
      languageAria: "Язык",
      periodNavAria: "Период отчёта",
      nicheAnchorsAria: "Переход к нише",
      backToTop: "Наверх",
      emailTitle: "Email-рассылка",
      feedbackLink: "Обратная связь",
      emailIntro: "Полный ежедневный brief и weekly на почту — без Telegram.",
      emailAddress: "Email",
      emailNiche: "Ниша",
      emailLocale: "Язык",
      emailSubmit: "Подписаться",
      emailSuccess: "Письмо с подтверждением отправлено. Пожалуйста, перейдите по ссылке в письме.",
      emailError: "Не удалось подписаться. Проверьте email и попробуйте ещё раз.",
      emailUnavailable: "Подписка по email скоро будет доступна.",
      emailNote: "Повторная отправка с тем же email обновляет нишу/язык и снова просит подтверждение. Отписка — ссылка в письме или /email off в боте.",
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
      focus: "Focus",
      noApps: "No exported apps",
      footer: "Public store data · no sign-up",
      telegram: "Telegram bot",
      loadError: "Failed to load niches.",
      reportLoadError: "Unable to load report.",
      reportNotFound: "Report data not found.",
      exampleLabel: "Example:",
      exampleOr: "or",
      periodWeek: " · week",
      periodFocus: " · focus",
      appFallback: "App",
      languageAria: "Language",
      periodNavAria: "Report period",
      nicheAnchorsAria: "Jump to niche",
      backToTop: "Back to top",
      emailTitle: "Email briefs",
      feedbackLink: "Beta feedback",
      emailIntro: "Full daily brief and weekly in your inbox — no Telegram required.",
      emailAddress: "Email",
      emailNiche: "Niche",
      emailLocale: "Language",
      emailSubmit: "Subscribe",
      emailSuccess: "A confirmation email has been sent. Please click the link in the email to confirm.",
      emailError: "Could not subscribe. Check your email and try again.",
      emailUnavailable: "Email subscribe is not configured yet.",
      emailNote: "Submitting again with the same email updates niche/language and asks for a new confirmation. Unsubscribe via the link in briefs or /email off in the bot.",
    },
    es: {
      badge: "Beta cerrada",
      heroTitle: "Señales diarias del mercado de apps",
      heroLead: "IndieRadar sigue datos públicos de App Store y Google Play en tu nicho y envía un briefing diario compacto en Telegram — más el informe completo en la web.",
      ctaTelegram: "Abrir bot de Telegram",
      ctaBrowse: "Ver todos los nichos",
      heroNote: "Para indie developers de apps móviles. Todos los informes están abiertos en la web sin registro — y un briefing diario en Telegram.",
      featuresTitle: "Qué llega cada día",
      featuresIntro: "Menos monitoreo manual de stores. Más señales estructuradas en las que apoyarte.",
      feature1Title: "Temas de reseñas",
      feature1Body: "Quejas y elogios en reseñas de competidores: bugs, precio, funciones que faltan.",
      feature2Title: "Señales prioritarias",
      feature2Body: "Qué cambió en 24 horas: apps nuevas, actualizaciones y cambios notables.",
      feature3Title: "Informe completo en la web",
      feature3Body: "El pulso de Telegram lleva a un informe legible con índice, vista semanal y detalle por app.",
      browseIntro: "Abre briefings diarios, semanales y fichas de apps — sin suscripción ni login.",
      howTitle: "Cómo funciona",
      step1: "Abre @IndieRadarBot y elige idioma y nicho — o mira los informes en la web ahora mismo.",
      step2: "Recibe un briefing diario compacto en Telegram cuando haya cambios relevantes.",
      step3: "Sigue los enlaces al informe completo — diario, semanal o por app.",
      tagline: "Briefings diarios públicos de nichos en App Store y Google Play",
      allNiches: "Todos los nichos",
      openDaily: "Briefing diario",
      openWeekly: "Briefing semanal",
      apps: "Apps",
      updated: "Actualizado",
      loading: "Cargando…",
      home: "Todos los nichos",
      daily: "Diaria",
      weekly: "Semanal",
      focus: "Focus",
      noApps: "Lista de apps vacía",
      footer: "Datos públicos de las stores · sin registro",
      telegram: "Bot de Telegram",
      loadError: "No se pudieron cargar los nichos.",
      reportLoadError: "No se pudo cargar el informe.",
      reportNotFound: "No se encontraron datos del informe.",
      exampleLabel: "Ejemplo:",
      exampleOr: "o",
      periodWeek: " · semana",
      periodFocus: " · focus",
      appFallback: "App",
      languageAria: "Idioma",
      periodNavAria: "Periodo del informe",
      nicheAnchorsAria: "Ir al nicho",
      backToTop: "Arriba",
      emailTitle: "Briefings por email",
      feedbackLink: "Feedback beta",
      emailIntro: "Brief diario completo y weekly en tu bandeja — sin Telegram.",
      emailAddress: "Email",
      emailNiche: "Nicho",
      emailLocale: "Idioma",
      emailSubmit: "Suscribirse",
      emailSuccess: "Te hemos enviado un email de confirmación. Por favor, haz clic en el enlace del mensaje.",
      emailError: "No se pudo suscribir. Revisa el email e inténtalo de nuevo.",
      emailUnavailable: "La suscripción por email aún no está configurada.",
      emailNote: "Enviar de nuevo con el mismo email actualiza nicho/idioma y pide nueva confirmación. Cancelar: enlace en el brief o /email off en el bot.",
    },
    de: {
      badge: "Geschlossene Beta",
      heroTitle: "Tägliche Signale aus dem App-Markt",
      heroLead: "IndieRadar beobachtet öffentliche App-Store- und Google-Play-Daten in deiner Nische und sendet einen kompakten Tagesbrief in Telegram — plus den vollständigen Report im Web.",
      ctaTelegram: "Telegram-Bot öffnen",
      ctaBrowse: "Alle Nischen ansehen",
      heroNote: "Für Solo-Indie-Mobile-Devs. Alle Reports sind ohne Registrierung offen im Web — plus täglicher Brief in Telegram.",
      featuresTitle: "Was du jeden Tag bekommst",
      featuresIntro: "Weniger manuelles Store-Scrolling. Mehr strukturierte Signale, auf die du reagieren kannst.",
      feature1Title: "Review-Themen",
      feature1Body: "Gebündelte Pain Points und Lob aus Konkurrenz-Reviews — Bugs, Pricing, fehlende Features.",
      feature2Title: "Prioritätssignale",
      feature2Body: "Was sich in 24 Stunden geändert hat: neue Apps, Updates und spürbare Verschiebungen.",
      feature3Title: "Vollständiger Brief im Web",
      feature3Body: "Der Telegram-Pulse führt zu einem lesbaren Report mit Inhaltsverzeichnis, Wochenblick und App-Drill-down.",
      browseIntro: "Öffne tägliche, wöchentliche und App-Reports — ohne Abo oder Login.",
      howTitle: "So funktioniert's",
      step1: "Öffne @IndieRadarBot und wähle Sprache + Nische — oder sieh dir Reports sofort im Web an.",
      step2: "Erhalte einen kompakten Tagesbrief in Telegram, wenn sich etwas Relevantes ändert.",
      step3: "Folge Links zum vollständigen Report — täglich, wöchentlich oder pro App.",
      tagline: "Öffentliche Tagesbriefs zu App-Store- und Google-Play-Nischen",
      allNiches: "Alle Nischen",
      openDaily: "Tagesbrief",
      openWeekly: "Wochenbrief",
      apps: "Apps",
      updated: "Aktualisiert",
      loading: "Laden…",
      home: "Alle Nischen",
      daily: "Täglich",
      weekly: "Wöchentlich",
      focus: "Focus",
      noApps: "Keine exportierten Apps",
      footer: "Öffentliche Store-Daten · ohne Registrierung",
      telegram: "Telegram-Bot",
      loadError: "Nischen konnten nicht geladen werden.",
      reportLoadError: "Report konnte nicht geladen werden.",
      reportNotFound: "Reportdaten nicht gefunden.",
      exampleLabel: "Beispiel:",
      exampleOr: "oder",
      periodWeek: " · Woche",
      periodFocus: " · focus",
      appFallback: "App",
      languageAria: "Sprache",
      periodNavAria: "Report-Zeitraum",
      nicheAnchorsAria: "Zur Nische springen",
      backToTop: "Nach oben",
      emailTitle: "E-Mail-Briefs",
      feedbackLink: "Beta-Feedback",
      emailIntro: "Voller Daily-Brief und Weekly per Mail — ohne Telegram.",
      emailAddress: "E-Mail",
      emailNiche: "Nische",
      emailLocale: "Sprache",
      emailSubmit: "Abonnieren",
      emailSuccess: "Eine Bestätigungsmail wurde gesendet. Bitte klicke auf den Link in der E-Mail.",
      emailError: "Abo fehlgeschlagen. E-Mail prüfen und erneut versuchen.",
      emailUnavailable: "E-Mail-Abo ist noch nicht konfiguriert.",
      emailNote: "Erneutes Absenden mit derselben E-Mail aktualisiert Nische/Sprache und verlangt eine neue Bestätigung. Abmelden: Link im Brief oder /email off im Bot.",
    },
    fr: {
      badge: "Beta fermée",
      heroTitle: "Signaux quotidiens du marché des apps",
      heroLead: "IndieRadar surveille les données publiques App Store et Google Play dans votre niche et envoie un briefing quotidien compact dans Telegram — plus le rapport complet sur le web.",
      ctaTelegram: "Ouvrir le bot Telegram",
      ctaBrowse: "Voir toutes les niches",
      heroNote: "Pour les indie developers mobiles. Tous les rapports sont ouverts sur le web sans inscription — plus un briefing quotidien dans Telegram.",
      featuresTitle: "Ce que vous recevez chaque jour",
      featuresIntro: "Moins de monitoring manuel des stores. Plus de signaux structurés pour agir.",
      feature1Title: "Thèmes des avis",
      feature1Body: "Points de douleur et éloges regroupés dans les avis concurrents — bugs, prix, fonctions manquantes.",
      feature2Title: "Signaux prioritaires",
      feature2Body: "Ce qui a changé en 24 heures : nouvelles apps, mises à jour et mouvements notables.",
      feature3Title: "Briefing complet sur le web",
      feature3Body: "Le pulse Telegram mène à un rapport lisible avec sommaire, vue hebdo et détail par app.",
      browseIntro: "Ouvrez les briefings quotidiens, hebdomadaires et les fiches apps — sans abonnement ni login.",
      howTitle: "Comment ça marche",
      step1: "Ouvrez @IndieRadarBot et choisissez langue + niche — ou parcourez les rapports sur le web tout de suite.",
      step2: "Recevez un briefing quotidien compact dans Telegram quand quelque chose d'important change.",
      step3: "Suivez les liens vers le rapport complet — quotidien, hebdomadaire ou par app.",
      tagline: "Briefings quotidiens publics pour les niches App Store et Google Play",
      allNiches: "Toutes les niches",
      openDaily: "Briefing quotidien",
      openWeekly: "Briefing hebdomadaire",
      apps: "Apps",
      updated: "Mis à jour",
      loading: "Chargement…",
      home: "Toutes les niches",
      daily: "Quotidien",
      weekly: "Hebdomadaire",
      focus: "Focus",
      noApps: "Aucune app exportée",
      footer: "Données publiques des stores · sans inscription",
      telegram: "Bot Telegram",
      loadError: "Impossible de charger les niches.",
      reportLoadError: "Impossible de charger le rapport.",
      reportNotFound: "Données du rapport introuvables.",
      exampleLabel: "Exemple :",
      exampleOr: "ou",
      periodWeek: " · semaine",
      periodFocus: " · focus",
      appFallback: "App",
      languageAria: "Langue",
      periodNavAria: "Période du rapport",
      nicheAnchorsAria: "Aller à la niche",
      backToTop: "Haut de page",
      emailTitle: "Briefings par email",
      feedbackLink: "Feedback beta",
      emailIntro: "Brief daily complet et weekly dans la boîte mail — sans Telegram.",
      emailAddress: "Email",
      emailNiche: "Niche",
      emailLocale: "Langue",
      emailSubmit: "S'abonner",
      emailSuccess: "Un email de confirmation a été envoyé. Veuillez cliquer sur le lien dans le message.",
      emailError: "Inscription impossible. Vérifiez l'email et réessayez.",
      emailUnavailable: "L'abonnement email n'est pas encore configuré.",
      emailNote: "Renvoyer avec le même email met à jour niche/langue et redemande une confirmation. Désabonnement : lien dans le brief ou /email off dans le bot.",
    }
  };

  const LANG_KEY = "indieradar.lang";

  function isSupportedLang(lang) {
    return SUPPORTED_LANGS.indexOf(lang) !== -1;
  }

  function detectBrowserLang() {
    const code = (navigator.language || "").toLowerCase().split("-")[0];
    if (code === "ru" || code === "be" || code === "kk" || code === "ky" || code === "uz") return "ru";
    if (code === "de" || code === "fr" || code === "es") return code;
    return "en";
  }

  function getLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (isSupportedLang(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }

    return detectBrowserLang();
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

    if (options.period === "focus") {
      return base + "/focus/";
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

    return new Date(value).toLocaleString(DATE_TAGS[locale] || DATE_TAGS.en, {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function getReportLocale() {
    const route = parseReportPath();

    if (route) {
      return route.locale;
    }

    return getLang();
  }

  function fixReportNavHref(href, locale) {
    if (!href || href.charAt(0) !== "/" || href.indexOf("/report/") !== 0) {
      return href;
    }

    return href.replace(/^(\/report\/[^/]+\/)(ru|en|es|de|fr)(?=\/|$)/, "$1" + locale);
  }

  function syncLangFromReportPath() {
    const route = parseReportPath();

    if (!route) {
      return null;
    }

    setLang(route.locale);
    document.documentElement.lang = route.locale;
    return route;
  }

  function bindReportNavLocaleGuard() {
    if (document._reportNavLocaleGuard) {
      return;
    }

    document._reportNavLocaleGuard = true;

    document.addEventListener("click", function (event) {
      const link = event.target.closest("a.niche-tab, a.period-link");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      const locale = getReportLocale();
      const fixed = fixReportNavHref(href, locale);

      if (fixed && fixed !== href) {
        event.preventDefault();
        window.location.href = fixed;
      }
    });
  }

  function parseReportPath(pathname) {
    pathname = pathname || window.location.pathname;
    const match = pathname.match(/^\/report\/([^/]+)\/(ru|en|es|de|fr)(?:\/(week|focus|app\/([^/]+)))?\/?$/);

    if (!match) {
      return null;
    }

    return {
      appId: match[3] && match[3].indexOf("app/") === 0 && match[4] ? decodeURIComponent(match[4]) : null,
      locale: match[2],
      niche: match[1],
      period: match[3] === "week" ? "week" : match[3] === "focus" ? "focus" : null
    };
  }

  function parseReportQuery(search) {
    search = search || window.location.search;
    const params = new URLSearchParams(search);
    const q = params.get("q");

    if (q) {
      const parts = q.split("/").filter(Boolean);
      const niche = parts[0] || "productivity";
      const locale = isSupportedLang(parts[1]) ? parts[1] : "ru";

      if (parts[2] === "week") {
        return { appId: null, locale, niche, period: "week" };
      }

      if (parts[2] === "focus") {
        return { appId: null, locale, niche, period: "focus" };
      }

      if (parts[2] === "app" && parts[3]) {
        return { appId: parts.slice(3).join("/"), locale, niche, period: null };
      }

      return { appId: null, locale, niche, period: null };
    }

    return {
      appId: params.get("app"),
      locale: isSupportedLang(params.get("locale")) ? params.get("locale") : "ru",
      niche: params.get("niche") || "productivity",
      period: params.get("period") === "week" ? "week" : params.get("period") === "focus" ? "focus" : null
    };
  }

  function mountLangSwitch(container, onChange, lang) {
    lang = lang || getLang();
    const buttons = SUPPORTED_LANGS.map(function (code) {
      return '<button type="button" data-lang="' + code + '" aria-pressed="' + (lang === code) + '">' + code.toUpperCase() + "</button>";
    }).join("");

    container.innerHTML =
      '<div class="lang-switch" role="group" aria-label="' + escapeHtml(t(lang, "languageAria")) + '">' +
      buttons +
      "</div>";

    container.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        const next = button.getAttribute("data-lang");
        if (isSupportedLang(next)) {
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
    const locale = options.locale || getReportLocale();
    const lang = locale;
    const activeNiche = options.activeNiche;
    const homeHref = options.homeHref || ("/?lang=" + locale);

    const tabs = NICHES.map(function (niche) {
      const active = niche.slug === activeNiche ? " is-active" : "";
      const periodOpt =
        options.period === "week" ? "week" : options.period === "focus" ? "focus" : null;
      const href = reportHref(niche.slug, locale, { period: periodOpt });
      return '<a class="niche-tab' + active + '" href="' + href + '">' + nicheLabel(niche, lang) + "</a>";
    }).join("");

    target.innerHTML =
      '<nav class="niche-tabs" aria-label="' + t(lang, "allNiches") + '">' +
      '<a class="niche-tab niche-tab-home" href="' + homeHref + '">' + t(lang, "home") + "</a>" +
      tabs +
      "</nav>";
  }

  function renderPeriodNav(target, options) {
    const locale = options.locale || getReportLocale();
    const lang = locale;
    const dailyActive = !options.appId && !options.period ? " is-active" : "";
    const weeklyActive = !options.appId && options.period === "week" ? " is-active" : "";
    const focusActive = !options.appId && options.period === "focus" ? " is-active" : "";

    target.innerHTML =
      '<nav class="period-nav" aria-label="' + escapeHtml(t(lang, "periodNavAria")) + '">' +
      '<a class="period-link' + dailyActive + '" href="' + reportHref(options.niche, options.locale) + '">' + t(lang, "daily") + "</a>" +
      '<a class="period-link' + weeklyActive + '" href="' + reportHref(options.niche, options.locale, { period: "week" }) + '">' + t(lang, "weekly") + "</a>" +
      '<a class="period-link' + focusActive + '" href="' + reportHref(options.niche, options.locale, { period: "focus" }) + '">' + t(lang, "focus") + "</a>" +
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
    bindReportNavLocaleGuard();
    const route = syncLangFromReportPath();

    if (!route) {
      return null;
    }

    const header = document.querySelector(".site-header");

    if (header && !header.querySelector(".lang-switch")) {
      renderSiteHeader(header, {
        homeHref: "/?lang=" + route.locale,
        lang: route.locale,
        onLangChange: function (nextLang) {
          if (!isSupportedLang(nextLang)) {
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
        homeHref: "/?lang=" + route.locale,
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

  function applyThemeFilter(root) {
    const content = root || document.getElementById("content");
    if (!content) return;

    const filter = document.querySelector("[data-theme-filter]");
    const enabled = new Set();

    if (filter) {
      filter.querySelectorAll(".theme-filter-chip[aria-pressed='true']").forEach(function (chip) {
        const themeId = chip.getAttribute("data-theme-id");
        if (themeId) enabled.add(themeId);
      });
    }

    content.querySelectorAll("[data-theme-block]").forEach(function (block) {
      const themeId = block.getAttribute("data-theme-id");
      const on = !themeId || enabled.has(themeId);
      block.classList.toggle("is-off", !on);
    });

    const nodes = Array.prototype.slice.call(content.children);
    let index = 0;

    while (index < nodes.length) {
      const node = nodes[index];

      if (!(node.classList && node.classList.contains("app-review-heading"))) {
        index += 1;
        continue;
      }

      const sectionNodes = [node];
      let cursor = index + 1;
      let visibleThemes = 0;

      while (cursor < nodes.length) {
        const next = nodes[cursor];

        if (next.classList && next.classList.contains("app-review-heading")) {
          break;
        }

        sectionNodes.push(next);

        if (next.hasAttribute && next.hasAttribute("data-theme-block") && !next.classList.contains("is-off")) {
          visibleThemes += 1;
        }

        if (next.classList && next.classList.contains("app-divider")) {
          cursor += 1;
          break;
        }

        cursor += 1;
      }

      const hideSection = visibleThemes === 0;
      sectionNodes.forEach(function (sectionNode) {
        sectionNode.classList.toggle("is-app-filtered-out", hideSection);
      });

      index = cursor;
    }
  }

  function mountThemeFilter() {
    const filter = document.querySelector("[data-theme-filter]");
    if (!filter) return;

    filter.addEventListener("click", function (event) {
      const chip = event.target.closest(".theme-filter-chip");
      if (!chip || !filter.contains(chip)) return;

      const on = chip.getAttribute("aria-pressed") !== "true";
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      chip.classList.toggle("is-on", on);
      applyThemeFilter();
    });

    applyThemeFilter();
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

  function getEmailConfig() {
    const cfg = window.IndieRadarEmailConfig;
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      return null;
    }
    if (String(cfg.supabaseUrl).indexOf("YOUR_PROJECT") !== -1) {
      return null;
    }
    if (String(cfg.supabaseAnonKey).indexOf("YOUR_SUPABASE") !== -1) {
      return null;
    }
    return cfg;
  }

  const EMAIL_HISTORY_KEY = "indieradar.emailHistory";

  function readEmailHistory() {
    try {
      const raw = window.localStorage.getItem(EMAIL_HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed
        .map(function (value) {
          return String(value || "").trim().toLowerCase();
        })
        .filter(function (value) {
          return value.indexOf("@") !== -1;
        })
        .slice(0, 5);
    } catch (error) {
      return [];
    }
  }

  function rememberEmail(email) {
    const normalized = String(email || "").trim().toLowerCase();
    if (!normalized || normalized.indexOf("@") === -1) {
      return;
    }
    const next = [normalized].concat(
      readEmailHistory().filter(function (value) {
        return value !== normalized;
      })
    ).slice(0, 5);
    try {
      window.localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(next));
    } catch (error) {
      // Ignore quota / private mode.
    }
  }

  function mountEmailSubscribeForm(root, options) {
    if (!root) {
      return { setLang: function () {} };
    }

    let lang = options && options.lang ? options.lang : getLang();
    const config = getEmailConfig();
    const form = root.querySelector("form.email-subscribe-form");
    const unavailable = root.querySelector(".email-unavailable");

    function fillNicheOptions(select, currentLang) {
      select.innerHTML = NICHES.map(function (niche) {
        return (
          '<option value="' + escapeHtml(niche.slug) + '">' +
          escapeHtml(nicheLabel(niche, currentLang)) +
          "</option>"
        );
      }).join("");
    }

    function fillLocaleOptions(select, currentLang) {
      select.innerHTML = SUPPORTED_LANGS.map(function (code) {
        const selected = code === currentLang ? " selected" : "";
        return '<option value="' + code + '"' + selected + ">" + code.toUpperCase() + "</option>";
      }).join("");
    }

    function applyCopy(currentLang) {
      root.querySelectorAll("[data-i18n]").forEach(function (node) {
        const key = node.getAttribute("data-i18n");
        node.textContent = t(currentLang, key);
      });
      const nicheSelect = root.querySelector("[name=niche]");
      const localeSelect = root.querySelector("[name=locale]");
      const prevNiche = nicheSelect ? nicheSelect.value : "";
      if (nicheSelect) {
        fillNicheOptions(nicheSelect, currentLang);
        if (prevNiche) {
          nicheSelect.value = prevNiche;
        }
      }
      if (localeSelect) {
        fillLocaleOptions(localeSelect, currentLang);
      }
    }

    function hydrateEmailField(emailInput) {
      if (!emailInput) {
        return;
      }
      const history = readEmailHistory();
      let list = root.querySelector("#subscribe-email-history");
      if (!list) {
        list = document.createElement("datalist");
        list.id = "subscribe-email-history";
        root.appendChild(list);
      }
      list.innerHTML = history
        .map(function (value) {
          return '<option value="' + escapeHtml(value) + '"></option>';
        })
        .join("");
      emailInput.setAttribute("list", "subscribe-email-history");
      if (!emailInput.value && history[0]) {
        emailInput.value = history[0];
      }
    }

    if (!config || !form) {
      if (form) {
        form.hidden = true;
      }
      if (unavailable) {
        unavailable.hidden = false;
      }
      applyCopy(lang);
      return {
        setLang: function (nextLang) {
          lang = nextLang || lang;
          applyCopy(lang);
        }
      };
    }

    form.hidden = false;
    if (unavailable) {
      unavailable.hidden = true;
    }
    applyCopy(lang);
    hydrateEmailField(form.querySelector("[name=email]"));

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const status = form.querySelector(".email-status");
      const honeypot = root.querySelector("[name=ir_hp]");
      const emailInput = form.querySelector("[name=email]");
      const nicheSelect = form.querySelector("[name=niche]");
      const localeSelect = form.querySelector("[name=locale]");
      const submit = form.querySelector('button[type="submit"]');

      if (honeypot && honeypot.value) {
        return;
      }

      const email = (emailInput && emailInput.value || "").trim();
      const niche = nicheSelect && nicheSelect.value;
      const locale = localeSelect && localeSelect.value;

      if (!email || !niche || !isSupportedLang(locale)) {
        if (status) {
          status.textContent = t(lang, "emailError");
          status.className = "email-status is-error";
        }
        return;
      }

      if (submit) {
        submit.disabled = true;
      }
      if (status) {
        status.textContent = t(lang, "loading");
        status.className = "email-status";
      }

      const endpoint = String(config.supabaseUrl).replace(/\/$/, "") + "/rest/v1/rpc/subscribe_email_report";

      fetch(endpoint, {
        method: "POST",
        headers: {
          apikey: config.supabaseAnonKey,
          Authorization: "Bearer " + config.supabaseAnonKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_email: email,
          p_niche_slug: niche,
          p_locale: locale
        })
      }).then(function (response) {
        if (!response.ok) {
          throw new Error("subscribe_failed");
        }
        rememberEmail(email);
        hydrateEmailField(emailInput);
        if (status) {
          status.textContent = t(lang, "emailSuccess");
          status.className = "email-status is-success";
        }
      }).catch(function () {
        if (status) {
          status.textContent = t(lang, "emailError");
          status.className = "email-status is-error";
        }
      }).finally(function () {
        if (submit) {
          submit.disabled = false;
        }
      });
    });

    return {
      setLang: function (nextLang) {
        lang = nextLang || lang;
        applyCopy(lang);
      }
    };
  }

  window.IndieRadarSite = {
    COPY: COPY,
    NICHES: NICHES,
    bindDocumentAnchors: bindDocumentAnchors,
    bindInPageAnchors: bindInPageAnchors,
    bindReportNavLocaleGuard: bindReportNavLocaleGuard,
    escapeHtml: escapeHtml,
    fetchJson: fetchJson,
    fetchNicheBundle: fetchNicheBundle,
    formatGeneratedAt: formatGeneratedAt,
    getLang: getLang,
    getReportLocale: getReportLocale,
    mountEmailSubscribeForm: mountEmailSubscribeForm,
    mountReportChrome: mountReportChrome,
    mountThemeFilter: mountThemeFilter,
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
    syncLangFromReportPath: syncLangFromReportPath,
    t: t
  };
})();
