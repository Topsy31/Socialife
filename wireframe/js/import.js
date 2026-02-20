/**
 * Socialife Analytics — CSV Import Page Logic
 *
 * Handles drag-and-drop CSV upload, platform auto-detection via Papa Parse,
 * and data preview. For the demo, parsed data is stored in sessionStorage.
 */

(async function () {
  'use strict';

  // ========================================================================
  // Platform detection heuristics
  // ========================================================================

  /**
   * Detect which platform a CSV file came from based on column names.
   */
  function detectPlatform(headers) {
    const h = headers.map(col => col.toLowerCase().trim());

    // Instagram indicators
    if (h.some(c => c.includes('instagram')) ||
        (h.includes('impressions') && h.includes('reach') && h.some(c => c.includes('save')))) {
      return 'instagram';
    }

    // Facebook indicators
    if (h.some(c => c.includes('facebook')) || h.some(c => c.includes('page')) ||
        (h.includes('reactions') && h.includes('reach'))) {
      return 'facebook';
    }

    // TikTok indicators
    if (h.some(c => c.includes('tiktok')) || h.some(c => c.includes('video views')) ||
        (h.some(c => c.includes('views')) && h.some(c => c.includes('shares')))) {
      return 'tiktok';
    }

    // LinkedIn indicators
    if (h.some(c => c.includes('linkedin')) || h.some(c => c.includes('clicks')) &&
        h.some(c => c.includes('impressions')) && h.some(c => c.includes('engagement rate'))) {
      return 'linkedin';
    }

    return 'unknown';
  }

  /**
   * Detect the type of CSV (daily metrics, post-level, etc.).
   */
  function detectDataType(headers) {
    const h = headers.map(col => col.toLowerCase().trim());

    if (h.includes('date') && h.includes('followers')) return 'daily_metrics';
    if (h.some(c => c.includes('caption')) || h.some(c => c.includes('post'))) return 'posts';
    if (h.some(c => c.includes('age')) || h.some(c => c.includes('gender'))) return 'demographics';
    return 'unknown';
  }

  // ========================================================================
  // File processing
  // ========================================================================

  const parsedFiles = [];

  function processFile(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields || [];
          const platform = detectPlatform(headers);
          const dataType = detectDataType(headers);
          const rowCount = results.data.length;

          resolve({
            fileName: file.name,
            fileSize: file.size,
            headers,
            platform,
            dataType,
            rowCount,
            preview: results.data.slice(0, 5),
            errors: results.errors,
          });
        },
        error: (err) => reject(err),
      });
    });
  }

  // ========================================================================
  // UI Rendering
  // ========================================================================

  function renderFileList() {
    const container = document.getElementById('parsed-files');
    if (!container) return;

    if (parsedFiles.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center text-gray-400">
          No files uploaded yet. Drag CSV files above or click to browse.
        </div>
      `;
      return;
    }

    container.innerHTML = parsedFiles.map((f, idx) => {
      const platformInfo = App.PLATFORMS[f.platform] || {};
      const platformLabel = platformInfo.label || f.platform;
      const badgeClass = platformInfo.badgeClass || 'bg-gray-100 text-gray-600';
      const statusClass = f.errors.length > 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600';
      const statusLabel = f.errors.length > 0 ? `${f.errors.length} warnings` : 'Ready';
      const fileKB = (f.fileSize / 1024).toFixed(1);

      return `
        <div class="p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg ${f.platform === 'unknown' ? 'bg-gray-100' : badgeClass.split(' ')[0]} flex items-center justify-center">
            <span class="${f.platform === 'unknown' ? 'text-gray-600' : badgeClass.split(' ')[1]} font-bold text-sm">
              ${platformInfo.short || '?'}
            </span>
          </div>
          <div class="flex-1">
            <p class="font-medium text-socialife-dark">${f.fileName}</p>
            <p class="text-sm text-gray-500">
              Detected: ${platformLabel} ${f.dataType !== 'unknown' ? '(' + f.dataType.replace('_', ' ') + ')' : ''} | ${f.rowCount} rows | ${fileKB} KB
            </p>
          </div>
          <span class="px-3 py-1 ${statusClass} rounded-full text-sm font-medium">${statusLabel}</span>
          <button onclick="removeFile(${idx})" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;
    }).join('<div class="border-t border-gray-100"></div>');

    // Summary line
    const totalRows = parsedFiles.reduce((s, f) => s + f.rowCount, 0);
    const summary = document.getElementById('import-summary');
    if (summary) {
      summary.classList.remove('hidden');
      summary.innerHTML = `
        <p class="text-sm text-gray-500">${parsedFiles.length} file${parsedFiles.length !== 1 ? 's' : ''} | ${totalRows} rows total</p>
        <button onclick="importAll()" class="px-6 py-2 bg-socialife-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition">
          Import All Data
        </button>
      `;
    }
  }

  function renderPreviewTable(fileData) {
    const container = document.getElementById('csv-preview');
    if (!container || !fileData) return;

    if (fileData.preview.length === 0) {
      container.innerHTML = '<p class="text-gray-400 text-center p-4">No data to preview</p>';
      return;
    }

    const headers = fileData.headers.slice(0, 8); // Max 8 columns for display
    const rows = fileData.preview;

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50">
            <tr>
              ${headers.map(h => `<th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${rows.map(row => `
              <tr class="hover:bg-gray-50">
                ${headers.map(h => `<td class="px-3 py-2 text-gray-700 truncate max-w-[200px]">${row[h] || ''}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-400 mt-2 px-3">Showing first ${rows.length} of ${fileData.rowCount} rows</p>
    `;
  }

  // ========================================================================
  // Global handlers
  // ========================================================================

  window.removeFile = function (idx) {
    parsedFiles.splice(idx, 1);
    renderFileList();
    if (parsedFiles.length > 0) {
      renderPreviewTable(parsedFiles[parsedFiles.length - 1]);
    } else {
      const container = document.getElementById('csv-preview');
      if (container) container.innerHTML = '';
    }
  };

  window.importAll = function () {
    // Demo: just show success message
    alert(`Demo: ${parsedFiles.length} file(s) would be imported.\n\nIn the production version, this data would be merged into the client's JSON file and saved to cloud storage.`);
  };

  // ========================================================================
  // Wire up drag & drop + file input
  // ========================================================================

  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const files = [...e.dataTransfer.files].filter(f => f.name.endsWith('.csv'));
      for (const file of files) {
        const result = await processFile(file);
        parsedFiles.push(result);
      }
      renderFileList();
      if (parsedFiles.length > 0) {
        renderPreviewTable(parsedFiles[parsedFiles.length - 1]);
      }
    });

    fileInput.addEventListener('change', async (e) => {
      const files = [...e.target.files];
      for (const file of files) {
        const result = await processFile(file);
        parsedFiles.push(result);
      }
      renderFileList();
      if (parsedFiles.length > 0) {
        renderPreviewTable(parsedFiles[parsedFiles.length - 1]);
      }
      fileInput.value = ''; // Reset for re-selection
    });
  }

  // ========================================================================
  // Populate client selector from Store
  // ========================================================================
  const clientSelect = document.getElementById('import-client-selector');
  if (clientSelect) {
    const clients = await Store.getClients();
    const active = clients.filter(c => c.status === 'active');
    clientSelect.innerHTML = `
      <option value="">Choose a client...</option>
      ${active.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
    `;
  }

})();
