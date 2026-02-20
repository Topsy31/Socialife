/**
 * Socialife Analytics — Report Page Logic
 *
 * Loads client data and populates the report preview.
 * Provides PPTX download via PptxTemplate.
 */

(async function () {
  'use strict';

  // Get client ID from URL
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('client');

  if (!clientId) {
    // No client specified — redirect to first active client
    const clients = await Store.getClients();
    const first = clients.find(c => c.status === 'active');
    if (first) {
      window.location = `report.html?client=${first.id}`;
    } else {
      document.getElementById('report-content').innerHTML =
        '<div class="p-12 text-center text-gray-500">No clients found</div>';
    }
    return;
  }

  // Load data
  const clients = await Store.getClients();
  const clientInfo = clients.find(c => c.id === clientId);
  if (!clientInfo) {
    document.getElementById('report-content').innerHTML =
      '<div class="p-12 text-center text-gray-500">Client not found</div>';
    return;
  }

  const summary = await Store.getClientSummary(clientId);
  const client = await Store.getClient(clientId);
  const posts = await Store.getPosts(clientId, { sortBy: 'reach', limit: 5 });
  const demographics = await Store.getDemographics(clientId);

  const period = 'January 2026';

  // ========================================================================
  // Update page header
  // ========================================================================
  const headerSubtitle = document.getElementById('report-subtitle');
  if (headerSubtitle) {
    headerSubtitle.textContent = `${clientInfo.name} — ${period}`;
  }

  // ========================================================================
  // Cover section
  // ========================================================================
  const coverInitials = document.getElementById('cover-initials');
  const coverName = document.getElementById('cover-client-name');
  const coverPeriod = document.getElementById('cover-period');

  if (coverInitials) {
    const initials = clientInfo.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    coverInitials.textContent = initials;
  }
  if (coverName) coverName.textContent = clientInfo.name;
  if (coverPeriod) coverPeriod.textContent = period;

  // ========================================================================
  // Executive Summary KPIs
  // ========================================================================
  const kpiGrid = document.getElementById('summary-kpis');
  if (kpiGrid && summary) {
    kpiGrid.innerHTML = [
      { value: App.formatNumber(summary.followers), label: 'Total Followers', change: App.formatPercent(summary.followersChange) },
      { value: App.formatShort(summary.reach), label: 'Total Reach', change: App.formatPercent(summary.reachChange) },
      { value: App.formatNumber(summary.engagements), label: 'Engagements', change: App.formatPercent(summary.engagementsChange) },
      { value: App.formatPercent(summary.engagementRate, false), label: 'Engagement Rate', change: null },
    ].map(kpi => `
      <div class="bg-gray-50 rounded-xl p-6 text-center">
        <p class="text-3xl font-bold text-socialife-blue">${kpi.value}</p>
        <p class="text-sm text-gray-500 mt-1">${kpi.label}</p>
        ${kpi.change ? `<p class="text-sm text-green-500 mt-2">${kpi.change}</p>` : ''}
      </div>
    `).join('');
  }

  // ========================================================================
  // Follower Growth by Platform
  // ========================================================================
  const platformCards = document.getElementById('platform-follower-cards');
  if (platformCards && client) {
    const platforms = [...new Set(client.metrics.daily.map(m => m.platform))];
    platformCards.innerHTML = platforms.map(p => {
      const pMetrics = client.metrics.daily.filter(m => m.platform === p);
      const first = pMetrics[0];
      const last = pMetrics[pMetrics.length - 1];
      const gained = last.followers - first.followers;
      const info = App.PLATFORMS[p] || {};

      return `
        <div class="border border-gray-100 rounded-xl p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg ${info.badgeClass ? info.badgeClass.split(' ')[0] : 'bg-gray-100'} flex items-center justify-center">
              <span class="${info.textClass || 'text-gray-600'} font-bold text-sm">${info.short || p}</span>
            </div>
            <div>
              <p class="font-semibold text-socialife-dark">${info.label || p}</p>
            </div>
          </div>
          <p class="text-3xl font-bold text-socialife-dark">${App.formatNumber(last.followers)}</p>
          <p class="text-sm ${gained >= 0 ? 'text-green-500' : 'text-red-500'}">
            ${gained >= 0 ? '+' : ''}${App.formatNumber(gained)} followers
          </p>
        </div>
      `;
    }).join('');
  }

  // Growth chart
  const growthCanvas = document.getElementById('growthChart');
  if (growthCanvas && client) {
    const platforms = [...new Set(client.metrics.daily.map(m => m.platform))];
    const dates = [...new Set(client.metrics.daily.map(m => m.date))].sort();
    const sampledDates = dates.filter((_, i) => i % 3 === 0 || i === dates.length - 1);

    const datasets = platforms.map(p => {
      const pMetrics = client.metrics.daily.filter(m => m.platform === p);
      const colours = App.CHART_COLOURS[p] || { border: '#6b7280', bg: 'rgba(107,114,128,0.1)' };
      return {
        label: App.PLATFORMS[p]?.label || p,
        data: sampledDates.map(d => {
          const entry = pMetrics.find(m => m.date === d);
          return entry ? entry.followers : 0;
        }),
        borderColor: colours.border,
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
      };
    });

    new Chart(growthCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: sampledDates.map(d => {
          const date = new Date(d);
          return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }),
        datasets,
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: false } },
      },
    });
  }

  // ========================================================================
  // Engagement Breakdown
  // ========================================================================
  const engCanvas = document.getElementById('engagementChart');
  if (engCanvas && client) {
    // Aggregate engagement types across all posts
    let totalLikes = 0, totalComments = 0, totalShares = 0, totalSaves = 0;
    for (const post of client.metrics.posts) {
      totalLikes += post.likes || 0;
      totalComments += post.comments || 0;
      totalShares += post.shares || 0;
      totalSaves += post.saves || 0;
    }

    new Chart(engCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Likes', 'Comments', 'Shares', 'Saves'],
        datasets: [{
          data: [totalLikes, totalComments, totalShares, totalSaves],
          backgroundColor: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
        cutout: '60%',
      },
    });

    // Update engagement stats
    const engStats = document.getElementById('engagement-stats');
    if (engStats) {
      engStats.innerHTML = [
        { icon: 'heart', label: 'Likes', value: App.formatNumber(totalLikes) },
        { icon: 'chat', label: 'Comments', value: App.formatNumber(totalComments) },
        { icon: 'share', label: 'Shares', value: App.formatNumber(totalShares) },
        { icon: 'bookmark', label: 'Saves', value: App.formatNumber(totalSaves) },
      ].map(stat => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="font-medium">${stat.label}</span>
          </div>
          <span class="font-bold text-socialife-dark">${stat.value}</span>
        </div>
      `).join('');
    }
  }

  // ========================================================================
  // Top Performing Content
  // ========================================================================
  const topPostsEl = document.getElementById('top-posts');
  if (topPostsEl && posts.length > 0) {
    topPostsEl.innerHTML = posts.map(post => {
      const platformInfo = App.PLATFORMS[post.platform] || {};
      return `
        <div class="flex gap-6 p-6 border border-gray-100 rounded-xl">
          <div class="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
            ${App.platformBadge(post.platform)}
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              ${App.platformBadge(post.platform)}
              <span class="text-xs text-gray-500 capitalize">${App.contentTypeLabel(post.type)}</span>
              <span class="text-xs text-gray-500">${App.formatDate(post.publishedAt)}</span>
            </div>
            <p class="text-socialife-dark mb-3">${App.truncate(post.caption, 120)}</p>
            <div class="flex gap-6 text-sm">
              <span class="text-gray-600">Likes <strong>${App.formatNumber(post.likes)}</strong></span>
              <span class="text-gray-600">Comments <strong>${post.comments}</strong></span>
              <span class="text-gray-600">Reach <strong>${App.formatShort(post.reach)}</strong></span>
              ${post.videoViews ? `<span class="text-gray-600">Views <strong>${App.formatShort(post.videoViews)}</strong></span>` : ''}
            </div>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-green-500">${App.formatPercent(post.engagementRate, false)}</p>
            <p class="text-xs text-gray-500">Engagement Rate</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // ========================================================================
  // Wire up PPTX download button
  // ========================================================================
  const downloadBtn = document.getElementById('download-pptx-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Generating...';
      try {
        await PptxTemplate.generateReport(clientId);
      } catch (err) {
        console.error('PPTX generation error:', err);
        alert('Error generating report. Please try again.');
      } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Download PPTX
        `;
      }
    });
  }

})();
