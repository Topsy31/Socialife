# Social Media Analytics & Content Planning Tool

**Client:** Laura-Jayne, Socialife Management
**Website:** [socialifemanagement.com](https://www.socialifemanagement.com/)
**Date:** 30 January 2026
**Status:** Discovery/Planning

---

## About Socialife Management

Socialife Management is a social media agency based in Essex, providing:

- **Full-scale social media management** across Instagram, Facebook, TikTok, and LinkedIn
- **Content creation and scheduling** with strategy planning
- **Community engagement** (responding to comments, messages, interactions)
- **Meta ads management** for Facebook and Instagram campaigns
- **Professional content shoots** (weddings, parties, brand launches, retreats)
- **Social media strategy sessions**

**Team:**
- Laura-Jayne (Director/Social Media Manager) — strategy, photography, videography, campaign planning
- Lois (Social Media Assistant/TikTok Expert) — trends, content creation, editing
- Laura (Account Manager/Ads Manager) — ads and account management

**Target clients:** Businesses of varying sizes, from startups to established brands. Case studies include local Essex businesses across sports, e-commerce, food service, and financial services sectors.

**Recognition:** Runner-Up for Creative Business of the Year at Castle Point Mayor's Awards 2025.

---

## Client Requirements

Laura has reviewed the Metricool analysis and identified two areas of interest:

1. **Analytics and reporting** (primary) — "not sure if fully possible"
2. **Planning and optimising content** (secondary)

---

## ICE Framework: Intent, Constraints, Expectations

### Intent — What does success look like?

**Primary Success Measures:**

| Measure | Target | How We'll Know |
|---------|--------|----------------|
| Cost savings | Eliminate Metricool subscription (€54-99/month) | Tool is live, Metricool cancelled |
| Time savings | Reports generated faster than current process | Laura's monthly reporting time reduced |
| Quality improvement | Reports that impress clients more than Metricool | Positive client feedback on new reports |

**MVP Definition:**
- All 16 clients working from day one
- Analytics import and report generation functional
- Content calendar: **Airtable integration** (read existing calendars, overlay analytics insights) — elevated from "nice-to-have" based on Laura's feedback

**Timeline:**
- No hard deadline
- Quality over speed
- Parallel run with Metricool until confident in new tool

---

### Constraints — What are the boundaries?

**Technical Environment:**

| Constraint | Detail |
|------------|--------|
| Operating Systems | Must support both Windows and Mac (mixed team) |
| Technical Skill | Basic — Laura can follow written steps, use file explorer, but no coding |
| Installation | Needs one-click installer or very simple setup process |
| Maintenance Time | 1-2 hours per month maximum for ongoing operation |

**What this means for development:**
- Provide both `.bat` (Windows) and `.sh` (Mac) launchers
- Include visual step-by-step setup guide with screenshots
- Auto-detect platform and configure appropriately
- Minimise manual intervention required

**Data & Compliance (Confirmed by Laura):**

| Area | Status | Action |
|------|--------|--------|
| GDPR compliance | No specific contractual requirement | Still build delete capability as best practice |
| Data retention | As long as they're a client | No automatic purge; archive when client leaves |
| Data deletion | No specific requirement in contracts | Include "delete all client data" as optional feature |

**Existing Toolset (Confirmed by Laura):**
- **Google Workspace:** Gmail, Google Drive, Google Calendar
- **Canva:** Design and content creation
- **WhatsApp:** Team communication
- **Airtable:** Content calendars for each client (established workflow)
- Potential integrations: Google Drive (report export), **Airtable (content calendar sync — high priority)**

---

### Expectations — What does "done" look like?

**Acceptance Criteria for MVP:**

| Feature | Acceptance Criteria |
|---------|---------------------|
| Data Import | Can import CSV from all 4 platforms (Instagram, Facebook, TikTok, LinkedIn) for all 16 clients |
| Dashboard | Shows all clients at a glance with key metrics |
| Reports | Generates white-labelled PDF reports with Socialife branding |
| Client Management | Can add, edit, archive clients with their brand assets |

**Handover Requirements:**
- Live training session with Laura (1:1 video call)
- Written documentation in the app
- Video walkthrough as backup reference

**Rollout Plan:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: Build & Test                                          │
│  • Develop MVP with all 16 clients                              │
│  • Test with sample data from Laura                             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  Phase 2: Parallel Run                                           │
│  • Laura uses both Metricool AND new tool                        │
│  • Compares outputs, identifies gaps                             │
│  • Fixes and refinements                                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  Phase 3: Switch Over                                            │
│  • Confidence achieved                                           │
│  • Cancel Metricool subscription                                 │
│  • New tool becomes primary                                      │
└─────────────────────────────────────────────────────────────────┘
```

**Fallback Plan:**
- Keep Metricool subscription active during parallel run
- If new tool doesn't meet needs, continue with Metricool
- No deadline pressure means we can iterate until right

---

### Answered Questions from Laura

| Question | Laura's Answer | Impact on Build |
|----------|---------------|-----------------|
| Sample reports | Two PowerPoint reports provided (Intotum January, SCC November) | Use as design reference for PDF layout; note format is PPTX not PDF |
| Data retention | As long as they're a client | No auto-purge needed; archive on contract end |
| GDPR/data deletion | No specific contractual requirement | Build delete feature as best practice, not critical path |
| Current tools | Google Workspace, Canva, WhatsApp, **Airtable** | Airtable integration is high priority for content calendar |
| Metrics priority | 1. Views, 1. Engagement, 1. Reach/Impressions, 3. Follower growth, 4. Best performing posts | Views must be a first-class metric; dashboard should lead with Views, Engagement, Reach |
| Wireframe feedback | "Looks great and very simple to navigate" — asked about Airtable integration for content calendar | Content calendar must either sync with Airtable or replicate its workflow |

### Remaining Open Questions

| Question | Why It Matters | Suggested Next Step |
|----------|----------------|---------------------|
| Airtable base structure | Need to understand their current calendar schema (fields, views, statuses) to design integration | Laura offered to share a client calendar via Teams — **accept this offer** |
| Report format preference | Sample reports are PowerPoint, not PDF — does Laura prefer PPTX or PDF output? | Ask Laura; PPTX generation is feasible but different from planned PDF |
| Views metric definition | "Views" could mean video views, profile views, or page views depending on platform | Clarify which platforms/content types this applies to |
| Airtable plan/tier | Free plan has 1,000 record limit and restricted API; need to know their current plan | Ask Laura what Airtable plan they're on |
| Google Drive integration | Should generated reports auto-save to a shared Google Drive folder? | Confirm with Laura (she uses Google Workspace) |

---

## The Core Challenge

Social media analytics data lives inside the platforms. To access it, you need:

- **Official API access** — requires business verification and approval processes
- **Manual export** — platforms allow CSV downloads of your own data
- **Third-party tools** — services like Metricool that have established API partnerships

---

## Proposed Approach

### Phase 1: Unified Dashboard with Content Planning

Build a single integrated experience where analytics insights directly inform content planning.

**Integration Points (Analytics ↔ Content Planning):**

```
┌────────────────────────────────────────────────────────────────┐
│                    UNIFIED DASHBOARD                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────┐    ┌─────────────────────────────┐   │
│  │   ANALYTICS         │───▶│   CONTENT CALENDAR          │   │
│  │                     │    │                             │   │
│  │ • Performance data  │    │ • Optimal times highlighted │   │
│  │ • Best posting times│    │ • AI suggestions panel      │   │
│  │ • Top content types │    │ • Performance predictions   │   │
│  │ • Engagement trends │    │ • Draft/Approval workflow   │   │
│  └─────────────────────┘    └─────────────────────────────┘   │
│           │                            │                       │
│           ▼                            ▼                       │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              SHARED DATA LAYER                          │  │
│  │  • Client profiles    • Historical metrics              │  │
│  │  • Content library    • Posting schedule                │  │
│  │  • Brand guidelines   • Performance benchmarks          │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

**How Analytics Informs Content Planning:**

| Analytics Insight | Content Planning Feature |
|-------------------|-------------------------|
| Best posting times (Tue/Thu 6-8pm) | Calendar highlights optimal slots in green |
| Top content type (Reels +42%) | AI suggests Reel ideas first |
| Engagement trends by topic | AI generates content around high-performing themes |
| Hashtag performance | Auto-suggests proven hashtags |
| Competitor posting patterns | Shows gaps/opportunities in schedule |

**Content Calendar Features:**
- Drag-and-drop scheduling across platforms
- Visual platform indicators (IG pink, FB blue, TT black, LI sky)
- Status badges: Draft, Pending Approval, Scheduled, Published
- Week/Month/List view toggle
- Optimal posting times highlighted based on historical data
- Quick stats in sidebar showing week's performance

**AI Content Generation (Claude API):**
- Caption writing with tone selection
- Hashtag suggestions based on past performance
- Content ideas driven by analytics insights
- "Generate with AI" button on caption field
- Performance predictions before posting

**Approval Workflow:**
- Draft → Pending Approval → Scheduled → Published
- Team members can approve/edit pending posts
- Notification system for approvals
- Audit trail of who approved what

**Multi-client Workspace:**
- Client selector dropdown throughout UI
- Each client has own brand guidelines, templates
- Switch context without losing work

---

### Airtable Integration (Content Calendar)

Laura's team already uses Airtable for client content calendars. This is an established workflow — the tool must either integrate with Airtable or provide equivalent functionality that justifies switching away from it.

**Laura's exact feedback:** *"I wonder if there would be a way we could connect that to Airtable for their already planned calendar. If not, we could definitely transition into this if it could be used in the same way as Airtable. Happy to share a client calendar with you via Teams so you can see how we use it."*

**Strategy Decision: Integrate, Don't Replace**

Rather than rebuilding Airtable's functionality (which would be significant scope), the recommended approach is to **integrate with Airtable via its REST API** and treat Airtable as the content planning source of truth.

**Why integrate rather than replace:**

| Factor | Integrate with Airtable | Build our own calendar |
|--------|------------------------|----------------------|
| Team disruption | None — keep existing workflow | High — learn new tool |
| Development effort | Moderate (API integration) | High (replicate Airtable features) |
| Feature parity | Immediate (Airtable already works) | Would take significant development to match |
| Collaboration | Airtable handles multi-user natively | Would need to solve separately |
| Cost | Laura already pays for Airtable | No additional cost, but much more dev work |
| Risk | Low — additive feature | High — replacing working system |

**Airtable REST API Capabilities:**

| Capability | Detail |
|------------|--------|
| Authentication | Personal Access Tokens (PATs) — API keys deprecated Feb 2024 |
| Read records | List/get records from any table, with filtering and sorting |
| Write records | Create, update, delete up to 10 records per request |
| Rate limits | 5 requests per second per base |
| Record limits | Free plan: 1,000 records per base; Pro plan: 50,000 |
| Webhooks | Available on paid plans for real-time change notifications |
| Base URL | `https://api.airtable.com/v0/{baseId}/{tableNameOrId}` |

**Integration Architecture:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    SOCIALIFE ANALYTICS TOOL                       │
│                                                                   │
│  ┌─────────────────────┐    ┌──────────────────────────────┐    │
│  │   ANALYTICS ENGINE  │    │   CONTENT CALENDAR VIEW      │    │
│  │                     │    │                              │    │
│  │ • CSV import        │    │ • Reads from Airtable API   │    │
│  │ • Trend analysis    │───▶│ • Shows posts + status      │    │
│  │ • Best times data   │    │ • Optimal times overlay     │    │
│  │ • Top content types │    │ • AI suggestions sidebar    │    │
│  └─────────────────────┘    └──────────────┬───────────────┘    │
│                                             │                    │
│                              Write back:    │                    │
│                              AI suggestions,│                    │
│                              optimal times  │                    │
│                                             │                    │
└─────────────────────────────────────────────┼────────────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────┐
                               │       AIRTABLE           │
                               │                          │
                               │  Client Calendar Bases   │
                               │  (source of truth for    │
                               │   content planning)      │
                               │                          │
                               │  Laura's team continues  │
                               │  to plan content here    │
                               └──────────────────────────┘
```

**Integration Features (Two-Way via REST API):**

| Feature | Direction | How It Works |
|---------|-----------|-------------|
| Display calendar | Read from Airtable | Fetch records, display in our calendar view with analytics overlay |
| Post status tracking | Read from Airtable | Show Draft/Scheduled/Published status from Airtable fields |
| Optimal posting times | Write to Airtable | Add "Suggested Time" field populated by analytics engine |
| AI caption suggestions | Write to Airtable | Add "AI Suggestion" field that team can accept/reject |
| Performance data | Write to Airtable | After publishing, write engagement metrics back to the post record |
| Content insights | Read from Airtable | Analyse planned content types against historical performance |

**Implementation Approach:**

1. **Accept Laura's offer** — get access to a client Airtable calendar via Teams
2. **Map the schema** — document fields, views, statuses, and relationships
3. **Build read integration first** — display Airtable calendar data in our tool with analytics overlay
4. **Add write-back features** — AI suggestions, optimal times, post-publish metrics
5. **Test with Laura** — ensure it doesn't disrupt existing workflow

**Airtable Configuration (Settings Page):**

| Setting | Purpose |
|---------|---------|
| Personal Access Token | Authentication for API calls |
| Base ID per client | Each client's Airtable base (or table within a shared base) |
| Field mapping | Map Airtable field names to our data model |
| Sync frequency | How often to pull updates (default: on page load + manual refresh) |
| Write-back enabled | Toggle whether we write suggestions/metrics back to Airtable |

**Airtable Provider Interface:**

```typescript
interface AirtableProvider {
  // Configuration
  configure(token: string, baseId: string): void;
  testConnection(): Promise<boolean>;

  // Read operations
  getRecords(tableId: string, options?: {
    filterByFormula?: string;
    sort?: { field: string; direction: 'asc' | 'desc' }[];
    maxRecords?: number;
    view?: string;
  }): Promise<AirtableRecord[]>;

  getRecord(tableId: string, recordId: string): Promise<AirtableRecord>;

  // Write operations
  createRecords(tableId: string, records: Partial<AirtableRecord>[]): Promise<AirtableRecord[]>;
  updateRecords(tableId: string, records: { id: string; fields: Record<string, any> }[]): Promise<AirtableRecord[]>;

  // Schema discovery
  getBaseSchema(baseId: string): Promise<AirtableSchema>;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

// Field mapping configuration per client
interface AirtableFieldMapping {
  clientId: string;
  baseId: string;
  tableId: string;
  fields: {
    postDate: string;        // e.g., "Scheduled Date"
    platform: string;        // e.g., "Platform"
    caption: string;         // e.g., "Caption"
    status: string;          // e.g., "Status"
    contentType: string;     // e.g., "Content Type"
    hashtags?: string;       // e.g., "Hashtags"
    aiSuggestion?: string;   // e.g., "AI Suggestion" (write-back)
    optimalTime?: string;    // e.g., "Best Time" (write-back)
    actualReach?: string;    // e.g., "Reach" (write-back post-publish)
    actualEngagement?: string; // e.g., "Engagement" (write-back)
  };
  statusMapping: {
    draft: string;           // e.g., "Draft"
    pendingApproval: string; // e.g., "Pending"
    scheduled: string;       // e.g., "Scheduled"
    published: string;       // e.g., "Published"
  };
}
```

**Airtable Free Plan Constraints:**

| Limit | Free Plan | Pro Plan (£16/user/month) |
|-------|-----------|---------------------------|
| Records per base | 1,000 | 50,000 |
| Attachment storage | 1 GB | 20 GB |
| Revision history | 2 weeks | 1 year |
| API rate limit | 5 req/sec | 5 req/sec |
| Automations | 100 runs/month | 25,000 runs/month |
| Sync integrations | Limited | Full |

**Important:** If Laura is on the free plan with 16 clients, each client having ~30 posts/month = 480 records/month. The 1,000 record limit could be hit within 2 months unless they archive old records. Need to confirm Laura's Airtable plan.

**Fallback: Built-In Calendar (If Airtable Integration Not Feasible)**

If Airtable integration proves impractical (e.g., Laura is on free plan with API limits, or the schema is too complex), the content calendar in our tool should mirror Airtable's UX:

- Grid view (spreadsheet-like, Airtable's default)
- Calendar view (month/week)
- Kanban view (by status: Draft → Pending → Scheduled → Published)
- Filtering by client, platform, status
- Collaborative editing (would require cloud storage — Stage 3+)

This is significantly more development work and should only be pursued if Airtable integration is ruled out.

**Client Management:**
- Full client lifecycle: onboard → active → archived
- Client profile with branding, platforms, contacts
- Archive clients without deleting historical data
- Bulk actions for efficiency

**Technical Stack:**
- Frontend: React with Tailwind CSS
- Backend: Node.js + Express (local server)
- Database: SQLite (local file)
- AI: Claude API for content generation
- Delivery: Local web app (see Application Delivery below)
- No platform API access required (manual posting initially)

**CORS & API Architecture:**

All external API calls go through the local Node.js backend, never directly from the browser. This solves CORS and keeps API keys secure.

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│   React Frontend (localhost:3000)                                │
│                           │                                      │
│                           │ fetch('/api/...')                    │
│                           ▼                                      │
├─────────────────────────────────────────────────────────────────┤
│                    NODE.JS BACKEND                               │
│   Express Server (localhost:3000)                                │
│                           │                                      │
│   ┌───────────────────────┼───────────────────────────┐         │
│   │                       │                           │         │
│   ▼                       ▼                           ▼         │
│ /api/ai/*           /api/social/*              /api/storage/*   │
│                                                                  │
└───────────┬───────────────┬───────────────────────┬─────────────┘
            │               │                       │
            ▼               ▼                       ▼
    ┌───────────┐   ┌───────────────┐      ┌───────────────┐
    │ Claude/   │   │ Meta Graph    │      │ Supabase      │
    │ OpenAI/   │   │ TikTok API    │      │ (if enabled)  │
    │ Ollama    │   │ LinkedIn API  │      │               │
    └───────────┘   └───────────────┘      └───────────────┘
```

**Why this works:**
- Browser → Backend: Same origin, no CORS issues
- Backend → External APIs: Server-side requests, CORS doesn't apply
- API keys stored on server, never exposed to browser
- Can add rate limiting, caching, error handling at backend layer

**API Route Structure:**

| Route | Purpose |
|-------|---------|
| `POST /api/ai/generate` | AI content generation (proxies to Claude/OpenAI/Ollama) |
| `POST /api/ai/hashtags` | AI hashtag suggestions |
| `GET /api/social/instagram/:accountId/metrics` | Fetch Instagram metrics (when API connected) |
| `GET /api/social/facebook/:accountId/metrics` | Fetch Facebook metrics |
| `POST /api/storage/backup` | Trigger backup (local or Supabase) |
| `GET /api/storage/sync` | Sync with Supabase (if enabled) |

**Ollama Exception:**
Ollama runs locally and needs CORS configured. Two options:
1. Still proxy through backend (recommended for consistency)
2. Configure Ollama with `OLLAMA_ORIGINS=http://localhost:3000` environment variable

---

### Phase 2: Folder-Based Data Import

Instead of manual CSV uploads, the team maintains a structured folder system. Laura points the app at this folder and syncs data for all clients at once.

**Supported Data Sources:**

| Source | How it Works | Best For |
|--------|-------------|----------|
| Local Folder | Point to a folder on Laura's PC or network drive | Office with shared drive |
| Google Drive | Connect via Google Drive API, watch a shared folder | Remote team, already using Google |
| Dropbox | Connect via Dropbox API | Remote team, already using Dropbox |
| OneDrive | Connect via Microsoft Graph API | Remote team, already using Microsoft 365 |

**Folder Structure Convention:**

```
SocialifeData/
├── Essex Sports Club/
│   ├── instagram/
│   │   ├── 2026-01-metrics.csv
│   │   └── 2026-01-posts.csv
│   ├── facebook/
│   │   └── 2026-01-metrics.csv
│   └── tiktok/
│       └── 2026-01-metrics.csv
├── Bella's Boutique/
│   ├── instagram/
│   │   └── 2026-01-metrics.csv
│   └── facebook/
│       └── 2026-01-metrics.csv
└── Castle Point Finance/
    └── linkedin/
        └── 2026-01-metrics.csv
```

**How it works:**
1. Team exports analytics from each platform (monthly)
2. Drops CSV files into the correct client/platform folder
3. Laura clicks "Sync All" in the app
4. System scans folders, detects new files, imports data
5. Shows import summary: 12 new files, 3 clients updated

**Workflow Benefits:**

| Before (Manual Upload) | After (Folder Sync) |
|------------------------|---------------------|
| Laura uploads 48 CSVs (16 clients × 3 platforms) | Team drops files in folders |
| One-by-one, select client, select platform | One click: "Sync All" |
| Laura is bottleneck | Team contributes directly |
| Easy to miss a file | Missing files highlighted |

**Sync Features:**
- **Auto-detect client:** Folder name matches client name in system
- **Auto-detect platform:** Subfolder name (instagram, facebook, etc.)
- **Auto-detect format:** CSV parser identifies platform from column headers
- **Duplicate prevention:** Files already imported are skipped
- **Error reporting:** Invalid files flagged with specific issues
- **Partial sync:** Can sync single client or platform

**Cloud Folder Setup (Google Drive example):**

1. Laura creates shared folder "Socialife Analytics Data"
2. Shares with Lois and Laura (team)
3. Team has edit access to add files
4. In app Settings → Data Source → Google Drive
5. Authorise with Google OAuth
6. Select the shared folder
7. App watches for new files automatically

**File Naming Convention (optional but recommended):**

```
[YYYY-MM]-[type].csv

Examples:
2026-01-metrics.csv      → Account-level metrics for January
2026-01-posts.csv        → Post-level data for January
2026-01-stories.csv      → Stories data (Instagram)
```

**Manual Upload Still Available:**
For one-off imports or corrections, drag-and-drop upload remains available on the Import page.

**Features:**
- Multi-platform CSV import (Instagram, TikTok, Facebook, LinkedIn, YouTube)
- Normalised data model to handle different metric names
- Visual dashboard with charts (Plotly or Chart.js)
- PDF/PowerPoint report generation with branding
- Trend analysis over time
- Content performance comparisons
- Scheduled/automated report emails

**Scaling:**
- 16 clients × 3 platforms × 12 months = 576 files/year
- With folder sync, team effort is distributed
- Laura's monthly task: click "Sync All", review summary, generate reports

---

### Phase 3: API-Ready Architecture

Design the system with a **Data Provider abstraction layer** so that CSV import can be swapped for direct API connections later without changing the UI or business logic.

**Architecture Pattern:**

```
┌─────────────────────────────────────────────────────────┐
│                      UI Layer                           │
│   (Dashboard, Reports, Charts - unchanged either way)   │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   Data Service Layer                    │
│      (Normalised data model, business logic)            │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│               Data Provider Interface                   │
│                                                         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│   │ CSV Import  │  │ Meta Graph  │  │ TikTok API  │    │
│   │  Provider   │  │ API Provider│  │  Provider   │    │
│   │  (Phase 1)  │  │  (Future)   │  │  (Future)   │    │
│   └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Data Provider Interface (TypeScript example):**

```typescript
interface DataProvider {
  // Identify this provider
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
  type: 'csv' | 'api';

  // Fetch metrics for a client account
  getMetrics(accountId: string, dateRange: DateRange): Promise<NormalisedMetrics>;

  // Fetch post-level data
  getPosts(accountId: string, dateRange: DateRange): Promise<NormalisedPost[]>;

  // Check connection status
  isConnected(): Promise<boolean>;

  // For API providers: handle OAuth
  connect?(credentials: OAuthCredentials): Promise<void>;
}
```

**Benefits:**
- UI and reports work identically regardless of data source
- Can mix CSV and API per platform (e.g., API for Instagram, CSV for TikTok)
- Easy to add new platforms or switch providers
- Client configuration stores which provider to use per account

**Client Configuration Example:**

```json
{
  "client": "Essex Sports Club",
  "accounts": [
    {
      "platform": "instagram",
      "handle": "@essexsportsclub",
      "provider": "csv",        // Switch to "api" when ready
      "apiCredentials": null    // Populated when API connected
    },
    {
      "platform": "tiktok",
      "handle": "@essexsports",
      "provider": "csv",
      "apiCredentials": null
    }
  ]
}
```

**Migration Path:**
1. Build with CSV providers initially
2. When API access is obtained, create API provider implementing same interface
3. Update client config to use API provider
4. No changes needed to dashboard, reports, or business logic

---

### Storage Architecture: Local-First with Cloud Option

**Design Principle:** Build for local storage first, with the ability to swap in cloud storage later without changing UI or business logic.

```
┌─────────────────────────────────────────────────────────────────┐
│                        APPLICATION                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌──────────────────────────────────────────────────────┐    │
│    │              Storage Provider Interface               │    │
│    │                                                       │    │
│    │   getClients()    savePost()    getMetrics()         │    │
│    │   importCSV()     exportReport()  getSchedule()      │    │
│    └──────────────────────┬────────────────────────────────┘    │
│                           │                                     │
│              ┌────────────┴────────────┐                       │
│              ▼                         ▼                       │
│    ┌─────────────────┐      ┌─────────────────┐               │
│    │  SQLite Local   │      │    Supabase     │               │
│    │   (Phase 1)     │      │    (Future)     │               │
│    │                 │      │                 │               │
│    │ • Zero config   │      │ • Multi-user    │               │
│    │ • No ongoing £  │      │ • Real-time     │               │
│    │ • Data on disk  │      │ • Team access   │               │
│    │ • Full privacy  │      │ • Auto backup   │               │
│    └─────────────────┘      └─────────────────┘               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Phase 1: Local Storage (SQLite)**

| Aspect | Detail |
|--------|--------|
| Database | SQLite file stored locally |
| Media files | Local folder (e.g., `~/SocialifeData/media/`) |
| Backup | Manual or auto-sync to OneDrive/Dropbox/Google Drive |
| Cost | £0 ongoing |
| Team access | Single machine (Laura primary) |
| Report sharing | Export PDF/send via email |

**How Remote Team Works with Local Storage:**
- Laura-Jayne manages the tool (imports data, generates reports)
- Exports PDF reports to share with Lois and Laura
- Content calendar can be exported as shareable view (read-only HTML or PDF)
- Approval workflow via email/WhatsApp ("I've scheduled X, please review")
- This matches typical agency workflow where one person owns the tools

**File Structure:**
```
~/SocialifeData/
├── socialife.db              # SQLite database
├── media/                    # Uploaded images/videos
│   └── [client-id]/
├── exports/                  # Generated reports
│   └── [client-id]/
│       └── 2026-01-report.pdf
├── imports/                  # CSV import history
│   └── [date]-instagram.csv
└── backups/                  # Auto-backup copies
    └── socialife-2026-01-30.db
```

**Backup Strategy:**
- Auto-backup database daily to `backups/` folder
- If `~/SocialifeData/` is inside OneDrive/Dropbox, syncs automatically
- One-click "Export All Data" for full backup
- Import from backup to restore

**Phase 2 (Optional): Cloud Upgrade Path**

If team collaboration becomes essential:

1. Create Supabase project (~£20/month)
2. Run migration script to upload existing SQLite data
3. Change config: `storageProvider: 'supabase'`
4. UI continues working unchanged
5. Team members can now access from anywhere

**Storage Provider Interface:**

```typescript
interface StorageProvider {
  // Client management
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client>;
  saveClient(client: Client): Promise<void>;

  // Analytics data
  importMetrics(data: NormalisedMetrics[]): Promise<void>;
  getMetrics(clientId: string, range: DateRange): Promise<Metrics>;

  // Content planning
  getPosts(clientId: string, range: DateRange): Promise<ScheduledPost[]>;
  savePost(post: ScheduledPost): Promise<void>;
  updatePostStatus(postId: string, status: PostStatus): Promise<void>;

  // Reports
  getReportData(clientId: string, range: DateRange): Promise<ReportData>;

  // Media
  uploadMedia(file: File): Promise<string>; // returns path/URL
  getMedia(path: string): Promise<Blob>;
}

// Implementation selection
const storage: StorageProvider =
  config.storageProvider === 'supabase'
    ? new SupabaseStorage(config.supabaseUrl, config.supabaseKey)
    : new SQLiteStorage(config.localDbPath);
```

**Decision Matrix:**

| If Laura needs... | Recommendation |
|-------------------|----------------|
| Cost minimisation | Stay local |
| Full data ownership | Stay local |
| Team editing same content | Upgrade to cloud |
| Access from multiple devices | Upgrade to cloud |
| Real-time collaboration | Upgrade to cloud |

---

### Application Delivery: Local Web App

**How Laura Uses It:**

1. Double-click desktop shortcut: "Socialife Analytics"
2. Browser opens automatically to `http://localhost:3000`
3. Use the app like any website

**What Happens Behind the Scenes:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Desktop Shortcut: "Socialife Analytics"                        │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────┐                                           │
│  │ start.bat (Win) │  Runs hidden, no terminal window          │
│  │ start.sh (Mac)  │                                           │
│  └────────┬────────┘                                           │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐      ┌─────────────────┐                  │
│  │  Node.js Server │◄────▶│  SQLite DB      │                  │
│  │  (localhost:3000)│      │  (local file)   │                  │
│  └────────┬────────┘      └─────────────────┘                  │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                           │
│  │  Browser opens  │  Chrome/Edge/Firefox                      │
│  │  automatically  │                                           │
│  └─────────────────┘                                           │
└─────────────────────────────────────────────────────────────────┘
```

**Installation (One-Time Setup):**

1. Install Node.js (or we bundle it with the app)
2. Extract `SocialifeAnalytics.zip` to a folder
3. Run `install.bat` which:
   - Creates desktop shortcut
   - Initialises empty database
   - Creates data folders

**Launcher Script (Windows - start.bat):**

```batch
@echo off
cd /d "%~dp0"
start /min cmd /c "node server.js"
timeout /t 2 /nobreak >nul
start http://localhost:3000
```

**Launcher Script (Mac - start.sh):**

```bash
#!/bin/bash
cd "$(dirname "$0")"
node server.js &
sleep 2
open http://localhost:3000
```

**Folder Structure (Delivered to Laura):**

```
SocialifeAnalytics/
├── start.bat                 # Double-click to launch (Windows)
├── start.sh                  # Double-click to launch (Mac)
├── install.bat               # One-time setup
├── server.js                 # Node.js backend
├── package.json
├── node_modules/             # Dependencies (bundled)
├── public/                   # React frontend (built)
│   ├── index.html
│   ├── assets/
│   └── ...
├── data/                     # Created on first run
│   ├── socialife.db
│   ├── media/
│   ├── exports/
│   └── backups/
└── README.txt                # Simple instructions
```

**Upgrade Path to Desktop App:**

If Laura wants a more polished experience later:
- Wrap the same codebase in Electron
- No code changes needed
- Just adds native window, tray icon, auto-updates

---

### Phase 4: Link Tracking Layer (Optional)

Add owned click tracking to measure campaign effectiveness.

**Features:**
- Custom link shortener with analytics
- UTM parameter generator for campaigns
- Click tracking dashboard
- Conversion funnel analysis

**Benefit:** Measures what actually drives action, independent of platform APIs.

**Note:** This is a nice-to-have, not essential for MVP.

---

## Confirmed Requirements

| Requirement | Answer |
|-------------|--------|
| Client volume | 16+ clients |
| Platforms | Instagram, Facebook, TikTok, LinkedIn |
| Key metrics | **Views (top priority)**, Engagement (likes/comments/shares), Reach/Impressions, Follower growth, Best performing posts |
| Report frequency | Monthly |
| White-label branding | Essential |
| Data collection | Automation preferred, but accepts some manual work |
| Current tool | Metricool |
| Current workflow | Using Metricool (paid tool) |
| Build vs buy preference | Build custom |
| Motivation | Cost savings, customisation, ownership/control, missing features |
| Team size | 3 users |
| Team location | Remote/different locations |
| Data storage preference | Local (on Laura's machine) |
| Team access model | Laura manages tool, shares reports with team via PDF/email |
| Application type | Local web app (double-click shortcut, opens in browser) |
| Data retention | As long as the client remains active (no fixed period) |
| GDPR/data deletion | No specific contractual requirement |
| Current toolset | Google Workspace (Gmail, Drive, Calendar), Canva, WhatsApp, **Airtable (content calendars)** |
| Content calendar | Team already uses Airtable for client content calendars — integration or feature parity required |
| Sample reports | Two provided: Intotum January Report, SCC November Report (PowerPoint format) |

---

## Build vs Buy Consideration

| Approach | Pros | Cons |
|----------|------|------|
| **Build custom** | Tailored to needs, no ongoing subscription, full control | Development time, maintenance burden |
| **Use Metricool** | Ready now, established API access, full feature set | Monthly cost (€22-€99+), less customisation |
| **Hybrid** | Custom planning tool + Metricool for analytics | Best of both, but two systems |

---

## Next Steps

**Completed:**
- [x] Clarify Laura's specific requirements (platforms, metrics, frequency)
- [x] Determine if manual CSV export is acceptable (Yes — folder-based sync)
- [x] Decide on build vs buy for analytics component (Build custom)
- [x] Create detailed technical specification (this document)
- [x] Design wireframes for all key screens
- [x] Define ICE framework (Intent, Constraints, Expectations)
- [x] Request sample reports from Laura — **received 2 PowerPoint reports** (Intotum January, SCC November)
- [x] Clarify data retention requirements — **as long as they're a client**
- [x] Confirm Laura's current toolset — **Google Workspace, Canva, WhatsApp, Airtable**
- [x] Confirm metric priorities — **Views (1), Engagement (1), Reach (1), Follower growth (3), Best posts (4)**
- [x] Get wireframe feedback — **positive; Airtable integration requested for content calendar**

**Immediate Next Steps (Pre-Development):**
- [x] **Review sample PPTX reports** — studied layout, metrics, and branding used in Intotum (35 slides) and SCC (42 slides) reports
- [x] **Confirm report output format** — **PowerPoint (PPTX)** to match what Laura's clients already receive
- [x] **ICE challenge the build plan** — exposed Safari/Mac issues, multi-user needs, and hosting decisions
- [ ] **Schedule Teams call with Laura** (she's requested this) — **now a review meeting to demo MVP**
- [ ] **Accept Airtable calendar share** — Laura offered to share a client calendar via Teams
- [ ] **Clarify manual data export process** — Laura asked "when you say downloaded manually, what do you mean and how will this part work?"
- [ ] **Clarify "Views" metric** — which platforms/content types does this refer to?
- [ ] **Check Laura's Airtable plan** — free plan has 1,000 record limit which affects integration approach
- [ ] **Get sample CSV exports** from each platform to test parsers
- [ ] **Discuss pricing/compensation** — Laura has offered to pay for services

**MVP Demo Build (for Laura's review meeting):**
- [ ] Build demo data layer (store.js + 3 client JSON files)
- [ ] Enhance dashboard with live data from demo JSON
- [ ] Build PPTX report generation (PptxGenJS + Metricool-style slides)
- [ ] Enhance client management page with dynamic data
- [ ] Build CSV import preview (Papa Parse + platform detection)
- [ ] Polish navigation, loading states, deploy to GitHub Pages
- [ ] Test on Safari/Mac for Laura's setup
- [ ] Create technical options proposal document for hosting/storage discussion

**Post-Demo (depending on Laura's decisions):**
- [ ] Set up production architecture (based on Laura's hosting choice)
- [ ] Build CSV parsers for each platform (once real CSVs received)
- [ ] Build Airtable integration (once Laura shares calendar access)
- [ ] AI content suggestions (Claude API)
- [ ] API data providers (direct platform connections)

**Handover:**
- [ ] Write user documentation
- [ ] Record video walkthrough
- [ ] Schedule live training session with Laura
- [ ] Parallel run period (Laura tests alongside Metricool)
- [ ] Sign-off and Metricool cancellation

---

## Technical Notes

### Platform CSV Export Locations

| Platform | Export Location |
|----------|-----------------|
| Instagram | Professional Dashboard → Insights → Export |
| TikTok | Analytics → Download data |
| Facebook | Meta Business Suite → Insights → Export |
| LinkedIn | Analytics → Export |
| YouTube | YouTube Studio → Analytics → Advanced Mode → Export |

### Normalised Data Model

All data providers (CSV or API) output to this common format. The UI and reports only work with this normalised model, making the data source interchangeable.

```typescript
// Account-level metrics (daily snapshot)
interface AccountMetrics {
  clientId: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
  accountHandle: string;
  date: Date;

  // Core metrics (all platforms)
  followers: number;
  followersChange: number;        // vs previous period
  postsPublished: number;

  // Aggregated engagement
  totalReach: number;
  totalImpressions: number;
  totalEngagements: number;       // likes + comments + shares + saves
  engagementRate: number;         // calculated: engagements / reach

  // Data source tracking
  dataSource: 'csv' | 'api';
  importedAt: Date;
}

// Post-level metrics
interface PostMetrics {
  clientId: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
  postId: string;
  publishedAt: Date;

  // Content info
  contentType: 'image' | 'video' | 'carousel' | 'story' | 'reel' | 'text';
  caption: string;
  hashtags: string[];
  mediaUrl?: string;

  // Engagement metrics
  likes: number;
  comments: number;
  shares: number;
  saves: number;

  // Reach metrics
  reach: number;
  impressions: number;

  // Video-specific (optional)
  videoViews?: number;
  watchTime?: number;            // seconds
  completionRate?: number;       // percentage

  // Calculated
  engagementRate: number;

  // Data source tracking
  dataSource: 'csv' | 'api';
  importedAt: Date;
}

// Client configuration
interface ClientConfig {
  id: string;
  name: string;
  industry: string;
  brandAssets: {
    logo: string;
    primaryColour: string;
    secondaryColour: string;
  };
  accounts: AccountConfig[];
}

interface AccountConfig {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
  handle: string;
  provider: 'csv' | 'api';
  apiCredentials?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  };
}
```

**Platform Metric Mapping:**

| Normalised Field | Instagram | Facebook | TikTok | LinkedIn |
|------------------|-----------|----------|--------|----------|
| likes | Likes | Reactions | Likes | Likes |
| comments | Comments | Comments | Comments | Comments |
| shares | Shares | Shares | Shares | Reposts |
| saves | Saves | Saves | Favorites | Saves |
| reach | Reach | Reach | Unique viewers | Unique impressions |
| impressions | Impressions | Impressions | Views | Impressions |
| videoViews | Video views | Video views | Views | Video views |

This mapping is handled by each platform's CSV parser or API provider, outputting the same normalised format.

---

## Configuration & Settings

The application includes an administration portal for system configuration. Access via the Settings page.

### Configurable Areas

| Section | Settings | Purpose |
|---------|----------|---------|
| **Business Information** | Company name, logo, brand colours, website, report footer | White-label branding on reports |
| **AI Configuration** | Claude API key, default tone, enable/disable suggestions | Powers content generation features |
| **Social Media APIs** | Meta (Instagram/Facebook), TikTok, LinkedIn OAuth connections | Future: direct API data sync |
| **Storage & Database** | Local SQLite vs Supabase, data folder path | Data storage location |
| **Backup Settings** | Auto-backup toggle, retention period, manual backup/restore | Data protection |

### Business Information

- **Company Name:** Displayed on reports and dashboard header
- **Logo:** Uploaded image for report branding (PNG/SVG)
- **Primary/Secondary Colours:** Used in charts and report styling
- **Website URL:** Included in report footers
- **Report Footer Text:** Custom text for PDF report footers

### AI Configuration

The application uses an **AI Provider abstraction** so Laura can use whichever AI service she prefers or already has access to.

**Supported Providers:**

| Provider | API Key Required | Notes |
|----------|------------------|-------|
| Claude (Anthropic) | Anthropic API key | Recommended for content quality |
| OpenAI (GPT-4) | OpenAI API key | Widely available |
| Azure OpenAI | Azure endpoint + key | For enterprise/existing Azure customers |
| Ollama (Local) | None (runs locally) | Free, private, requires local setup |

**Settings:**

- **AI Provider:** Dropdown (Claude, OpenAI, Azure OpenAI, Ollama)
- **API Key:** Required for cloud providers (stored securely, encrypted at rest)
- **Model Selection:** Choose specific model (e.g., claude-3-opus, gpt-4-turbo, llama3)
- **API Endpoint:** Custom endpoint for Azure or self-hosted options
- **Default Tone:** Dropdown (Professional, Friendly, Casual, Bold)
- **AI Suggestions:** Toggle to enable/disable AI-powered content recommendations
- **Content Templates:** Pre-saved caption templates per client/industry

**AI Provider Interface:**

```typescript
interface AIProvider {
  provider: 'claude' | 'openai' | 'azure' | 'ollama';

  // Generate content
  generateCaption(prompt: string, tone: string): Promise<string>;
  generateHashtags(content: string, count: number): Promise<string[]>;
  suggestContentIdeas(analytics: AnalyticsData): Promise<ContentIdea[]>;

  // Check connection
  testConnection(): Promise<boolean>;
}

// Implementation selection based on config
const ai: AIProvider = createAIProvider(config.aiProvider, config.aiCredentials);
```

This means:
- If Laura already has an OpenAI API key, she can use that
- If she wants to keep everything local and free, Ollama works offline
- The UI and features work identically regardless of which AI powers them
- She can switch providers later without losing any functionality

### Client Management

Full client lifecycle management from onboarding to archival.

**Client Status Lifecycle:**

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Draft   │────▶│  Active  │────▶│ Archived │
└──────────┘     └──────────┘     └──────────┘
     │                │                 │
     │                │                 │
     ▼                ▼                 ▼
  Setting up      Working with     Historical
  profiles &      client daily     data preserved
  platforms                        but hidden
```

**Onboarding a New Client:**

1. **Create Client Profile**
   - Client name and business type/industry
   - Primary contact name and email
   - Contract start date
   - Notes field for special requirements

2. **Brand Assets**
   - Upload logo (PNG/SVG)
   - Set primary and secondary brand colours
   - Website URL
   - Custom report footer text

3. **Connect Platforms**
   - Add social media accounts (handle + platform)
   - For each: Instagram, Facebook, TikTok, LinkedIn
   - Set data provider per platform (CSV or API when available)

4. **Set Preferences**
   - Default posting times
   - Preferred content tone
   - Hashtag preferences
   - Industry-specific templates

**Client Profile Fields:**

| Field | Required | Purpose |
|-------|----------|---------|
| Client Name | Yes | Display throughout system |
| Industry | No | Filters, benchmarking, AI suggestions |
| Primary Contact | No | Who to email reports to |
| Contact Email | No | Report delivery |
| Logo | No | White-label reports |
| Primary Colour | No | Charts and reports |
| Secondary Colour | No | Charts and reports |
| Website | No | Report footer |
| Contract Start | No | Tenure tracking |
| Status | Yes | Active, Archived, Draft |
| Notes | No | Internal notes |

**Platform Accounts (per client):**

| Field | Required | Purpose |
|-------|----------|---------|
| Platform | Yes | instagram, facebook, tiktok, linkedin |
| Handle/Username | Yes | @username for identification |
| Display Name | No | Friendly name if different |
| Data Provider | Yes | csv (default) or api |
| API Credentials | No | Stored when API connected |
| Last Import | Auto | Timestamp of last data import |

**Retiring/Archiving a Client:**

When a client contract ends:

1. **Archive** (recommended) - Preserves all data
   - Client hidden from active views
   - Historical data retained for reference
   - Can be reactivated if client returns
   - Reports remain accessible
   - No ongoing data imports

2. **Delete** (permanent) - Removes everything
   - Requires confirmation ("Type client name to confirm")
   - Removes all metrics, posts, reports
   - Cannot be undone
   - Use only for test clients or GDPR requests

**Bulk Actions:**

| Action | Purpose |
|--------|---------|
| Archive Selected | Archive multiple clients at once |
| Export Data | Download all data for selected clients |
| Generate Reports | Batch generate monthly reports |
| Update Status | Change status for multiple clients |

**Client Data Model:**

```typescript
interface Client {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';

  // Profile
  industry?: string;
  primaryContact?: string;
  contactEmail?: string;
  website?: string;
  notes?: string;

  // Branding
  logo?: string;           // Path to uploaded file
  primaryColour?: string;  // Hex colour
  secondaryColour?: string;
  reportFooter?: string;

  // Dates
  contractStart?: Date;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;

  // Relationships
  accounts: PlatformAccount[];
}

interface PlatformAccount {
  id: string;
  clientId: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'linkedin';
  handle: string;
  displayName?: string;
  dataProvider: 'csv' | 'api';
  apiCredentials?: EncryptedCredentials;
  lastImport?: Date;
  isActive: boolean;
}
```

### Social Media API Connections

Future-ready OAuth connection buttons for:

| Platform | OAuth Flow | Scopes Required |
|----------|------------|-----------------|
| Meta (Instagram/Facebook) | Meta Business OAuth | pages_read_engagement, instagram_basic, instagram_manage_insights |
| TikTok | TikTok for Business | user.info.basic, video.list, data.metrics |
| LinkedIn | LinkedIn OAuth 2.0 | r_organization_social, rw_organization_admin |

Each connection shows:
- Connected/Disconnected status
- Last sync timestamp
- Account name when connected
- Connect/Disconnect buttons

### Storage Configuration

| Option | Setting |
|--------|---------|
| Storage Type | Local (SQLite) or Cloud (Supabase) |
| Local Data Path | Folder location for SQLite database and media |
| Supabase URL | Required if using cloud storage |
| Supabase Anon Key | Required if using cloud storage |
| Supabase Service Key | Required for admin operations |

### Backup Settings

| Setting | Options |
|---------|---------|
| Auto-backup | Enabled/Disabled |
| Backup Frequency | Daily, Weekly, Monthly |
| Retention Period | 7 days, 30 days, 90 days, Forever |
| Backup Location | Same as data folder (or custom path) |
| Manual Backup | One-click "Backup Now" button |
| Restore | Select from available backups |
| Export All Data | Download complete data package |

### System Information (Read-Only)

- Application version
- Database size
- Last backup timestamp
- Storage usage (local disk or Supabase quota)
- Connected API status summary

---

## Growth Path: MVP to Team Collaboration

The architecture is designed to grow with Socialife's needs. Here's the progression from single-user MVP to full team collaboration.

### Stage 1: MVP (Single User)
**Cost: £0/month ongoing**

```
Laura's Computer
┌─────────────────────────────────────┐
│  Browser ◄──► Node.js ◄──► SQLite  │
│                  │                  │
│                  ▼                  │
│           AI API (Claude)           │
└─────────────────────────────────────┘
```

- Laura runs everything locally
- Shares reports via PDF email
- Team reviews content via shared screenshots/messages
- Data backed up to OneDrive/Dropbox

**Good for:** Proving the concept, immediate cost savings over Metricool

---

### Stage 2: Shared Access (LAN/VPN)
**Cost: £0/month (plus optional VPN ~£5/month)**

```
Office Network / VPN
┌─────────────────────────────────────────────────┐
│                                                 │
│  Laura's PC (Server)                            │
│  ┌─────────────────────────────────┐           │
│  │ Node.js ◄──► SQLite             │           │
│  │    ▲                            │           │
│  │    │ http://192.168.1.x:3000    │           │
│  └────┼────────────────────────────┘           │
│       │                                         │
│  ┌────┴────┐  ┌─────────┐  ┌─────────┐        │
│  │ Laura   │  │  Lois   │  │  Laura  │        │
│  │ Browser │  │ Browser │  │ Browser │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**What changes:**
- Laura's PC runs as server (always on during work hours)
- Team accesses via local IP or VPN (Tailscale/ZeroTier are free)
- Same codebase, just different network config
- Still single SQLite database

**New capabilities:**
- Lois and Laura can view dashboard
- Real-time content calendar visibility
- Approval workflow becomes practical

**Limitations:**
- Laura's PC must be on for others to access
- All users on same network (or VPN)
- Still single-user writes (no conflict resolution)

**Good for:** Small team in same office or comfortable with VPN

---

### Stage 3: Cloud Database (Remote Team)
**Cost: ~£20/month (Supabase Pro)**

```
┌──────────────────────────────────────────────────────┐
│                      CLOUD                            │
│  ┌─────────────────────────────────────────────┐     │
│  │              Supabase                        │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │     │
│  │  │ Postgres │  │   Auth   │  │ Storage  │  │     │
│  │  │    DB    │  │  (users) │  │ (media)  │  │     │
│  │  └──────────┘  └──────────┘  └──────────┘  │     │
│  └─────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
         ▲              ▲              ▲
         │              │              │
    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
    │ Laura   │    │  Lois   │    │  Laura  │
    │ (Essex) │    │ (Home)  │    │ (London)│
    │         │    │         │    │         │
    │ Browser │    │ Browser │    │ Browser │
    │    +    │    │    +    │    │    +    │
    │ Node.js │    │ Node.js │    │ Node.js │
    └─────────┘    └─────────┘    └─────────┘
```

**What changes:**
- Data moves to Supabase (Postgres + Auth + Storage)
- Each team member runs local Node.js (for AI API calls)
- Or: single hosted Node.js backend (adds hosting cost)
- User accounts with Supabase Auth
- Real-time sync between all users

**Migration steps:**
1. Create Supabase project
2. Run migration script (exports SQLite → imports to Postgres)
3. Update config to point to Supabase
4. Set up user accounts for team
5. Test, then switch over

**New capabilities:**
- True multi-user access from anywhere
- User roles (Admin, Editor, Viewer)
- Real-time collaboration on content calendar
- Audit trail of who changed what
- Automatic cloud backups

**Good for:** Remote team, multiple locations, growing agency

---

### Stage 4: Hosted Application (SaaS-style)
**Cost: ~£50-100/month (hosting + database)**

```
┌──────────────────────────────────────────────────────┐
│                      CLOUD                            │
│                                                       │
│  ┌─────────────────┐    ┌─────────────────────────┐  │
│  │  Vercel/Railway │    │       Supabase          │  │
│  │                 │    │                         │  │
│  │   Node.js API   │◄──►│  Postgres + Auth        │  │
│  │   (hosted)      │    │                         │  │
│  └────────▲────────┘    └─────────────────────────┘  │
│           │                                           │
└───────────┼───────────────────────────────────────────┘
            │
    ┌───────┴───────┐
    │   Browser     │  (any device, anywhere)
    │   only        │
    └───────────────┘
```

**What changes:**
- Backend hosted on Vercel/Railway/Render
- No local installation needed for team
- Access from any device (phone, tablet, client sites)
- Professional deployment with CI/CD

**New capabilities:**
- Mobile access for on-the-go updates
- Client portal (read-only report access)
- Webhook integrations
- Custom domain (app.socialife.co.uk)

**Good for:** Agency growth, client self-service, mobile workflows

---

### Stage 5: White-Label (Selling to Other Agencies)
**Cost: Variable (infrastructure scales with clients)**

If Socialife wanted to offer this to other agencies:

- Multi-tenant architecture
- Per-agency billing
- Branding customisation per agency
- Agency admin vs client admin roles
- Usage-based pricing

**This would be a significant rebuild** and only makes sense if there's demand from other agencies.

---

### Upgrade Decision Matrix

| If Laura needs... | Upgrade to |
|-------------------|------------|
| Just works on my PC | Stay at Stage 1 |
| Team can view when I'm online | Stage 2 (LAN/VPN) |
| Team access from anywhere | Stage 3 (Supabase) |
| No installation for team | Stage 4 (Hosted) |
| Sell to other agencies | Stage 5 (White-label) |

### Estimated Costs by Stage

| Stage | Monthly Cost | Setup Effort |
|-------|-------------|--------------|
| 1. MVP | £0 | Done (MVP) |
| 2. LAN/VPN | £0-5 | Config change |
| 3. Supabase | £20 | Migration script |
| 4. Hosted | £50-100 | Deploy to cloud |
| 5. White-label | Variable | Major rebuild |

### Code Changes Required

| Stage | Frontend Changes | Backend Changes | Database Changes |
|-------|-----------------|-----------------|------------------|
| 1→2 | None | Bind to 0.0.0.0 | None |
| 2→3 | Add login UI | Supabase client | SQLite → Postgres |
| 3→4 | None | Deploy scripts | None |
| 4→5 | Tenant selector | Multi-tenant logic | Schema changes |

The key insight: **Stages 1-3 use the same codebase** with config changes. The abstraction layers (StorageProvider, AIProvider) make this possible.

---

## Security Considerations

### API Key Storage

All API keys are stored server-side and never exposed to the browser.

| Key Type | Storage Location | Encryption |
|----------|-----------------|------------|
| AI Provider keys (Claude, OpenAI, Azure) | `config.json` on server | AES-256 encrypted |
| Social Media OAuth tokens | SQLite database | AES-256 encrypted |
| Supabase keys | `config.json` on server | AES-256 encrypted |

**Encryption approach:**
- Master password set on first launch (or derived from machine ID for zero-config)
- Keys encrypted before storage, decrypted only when needed for API calls
- Keys never sent to frontend, only connection status shown

### CORS Prevention

See **CORS & API Architecture** in Phase 1 technical stack. Summary:
- All external API calls proxied through local Node.js backend
- Browser only communicates with `localhost:3000` (same origin)
- No CORS headers needed, no browser security restrictions

### Local-First Security Benefits

| Benefit | Detail |
|---------|--------|
| No cloud exposure | Data stays on Laura's machine |
| No authentication server | No password database to breach |
| No network attack surface | App only accessible on localhost |
| Physical security | Protected by machine login |

### OAuth Token Handling

For social media API connections (when implemented):

1. **OAuth flow** happens in a popup window
2. **Callback** received by local server (`localhost:3000/oauth/callback`)
3. **Tokens** stored encrypted in SQLite, never logged
4. **Refresh** handled automatically by backend before expiry
5. **Revocation** clears tokens and requires reconnection

---

## Laura's Response Summary (February 2026)

Laura returned the overview document with annotated answers and two sample reports. Key points from her email:

1. **Positive reception** — wireframe described as "amazing"
2. **Wants a Teams call** to discuss properly
3. **Willing to pay** — "more than happy to pay for your services/compensate you for your time"
4. **Needs clarification on manual exports** — asked "when you say downloaded manually, what do you mean and how will this part work?" (This refers to the CSV export process from each platform — needs a visual walkthrough)
5. **Provided 2 sample reports** — PowerPoint format (Intotum January, SCC November)
6. **Airtable is key** — team already uses Airtable for content calendars; wants integration or equivalent functionality
7. **Metrics priority confirmed** — Views is top priority (added as custom metric), alongside Engagement and Reach/Impressions

**Action items arising from Laura's response:**
- Schedule Teams call
- Prepare visual guide showing how CSV exports work from each platform (screenshots)
- Review the two PPTX reports to inform report design
- Get access to an Airtable client calendar to map the schema
- Discuss pricing structure

---

## Metricool Report Analysis (February 2026)

Analysis of the two sample reports Laura provided. These define the target output for PPTX report generation.

### Report Structure (Common to Both)

Each report is a PowerPoint file generated by Metricool with this slide structure:

1. **Title Slide** — "Social Media Insights", client name + handles, date range
2. **KPI Slides** (one per metric) — Big number + % change + time-series chart:
   - Followers (e.g., 38.47K)
   - Impressions (e.g., 120.43K, -57.87%)
   - Interactions (e.g., 13.06K, -87.98%)
   - Posts (e.g., 53, +35.90%)
3. **Post Ranking Tables** — Columns: Published, Type, Caption, Impressions, Interactions (sorted by social network, then by impressions)
4. **Community Growth** — Line chart showing follower trend
5. **Demographics** — Gender/age breakdown + Countries (%) + Cities (%)
6. **Content Performance Charts** — Average reach per day, Posts published, Reach per post, Interactions per post
7. **Top Posts by Views** — Table: Published, Type, Caption, Views, Reach, Likes, Comments, Saves, Engagement rate
8. **Hashtag Ranking** — Table: Hashtag, Posts count, Views, Likes, Comments
9. **Reels Section** — Published count, Reach chart, Interactions chart, Reel ranking table (Views, Reach, Likes, Saves, Comments, Shares, Engagement)
10. **Facebook Section** (if applicable) — Separate slides for FB: Community growth, Account overview, Posts viewed, Demographics, Posts published/reach/views/interactions, Post ranking (with Duration column)
11. **Stories Section** (if applicable) — Published count, Ranking with Impressions, Reach, Replies, Tap back, Tap forward, Exits

### Intotum January Report (35 slides)

**Client:** Intotum Fashion (adaptive clothing brand)
**Platforms:** Instagram (@intotum_fashion) + Facebook (Intotum)
**Period:** 01 Jan 26 – 31 Jan 26

**Key Metrics:**
| Metric | Value | Change |
|--------|-------|--------|
| Followers (IG) | 38.47K | — |
| Impressions (IG) | 120.43K | -57.87% |
| Interactions (IG) | 13.06K | -87.98% |
| Posts (IG) | 53 | +35.90% |

**Top Reel:** "The problem: Getting dressed should not be a daily struggle" — 92.66K views, 58.38K reach, 3118 likes, 5.59% engagement

**Demographics:** US 29.42%, UK 20.59%, Canada 5.14%, Australia 4.72%

**Top Hashtags:** #inclusiveclothing (16.49K views), #cutefitsonly (16.49K views), #adaptivefashion (8124 views)

### SCC November Report (42 slides)

**Client:** Spinal Care Clinics - Brentwood (chiropractic practice)
**Platforms:** Instagram (@spinalcarebrentwood) + Facebook (Spinal Care Clinics - Brentwood)
**Period:** 01 Nov 25 – 30 Nov 25

**Key Metrics:**
| Metric | Value | Change |
|--------|-------|--------|
| Followers (IG) | 4271 | +0.78% |
| Impressions (IG) | 175.42K | +40.05% |
| Interactions (IG) | 519 | -10.36% |
| Posts (IG) | 69 | +21.05% |

**Top Reel:** "The team at Spinal Care Clinics" — 11.95K views, 9535 reach, 1.23% engagement

**Demographics:** UK 83.62% (local business), US 6.45%. Top city: Brentwood 16.84%

**Additional sections vs Intotum:** Stories ranking (17 stories), Facebook Page metrics (Content Views, Clicks)

### Visual Design Notes
- Font: Nunito Sans (all weights)
- KPI number colour: #501201 (dark maroon/brown)
- Charts rendered as images (not native PPTX charts)
- Metricool branding in footer
- Landscape orientation (10680700 x 7556500 EMU = ~10.68" x 7.56")

---

## MVP Architecture (February 2026)

### Decision Record

After ICE-challenging the initial plan (React + Node.js + SQLite), the following issues were identified:

1. **Laura uses Mac + Safari** — File System Access API has no write support on Safari
2. **3 team members need access** — pure local files don't support multi-user
3. **Reports must be PowerPoint** — not PDF (matches what clients already receive)
4. **Mark must not become "duty tech guy"** — zero-maintenance requirement
5. **Must save money vs Metricool's £50/month** — ongoing costs erode value

### Revised Approach: Two Deliverables for Review Meeting

**Deliverable 1: Working Demo on GitHub Pages**
- Enhanced wireframes with pre-loaded demo data (3 clients)
- PPTX report generation via PptxGenJS (in-browser)
- CSV import preview (Papa Parse, in-browser)
- Client management (sessionStorage for demo)
- Zero installation, works on Safari/Mac
- Hosted at existing GitHub Pages URL

**Deliverable 2: Technical Options Proposal**
- Document laying out hosting/storage choices for Laura to decide
- See `hosting-options.md` for full proposal

### Demo Technology Stack
| Library | Source | Purpose |
|---------|--------|---------|
| Tailwind CSS | CDN (already in wireframes) | Styling |
| Chart.js | CDN (already in wireframes) | Charts |
| Papa Parse | CDN | CSV parsing in browser |
| PptxGenJS | CDN | PowerPoint generation in browser |
| Inter font | Google Fonts (already in wireframes) | Typography |

### Demo File Structure
```
wireframe/
├── index.html, clients.html, report.html, import.html, calendar.html, settings.html
├── js/
│   ├── store.js         # Data layer (fetch demo JSON, sessionStorage)
│   ├── app.js           # Shared utils
│   ├── dashboard.js     # Dashboard logic
│   ├── clients.js       # Client CRUD
│   ├── import.js        # CSV preview
│   ├── report.js        # Report + PPTX
│   └── pptx-template.js # Metricool-style slide templates
└── data/
    ├── clients.json     # Client index
    ├── essex-sports-club.json
    ├── bellas-boutique.json
    └── castle-point-financial.json
```

---

## References

- [Socialife Management Website](https://www.socialifemanagement.com/)
- [Instagram Graph API Developer Guide](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2025/)
- [Social Media APIs 2026 Comparison](https://influencers.club/blog/social-media-api/)
- [Manual Social Media Statistics Import](https://www.thebricks.com/resources/guide-how-to-import-social-media-statistics-into-google-sheets)
- Internal: [Metricool Analysis Report](laura1.md)

---

*Document prepared by Vibe Coding Consulting*
