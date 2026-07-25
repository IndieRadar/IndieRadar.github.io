# VPS setup (beta production)

Run IndieRadar **24/7 on a Linux VPS**: Telegram bot, nightly crawl, Pages deploy, push. Replaces Mac `launchd` + local polling.

**Recommended provider:** [Hetzner Cloud EU](https://www.hetzner.com/cloud) — **CX23** (2 vCPU, 4 GB RAM, ~€5.49/mo excl. VAT).

---

## Hetzner quick start

### 1. Create server

1. Register at [console.hetzner.cloud](https://console.hetzner.cloud)
2. **New Project** → **Add Server**
3. Location: **Falkenstein** or **Helsinki** (cheapest EU)
4. Image: **Ubuntu 24.04**
5. Type: **Shared vCPU → CX23** (4 GB RAM)
6. Networking: IPv4 + IPv6 (IPv4 handy for ssh)
7. SSH key: add your Mac public key (`~/.ssh/id_ed25519.pub`)
8. Name: `indieradar-beta` → **Create**

### 2. First login

```bash
ssh root@YOUR_SERVER_IP
adduser indieradar
usermod -aG sudo indieradar
rsync --archive --chown=indieradar:indieradar ~/.ssh /home/indieradar
timedatectl set-timezone Asia/Almaty
timedatectl
```

### 3. Install Node 22

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git rsync curl build-essential
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v22.x
```

Continue with **§ 2. Clone + bootstrap** below (as user `indieradar`).

---

## Architecture

```
VPS
├── indieradar-telegram.service   ← always-on bot
├── indieradar-nightly.timer      ← 03:00 daily (Asia/Almaty)
│   └── crawl → export → Pages → verify → Telegram push
├── indieradar-weekly-telegram.timer  ← Sun 09:00
└── indieradar-weekly-rollup.timer    ← Sun 09:30
```

GitHub Pages **stay public** — VPS rsyncs `docs/` → `IndieRadar/IndieRadar.github.io` org repo.

GitHub Actions **keep:** typecheck CI, ops alerts on workflow failures, manual `workflow_dispatch` only. Daily crawl schedule **disabled** (already).

---

## 1. Provision server

```bash
# On VPS (as root or sudo user)
sudo apt update && sudo apt upgrade -y
sudo apt install -y git rsync curl build-essential

# Node 22 (NodeSource example)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Timezone = Almaty (timers use local wall clock)
sudo timedatectl set-timezone Asia/Almaty
timedatectl
```

Create deploy user (optional but recommended):

```bash
sudo adduser indieradar
sudo usermod -aG sudo indieradar
```

---

## 2. Clone + bootstrap

On VPS as deploy user:

```bash
curl -fsSL https://raw.githubusercontent.com/ivanplat1/IndieRadar/cursor/bootstrap-project-structure/scripts/vps-ops/bootstrap.sh | bash
# Or from local clone:
cd /opt/indieradar && bash scripts/vps-ops/bootstrap.sh
```

---

## 3. Configure `.env`

Copy secrets from your Mac `.env` / GitHub Actions:

| Required | Purpose |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | DB |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ADMIN_CHAT_ID` | Product bot |
| `TELEGRAM_OPS_BOT_TOKEN`, `TELEGRAM_OPS_ADMIN_CHAT_ID` | Failure alerts |
| `TELEGRAM_BETA_*` | Beta gate |
| `GITHUB_PAGES_BASE_URL` | Report links |
| `PAGES_REPOSITORY` | e.g. `IndieRadar/IndieRadar.github.io` |

**Pages deploy** (pick one):

- `PAGES_DEPLOY_TOKEN` — fine-grained PAT with write on Pages repo only  
- **or** `gh auth login` on VPS (bootstrap uses `gh repo clone` + push)

Store market vars: see `.env.example` (`CRAWLER_NICHE_SLUGS`, `GOOGLE_PLAY_MARKETS`, …).

---

## 4. Smoke test (manual)

```bash
cd /opt/indieradar
npm run typecheck
npm run ops:nightly          # ~40–60 min — watch /var/log/indieradar/
npm run verify:pipeline
```

Check:

- [IndieRadar Pages](https://indieradar.github.io/report/?q=productivity/ru) — fresh `generatedAt`
- @IndieRadarBot — `/report` works
- @indieRadarAlertBot — no alert on success

---

## 5. Install systemd

```bash
cd /opt/indieradar
sudo INDIERADAR_SERVICE_USER=indieradar npm run ops:install-vps
```

```bash
systemctl status indieradar-telegram
systemctl list-timers 'indieradar-*'
journalctl -u indieradar-telegram -f
```

---

## 6. Decommission Mac

On your Mac:

```bash
npm run ops:uninstall-schedule   # remove launchd agents
# stop local dev:telegram
launchctl list | grep indieradar  # should be empty
```

Optional: `git restore docs/data/reports` on Mac — export artifacts are not needed in IndieRadar git.

---

## 7. Updates

```bash
cd /opt/indieradar
git pull --ff-only
npm ci
sudo systemctl restart indieradar-telegram
# nightly picks up new code on next timer run
```

Or add a weekly `git pull` cron before nightly (optional).

---

## Logs & alerts

| Path | Content |
|---|---|
| `/var/log/indieradar/nightly-*.log` | Full nightly pipeline |
| `/var/log/indieradar/telegram-bot.log` | Bot stdout |
| `systemctl status indieradar-nightly` | Last nightly run |

On nightly failure → **@indieRadarAlertBot** (if `TELEGRAM_OPS_*` set in `.env`).

GHA ops alerts still fire for any remaining workflows.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `statement timeout` after crawl | Fixed in `appMarketSnapshots` — pull latest; was SQL `LIKE` bug pulling review rows |
| Pages deploy fails | Check `gh auth status` or `PAGES_DEPLOY_TOKEN` |
| Bot 409 conflict | Only one `indieradar-telegram.service` — stop Mac bot |
| Timer wrong hour | `timedatectl set-timezone Asia/Almaty` |

---

## Related

- `docs/VPS_HOSTING_PLAN.md` — rationale and sizing
- `docs/TELEGRAM_SETUP.md` — bot env
- `docs/GITHUB_PAGES_SETUP.md` — Pages repo
- `docs/OPS_ALERTS.md` — alert tuning
