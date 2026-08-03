(function () {
  const QUESTIONS = ["usefulness", "best", "worst", "habit", "recommend"];

  const COPY = {
    ru: {
      badge: "Закрытая beta",
      title: "Обратная связь по beta",
      lead: "Пять коротких вопросов — что работает, что мешает — и одно свободное поле. Под каждым можно добавить комментарий.",
      tagline: "Публичные ежедневные сводки по нишам App Store и Google Play",
      q1: "Насколько IndieRadar сейчас полезен?",
      q1Low: "Бесполезно",
      q1High: "Очень полезно",
      q2: "Что работает лучше всего? (можно несколько)",
      q3: "Что слабое или шумное? (можно несколько)",
      q4: "Как часто вы реально открываете сводку?",
      q5: "Порекомендуете IndieRadar другому инди?",
      qFree: "Что починить или сделать дальше?",
      commentLabel: "Комментарий (необязательно)",
      commentPlaceholder: "Если хотите уточнить…",
      freePlaceholder: "Одно конкретное пожелание, претензия или идея…",
      emailLabel: "Email (необязательно, если можно написать вам)",
      submit: "Отправить",
      note: "Ответы идут напрямую в IndieRadar для beta.",
      thanksTitle: "Спасибо",
      thanksBody: "Принято. Это помогает решить, что делать дальше.",
      backHome: "На главную",
      footer: "Публичные данные из стора · без регистрации",
      telegram: "Telegram-бот",
      optThemes: "Темы из отзывов",
      optPriority: "Приоритетные сигналы",
      optFocus: "Режим Focus",
      optWeekly: "Еженедельная сводка",
      optTelegram: "Пульс в Telegram",
      optEmail: "Email-рассылка",
      optWeb: "Отчёты на сайте",
      optBugsNoise: "Слишком много про баги",
      optIrrelevant: "Нерелевантные приложения / сигналы",
      optTooLong: "Слишком длинно / трудно сканировать",
      optHardNav: "Сложно ориентироваться",
      optDelivery: "Доставка / канал / тайминг",
      optNothing: "Ничего критичного",
      optDaily: "Почти каждый день",
      optFewWeek: "Несколько раз в неделю",
      optRarely: "Редко",
      optNever: "Ещё не открывал(а)",
      optYes: "Да",
      optMaybe: "Позже / может быть",
      optNo: "Нет",
      needAnswer: "Ответьте хотя бы на один вопрос или заполните свободное поле.",
      sending: "Отправка…",
      error: "Не удалось отправить. Попробуйте ещё раз.",
      unavailable: "Форма пока недоступна — напишите в Telegram @IndieRadarBot."
    },
    en: {
      badge: "Closed beta",
      title: "Beta feedback",
      lead: "Five short questions — what works, what does not — plus one open note. Optional comments under each.",
      tagline: "Public daily briefs for App Store and Google Play niches",
      q1: "How useful is IndieRadar for you right now?",
      q1Low: "Not useful",
      q1High: "Very useful",
      q2: "What works best? (pick all that apply)",
      q3: "What is weak or noisy? (pick all that apply)",
      q4: "How often do you actually open the brief?",
      q5: "Would you recommend IndieRadar to another indie?",
      qFree: "What should we fix or build next?",
      commentLabel: "Optional comment",
      commentPlaceholder: "Anything to add…",
      freePlaceholder: "One concrete wish, complaint, or idea…",
      emailLabel: "Email (optional, if we may follow up)",
      submit: "Send feedback",
      note: "Thanks — this goes straight to the IndieRadar inbox for the beta.",
      thanksTitle: "Thank you",
      thanksBody: "Got it. Your answers help shape what we ship next.",
      backHome: "Back to IndieRadar",
      footer: "Public store data · no sign-up",
      telegram: "Telegram bot",
      optThemes: "Review themes",
      optPriority: "Priority signals",
      optFocus: "Focus view",
      optWeekly: "Weekly brief",
      optTelegram: "Telegram pulse",
      optEmail: "Email delivery",
      optWeb: "Web reports",
      optBugsNoise: "Too many bug mentions",
      optIrrelevant: "Irrelevant apps / signals",
      optTooLong: "Too long / hard to scan",
      optHardNav: "Hard to navigate",
      optDelivery: "Delivery timing / channel",
      optNothing: "Nothing major",
      optDaily: "Almost daily",
      optFewWeek: "A few times a week",
      optRarely: "Rarely",
      optNever: "Not yet / never",
      optYes: "Yes",
      optMaybe: "Maybe later",
      optNo: "No",
      needAnswer: "Answer at least one question or fill the free-form field.",
      sending: "Sending…",
      error: "Could not send. Please try again.",
      unavailable: "Form is unavailable — message Telegram @IndieRadarBot instead."
    },
    es: {
      badge: "Beta cerrada",
      title: "Feedback de la beta",
      lead: "Cinco preguntas cortas — qué funciona, qué no — y una nota libre. Comentario opcional en cada una.",
      tagline: "Briefings diarios públicos de nichos en App Store y Google Play",
      q1: "¿Qué tan útil es IndieRadar ahora?",
      q1Low: "Poco útil",
      q1High: "Muy útil",
      q2: "¿Qué funciona mejor? (puedes marcar varias)",
      q3: "¿Qué es débil o ruidoso? (puedes marcar varias)",
      q4: "¿Con qué frecuencia abres el briefing?",
      q5: "¿Recomendarías IndieRadar a otro indie?",
      qFree: "¿Qué deberíamos arreglar o construir después?",
      commentLabel: "Comentario (opcional)",
      commentPlaceholder: "Si quieres añadir algo…",
      freePlaceholder: "Un deseo, queja o idea concreta…",
      emailLabel: "Email (opcional, si podemos escribirte)",
      submit: "Enviar",
      note: "Las respuestas van directo a IndieRadar para la beta.",
      thanksTitle: "Gracias",
      thanksBody: "Listo. Esto ayuda a decidir qué hacer después.",
      backHome: "Volver a IndieRadar",
      footer: "Datos públicos de las stores · sin registro",
      telegram: "Bot de Telegram",
      optThemes: "Temas de reseñas",
      optPriority: "Señales prioritarias",
      optFocus: "Vista Focus",
      optWeekly: "Briefing semanal",
      optTelegram: "Pulso en Telegram",
      optEmail: "Email",
      optWeb: "Informes web",
      optBugsNoise: "Demasiadas menciones de bugs",
      optIrrelevant: "Apps / señales irrelevantes",
      optTooLong: "Demasiado largo / difícil de escanear",
      optHardNav: "Difícil de navegar",
      optDelivery: "Entrega / canal / timing",
      optNothing: "Nada grave",
      optDaily: "Casi a diario",
      optFewWeek: "Varias veces por semana",
      optRarely: "Rara vez",
      optNever: "Aún no",
      optYes: "Sí",
      optMaybe: "Quizá más adelante",
      optNo: "No",
      needAnswer: "Responde al menos una pregunta o el campo libre.",
      sending: "Enviando…",
      error: "No se pudo enviar. Inténtalo de nuevo.",
      unavailable: "El formulario no está disponible — escribe a @IndieRadarBot."
    },
    de: {
      badge: "Geschlossene Beta",
      title: "Beta-Feedback",
      lead: "Fünf kurze Fragen — was funktioniert, was nicht — plus ein freies Feld. Optionaler Kommentar zu jeder Frage.",
      tagline: "Öffentliche Tagesbriefs zu App-Store- und Google-Play-Nischen",
      q1: "Wie nützlich ist IndieRadar für dich gerade?",
      q1Low: "Nicht nützlich",
      q1High: "Sehr nützlich",
      q2: "Was funktioniert am besten? (Mehrfachauswahl)",
      q3: "Was ist schwach oder rauschig? (Mehrfachauswahl)",
      q4: "Wie oft öffnest du den Brief wirklich?",
      q5: "Würdest du IndieRadar einem anderen Indie empfehlen?",
      qFree: "Was sollen wir als Nächstes fixen oder bauen?",
      commentLabel: "Optionaler Kommentar",
      commentPlaceholder: "Falls du etwas ergänzen willst…",
      freePlaceholder: "Ein konkreter Wunsch, Kritikpunkt oder Idee…",
      emailLabel: "E-Mail (optional, für Rückfragen)",
      submit: "Absenden",
      note: "Antworten gehen direkt an IndieRadar für die Beta.",
      thanksTitle: "Danke",
      thanksBody: "Angekommen. Das hilft zu entscheiden, was als Nächstes kommt.",
      backHome: "Zurück zu IndieRadar",
      footer: "Öffentliche Store-Daten · ohne Registrierung",
      telegram: "Telegram-Bot",
      optThemes: "Review-Themen",
      optPriority: "Prioritätssignale",
      optFocus: "Focus-Ansicht",
      optWeekly: "Wochenbrief",
      optTelegram: "Telegram-Puls",
      optEmail: "E-Mail",
      optWeb: "Web-Reports",
      optBugsNoise: "Zu viele Bug-Erwähnungen",
      optIrrelevant: "Irrelevante Apps / Signale",
      optTooLong: "Zu lang / schwer zu scannen",
      optHardNav: "Schwer zu navigieren",
      optDelivery: "Zustellung / Kanal / Timing",
      optNothing: "Nichts Gravierendes",
      optDaily: "Fast täglich",
      optFewWeek: "Ein paar Mal pro Woche",
      optRarely: "Selten",
      optNever: "Noch nicht",
      optYes: "Ja",
      optMaybe: "Vielleicht später",
      optNo: "Nein",
      needAnswer: "Beantworte mindestens eine Frage oder das Freitextfeld.",
      sending: "Senden…",
      error: "Senden fehlgeschlagen. Bitte erneut versuchen.",
      unavailable: "Formular nicht verfügbar — schreib an @IndieRadarBot."
    },
    fr: {
      badge: "Beta fermée",
      title: "Feedback beta",
      lead: "Cinq questions courtes — ce qui marche, ce qui non — plus une note libre. Commentaire optionnel sous chacune.",
      tagline: "Briefings quotidiens publics pour les niches App Store et Google Play",
      q1: "À quel point IndieRadar vous est utile maintenant ?",
      q1Low: "Peu utile",
      q1High: "Très utile",
      q2: "Qu’est-ce qui marche le mieux ? (plusieurs possibles)",
      q3: "Qu’est-ce qui est faible ou bruyant ? (plusieurs possibles)",
      q4: "À quelle fréquence ouvrez-vous vraiment le briefing ?",
      q5: "Recommanderiez-vous IndieRadar à un autre indie ?",
      qFree: "Que faut-il corriger ou construire ensuite ?",
      commentLabel: "Commentaire (optionnel)",
      commentPlaceholder: "Si vous voulez préciser…",
      freePlaceholder: "Un souhait, une plainte ou une idée concrète…",
      emailLabel: "Email (optionnel, pour un suivi)",
      submit: "Envoyer",
      note: "Les réponses vont directement à IndieRadar pour la beta.",
      thanksTitle: "Merci",
      thanksBody: "Reçu. Cela aide à décider la suite.",
      backHome: "Retour à IndieRadar",
      footer: "Données publiques des stores · sans inscription",
      telegram: "Bot Telegram",
      optThemes: "Thèmes d’avis",
      optPriority: "Signaux prioritaires",
      optFocus: "Vue Focus",
      optWeekly: "Briefing hebdo",
      optTelegram: "Pulse Telegram",
      optEmail: "Email",
      optWeb: "Rapports web",
      optBugsNoise: "Trop de mentions de bugs",
      optIrrelevant: "Apps / signaux hors sujet",
      optTooLong: "Trop long / dur à scanner",
      optHardNav: "Navigation difficile",
      optDelivery: "Livraison / canal / timing",
      optNothing: "Rien de grave",
      optDaily: "Presque chaque jour",
      optFewWeek: "Quelques fois par semaine",
      optRarely: "Rarement",
      optNever: "Pas encore",
      optYes: "Oui",
      optMaybe: "Peut-être plus tard",
      optNo: "Non",
      needAnswer: "Répondez à au moins une question ou au champ libre.",
      sending: "Envoi…",
      error: "Échec de l’envoi. Réessayez.",
      unavailable: "Formulaire indisponible — écrivez à @IndieRadarBot."
    }
  };

  const SUPPORTED = ["ru", "en", "es", "de", "fr"];

  function t(lang, key) {
    return (COPY[lang] && COPY[lang][key]) || COPY.en[key] || key;
  }

  function detectLang() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("lang");
    if (SUPPORTED.indexOf(fromQuery) !== -1) {
      return fromQuery;
    }
    try {
      const stored = localStorage.getItem("indieradar.lang");
      if (SUPPORTED.indexOf(stored) !== -1) {
        return stored;
      }
    } catch (e) {}
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : "en";
  }

  function applyCopy(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      const key = node.getAttribute("data-i18n");
      node.textContent = t(lang, key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      const key = node.getAttribute("data-i18n-placeholder");
      node.setAttribute("placeholder", t(lang, key));
    });
    const switchRoot = document.getElementById("lang-switch");
    if (switchRoot) {
      switchRoot.setAttribute("aria-label", lang === "ru" ? "Язык" : "Language");
      switchRoot.innerHTML = SUPPORTED.map(function (code) {
        const current = code === lang ? ' aria-current="page"' : "";
        return (
          '<a class="lang-switch-link" href="?lang=' + code + '" hreflang="' + code + '"' + current + ">" +
          code.toUpperCase() +
          "</a>"
        );
      }).join("");
    }
  }

  function collectAnswers(form) {
    const answers = {};

    QUESTIONS.forEach(function (key) {
      const group = form.querySelector('[data-key="' + key + '"]');
      if (!group) return;
      const type = group.getAttribute("data-type");
      let value = null;

      if (type === "multi") {
        value = Array.prototype.map
          .call(group.querySelectorAll('input[type="checkbox"]:checked'), function (input) {
            return input.value;
          });
        if (value.length === 0) value = null;
      } else {
        const checked = group.querySelector('input[type="radio"]:checked');
        value = checked ? checked.value : null;
      }

      const commentField = form.querySelector('[name="' + key + '_comment"]');
      const comment = commentField ? String(commentField.value || "").trim() : "";

      if (value != null || comment) {
        answers[key] = { value: value, comment: comment || null };
      }
    });

    return answers;
  }

  function hasPayload(answers, freeform) {
    return Object.keys(answers).length > 0 || Boolean(freeform);
  }

  function getConfig() {
    const cfg = window.IndieRadarEmailConfig;
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
    if (String(cfg.supabaseUrl).indexOf("YOUR_PROJECT") !== -1) return null;
    return cfg;
  }

  function mount() {
    let lang = detectLang();
    try {
      localStorage.setItem("indieradar.lang", lang);
    } catch (e) {}
    applyCopy(lang);

    const form = document.getElementById("feedback-form");
    const done = document.getElementById("feedback-done");
    const status = form.querySelector(".feedback-status");
    const submit = form.querySelector('button[type="submit"]');
    const config = getConfig();

    form.addEventListener("change", function (event) {
      const input = event.target;
      if (!input || !input.closest) return;
      const chip = input.closest(".feedback-chip");
      if (!chip) return;
      if (input.type === "radio") {
        const group = input.closest(".feedback-options");
        if (group) {
          group.querySelectorAll(".feedback-chip").forEach(function (node) {
            node.classList.toggle("is-on", node.querySelector("input") === input);
          });
        }
      } else if (input.type === "checkbox") {
        chip.classList.toggle("is-on", input.checked);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (form.ir_hp && form.ir_hp.value) {
        return;
      }

      const answers = collectAnswers(form);
      const freeform = String(form.freeform.value || "").trim();
      const contactEmail = String(form.contact_email.value || "").trim();

      if (!hasPayload(answers, freeform)) {
        status.textContent = t(lang, "needAnswer");
        status.className = "feedback-status is-error";
        return;
      }

      if (!config) {
        status.textContent = t(lang, "unavailable");
        status.className = "feedback-status is-error";
        return;
      }

      status.textContent = t(lang, "sending");
      status.className = "feedback-status";
      submit.disabled = true;

      const endpoint = String(config.supabaseUrl).replace(/\/$/, "") + "/rest/v1/rpc/submit_beta_feedback";

      fetch(endpoint, {
        method: "POST",
        headers: {
          apikey: config.supabaseAnonKey,
          Authorization: "Bearer " + config.supabaseAnonKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          p_locale: lang,
          p_answers: answers,
          p_freeform: freeform || null,
          p_contact_email: contactEmail || null,
          p_user_agent: navigator.userAgent || null
        })
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("submit_failed");
          }
          return response.json();
        })
        .then(function (body) {
          if (!body || !body.ok) {
            throw new Error("submit_failed");
          }
          form.hidden = true;
          done.hidden = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(function () {
          status.textContent = t(lang, "error");
          status.className = "feedback-status is-error";
        })
        .finally(function () {
          submit.disabled = false;
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
