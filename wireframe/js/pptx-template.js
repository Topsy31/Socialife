/**
 * Socialife Analytics — PPTX Slide Templates
 *
 * Generates PowerPoint reports matching Metricool's style using PptxGenJS.
 * Slide design based on analysis of Intotum (35 slides) and SCC (42 slides) reports.
 */

const PptxTemplate = (() => {
  'use strict';

  // Metricool-style design constants
  const COLOURS = {
    kpi: '501201',        // Dark maroon for KPI values (from Metricool)
    dark: '32373c',       // Socialife dark
    blue: '066aab',       // Socialife blue
    grey: '666666',
    lightGrey: 'EEEEEE',
    white: 'FFFFFF',
    green: '10B981',
    red: 'EF4444',
  };

  const FONT = 'Inter';  // Fallback from Nunito Sans

  /**
   * Create a new presentation with standard settings.
   */
  function createPresentation() {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';  // 13.33 x 7.5 inches (widescreen)
    pptx.author = 'Socialife Management';
    pptx.company = 'Socialife Management';
    return pptx;
  }

  /**
   * Add a footer to a slide.
   */
  function addFooter(slide, clientName) {
    slide.addText(
      [
        { text: 'Socialife Management', options: { color: COLOURS.grey, fontSize: 8, bold: true } },
        { text: `  |  ${clientName}`, options: { color: COLOURS.grey, fontSize: 8 } }
      ],
      { x: 0.5, y: 6.9, w: 8, h: 0.4 }
    );
  }

  // ========================================================================
  // SLIDE GENERATORS
  // ========================================================================

  /**
   * Slide 1: Title / Cover
   */
  function addTitleSlide(pptx, { clientName, period, platforms }) {
    const slide = pptx.addSlide();
    slide.background = { fill: COLOURS.blue };

    // Socialife branding
    slide.addText('S', {
      x: 5.67, y: 0.8, w: 2, h: 2,
      fontSize: 72, fontFace: FONT, bold: true,
      color: COLOURS.white, align: 'center',
      shape: pptx.shapes.OVAL,
      fill: { type: 'solid', color: '0891b2' },
    });

    slide.addText('SOCIALIFE MANAGEMENT', {
      x: 3, y: 2.9, w: 7.33, h: 0.5,
      fontSize: 11, fontFace: FONT, color: COLOURS.white,
      align: 'center', charSpacing: 6,
    });

    // Client name
    slide.addText(clientName, {
      x: 2, y: 3.8, w: 9.33, h: 1,
      fontSize: 36, fontFace: FONT, bold: true,
      color: COLOURS.white, align: 'center',
    });

    // Report title
    slide.addText('Social Media Performance Report', {
      x: 2, y: 4.7, w: 9.33, h: 0.6,
      fontSize: 20, fontFace: FONT,
      color: COLOURS.white, align: 'center',
    });

    // Period
    slide.addText(period, {
      x: 4.67, y: 5.6, w: 4, h: 0.6,
      fontSize: 16, fontFace: FONT,
      color: COLOURS.white, align: 'center',
      shape: pptx.shapes.ROUNDED_RECTANGLE,
      rectRadius: 0.3,
      fill: { type: 'solid', color: '0891b2' },
    });

    // Platform badges
    if (platforms && platforms.length > 0) {
      const platformText = platforms.map(p => App.PLATFORMS[p]?.label || p).join('  |  ');
      slide.addText(platformText, {
        x: 3, y: 6.4, w: 7.33, h: 0.4,
        fontSize: 11, fontFace: FONT,
        color: COLOURS.white, align: 'center',
      });
    }
  }

  /**
   * Slide 2: KPI Summary (big numbers)
   */
  function addKPISummarySlide(pptx, { clientName, summary }) {
    const slide = pptx.addSlide();
    addFooter(slide, clientName);

    slide.addText('Key Performance Indicators', {
      x: 0.5, y: 0.4, w: 12, h: 0.6,
      fontSize: 24, fontFace: FONT, bold: true, color: COLOURS.dark,
    });

    const kpis = [
      { label: 'Followers', value: App.formatNumber(summary.followers), change: summary.followersChange },
      { label: 'Total Reach', value: App.formatShort(summary.reach), change: summary.reachChange },
      { label: 'Engagements', value: App.formatNumber(summary.engagements), change: summary.engagementsChange },
      { label: 'Engagement Rate', value: App.formatPercent(summary.engagementRate, false), change: null },
    ];

    kpis.forEach((kpi, i) => {
      const x = 0.5 + (i * 3.1);
      const y = 1.5;

      // KPI card background
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 2.8, h: 3,
        rectRadius: 0.15,
        fill: { type: 'solid', color: 'F9FAFB' },
        line: { color: COLOURS.lightGrey, width: 1 },
      });

      // KPI value
      slide.addText(kpi.value, {
        x, y: y + 0.5, w: 2.8, h: 1,
        fontSize: 36, fontFace: FONT, bold: true,
        color: COLOURS.kpi, align: 'center',
      });

      // KPI label
      slide.addText(kpi.label, {
        x, y: y + 1.5, w: 2.8, h: 0.4,
        fontSize: 12, fontFace: FONT, color: COLOURS.grey, align: 'center',
      });

      // Change indicator
      if (kpi.change != null) {
        const isPositive = kpi.change >= 0;
        slide.addText(App.formatPercent(kpi.change), {
          x, y: y + 2, w: 2.8, h: 0.4,
          fontSize: 14, fontFace: FONT, bold: true,
          color: isPositive ? COLOURS.green : COLOURS.red,
          align: 'center',
        });
      }
    });
  }

  /**
   * Slide 3: Follower Growth per Platform
   */
  function addFollowerSlide(pptx, { clientName, platformBreakdown }) {
    const slide = pptx.addSlide();
    addFooter(slide, clientName);

    slide.addText('Follower Growth by Platform', {
      x: 0.5, y: 0.4, w: 12, h: 0.6,
      fontSize: 24, fontFace: FONT, bold: true, color: COLOURS.dark,
    });

    const platforms = Object.entries(platformBreakdown);

    platforms.forEach(([platform, data], i) => {
      const x = 0.5 + (i * (12 / platforms.length));
      const w = (12 / platforms.length) - 0.3;
      const info = App.PLATFORMS[platform] || {};

      // Platform card
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x, y: 1.4, w, h: 4.5,
        rectRadius: 0.15,
        fill: { type: 'solid', color: 'F9FAFB' },
        line: { color: COLOURS.lightGrey, width: 1 },
      });

      // Platform label
      slide.addText(info.label || platform, {
        x, y: 1.6, w, h: 0.5,
        fontSize: 16, fontFace: FONT, bold: true, color: COLOURS.dark, align: 'center',
      });

      // Current followers
      slide.addText(App.formatNumber(data.current), {
        x, y: 2.4, w, h: 0.8,
        fontSize: 32, fontFace: FONT, bold: true, color: COLOURS.kpi, align: 'center',
      });

      slide.addText('followers', {
        x, y: 3.1, w, h: 0.3,
        fontSize: 11, fontFace: FONT, color: COLOURS.grey, align: 'center',
      });

      // Change
      if (data.change != null) {
        const isPositive = data.change >= 0;
        const sign = isPositive ? '+' : '';
        slide.addText(`${sign}${App.formatNumber(data.gained)} (${App.formatPercent(data.change)})`, {
          x, y: 3.6, w, h: 0.4,
          fontSize: 13, fontFace: FONT, bold: true,
          color: isPositive ? COLOURS.green : COLOURS.red,
          align: 'center',
        });
      }
    });
  }

  /**
   * Slide 4+: Post Ranking Table
   */
  function addPostRankingSlide(pptx, { clientName, posts, platform, pageNum, totalPages }) {
    const slide = pptx.addSlide();
    addFooter(slide, clientName);

    const platformLabel = platform ? (App.PLATFORMS[platform]?.label || platform) : 'All Platforms';
    const pageLabel = totalPages > 1 ? ` (${pageNum}/${totalPages})` : '';

    slide.addText(`Post Ranking — ${platformLabel}${pageLabel}`, {
      x: 0.5, y: 0.4, w: 12, h: 0.6,
      fontSize: 24, fontFace: FONT, bold: true, color: COLOURS.dark,
    });

    // Table header
    const headers = [
      { text: '#', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT, align: 'center' } },
      { text: 'Published', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT } },
      { text: 'Type', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT } },
      { text: 'Caption', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT } },
      { text: 'Reach', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT, align: 'right' } },
      { text: 'Likes', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT, align: 'right' } },
      { text: 'Comments', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT, align: 'right' } },
      { text: 'Eng %', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 9, fontFace: FONT, align: 'right' } },
    ];

    const rows = posts.map((post, idx) => {
      const fillColor = idx % 2 === 0 ? 'FFFFFF' : 'F9FAFB';
      const opts = { fontSize: 8, fontFace: FONT, color: COLOURS.dark, fill: { color: fillColor } };
      return [
        { text: String(idx + 1 + ((pageNum - 1) * 10)), options: { ...opts, align: 'center' } },
        { text: App.formatDate(post.publishedAt), options: opts },
        { text: App.contentTypeLabel(post.type), options: opts },
        { text: App.truncate(post.caption, 50), options: opts },
        { text: App.formatShort(post.reach), options: { ...opts, align: 'right' } },
        { text: App.formatNumber(post.likes), options: { ...opts, align: 'right' } },
        { text: String(post.comments), options: { ...opts, align: 'right' } },
        { text: App.formatPercent(post.engagementRate, false), options: { ...opts, align: 'right' } },
      ];
    });

    slide.addTable([headers, ...rows], {
      x: 0.3, y: 1.2, w: 12.7,
      colW: [0.4, 1.2, 0.9, 4.5, 1.2, 1.1, 1.1, 0.9],
      border: { type: 'solid', pt: 0.5, color: COLOURS.lightGrey },
      autoPage: false,
    });
  }

  /**
   * Slide: Demographics — Gender & Age
   */
  function addDemographicsSlide(pptx, { clientName, demographics }) {
    const slide = pptx.addSlide();
    addFooter(slide, clientName);

    slide.addText('Audience Demographics', {
      x: 0.5, y: 0.4, w: 12, h: 0.6,
      fontSize: 24, fontFace: FONT, bold: true, color: COLOURS.dark,
    });

    // Gender breakdown
    if (demographics.gender) {
      slide.addText('Gender', {
        x: 0.5, y: 1.3, w: 5, h: 0.4,
        fontSize: 16, fontFace: FONT, bold: true, color: COLOURS.dark,
      });

      demographics.gender.forEach((g, i) => {
        const y = 1.9 + (i * 0.6);
        slide.addText(`${g.label}:  ${g.percentage}%`, {
          x: 0.5, y, w: 5, h: 0.4,
          fontSize: 13, fontFace: FONT, color: COLOURS.dark,
        });

        // Progress bar
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: 0.5, y: y + 0.35, w: 5, h: 0.12,
          fill: { type: 'solid', color: COLOURS.lightGrey },
        });
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: 0.5, y: y + 0.35, w: 5 * (g.percentage / 100), h: 0.12,
          fill: { type: 'solid', color: COLOURS.blue },
        });
      });
    }

    // Age breakdown
    if (demographics.age) {
      slide.addText('Age Groups', {
        x: 7, y: 1.3, w: 5, h: 0.4,
        fontSize: 16, fontFace: FONT, bold: true, color: COLOURS.dark,
      });

      demographics.age.forEach((a, i) => {
        const y = 1.9 + (i * 0.55);
        slide.addText(`${a.range}:  ${a.percentage}%`, {
          x: 7, y, w: 5, h: 0.35,
          fontSize: 12, fontFace: FONT, color: COLOURS.dark,
        });

        slide.addShape(pptx.shapes.RECTANGLE, {
          x: 7, y: y + 0.3, w: 5, h: 0.1,
          fill: { type: 'solid', color: COLOURS.lightGrey },
        });
        slide.addShape(pptx.shapes.RECTANGLE, {
          x: 7, y: y + 0.3, w: 5 * (a.percentage / 100), h: 0.1,
          fill: { type: 'solid', color: COLOURS.blue },
        });
      });
    }

    // Location
    if (demographics.location) {
      const locY = 4.5;
      slide.addText('Top Locations', {
        x: 0.5, y: locY, w: 12, h: 0.4,
        fontSize: 16, fontFace: FONT, bold: true, color: COLOURS.dark,
      });

      const locHeaders = [
        { text: 'City', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT } },
        { text: 'Percentage', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'right' } },
      ];

      const locRows = demographics.location.slice(0, 8).map((loc, i) => {
        const fillColor = i % 2 === 0 ? 'FFFFFF' : 'F9FAFB';
        const opts = { fontSize: 10, fontFace: FONT, color: COLOURS.dark, fill: { color: fillColor } };
        return [
          { text: loc.city, options: opts },
          { text: `${loc.percentage}%`, options: { ...opts, align: 'right' } },
        ];
      });

      slide.addTable([locHeaders, ...locRows], {
        x: 0.5, y: locY + 0.5, w: 6,
        colW: [4, 2],
        border: { type: 'solid', pt: 0.5, color: COLOURS.lightGrey },
      });
    }
  }

  /**
   * Slide: Hashtag Ranking
   */
  function addHashtagSlide(pptx, { clientName, hashtags }) {
    const slide = pptx.addSlide();
    addFooter(slide, clientName);

    slide.addText('Hashtag Performance', {
      x: 0.5, y: 0.4, w: 12, h: 0.6,
      fontSize: 24, fontFace: FONT, bold: true, color: COLOURS.dark,
    });

    const headers = [
      { text: '#', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'center' } },
      { text: 'Hashtag', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT } },
      { text: 'Posts', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'right' } },
      { text: 'Views', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'right' } },
      { text: 'Likes', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'right' } },
      { text: 'Comments', options: { bold: true, color: COLOURS.white, fill: { color: COLOURS.blue }, fontSize: 10, fontFace: FONT, align: 'right' } },
    ];

    const rows = hashtags.slice(0, 15).map((h, i) => {
      const fillColor = i % 2 === 0 ? 'FFFFFF' : 'F9FAFB';
      const opts = { fontSize: 9, fontFace: FONT, color: COLOURS.dark, fill: { color: fillColor } };
      return [
        { text: String(i + 1), options: { ...opts, align: 'center' } },
        { text: h.hashtag, options: { ...opts, bold: true } },
        { text: String(h.posts), options: { ...opts, align: 'right' } },
        { text: App.formatShort(h.views), options: { ...opts, align: 'right' } },
        { text: App.formatNumber(h.likes), options: { ...opts, align: 'right' } },
        { text: String(h.comments), options: { ...opts, align: 'right' } },
      ];
    });

    slide.addTable([headers, ...rows], {
      x: 0.5, y: 1.2, w: 12,
      colW: [0.5, 4, 1.2, 1.8, 1.8, 1.8],
      border: { type: 'solid', pt: 0.5, color: COLOURS.lightGrey },
    });
  }

  /**
   * Slide: End / Thank You
   */
  function addEndSlide(pptx, { clientName }) {
    const slide = pptx.addSlide();
    slide.background = { fill: COLOURS.blue };

    slide.addText('Thank You', {
      x: 2, y: 2, w: 9.33, h: 1,
      fontSize: 42, fontFace: FONT, bold: true,
      color: COLOURS.white, align: 'center',
    });

    slide.addText(`Report prepared for ${clientName}`, {
      x: 2, y: 3.2, w: 9.33, h: 0.6,
      fontSize: 18, fontFace: FONT,
      color: COLOURS.white, align: 'center',
    });

    slide.addText('Socialife Management', {
      x: 2, y: 4.5, w: 9.33, h: 0.5,
      fontSize: 14, fontFace: FONT,
      color: COLOURS.white, align: 'center',
    });

    slide.addText('www.socialifemanagement.com', {
      x: 2, y: 5.1, w: 9.33, h: 0.4,
      fontSize: 12, fontFace: FONT,
      color: COLOURS.white, align: 'center',
    });
  }

  // ========================================================================
  // MAIN GENERATOR
  // ========================================================================

  /**
   * Generate a full PPTX report for a client and trigger download.
   *
   * @param {string} clientId — the client ID
   * @returns {Promise<void>}
   */
  async function generateReport(clientId) {
    const clients = await Store.getClients();
    const clientInfo = clients.find(c => c.id === clientId);
    if (!clientInfo) throw new Error('Client not found');

    const summary = await Store.getClientSummary(clientId);
    if (!summary) throw new Error('Could not load client summary data');
    const posts = await Store.getPosts(clientId, { sortBy: 'reach' });
    const demographics = await Store.getDemographics(clientId);
    const hashtags = await Store.getHashtags(clientId);
    const client = await Store.getClient(clientId);

    const period = 'January 2026';
    const clientName = clientInfo.name;

    // Build platform breakdown from daily data
    const platformBreakdown = {};
    if (client) {
      const platforms = [...new Set(client.metrics.daily.map(m => m.platform))];
      for (const p of platforms) {
        const pMetrics = client.metrics.daily.filter(m => m.platform === p);
        const first = pMetrics[0];
        const last = pMetrics[pMetrics.length - 1];
        const gained = last.followers - first.followers;
        const change = first.followers > 0 ? (gained / first.followers * 100) : 0;
        platformBreakdown[p] = {
          current: last.followers,
          start: first.followers,
          gained,
          change,
        };
      }
    }

    // Create presentation
    const pptx = createPresentation();
    pptx.title = `${clientName} - Social Media Report - ${period}`;

    // Add slides
    addTitleSlide(pptx, { clientName, period, platforms: summary.platforms });
    addKPISummarySlide(pptx, { clientName, summary });
    addFollowerSlide(pptx, { clientName, platformBreakdown });

    // Post ranking slides (10 posts per slide)
    const postsPerSlide = 10;
    const totalPages = Math.ceil(posts.length / postsPerSlide);
    for (let page = 0; page < totalPages; page++) {
      const pagePosts = posts.slice(page * postsPerSlide, (page + 1) * postsPerSlide);
      addPostRankingSlide(pptx, {
        clientName,
        posts: pagePosts,
        platform: null,
        pageNum: page + 1,
        totalPages,
      });
    }

    // Demographics
    if (demographics) {
      addDemographicsSlide(pptx, { clientName, demographics });
    }

    // Hashtags
    if (hashtags && hashtags.length > 0) {
      addHashtagSlide(pptx, { clientName, hashtags });
    }

    // End slide
    addEndSlide(pptx, { clientName });

    // Download
    const filename = `${clientName.replace(/[^a-zA-Z0-9]/g, '_')}_Report_${period.replace(' ', '_')}.pptx`;
    await pptx.writeFile({ fileName: filename });
  }

  return {
    generateReport,
  };
})();
