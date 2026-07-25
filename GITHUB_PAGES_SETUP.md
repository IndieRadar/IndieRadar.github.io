# GitHub Pages for private IndieRadar repo

The main repository is **private**, so GitHub Pages cannot be enabled on it with a free plan.

Use a separate **public** repository under the **IndieRadar** GitHub organization for static report pages only (no secrets in that repo).

## One-time setup

### 1. Create the GitHub organization

1. Open [Create a new organization](https://github.com/account/organizations/new) (Free plan).
2. Organization account name: **`IndieRadar`** (URL becomes `https://indieradar.github.io/…`).
3. You stay logged in as your personal account; the org is a container for public Pages only.

Or run the migration helper (creates the Pages repo after the org exists):

```bash
npm run migrate:pages-org
```

### 2. Create the Pages repository

Special org repo name (served at the org root domain):

- **`IndieRadar/IndieRadar.github.io`** — public, empty, branch `main`

Enable Pages:

- **Settings → Pages → Build and deployment → Deploy from branch**
- Branch: `main`, folder: `/ (root)`

### 3. Deploy token

Create a fine-grained PAT (or classic token) with **Contents: Read and write** on `IndieRadar/IndieRadar.github.io` only.

### 4. Secrets on **ivanplat1/IndieRadar** (private repo)

| Secret | Value |
|---|---|
| `PAGES_REPOSITORY` | `IndieRadar/IndieRadar.github.io` |
| `PAGES_DEPLOY_TOKEN` | PAT with write access to the org Pages repo |
| `REPORT_PAGES_BASE_URL` (optional) | `https://indieradar.github.io/report` |

GitHub **rejects** secret names starting with `GITHUB_`; workflows map `REPORT_PAGES_BASE_URL` → `GITHUB_PAGES_BASE_URL`.

Set in local `.env` / VPS for the Telegram bot and nightly ops:

```bash
GITHUB_PAGES_BASE_URL=https://indieradar.github.io/report
PAGES_REPOSITORY=IndieRadar/IndieRadar.github.io
```

### 5. Deploy

Run workflow **Deploy Report Pages** (Actions tab), local nightly, or VPS `ops:nightly`.

The deploy job rsyncs `docs/` into the public Pages repo and pushes `main`.

## URLs

- Daily brief: `https://indieradar.github.io/report/?q=productivity/ru`
- Weekly brief: `https://indieradar.github.io/report/?q=productivity/ru/week`
- App themes: `https://indieradar.github.io/report/?q=productivity/ru/app/<canonical_app_id>`

Legacy `?niche=&locale=&app=&period=` links still work in the viewer.

App links use a stable `canonical_app_id` (not rank position), so Telegram links stay correct when the priority order changes.

## Migrating from personal Pages (`ivanplat1/IndieRadar-pages`)

1. Create org + repo as above.
2. Run `npm run migrate:pages-org` — copies existing Pages content and updates GitHub secrets.
3. Update `.env` on Mac/VPS with the new `GITHUB_PAGES_BASE_URL`.
4. Optional: archive `ivanplat1/IndieRadar-pages` after the new URL is live.

## Local export

```bash
npm run export:pages -- productivity ru
```

Updates `docs/data/reports/…` JSON consumed by `docs/report/index.html`.
