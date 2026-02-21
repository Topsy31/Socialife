/**
 * Socialife Analytics — Dashboard Page Logic
 *
 * Loads overview data from the Store and populates all dashboard elements.
 */

(async function() {
  'use strict';

  // References to chart instances (so we can update them)
  let followerChart = null;
  let platformChart = null;

  /**
   * Populate the four KPI stat cards.
   */
  function renderKPIs(overview) {
    const cards = document.querySelectorAll('#kpi-cards .kpi-card');
    if (cards.length < 4) return;

    const data = [
      {
        value: App.formatNumber(overview.totalFollowers),
        change: overview.followersChange,
        label: `Total Followers (${overview.clientCount} Clients)`
      },
      {
        value: App.formatShort(overview.totalReach),
        change: overview.reachChange,
        label: 'Total Reach This Month'
      },
      {
        value: App.formatNumber(overview.totalEngagements),
        change: overview.engagementsChange,
        label: 'Total Engagements'
      },
      {
        value: App.formatPercent(overview.avgEngagementRate, false),
        change: null,
        label: 'Avg Engagement Rate'
      }
    ];

    cards.forEach((card, i) => {
      const d = data[i];
      const valueEl = card.querySelector('.kpi-value');
      const changeEl = card.querySelector('.kpi-change');
      const labelEl = card.querySelector('.kpi-label');

      if (valueEl) valueEl.textContent = d.value;
      if (labelEl) labelEl.textContent = d.label;
      if (changeEl) {
        if (d.change != null) {
          const isPositive = d.change >= 0;
          changeEl.className = `${isPositive ? 'text-green-500' : 'text-red-500'} text-sm font-medium flex items-center gap-1`;
          changeEl.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isPositive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"></path>
            </svg>
            ${App.formatPercent(d.change)}
          `;
        }
      }
    });
  }

  /**
   * Build the follower growth line chart using aggregated data.
   */
  async function renderFollowerChart(overview) {
    const canvas = document.getElementById('followerChart');
    if (!canvas) return;

    // Aggregate daily follower data across all clients by platform
    const platformTotals = {};

    for (const c of overview.clients) {
      const client = await Store.getClient(c.id);
      if (!client) continue;

      for (const entry of client.metrics.daily) {
        const key = entry.platform;
        if (!platformTotals[key]) platformTotals[key] = {};
        if (!platformTotals[key][entry.date]) platformTotals[key][entry.date] = 0;
        platformTotals[key][entry.date] += entry.followers;
      }
    }

    const allDates = [...new Set(
      Object.values(platformTotals).flatMap(p => Object.keys(p))
    )].sort();

    // Sample every 3rd date for readability
    const sampledDates = allDates.filter((_, i) => i % 3 === 0 || i === allDates.length - 1);
    const labels = sampledDates.map(d => {
      const date = new Date(d);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    });

    const datasets = Object.entries(platformTotals).map(([platform, dateMap]) => {
      const colours = App.CHART_COLOURS[platform] || { border: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
      return {
        label: App.PLATFORMS[platform]?.label || platform,
        data: sampledDates.map(d => dateMap[d] || 0),
        borderColor: colours.border,
        backgroundColor: colours.bg,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4
      };
    });

    // Sort datasets: Instagram first, then Facebook, TikTok, LinkedIn
    const order = ['instagram', 'facebook', 'tiktok', 'linkedin'];
    datasets.sort((a, b) => {
      const aIdx = order.indexOf(Object.keys(platformTotals).find(k =>
        (App.PLATFORMS[k]?.label || k) === a.label
      ));
      const bIdx = order.indexOf(Object.keys(platformTotals).find(k =>
        (App.PLATFORMS[k]?.label || k) === b.label
      ));
      return aIdx - bIdx;
    });

    if (followerChart) followerChart.destroy();

    followerChart = new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        interaction: { intersect: false, mode: 'index' },
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: {
              callback: v => App.formatShort(v)
            }
          },
          x: { grid: { display: false } }
        }
      }
    });

    // Update legend
    const legendEl = document.getElementById('chart-legend');
    if (legendEl) {
      legendEl.innerHTML = datasets.map(ds => `
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" style="background:${ds.borderColor}"></span>
          ${ds.label}
        </span>
      `).join('');
    }
  }

  /**
   * Build the platform breakdown doughnut chart.
   */
  function renderPlatformChart(overview) {
    const canvas = document.getElementById('platformChart');
    if (!canvas) return;

    // Count followers by platform across all clients
    const platformFollowers = {};
    for (const c of overview.clients) {
      for (const p of c.platforms) {
        if (!platformFollowers[p]) platformFollowers[p] = 0;
      }
    }

    // We need actual follower counts per platform
    // Use the summary data
    const platforms = [...new Set(overview.clients.flatMap(c => c.platforms))];
    const followerCounts = {};

    for (const c of overview.clients) {
      if (c.summary) {
        // Approximate: divide followers evenly across platforms (we'll refine with real data)
        const perPlatform = c.summary.followers / c.platforms.length;
        for (const p of c.platforms) {
          if (!followerCounts[p]) followerCounts[p] = 0;
          followerCounts[p] += perPlatform;
        }
      }
    }

    const sortedPlatforms = Object.entries(followerCounts)
      .sort((a, b) => b[1] - a[1]);

    const labels = sortedPlatforms.map(([p]) => App.PLATFORMS[p]?.label || p);
    const data = sortedPlatforms.map(([, v]) => Math.round(v));
    const colours = sortedPlatforms.map(([p]) => App.CHART_COLOURS[p]?.border || '#6b7280');

    if (platformChart) platformChart.destroy();

    platformChart = new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colours,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true }
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${App.formatShort(ctx.raw)} followers`
            }
          }
        },
        cutout: '65%'
      }
    });
  }

  /**
   * Render the client performance table.
   */
  function renderClientTable(overview) {
    const tbody = document.getElementById('client-table-body');
    if (!tbody) return;

    const colourMap = {
      'Sports & Fitness': { bg: 'bg-emerald-100', text: 'text-emerald-600' },
      'Fashion & Retail': { bg: 'bg-pink-100', text: 'text-pink-600' },
      'Financial Services': { bg: 'bg-blue-100', text: 'text-blue-600' },
      'Food & Beverage': { bg: 'bg-orange-100', text: 'text-orange-600' },
      'E-commerce': { bg: 'bg-green-100', text: 'text-green-600' },
    };

    tbody.innerHTML = overview.clients.map(c => {
      const s = c.summary;
      const initials = c.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const colour = colourMap[c.industry] || { bg: 'bg-gray-100', text: 'text-gray-600' };
      const engRateClass = s.engagementRate >= 4 ? 'bg-green-100 text-green-600' :
                           s.engagementRate >= 2 ? 'bg-yellow-100 text-yellow-600' :
                           'bg-red-100 text-red-500';

      return `
        <tr class="hover:bg-gray-50 transition cursor-pointer" onclick="window.location='report.html?client=${c.id}'">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg ${colour.bg} flex items-center justify-center">
                <span class="font-semibold ${colour.text}">${initials}</span>
              </div>
              <div>
                <p class="font-medium text-socialife-dark">${c.name}</p>
                <p class="text-sm text-gray-500">${c.industry}</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-1">
              ${c.platforms.map(p => App.platformBadge(p)).join('')}
            </div>
          </td>
          <td class="px-6 py-4 text-right">
            <p class="font-medium">${App.formatNumber(s.followers)}</p>
            <p class="text-sm ${s.followersChange >= 0 ? 'text-green-500' : 'text-red-500'}">${App.formatPercent(s.followersChange)}</p>
          </td>
          <td class="px-6 py-4 text-right">
            <p class="font-medium">${App.formatShort(s.reach)}</p>
          </td>
          <td class="px-6 py-4 text-right">
            <p class="font-medium">${App.formatNumber(s.engagements)}</p>
          </td>
          <td class="px-6 py-4 text-right">
            <span class="px-2 py-1 text-sm ${engRateClass} rounded-full">${App.formatPercent(s.engagementRate, false)}</span>
          </td>
          <td class="px-6 py-4 text-center">
            <a href="report.html?client=${c.id}" class="text-socialife-blue hover:underline text-sm" onclick="event.stopPropagation()">View Report</a>
          </td>
        </tr>
      `;
    }).join('');
  }

  /**
   * Render top performing content cards.
   */
  async function renderTopContent() {
    const container = document.getElementById('top-content-grid');
    if (!container) return;

    const topPosts = await Store.getTopContent(4);

    const emojiMap = {
      'Sports & Fitness': { emoji: '&#127947;', from: 'from-emerald-200', to: 'to-emerald-300' },
      'Fashion & Retail': { emoji: '&#128091;', from: 'from-pink-200', to: 'to-pink-300' },
      'Financial Services': { emoji: '&#128188;', from: 'from-blue-200', to: 'to-blue-300' },
    };

    container.innerHTML = topPosts.map(post => {
      // Find the client info
      const defaultEmoji = { emoji: '&#128172;', from: 'from-gray-200', to: 'to-gray-300' };

      return `
        <div class="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
          <div class="aspect-square bg-gradient-to-br ${defaultEmoji.from} ${defaultEmoji.to} flex items-center justify-center">
            <span class="text-4xl">${App.platformBadge(post.platform)}</span>
          </div>
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              ${App.platformBadge(post.platform)}
              <span class="text-xs text-gray-500">${post.clientName}</span>
            </div>
            <p class="text-sm text-socialife-dark line-clamp-2 mb-3">${App.truncate(post.caption, 80)}</p>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Likes ${App.formatShort(post.likes)}</span>
              <span>Comments ${post.comments}</span>
              <span>Eng ${App.formatPercent(post.engagementRate, false)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Populate the client selector dropdown.
   */
  async function renderClientSelector() {
    const select = document.getElementById('client-selector');
    if (!select) return;

    const clients = await Store.getClients();
    const active = clients.filter(c => c.status === 'active');

    select.innerHTML = `
      <option value="">All Clients (${active.length})</option>
      ${active.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
    `;

    // Restore selection
    const saved = Store.getSelectedClientId();
    if (saved) select.value = saved;

    select.addEventListener('change', () => {
      Store.setSelectedClientId(select.value);
      // Could filter dashboard here; for demo just store the selection
    });
  }

  /**
   * Wire the "Generate Report" button.
   */
  function wireReportButton() {
    const btn = document.getElementById('generate-report-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const selected = Store.getSelectedClientId();
      if (selected) {
        window.location = `report.html?client=${selected}`;
      } else {
        // Default to first client
        Store.getClients().then(clients => {
          const first = clients.find(c => c.status === 'active');
          if (first) window.location = `report.html?client=${first.id}`;
        });
      }
    });
  }

  // ==========================================================================
  // INIT
  // ==========================================================================

  try {
    // Load overview data
    const overview = await Store.getOverview();

    // Render all sections
    renderKPIs(overview);
    await renderFollowerChart(overview);
    renderPlatformChart(overview);
    renderClientTable(overview);
    await renderTopContent();
    await renderClientSelector();
    wireReportButton();

  } catch (err) {
    console.error('Dashboard init error:', err);
    // Show visible error to user
    const tbody = document.getElementById('client-table-body');
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-12 text-center text-red-500">
        Error loading data: ${err.message}<br>
        <span class="text-sm text-gray-400">Check browser console for details</span>
      </td></tr>`;
    }
  }

})();
