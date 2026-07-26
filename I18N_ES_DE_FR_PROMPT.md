# Prompt: add ES, DE, FR report locales to IndieRadar

**Context:** IndieRadar beta for indie mobile devs. Report locales are currently `ru` and `en` only. Product focus is shifting toward European markets. The crawler already collects reviews from `de:de`, `fr:fr`, `es:es` (see `GOOGLE_PLAY_MARKETS` in `.env.example`). Add **Spanish, German, and French** as **report/UI languages** — do not confuse with store market language.

**Repo:** `ivanplat1/IndieRadar`, branch `cursor/pages-org-migration` (or current default).  
**Pages:** `IndieRadar/IndieRadar.github.io` — deploy via nightly rsync.  
**VPS:** Hetzner `indieradar@128.140.50.104`, `/opt/indieradar`, systemd (bot + nightly 03:00 Almaty).

---

## Goal

Support **5 report locales:** `ru`, `en`, `es`, `de`, `fr` — end-to-end:

1. Telegram bot (onboarding, settings, push, web links)
2. Markdown report generation (daily, weekly, app drill-down)
3. GitHub Pages (hub, static HTML, JSON, URLs, lang switch)
4. API fallback (`apps/api`)
5. DB (`telegram_subscribers.locale`)
6. Ops (nightly export loop, verify, GHA workflows)

---

## Architecture decisions (implement in code)

1. **Single source of truth** — shared module, e.g.:
   ```ts
   // services/analyzer/src/locales.ts
   export const SUPPORTED_REPORT_LOCALES = ["ru", "en", "es", "de", "fr"] as const;
   export type ReportLocale = (typeof SUPPORTED_REPORT_LOCALES)[number];
   ```
   Import everywhere instead of duplicating `ru|en`.

2. **Two different "locale" concepts:**
   - **Report locale** — brief/UI language (`es`, `de`, `fr`, …)
   - **Store market** — `country:language` in crawler (`de:de`, …) — **do not change**, already covers EU

3. **Report content strategy:**
   - Static copy (`copyByLocale` in `report.ts`) — add `es`, `de`, `fr` blocks (start from en + manual polish of headings)
   - Review quotes — via `translate.ts` / `translateForLocale()`; extend `getTranslationTarget()` for `es`, `de`, `fr`
   - Theme labels — either `labelEs`/`labelDe`/`labelFr` in `reviewThemes.ts`, or translate at report time (prefer translate for MVP)

4. **URL scheme (no breaking change):**
   - `/report/{niche}/{locale}/` — daily
   - `/report/{niche}/{locale}/week/` — weekly
   - `/report/{niche}/{locale}/app/{appId}/`
   - Hub: `/?lang={locale}`
   - Replace `(ru|en)` regexes in `site.js`, `staticPageRender.ts`, `apps/api` with `(ru|en|es|de|fr)`

5. **Web lang switch** — 5 links (RU EN ES DE FR) or dropdown; static in HTML + JS fallback.

6. **Telegram language picker** — 5 buttons; callbacks `ob:l:es`, `ob:l:de`, `ob:l:fr`. Auto-detect from `language_code`: `de*`→de, `fr*`→fr, `es*`→es, CIS→ru, default→en.

7. **Optional env:** `REPORT_LOCALES=ru,en,es,de,fr` for nightly/verify loops (DRY).

---

## Files checklist

### 1. Core / shared
- [ ] New `locales.ts` — constant + type + `parseReportLocale()` + `localeDisplayName()`
- [ ] `services/analyzer/src/report.ts` — `ReportLocale`, `copyByLocale` (+es/de/fr), ~68 ternaries → map lookup
- [ ] `services/analyzer/src/translate.ts` — targets for es/de/fr
- [ ] `services/analyzer/src/exportPages.ts` — `parseLocale()`
- [ ] `services/analyzer/src/staticPageRender.ts` — `COPY`, `NICHE_LABELS`, `renderLangSwitch()`, inline JS regex, `formatGeneratedAt` (es-ES, de-DE, fr-FR)
- [ ] `services/analyzer/src/index.ts`, `weekly.ts` — CLI parseLocale
- [ ] `services/analyzer/src/reportPages.ts` — verify generic (likely OK)

### 2. Telegram
- [ ] `services/telegram/src/onboarding.ts` — picker keyboard, callbacks, welcome/settings copy, `pickerUiLocaleFromLanguageCode()`
- [ ] `services/telegram/src/bot.ts` — `localeTokens`, `/locale`, `/report <niche> [locale]`, display names
- [ ] `services/telegram/src/subscribers.ts` — validation
- [ ] `services/telegram/src/keyboard.ts`, `push.ts`, `push-weekly.ts`
- [ ] `services/telegram/src/verifyPagesDeploy.ts` — `defaultLocales`

### 3. Web / docs
- [ ] `docs/site.js` — `COPY` (+es/de/fr), `NICHES[].label`, lang switch, all `(ru|en)` regexes
- [ ] `docs/index.html` — `initialLang()` query param
- [ ] `docs/site.css` — styles for 5-way lang switch (compact/scroll on mobile)
- [ ] Regenerate `docs/report/**` and `docs/data/reports/**` — **do not hand-patch**, only via `npm run export:pages`

### 4. API
- [ ] `apps/api/src/server.ts` — `supportedLocales`, route regex
- [ ] `apps/api/src/render.ts` — `<html lang=`, note labels

### 5. Crawler (minimal)
- [ ] `reviewThemes.ts` — optional labelEs/De/Fr or leave translate in report
- [ ] Markets — **do not touch** unless explicitly requested

### 6. Database
- [ ] New migration: `telegram_subscribers.locale check (locale in ('ru','en','es','de','fr'))`
- [ ] Existing rows unchanged

### 7. Ops / CI
- [ ] `scripts/local-ops/nightly.sh` — locale loop (env or constant)
- [ ] `.github/workflows/crawl-daily.yml`, `deploy-pages.yml`, `telegram-weekly.yml`
- [ ] `docs/OPS_ALERTS.md`, `TELEGRAM_EVALUATION_BOT_PLAN.md`, `REPORT_DELIVERY_MODEL.md`
- [ ] Deploy Pages + VPS `git pull` after merge

---

## Niche labels (staticPageRender + site.js)

| slug | es | de | fr |
|------|----|----|-----|
| productivity | Productividad | Produktivität | Productivité |
| habit-tracker | Hábitos | Gewohnheiten | Habitudes |
| finance | Finanzas | Finanzen | Finance |
| ai-chat | Chat IA | KI-Chat | Chat IA |
| fitness | Fitness | Fitness | Fitness |

---

## Telegram UX (target)

```
/start → language picker:
[ 🇷🇺 RU ] [ 🇬🇧 EN ]
[ 🇪🇸 ES ] [ 🇩🇪 DE ] [ 🇫🇷 FR ]
→ niche picker → connected

/settings → change language (same 5)
/report productivity de
/week productivity fr
```

Push groups by `{niche}:{locale}` — subscribers with `locale=de` get German brief + links to `/report/.../de/`.

---

## Export / deploy

After code changes:

```bash
for niche in productivity habit-tracker finance ai-chat fitness; do
  for locale in ru en es de fr; do
    npm run export:pages -- "$niche" "$locale"
  done
done
npm run verify:pages
# deploy → IndieRadar.github.io
# VPS: git pull && npm ci && restart telegram
```

Expected growth: **2.5×** HTML/JSON artifacts (5 locales vs 2).

---

## Acceptance criteria

1. `/report/productivity/de/` — full daily in German, lang switch works
2. `/report/finance/es/week/` — weekly in Spanish
3. Hub `/?lang=fr` — UI in French
4. Telegram: 5-language picker, DB persistence, push with correct URLs
5. `npm run typecheck` passes
6. `verify:pages` / `verify:pipeline` — all niches × 5 locales fresh
7. VPS nightly exports 5 locales without timeout
8. Existing `/report/.../ru/` and `/en/` URLs keep working

---

## Out of scope (v1)

- Localizing **app names** or niche slugs in URLs
- AI prompt export (`PLANNED_FEATURES`) — separate stage
- Billing / paywall per locale
- RTL, Japanese, etc.

---

## Implementation order

1. Shared `locales.ts` + DB migration
2. `report.ts` + `translate.ts` (smoke: one niche × de)
3. Telegram onboarding + bot
4. `staticPageRender.ts` + `site.js`
5. Ops loops + verify
6. Full re-export all niches × 5 locales
7. Deploy Pages + VPS pull
8. Smoke: Telegram `/report productivity de`, curl live URLs

---

## Smoke test

```bash
npm run typecheck
npm run export:pages -- productivity de
curl -sL "https://indieradar.github.io/report/productivity/de/" | grep -E 'lang-switch|Produktivität'
# Telegram manual: /start → DE → productivity → /report
```
