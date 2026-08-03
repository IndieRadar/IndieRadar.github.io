# Local ops schedule (laptop)

GHA **cron schedules are disabled**. Crawl + Telegram + weekly rollup run on this Mac via `launchd`.

Workflows remain available for **manual** `workflow_dispatch` only.

## Schedule (Asia/Almaty)

| Job | When | Script |
|---|---|---|
| Nightly crawl + verify + cleanup + export + Telegram pulse | Daily **03:00** | `scripts/local-ops/nightly.sh` |
| Weekly Telegram summary | Sunday **09:00** | `scripts/local-ops/weekly-telegram.sh` |
| Weekly theme rollups | Sunday **09:30** | `scripts/local-ops/weekly-rollup.sh` |

Same wall-clock times as the old GHA crons (22:00 / 04:00 / 04:30 UTC).

## Install

```bash
# Mac timezone should be Asia/Almaty (or adjust plist hours)
npm run ops:install-schedule
```

Loads three agents into `~/Library/LaunchAgents/`. Logs: `~/Library/Logs/IndieRadar/`.

## Manual run

```bash
npm run ops:nightly
npm run ops:weekly-telegram
npm run ops:weekly-rollup
```

Uses `caffeinate` so jobs keep running with the lid closed. A lock dir prevents overlapping crawls.

## Uninstall

```bash
npm run ops:uninstall-schedule
```

## Notes

- Credentials come from repo `.env` (same as local `npm run dev:crawler`).
- After crawl verify, nightly runs `npm run cleanup:source-items` (default: delete `source_items` older than **180 days**; keeps `app_market_snapshots` + `niche_theme_weekly_rollups`).
- Pages deploy runs via `gh` (or `PAGES_DEPLOY_TOKEN`) after export; Telegram pulse runs **only after** live Pages verification (`npm run verify:pages`).
- IndieRadar git auto-commit is skipped locally.
- Trend backfill stays **manual** (GHA workflow_dispatch or local `npm run crawl:trends-backfill`) — not on the daily schedule.
- Keep the Mac powered / wake-capable for 03:00; lid-closed is fine if the machine does not deep-sleep (Energy Saver).
