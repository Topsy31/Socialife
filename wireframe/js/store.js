/**
 * Socialife Analytics — Data Store
 *
 * Loads demo JSON data and provides a clean API for all pages.
 * In demo mode: reads from wireframe/data/ via fetch().
 * Future: can be swapped for Supabase, Google Sheets, or local file access.
 */

const Store = (() => {
  // Resolve data path relative to current page location
  const DATA_BASE = './data';
  let _clients = null;
  let _clientData = {};
  let _sessionEdits = {};

  // Load from sessionStorage if available (preserves edits within session)
  function _loadSessionEdits() {
    try {
      const saved = sessionStorage.getItem('socialife_edits');
      if (saved) _sessionEdits = JSON.parse(saved);
    } catch (e) { /* ignore */ }
  }

  function _saveSessionEdits() {
    try {
      sessionStorage.setItem('socialife_edits', JSON.stringify(_sessionEdits));
    } catch (e) { /* ignore */ }
  }

  _loadSessionEdits();

  /**
   * Get the client index (lightweight list of all clients).
   */
  async function getClients() {
    if (_clients) return _clients;
    try {
      const res = await fetch(`${DATA_BASE}/clients.json`);
      if (!res.ok) {
        console.error('Failed to load clients.json:', res.status, res.statusText);
        _clients = [];
        return _clients;
      }
      _clients = await res.json();
    } catch (e) {
      console.error('Failed to fetch clients.json:', e);
      _clients = [];
      return _clients;
    }

    // Merge any session edits (new clients, status changes)
    if (_sessionEdits.newClients) {
      _clients = [..._clients, ..._sessionEdits.newClients];
    }
    if (_sessionEdits.archivedIds) {
      _clients = _clients.map(c =>
        _sessionEdits.archivedIds.includes(c.id) ? { ...c, status: 'archived' } : c
      );
    }

    return _clients;
  }

  /**
   * Get full client data (metrics, posts, demographics).
   */
  async function getClient(clientId) {
    if (_clientData[clientId]) return _clientData[clientId];
    try {
      const res = await fetch(`${DATA_BASE}/${clientId}.json`);
      if (!res.ok) return null;
      _clientData[clientId] = await res.json();
      return _clientData[clientId];
    } catch (e) {
      console.error(`Failed to fetch client ${clientId}:`, e);
      return null;
    }
  }

  /**
   * Get daily metrics for a client, optionally filtered by platform and date range.
   */
  async function getDailyMetrics(clientId, { platform, startDate, endDate } = {}) {
    const client = await getClient(clientId);
    if (!client) return [];
    let daily = client.metrics.daily;

    if (platform) {
      daily = daily.filter(m => m.platform === platform);
    }
    if (startDate) {
      daily = daily.filter(m => m.date >= startDate);
    }
    if (endDate) {
      daily = daily.filter(m => m.date <= endDate);
    }
    return daily;
  }

  /**
   * Get post metrics for a client, with optional sorting and filtering.
   */
  async function getPosts(clientId, { platform, sortBy = 'publishedAt', limit } = {}) {
    const client = await getClient(clientId);
    if (!client) return [];
    let posts = [...client.metrics.posts];

    if (platform) {
      posts = posts.filter(p => p.platform === platform);
    }

    const sortFns = {
      publishedAt: (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      views: (a, b) => (b.videoViews || 0) - (a.videoViews || 0),
      reach: (a, b) => b.reach - a.reach,
      engagement: (a, b) => b.engagementRate - a.engagementRate,
      likes: (a, b) => b.likes - a.likes,
      impressions: (a, b) => b.impressions - a.impressions,
    };

    if (sortFns[sortBy]) {
      posts.sort(sortFns[sortBy]);
    }

    if (limit) {
      posts = posts.slice(0, limit);
    }
    return posts;
  }

  /**
   * Get demographics for a client.
   */
  async function getDemographics(clientId) {
    const client = await getClient(clientId);
    if (!client) return null;
    return client.metrics.demographics;
  }

  /**
   * Calculate summary KPIs for a client (aggregated across all platforms).
   * Returns current totals and % change vs previous period.
   */
  async function getClientSummary(clientId) {
    const client = await getClient(clientId);
    if (!client) return null;

    const daily = client.metrics.daily;
    const platforms = [...new Set(daily.map(m => m.platform))];

    // Get latest metrics per platform
    const latest = {};
    const earliest = {};
    for (const p of platforms) {
      const pMetrics = daily.filter(m => m.platform === p);
      latest[p] = pMetrics[pMetrics.length - 1];
      earliest[p] = pMetrics[0];
    }

    // Aggregate
    const totalFollowers = platforms.reduce((sum, p) => sum + (latest[p]?.followers || 0), 0);
    const totalFollowersStart = platforms.reduce((sum, p) => sum + (earliest[p]?.followers || 0), 0);

    const totalReach = daily.reduce((sum, m) => sum + m.reach, 0);
    const totalImpressions = daily.reduce((sum, m) => sum + m.impressions, 0);
    const totalEngagements = daily.reduce((sum, m) => sum + m.engagements, 0);
    const totalViews = daily.reduce((sum, m) => sum + m.views, 0);

    const avgEngRate = totalReach > 0 ? (totalEngagements / totalReach * 100) : 0;

    // % change (comparing second half vs first half of the period as approximation)
    const mid = Math.floor(daily.length / 2);
    const firstHalf = daily.slice(0, mid);
    const secondHalf = daily.slice(mid);

    const firstReach = firstHalf.reduce((s, m) => s + m.reach, 0);
    const secondReach = secondHalf.reduce((s, m) => s + m.reach, 0);
    const reachChange = firstReach > 0 ? ((secondReach - firstReach) / firstReach * 100) : 0;

    const firstEng = firstHalf.reduce((s, m) => s + m.engagements, 0);
    const secondEng = secondHalf.reduce((s, m) => s + m.engagements, 0);
    const engChange = firstEng > 0 ? ((secondEng - firstEng) / firstEng * 100) : 0;

    const followersChange = totalFollowersStart > 0
      ? ((totalFollowers - totalFollowersStart) / totalFollowersStart * 100) : 0;

    return {
      followers: totalFollowers,
      followersChange: followersChange,
      reach: totalReach,
      reachChange: reachChange,
      impressions: totalImpressions,
      engagements: totalEngagements,
      engagementsChange: engChange,
      views: totalViews,
      engagementRate: avgEngRate,
      platforms: platforms,
      postsCount: client.metrics.posts.length
    };
  }

  /**
   * Get aggregate overview across all clients (for dashboard).
   */
  async function getOverview() {
    const clients = await getClients();
    const activeClients = clients.filter(c => c.status === 'active');

    let totalFollowers = 0;
    let totalReach = 0;
    let totalEngagements = 0;
    let totalViews = 0;
    let followersChangeSum = 0;
    let reachChangeSum = 0;
    let engChangeSum = 0;
    let clientSummaries = [];

    for (const c of activeClients) {
      const summary = await getClientSummary(c.id);
      if (summary) {
        totalFollowers += summary.followers;
        totalReach += summary.reach;
        totalEngagements += summary.engagements;
        totalViews += summary.views;
        followersChangeSum += summary.followersChange;
        reachChangeSum += summary.reachChange;
        engChangeSum += summary.engagementsChange;
        clientSummaries.push({ ...c, summary });
      }
    }

    const avgEngRate = totalReach > 0 ? (totalEngagements / totalReach * 100) : 0;
    const clientCount = activeClients.length;

    return {
      totalFollowers,
      followersChange: clientCount > 0 ? followersChangeSum / clientCount : 0,
      totalReach,
      reachChange: clientCount > 0 ? reachChangeSum / clientCount : 0,
      totalEngagements,
      engagementsChange: clientCount > 0 ? engChangeSum / clientCount : 0,
      totalViews,
      avgEngagementRate: avgEngRate,
      clientCount,
      clients: clientSummaries
    };
  }

  /**
   * Get top performing posts across all clients.
   */
  async function getTopContent(limit = 4) {
    const clients = await getClients();
    let allPosts = [];

    for (const c of clients.filter(c => c.status === 'active')) {
      const client = await getClient(c.id);
      if (client) {
        const posts = client.metrics.posts.map(p => ({
          ...p,
          clientId: c.id,
          clientName: c.name
        }));
        allPosts = allPosts.concat(posts);
      }
    }

    // Sort by engagement rate
    allPosts.sort((a, b) => b.engagementRate - a.engagementRate);
    return allPosts.slice(0, limit);
  }

  /**
   * Get hashtag performance for a client.
   */
  async function getHashtags(clientId, { platform, sortBy = 'views', limit = 20 } = {}) {
    const posts = await getPosts(clientId, { platform });
    const hashtagMap = {};

    for (const post of posts) {
      for (const tag of (post.hashtags || [])) {
        if (!hashtagMap[tag]) {
          hashtagMap[tag] = { hashtag: tag, posts: 0, views: 0, likes: 0, comments: 0 };
        }
        hashtagMap[tag].posts += 1;
        hashtagMap[tag].views += (post.videoViews || post.impressions || 0);
        hashtagMap[tag].likes += post.likes;
        hashtagMap[tag].comments += post.comments;
      }
    }

    let hashtags = Object.values(hashtagMap);
    hashtags.sort((a, b) => b[sortBy] - a[sortBy]);
    return hashtags.slice(0, limit);
  }

  /**
   * Get time series data for charts (aggregated per day).
   */
  async function getTimeSeries(clientId, metric = 'followers') {
    const client = await getClient(clientId);
    if (!client) return { labels: [], datasets: [] };

    const platforms = [...new Set(client.metrics.daily.map(m => m.platform))];
    const dates = [...new Set(client.metrics.daily.map(m => m.date))].sort();

    const datasets = platforms.map(p => {
      const pMetrics = client.metrics.daily.filter(m => m.platform === p);
      return {
        platform: p,
        data: dates.map(d => {
          const entry = pMetrics.find(m => m.date === d);
          return entry ? entry[metric] : 0;
        })
      };
    });

    return {
      labels: dates.map(d => {
        const date = new Date(d);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      }),
      datasets
    };
  }

  /**
   * Add a new client (sessionStorage only for demo).
   */
  function addClient(clientData) {
    if (!_sessionEdits.newClients) _sessionEdits.newClients = [];
    _sessionEdits.newClients.push(clientData);
    _saveSessionEdits();
    _clients = null; // Force reload
  }

  /**
   * Archive a client (sessionStorage only for demo).
   */
  function archiveClient(clientId) {
    if (!_sessionEdits.archivedIds) _sessionEdits.archivedIds = [];
    _sessionEdits.archivedIds.push(clientId);
    _saveSessionEdits();
    _clients = null;
  }

  /**
   * Get/set selected client ID (persists across pages via sessionStorage).
   */
  function getSelectedClientId() {
    return sessionStorage.getItem('socialife_selected_client');
  }

  function setSelectedClientId(clientId) {
    sessionStorage.setItem('socialife_selected_client', clientId);
  }

  return {
    getClients,
    getClient,
    getDailyMetrics,
    getPosts,
    getDemographics,
    getClientSummary,
    getOverview,
    getTopContent,
    getHashtags,
    getTimeSeries,
    addClient,
    archiveClient,
    getSelectedClientId,
    setSelectedClientId,
  };
})();
