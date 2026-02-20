# Socialife Analytics — Hosting & Storage Options

**Prepared for:** Laura-Jayne, Socialife Management
**Date:** February 2026
**Purpose:** Help you choose how the analytics tool stores data and how your team accesses it

---

## The Question

The analytics tool needs somewhere to keep your client data (metrics, reports, branding) and a way for your team to access it. There are several options, each with different trade-offs.

**What we're comparing:**
- How much it costs per month
- How easy it is to use day-to-day
- Whether all 3 team members can access it
- What happens if something goes wrong
- How it compares to Metricool (currently ~£50/month)

---

## Option A: Hosted Web App (Recommended)

**How it works:** The tool runs as a website (like Metricool does). You open a link in your browser, log in, and everything works. Data is stored securely in the cloud.

| Aspect | Detail |
|--------|--------|
| **How you access it** | Open a URL in any browser (Chrome, Safari, Edge) |
| **Team access** | All 3 team members can log in from anywhere |
| **Installation** | None — just a website |
| **Monthly cost** | £0–7 (free tiers available, paid tier for more storage) |
| **Data backup** | Automatic (cloud-hosted) |
| **Works offline** | No — needs internet |
| **What can break** | Hosting provider could have downtime (rare) |
| **Who fixes it** | Nothing to fix day-to-day; hosting provider handles uptime |

**Laura's daily experience:**
1. Open browser → go to `app.socialife-analytics.co.uk` (or similar)
2. Log in (remembers you)
3. Dashboard shows all clients
4. Import CSVs, generate PPTX reports, manage clients
5. Lois and Laura can log in with their own accounts

**Technology:** Static frontend on GitHub Pages or Vercel (free) + Supabase database (free tier: 500MB storage, unlimited API calls, up to 50,000 monthly users).

**Why this is recommended:** It's the closest experience to Metricool — just a website you open in your browser. No installation, no technical knowledge needed. The free tier is generous enough for 16 clients and 3 users. If Supabase ever changed their pricing, your data can be exported and moved to another provider.

---

## Option B: Google Sheets as Database

**How it works:** Your client data is stored in Google Sheets (which your team already uses). The analytics tool reads from and writes to these spreadsheets. One sheet per client.

| Aspect | Detail |
|--------|--------|
| **How you access it** | Open the tool URL + connect your Google account |
| **Team access** | Anyone with access to the Google Drive folder |
| **Installation** | None — just a website + Google authorisation |
| **Monthly cost** | £0 (uses your existing Google Workspace) |
| **Data backup** | Automatic (Google Drive versioning) |
| **Works offline** | No |
| **What can break** | Google API rate limits (unlikely at your scale) |
| **Who fixes it** | Self-healing — Google handles everything |

**Laura's daily experience:**
1. Open the tool in your browser
2. First time: authorise with your Google account
3. Data lives in a "Socialife Analytics" folder in your Google Drive
4. You can see the raw data in Google Sheets anytime
5. Team access via normal Google Drive sharing

**Pros:** No new accounts, no new costs, data is in a format you already understand (spreadsheets). If you ever stop using the tool, your data is still there in Google Sheets.

**Cons:** Slightly slower than a dedicated database. Google Sheets has a limit of 10 million cells per spreadsheet (more than enough for years of data). The tool needs to request permission to your Google Drive, which some people find uncomfortable.

---

## Option C: Local App on Your Computer

**How it works:** The tool runs on your computer (like running a program). Data is stored as files in a folder on your machine. If that folder is inside Google Drive or iCloud, it syncs automatically.

| Aspect | Detail |
|--------|--------|
| **How you access it** | Double-click an icon on your desktop |
| **Team access** | Only on the computer it's installed on (unless using VPN) |
| **Installation** | One-time setup (extract a folder, double-click to run) |
| **Monthly cost** | £0 |
| **Data backup** | Automatic if folder is in Google Drive/iCloud |
| **Works offline** | Yes |
| **What can break** | The program might not start if something changes on your computer |
| **Who fixes it** | May need technical help to troubleshoot |

**Laura's daily experience:**
1. Double-click "Socialife Analytics" on your desktop
2. Browser opens automatically
3. Everything works locally — no internet needed
4. Data saved to your computer (synced via Google Drive/iCloud)

**Pros:** Completely free, works offline, total data privacy (nothing leaves your computer), fastest performance.

**Cons:** Only works on one computer. If Lois or Laura need access, they'd need to be on the same network or use a VPN. If the program crashes, you might need help restarting it. Different setup for Windows vs Mac.

---

## Option D: Google Drive + Static Site

**How it works:** The tool is a website (like Option A) but data is stored as simple files in a shared Google Drive folder. No database, no accounts — just files that sync via Google Drive.

| Aspect | Detail |
|--------|--------|
| **How you access it** | Open a URL in your browser |
| **Team access** | Anyone who has the Google Drive folder shared with them |
| **Installation** | None |
| **Monthly cost** | £0 |
| **Data backup** | Automatic (Google Drive) |
| **Works offline** | Limited — can view cached data |
| **What can break** | Google Drive API authorisation may need refreshing occasionally |
| **Who fixes it** | Re-authorise your Google account (click a button) |

**Laura's daily experience:**
1. Open the tool URL
2. Connect your Google Drive (one-time authorisation)
3. Tool reads/writes JSON files in your "Socialife Analytics" Drive folder
4. Share the Drive folder with your team — they can all access the same data

**Pros:** Zero cost, data portable (just files), familiar Google Drive sharing.

**Cons:** Requires Google Drive authorisation. Writing files from a browser to Google Drive requires an API setup (one-time, but slightly technical). Performance depends on Google Drive API speed.

---

## Comparison at a Glance

| | Metricool (Current) | A: Hosted Web App | B: Google Sheets | C: Local App | D: Google Drive |
|---|---|---|---|---|---|
| **Monthly cost** | ~£50 | £0–7 | £0 | £0 | £0 |
| **Annual cost** | ~£600 | £0–84 | £0 | £0 | £0 |
| **Annual saving** | — | £516–600 | £600 | £600 | £600 |
| **Team access** | Yes | Yes | Yes | Single user | Yes |
| **Installation** | None | None | None | One-time | None |
| **Works offline** | No | No | No | Yes | Limited |
| **Maintenance** | None | None | None | Occasional | Rare |
| **Data portability** | Limited | Exportable | Already yours | Already yours | Already yours |
| **Customisation** | Limited | Full | Full | Full | Full |

---

## My Recommendation

**Option A (Hosted Web App)** gives the best balance of simplicity, team access, and zero maintenance. It's the closest experience to what you have with Metricool today — just a website you open in your browser — but without the monthly cost.

The free hosting tiers available today are more than sufficient for your needs (16 clients, 3 users, monthly reporting). And because we build the tool ourselves, if any provider changes their terms, we can move your data to another option with minimal effort.

**Option B (Google Sheets)** is a strong second choice if you'd prefer to keep everything within the tools you already use. The data is always visible and editable in a format you understand.

---

## Questions to Discuss

1. Do all 3 team members need to import data and generate reports, or is that mainly Laura?
2. How important is offline access? (Can you always count on internet when doing reports?)
3. Would you prefer the data to live in your Google account (Options B/D) or in a dedicated service (Option A)?
4. Are you comfortable with a £0-7/month hosting cost, or does it need to be strictly zero?

---

*Prepared by Vibe Coding Consulting*
