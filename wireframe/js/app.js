/**
 * Socialife Analytics — Shared Utilities
 *
 * Number formatting, date helpers, navigation state, and platform colours.
 */

const App = (() => {

  // Platform colours and labels
  const PLATFORMS = {
    instagram: { label: 'Instagram', short: 'IG', colour: '#E1306C', bgClass: 'bg-gradient-to-r from-purple-500 to-pink-500', textClass: 'text-pink-600', badgeClass: 'bg-pink-100 text-pink-700' },
    facebook: { label: 'Facebook', short: 'FB', colour: '#1877F2', bgClass: 'bg-blue-600', textClass: 'text-blue-600', badgeClass: 'bg-blue-100 text-blue-700' },
    tiktok: { label: 'TikTok', short: 'TT', colour: '#000000', bgClass: 'bg-black', textClass: 'text-gray-900', badgeClass: 'bg-gray-900 text-white' },
    linkedin: { label: 'LinkedIn', short: 'LI', colour: '#0A66C2', bgClass: 'bg-sky-600', textClass: 'text-sky-600', badgeClass: 'bg-sky-100 text-sky-700' },
  };

  // Chart.js colour palette per platform
  const CHART_COLOURS = {
    instagram: { border: '#E1306C', bg: 'rgba(225, 48, 108, 0.1)' },
    facebook: { border: '#1877F2', bg: 'rgba(24, 119, 242, 0.1)' },
    tiktok: { border: '#000000', bg: 'rgba(0, 0, 0, 0.1)' },
    linkedin: { border: '#0A66C2', bg: 'rgba(10, 102, 194, 0.1)' },
  };

  /**
   * Format a number with commas: 284521 -> "284,521"
   */
  function formatNumber(n) {
    if (n == null) return '0';
    return Math.round(n).toLocaleString('en-GB');
  }

  /**
   * Format a number in short form: 156000 -> "156K", 1200000 -> "1.2M"
   */
  function formatShort(n) {
    if (n == null) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return Math.round(n).toString();
  }

  /**
   * Format a percentage: 12.567 -> "+12.6%", -5.2 -> "-5.2%"
   */
  function formatPercent(n, showSign = true) {
    if (n == null) return '0%';
    const sign = showSign && n > 0 ? '+' : '';
    return `${sign}${n.toFixed(1)}%`;
  }

  /**
   * Format a date string: "2026-01-15" -> "15 Jan 2026"
   */
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /**
   * Format a datetime: "2026-01-15T19:30:00Z" -> "Jan 15, 2026 | 7:30 PM"
   */
  function formatDateTime(dateStr) {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${date} | ${time}`;
  }

  /**
   * Truncate text with ellipsis: "Very long caption..." -> "Very long cap..."
   */
  function truncate(text, maxLen = 80) {
    if (!text) return '';
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen - 3) + '...';
  }

  /**
   * Generate a platform badge HTML.
   */
  function platformBadge(platform) {
    const p = PLATFORMS[platform];
    if (!p) return `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">${platform}</span>`;
    return `<span class="text-xs px-2 py-0.5 rounded-full font-medium ${p.badgeClass}">${p.short}</span>`;
  }

  /**
   * Generate a change indicator (green up arrow or red down arrow).
   */
  function changeIndicator(value) {
    if (value == null) return '';
    const isPositive = value >= 0;
    const colour = isPositive ? 'text-green-600' : 'text-red-500';
    const arrow = isPositive
      ? '<svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>'
      : '<svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>';
    return `<span class="${colour} text-sm font-medium">${arrow} ${formatPercent(value)}</span>`;
  }

  /**
   * Content type label.
   */
  function contentTypeLabel(type) {
    const labels = {
      image: 'Image',
      video: 'Video',
      reel: 'Reel',
      carousel: 'Carousel',
      story: 'Story',
      text: 'Text',
    };
    return labels[type] || type;
  }

  /**
   * Set up active navigation item based on current page.
   */
  function initNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = (href === page) ||
        (page === 'index.html' && href === '#') ||
        (page === '' && href === '#');

      if (isActive) {
        link.classList.remove('text-gray-300', 'hover:bg-white/10');
        link.classList.add('bg-socialife-blue', 'text-white');
      } else {
        link.classList.remove('bg-socialife-blue', 'text-white');
        link.classList.add('text-gray-300', 'hover:bg-white/10');
      }
    });
  }

  /**
   * Show a loading spinner in an element.
   */
  function showLoading(element) {
    if (!element) return;
    element.innerHTML = `
      <div class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-socialife-blue"></div>
        <span class="ml-3 text-gray-500">Loading...</span>
      </div>
    `;
  }

  /**
   * Show an empty state message.
   */
  function showEmpty(element, message = 'No data available') {
    if (!element) return;
    element.innerHTML = `
      <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="mt-2 text-gray-500">${message}</p>
      </div>
    `;
  }

  // Initialise nav on page load (run immediately if DOM already ready)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }

  return {
    PLATFORMS,
    CHART_COLOURS,
    formatNumber,
    formatShort,
    formatPercent,
    formatDate,
    formatDateTime,
    truncate,
    platformBadge,
    changeIndicator,
    contentTypeLabel,
    initNav,
    showLoading,
    showEmpty,
  };
})();
