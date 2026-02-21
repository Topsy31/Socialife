/**
 * Socialife Analytics — Client Management Page Logic
 *
 * Renders the client list dynamically from Store data.
 * Supports adding/archiving clients via sessionStorage.
 */

(async function () {
  'use strict';

  const colourMap = {
    'Sports & Fitness': { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    'Fashion & Retail': { bg: 'bg-pink-100', text: 'text-pink-600' },
    'Financial Services': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'Food & Beverage': { bg: 'bg-orange-100', text: 'text-orange-600' },
    'E-commerce': { bg: 'bg-green-100', text: 'text-green-600' },
    'Health & Wellness': { bg: 'bg-purple-100', text: 'text-purple-600' },
    'Professional Services': { bg: 'bg-gray-200', text: 'text-gray-500' },
  };

  // ========================================================================
  // Stats cards
  // ========================================================================
  function renderStats(clients) {
    const active = clients.filter(c => c.status === 'active');
    const archived = clients.filter(c => c.status === 'archived');
    const totalPlatforms = active.reduce((sum, c) => sum + (c.platforms?.length || 0), 0);

    const el = document.getElementById('client-stats');
    if (!el) return;

    el.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Active Clients</p>
            <p class="text-3xl font-bold text-socialife-dark">${active.length}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Archived</p>
            <p class="text-3xl font-bold text-socialife-dark">${archived.length}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Platforms</p>
            <p class="text-3xl font-bold text-socialife-dark">${totalPlatforms}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Reports This Month</p>
            <p class="text-3xl font-bold text-socialife-dark">${active.length}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================================
  // Client table
  // ========================================================================
  function renderClientTable(clients) {
    const tbody = document.getElementById('client-table-body');
    if (!tbody) return;

    tbody.innerHTML = clients.map(c => {
      const initials = c.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      const colour = colourMap[c.industry] || { bg: 'bg-gray-100', text: 'text-gray-600' };
      const isArchived = c.status === 'archived';
      const rowClass = isArchived ? 'bg-gray-50/50' : '';
      const nameClass = isArchived ? 'text-gray-500' : 'text-socialife-dark';
      const statusBadge = isArchived
        ? '<span class="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">Archived</span>'
        : '<span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>';

      return `
        <tr class="hover:bg-gray-50 transition ${rowClass}">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg ${colour.bg} flex items-center justify-center">
                <span class="font-semibold ${colour.text}">${initials}</span>
              </div>
              <div>
                <p class="font-medium ${nameClass}">${c.name}</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-gray-600">${c.industry}</td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-1 ${isArchived ? 'opacity-50' : ''}">
              ${(c.platforms || []).map(p => App.platformBadge(p)).join('')}
            </div>
          </td>
          <td class="px-6 py-4">${statusBadge}</td>
          <td class="px-6 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              ${isArchived ? '' : `
                <a href="report.html?client=${c.id}" class="p-2 text-gray-400 hover:text-socialife-blue hover:bg-gray-100 rounded-lg" title="View Report">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </a>
                <button onclick="archiveClient('${c.id}')" class="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg" title="Archive">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                  </svg>
                </button>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Update count
    const countEl = document.getElementById('client-count');
    if (countEl) {
      countEl.textContent = `Showing ${clients.length} clients`;
    }
  }

  // ========================================================================
  // Archive handler (global)
  // ========================================================================
  window.archiveClient = function (clientId) {
    if (confirm('Archive this client? They will be moved to the archived list.')) {
      Store.archiveClient(clientId);
      window.location.reload();
    }
  };

  // ========================================================================
  // Multi-step modal wizard
  // ========================================================================
  function wireAddClient() {
    const form = document.getElementById('new-client-form');
    if (!form) return;

    const steps = [
      document.getElementById('modal-step-1'),
      document.getElementById('modal-step-2'),
      document.getElementById('modal-step-3'),
    ];
    const indicators = document.querySelectorAll('#step-indicators [data-step]');
    const lines = document.querySelectorAll('#step-indicators .step-line');
    const nextBtn = document.getElementById('modal-next-btn');
    const backBtn = document.getElementById('modal-back-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const submitBtn = document.getElementById('modal-submit-btn');

    let currentStep = 1;

    function goToStep(step) {
      currentStep = step;

      // Show/hide step panels
      steps.forEach((el, i) => {
        if (el) el.classList.toggle('hidden', i + 1 !== step);
      });

      // Update step indicators
      indicators.forEach(ind => {
        const s = parseInt(ind.dataset.step);
        const dot = ind.querySelector('.step-dot');
        const label = ind.querySelector('.step-label');
        if (s <= step) {
          dot.className = 'step-dot w-8 h-8 rounded-full bg-socialife-blue text-white flex items-center justify-center text-sm font-medium';
          label.className = 'step-label text-sm font-medium text-socialife-dark';
        } else {
          dot.className = 'step-dot w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-medium';
          label.className = 'step-label text-sm text-gray-500';
        }
      });

      // Update connector lines
      lines.forEach((line, i) => {
        line.className = i < step - 1
          ? 'step-line flex-1 h-0.5 bg-socialife-blue mx-4'
          : 'step-line flex-1 h-0.5 bg-gray-200 mx-4';
      });

      // Show/hide buttons
      backBtn.classList.toggle('hidden', step === 1);
      cancelBtn.classList.toggle('hidden', step > 1);
      nextBtn.classList.toggle('hidden', step === 3);
      submitBtn.classList.toggle('hidden', step < 3);

      // Update branding preview on step 2
      if (step === 2) updateBrandPreview();
    }

    // Expose globally so the close button can reset
    window.modalStep = goToStep;

    function updateBrandPreview() {
      const name = form.querySelector('[name="client-name"]')?.value || 'Client Name';
      const industry = form.querySelector('[name="industry"]')?.value || 'Industry';
      const colour = form.querySelector('[name="primary-colour"]')?.value || '#066aab';
      const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

      const preview = document.getElementById('brand-preview');
      const previewName = document.getElementById('preview-name');
      const previewIndustry = document.getElementById('preview-industry');
      if (preview) {
        const icon = preview.querySelector('div');
        if (icon) {
          icon.style.background = colour;
          icon.textContent = initials || '--';
        }
      }
      if (previewName) previewName.textContent = name;
      if (previewIndustry) previewIndustry.textContent = industry;
    }

    // Sync colour picker with hex input
    const colourPicker = form.querySelector('[name="primary-colour"]');
    const colourHex = form.querySelector('[name="primary-colour-hex"]');
    const colourPicker2 = form.querySelector('[name="secondary-colour"]');
    const colourHex2 = form.querySelector('[name="secondary-colour-hex"]');

    if (colourPicker && colourHex) {
      colourPicker.addEventListener('input', () => { colourHex.value = colourPicker.value; updateBrandPreview(); });
      colourHex.addEventListener('input', () => { if (/^#[0-9a-f]{6}$/i.test(colourHex.value)) colourPicker.value = colourHex.value; });
    }
    if (colourPicker2 && colourHex2) {
      colourPicker2.addEventListener('input', () => { colourHex2.value = colourPicker2.value; });
      colourHex2.addEventListener('input', () => { if (/^#[0-9a-f]{6}$/i.test(colourHex2.value)) colourPicker2.value = colourHex2.value; });
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Validate step 1
        if (currentStep === 1) {
          const name = form.querySelector('[name="client-name"]')?.value?.trim();
          if (!name) {
            form.querySelector('[name="client-name"]')?.focus();
            return;
          }
        }
        if (currentStep < 3) goToStep(currentStep + 1);
      });
    }

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentStep > 1) goToStep(currentStep - 1);
      });
    }

    // Form submit (on step 3)
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="client-name"]')?.value?.trim();
      const industry = form.querySelector('[name="industry"]')?.value;
      if (!name) return;

      const platforms = [];
      form.querySelectorAll('input[name="platform"]:checked').forEach(cb => {
        platforms.push(cb.value);
      });

      const primaryColour = form.querySelector('[name="primary-colour"]')?.value || '#066aab';
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      Store.addClient({
        id,
        name,
        industry: industry || 'Other',
        status: 'active',
        platforms,
        primaryColour,
      });

      document.getElementById('newClientModal').classList.add('hidden');
      goToStep(1);
      window.location.reload();
    });
  }

  // ========================================================================
  // Init
  // ========================================================================
  try {
    const clients = await Store.getClients();
    renderStats(clients);
    renderClientTable(clients);
    wireAddClient();
  } catch (err) {
    console.error('Clients page error:', err);
    const tbody = document.getElementById('client-table-body');
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-red-500">
        Error loading data: ${err.message}<br>
        <span class="text-sm text-gray-400">Check browser console for details</span>
      </td></tr>`;
    }
  }

})();
