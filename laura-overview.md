# Socialife Analytics Tool — Overview for Laura

**Prepared:** 30 January 2026
**Wireframes:** [View on GitHub](https://github.com/Topsy31/Socialife/tree/main/wireframe)

---

## What We're Building

A custom analytics and content planning tool to replace Metricool, giving you:

- **Full ownership** of your data and reports
- **No ongoing subscription** (one-time build cost)
- **White-labelled reports** with Socialife branding for each client
- **Content planning** with AI-powered suggestions

---

## How It Works

### 1. Your Team Exports Data Monthly

Each month, your team downloads analytics CSVs from each platform:
- Instagram → Professional Dashboard → Insights → Export
- Facebook → Meta Business Suite → Insights → Export
- TikTok → TikTok Studio → Analytics → Download
- LinkedIn → Page Admin → Analytics → Export

### 2. Drop Files into a Shared Folder

Files go into a structured folder (local drive, OneDrive, Google Drive, or Dropbox):

```
SocialifeData/
├── Essex Sports Club/
│   ├── instagram/2026-01-metrics.csv
│   ├── facebook/2026-01-insights.csv
│   └── tiktok/2026-01-analytics.csv
├── Bella's Bakery/
│   └── instagram/2026-01-metrics.csv
└── [other clients...]
```

### 3. Click "Sync" and Generate Reports

You open the app, click **Sync All**, and the system imports all new data. Then generate professional PDF reports for each client with one click.

**Estimated monthly time:** 15-20 minutes per client for exports, then one-click sync and report generation.

---

## What You'll See

### Wireframes to Review

Open these in your browser to see the proposed interface:

| Page | Purpose | Link |
|------|---------|------|
| **Dashboard** | Overview of all 16 clients at a glance | [index.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/index.html) |
| **Clients** | Add, edit, archive clients with their branding | [clients.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/clients.html) |
| **Import Data** | Folder sync or manual CSV upload | [import.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/import.html) |
| **Content Calendar** | Plan and schedule posts with AI suggestions | [calendar.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/calendar.html) |
| **Settings** | Configure AI, branding, backups | [settings.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/settings.html) |
| **Report Preview** | White-labelled PDF report view | [report.html](https://github.com/Topsy31/Socialife/blob/main/wireframe/report.html) |

**To view:** Download the HTML file and open in your browser, or view the code on GitHub.

---

## Key Features

### Analytics & Reporting (MVP Priority)
- Import data from Instagram, Facebook, TikTok, LinkedIn
- Dashboard showing all clients' key metrics
- White-labelled PDF reports with your branding and each client's logo
- Trend analysis over time
- Top performing content highlights

### Content Planning (Secondary)
- Visual content calendar
- AI-powered caption and hashtag suggestions
- Draft → Approval → Scheduled workflow
- Optimal posting time recommendations based on analytics

### Client Management
- Full client lifecycle: onboard new clients, archive when contracts end
- Store client branding (logo, colours) for reports
- Track which platforms each client uses

---

## What Success Looks Like

| Goal | How We'll Measure It |
|------|---------------------|
| **Cost savings** | Metricool subscription cancelled |
| **Time savings** | Monthly reporting takes less time than current process |
| **Quality** | Clients impressed with new report format |

---

## How We'll Roll This Out

```
Phase 1: Build & Test
   ↓
Phase 2: Parallel Run (use both Metricool AND new tool)
   ↓
Phase 3: Switch Over (cancel Metricool when confident)
```

No deadline pressure — we run in parallel until you're happy with the new tool.

---

## Questions for You

Before we start building, we need your input on a few things:

### 1. Sample Reports
**Question:** Can you share 1-2 example Metricool reports that you're happy with?

**Why it matters:** This helps us design the PDF layout to match or improve on what clients already expect.

**If you don't have any:** We'll design from scratch based on the wireframes.

---

### 2. Data Retention Requirements
**Question:** How long do your client contracts require you to keep their data?

**Why it matters:** We need to know whether to keep 1 year, 2 years, or longer of historical analytics.

**Options:**
- [ ] 1 year rolling
- [ ] 2 years
- [ ] As long as they're a client
- [ ] Specific requirement in contracts (please specify)

---

### 3. Data Deletion (GDPR)
**Question:** Do your client contracts include data deletion requirements?

**Why it matters:** If a client leaves, we may need a "delete all their data" feature for GDPR compliance.

**Options:**
- [ ] Yes — must be able to delete on request
- [ ] No specific requirement
- [ ] Not sure — I'll check

---

### 4. Current Tools
**Question:** What other tools does your team currently use day-to-day?

**Why it matters:** We might be able to integrate (e.g., save reports directly to Google Drive).

**Options:**
- [ ] Google Workspace (Gmail, Drive, Calendar)
- [ ] Microsoft 365 (Outlook, OneDrive, Teams)
- [ ] Canva
- [ ] Slack / WhatsApp for team communication
- [ ] Other: _______________

---

### 5. Metrics That Matter Most
**Question:** Which metrics do your clients care most about in their reports?

**Why it matters:** We'll prioritise these in the dashboard and report layout.

**Rank these 1-5 (1 = most important):**
- [ ] Follower growth
- [ ] Engagement (likes, comments, shares)
- [ ] Reach / Impressions
- [ ] Best performing posts
- [ ] Posting consistency

**Any others?** _______________

---

### 6. Wireframe Feedback
**Question:** After reviewing the wireframes, what would you change?

Please note:
- Anything confusing
- Missing features
- Layout preferences
- "This isn't how I'd do it" moments

---

## Next Steps

1. **You review** this document and the wireframes
2. **You answer** the questions above
3. **We clarify** anything unclear
4. **Development begins** on the MVP
5. **You test** alongside Metricool
6. **We refine** based on your feedback
7. **Switch over** when ready

---

## Contact

Questions? Let us know and we'll clarify anything before moving forward.

---

*Prepared by Vibe Coding Consulting*
