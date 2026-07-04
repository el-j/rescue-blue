(function() {
  // --- STATE VARIABLES ---
  let currentLang = document.documentElement.getAttribute('lang') || 'de';
  let theme = localStorage.getItem('rescue-blue-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  let selectedStateId = '0';
  let sandboxState = 'default'; // 'default', 'brown', 'dream'
  let showComparison = false;
  let pollingSnapshot = null;

  // --- TRANSLATION HELPER ---
  const TRANSLATIONS = {
    de: {
      allOthersLabel: 'Alle Anderen',
      comparisonRatio: '× so viele Menschen wählen NICHT die AfD',
      comparisonMessage: 'Die überwältigende Mehrheit steht für Demokratie.',
      demoSwitch: 'Jetzt umfärben auf Braun',
      demoDreamSwitch: 'Beste Zukunft visualisieren',
      demoReset: 'Traum beenden',
      sigLive: 'Live-Zähler',
      sigFallback: 'Lokaler Stand',
      demoSourceApi: 'Quelle: DAWUM Sonntagsfrage',
      demoSourceInstitute: 'Institut',
      demoSourceDate: 'Datum',
      demoSourceFieldwork: 'Befragungszeitraum',
      demoSourceSample: 'Befragte',
      demoSourceMethod: 'Verfahren',
      demoSourceFallback: 'Lokaler Fallback-Stand',
      sigCount: 'Bereits',
      sigSupport: 'Unterzeichner:innen'
    },
    en: {
      allOthersLabel: 'All Others',
      comparisonRatio: '× more people do NOT vote for the AfD',
      comparisonMessage: 'The overwhelming majority stands for democracy.',
      demoSwitch: 'Switch to Brown',
      demoDreamSwitch: 'Visualize Best Future',
      demoReset: 'End Dream',
      sigLive: 'Live Counter',
      sigFallback: 'Local Stand',
      demoSourceApi: 'Source: DAWUM Sunday poll',
      demoSourceInstitute: 'Institute',
      demoSourceDate: 'Date',
      demoSourceFieldwork: 'Fieldwork',
      demoSourceSample: 'Sample size',
      demoSourceMethod: 'Method',
      demoSourceFallback: 'Local fallback stand',
      sigCount: 'Already',
      sigSupport: 'supporters'
    },
    fr: {
      allOthersLabel: "Tous les autres",
      comparisonRatio: "× plus de personnes ne votent PAS pour l'AfD",
      comparisonMessage: "L'écrasante majorité est pour la démocratie."
    },
    es: {
      allOthersLabel: "Todos los demás",
      comparisonRatio: "× más personas NO votan por la AfD",
      comparisonMessage: "La abrumadora mayoría apoya la democracia."
    },
    tr: {
      allOthersLabel: "Diğerleri",
      comparisonRatio: "× daha fazla insan AfD'ye oy VERMİYOR",
      comparisonMessage: "Ezici çoğunluk demokrasiden yana."
    },
    uk: {
      allOthersLabel: "Всі інші",
      comparisonRatio: "× більше людей НЕ голосують за AfD",
      comparisonMessage: "Переважна більшість стоїть за демократію."
    },
    pl: {
      allOthersLabel: "Wszyscy inni",
      comparisonRatio: "× więcej ludzi NIE głosuje na AfD",
      comparisonMessage: "Przytłaczająca większość stoi za demokracją."
    },
    it: {
      allOthersLabel: "Tutti gli altri",
      comparisonRatio: "× più persone NON votano per l'AfD",
      comparisonMessage: "La stragrande maggioranza sostiene la democrazia."
    },
    ru: {
      allOthersLabel: "Все остальные",
      comparisonRatio: "× больше людей НЕ голосуют за AfD",
      comparisonMessage: "Подавляющее большинство выступает за демократию."
    }
  };

  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || (TRANSLATIONS['de'][key] || '');
  }

  // --- INITIALIZATION ---
  function init() {
    initTheme();
    initLanguagePicker();
    initShareModal();
    initAccordions();
    initHeroSlider();
    initMobileCarousel();
    initSandbox();
    fetchDynamicData();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // --- THEME ---
  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      if (isLight) {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.style.backgroundColor = '#171717';
        theme = 'dark';
        btn.setAttribute('aria-label', currentLang === 'de' ? 'Hell' : 'Light');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.style.backgroundColor = '#f8fafc';
        theme = 'light';
        btn.setAttribute('aria-label', currentLang === 'de' ? 'Dunkel' : 'Dark');
      }
      localStorage.setItem('rescue-blue-theme', theme);
    });
  }

  // --- LANGUAGE PICKER ---
  function initLanguagePicker() {
    const btn = document.getElementById('language-picker-button');
    const popover = document.getElementById('language-picker-popover');
    if (!btn || !popover) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      popover.classList.toggle('hidden');
      popover.classList.toggle('block');
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !popover.contains(e.target)) {
        popover.classList.add('hidden');
        popover.classList.remove('block');
      }
    });

    const langButtons = popover.querySelectorAll('button');
    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const codeSpan = button.querySelector('span');
        if (!codeSpan) return;
        const code = codeSpan.textContent.trim().toLowerCase();
        localStorage.setItem('rescue-blue-lang', code);
        popover.classList.add('hidden');
        popover.classList.remove('block');
        if (code === 'de') {
          window.location.href = '/';
        } else {
          window.location.href = `/${code}/`;
        }
      });
    });
  }

  // --- SHARE MODAL ---
  function initShareModal() {
    const btn = document.getElementById('share-button');
    const container = document.getElementById('share-modal-container');
    const closeBtn = document.getElementById('share-modal-close-button');
    const copyBtn = document.getElementById('share-modal-copy-button');
    const copyIcon = document.getElementById('share-modal-copy-icon');
    const checkIcon = document.getElementById('share-modal-check-icon');

    if (!btn || !container) return;

    btn.addEventListener('click', () => {
      container.classList.remove('opacity-0', 'pointer-events-none');
      container.classList.add('opacity-100', 'pointer-events-auto');
    });

    function close() {
      container.classList.add('opacity-0', 'pointer-events-none');
      container.classList.remove('opacity-100', 'pointer-events-auto');
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    container.addEventListener('click', (e) => {
      if (e.target === container) close();
    });

    if (copyBtn && copyIcon) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('https://change.org/rette-blau').then(() => {
          copyIcon.classList.add('hidden');
          copyIcon.classList.remove('block');
          if (checkIcon) {
            checkIcon.classList.remove('hidden');
            checkIcon.classList.add('block');
          }
          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            copyIcon.classList.add('block');
            if (checkIcon) {
              checkIcon.classList.add('hidden');
              checkIcon.classList.remove('block');
            }
          }, 2000);
        });
      });
    }
  }

  // --- ACCORDIONS ---
  function initAccordions() {
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        const answer = parent.querySelector('.faq-answer');
        const chevron = btn.querySelector('svg');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (isOpen) {
          answer.classList.add('hidden');
          answer.classList.remove('block');
          if (chevron) chevron.classList.remove('rotate-180', 'text-blue-500');
        } else {
          answer.classList.remove('hidden');
          answer.classList.add('block');
          if (chevron) chevron.classList.add('rotate-180', 'text-blue-500');
        }
      });
    });

    const objButtons = document.querySelectorAll('.objection-button');
    objButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        const answer = parent.querySelector('.objection-answer');
        const chevron = btn.querySelector('svg');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        if (isOpen) {
          answer.classList.add('hidden');
          answer.classList.remove('block');
          if (chevron) chevron.classList.remove('rotate-180', 'text-amber-400');
        } else {
          answer.classList.remove('hidden');
          answer.classList.add('block');
          if (chevron) chevron.classList.add('rotate-180', 'text-amber-400');
        }
      });
    });
  }

  // --- HERO SLIDER / CAROUSEL ---
  function initHeroSlider() {
    const header = document.querySelector('.hero-fullscreen');
    if (!header) return;

    const slides = header.querySelectorAll('.hero-slide-campaign, .hero-news-slide');
    const dots = header.querySelectorAll('[aria-label^="Go to slide"]');
    const prevBtn = header.querySelector('[aria-label="Previous Slide"]');
    const nextBtn = header.querySelector('[aria-label="Next Slide"]');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;
    let touchStart = 0;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.remove('opacity-0', 'pointer-events-none');
          slide.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          slide.classList.add('opacity-0', 'pointer-events-none');
          slide.classList.remove('opacity-100', 'pointer-events-auto');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.className = 'h-2.5 rounded-full transition-all duration-300 cursor-pointer w-7 bg-blue-500 shadow-lg shadow-blue-500/40';
        } else {
          dot.className = 'h-2.5 rounded-full transition-all duration-300 cursor-pointer w-2.5 bg-white/40 hover:bg-white/60';
        }
      });
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 7000);
    }

    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    header.addEventListener('mouseenter', stopAutoplay);
    header.addEventListener('mouseleave', startAutoplay);

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(currentIndex + 1); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(i);
      });
    });

    header.addEventListener('touchstart', (e) => {
      touchStart = e.touches[0].clientX;
    }, { passive: true });

    header.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStart;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          showSlide(currentIndex - 1);
        } else {
          showSlide(currentIndex + 1);
        }
      }
    }, { passive: true });

    startAutoplay();
  }

  // --- MOBILE CAROUSEL ---
  function initMobileCarousel() {
    const section = document.getElementById('risiken');
    if (!section) return;

    const prevBtn = section.querySelector('[aria-label="Vorheriger Punkt"], [aria-label="Previous focus point"]');
    const nextBtn = section.querySelector('[aria-label="Nächster Punkt"], [aria-label="Next focus point"]');
    const dotContainer = section.querySelector('.flex.justify-center.mt-5.mb-1');
    const tabPanels = section.querySelectorAll('[role="tabpanel"]');

    if (!tabPanels.length || !prevBtn || !nextBtn) return;

    let index = 0;
    const dots = dotContainer ? dotContainer.querySelectorAll('button') : [];

    function showMobilePanel(newIdx) {
      index = (newIdx + tabPanels.length) % tabPanels.length;
      tabPanels.forEach((panel, i) => {
        if (i === index) {
          panel.classList.remove('hidden');
          panel.classList.add('block');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('block');
        }
      });

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.className = 'h-2 w-5 rounded-full transition-all duration-300 bg-blue-500 shadow-sm shadow-blue-500/50';
        } else {
          dot.className = 'h-2 w-2 rounded-full transition-all duration-300 bg-[var(--border)] hover:bg-[var(--text-muted)]';
        }
      });

      const tabButtons = section.querySelectorAll('[role="tab"]');
      tabButtons.forEach((tab, i) => {
        if (i === index) {
          tab.className = 'flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all duration-300 font-extrabold cursor-pointer border-blue-500/30 text-blue-400 bg-blue-600/10 shadow-sm';
        } else {
          tab.className = 'flex items-center gap-3 w-full p-4 rounded-xl border text-left transition-all duration-300 font-extrabold cursor-pointer border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]';
        }
      });
    }

    prevBtn.addEventListener('click', () => showMobilePanel(index - 1));
    nextBtn.addEventListener('click', () => showMobilePanel(index + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showMobilePanel(i));
    });

    let touchStart = 0;
    const swipeContainer = section.querySelector('.lg\\:col-span-8');
    if (swipeContainer) {
      swipeContainer.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
      }, { passive: true });

      swipeContainer.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            showMobilePanel(index - 1);
          } else {
            showMobilePanel(index + 1);
          }
        }
      }, { passive: true });
    }

    const tabButtons = section.querySelectorAll('[role="tab"]');
    tabButtons.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        showMobilePanel(i);
      });
    });
  }

  // --- SANDBOX ---
  function initSandbox() {
    const map = document.getElementById('map-svg');
    const select = document.getElementById('germany-state-select');
    if (!map && !select) return;

    const defaultBtn = document.querySelector('[aria-label="Standard-Modus"]');
    const brownBtn = document.querySelector('[aria-label="Mehrheits-Modus"]');
    const dreamBtn = document.querySelector('[aria-label="Traum-Vision"]');
    const comparisonToggle = document.querySelector('[aria-label="Mehrheit umschalten"], [aria-label="Toggle majority chart"]');

    if (defaultBtn) {
      defaultBtn.addEventListener('click', () => selectSandboxState('default'));
    }
    if (brownBtn) {
      brownBtn.addEventListener('click', () => selectSandboxState('brown'));
    }
    if (dreamBtn) {
      dreamBtn.addEventListener('click', () => selectSandboxState('dream'));
    }
    if (comparisonToggle) {
      comparisonToggle.addEventListener('click', () => {
        showComparison = !showComparison;
        updateChartDisplay();
      });
    }

    const cycleBtn = document.querySelector('[aria-label="Visualisierungs-Option wechseln"], [aria-label="Switch visualization mode"]');
    if (cycleBtn) {
      cycleBtn.addEventListener('click', () => {
        if (sandboxState === 'default') {
          selectSandboxState('brown');
        } else if (sandboxState === 'brown') {
          selectSandboxState('dream');
        } else {
          selectSandboxState('default');
        }
      });
    }

    document.addEventListener('click', (e) => {
      const barVisual = e.target.closest('.bar-visual');
      if (barVisual) {
        const col = barVisual.closest('.bar-column');
        if (col && col.getAttribute('data-is-afd') === 'true') {
          if (sandboxState === 'default') {
            selectSandboxState('brown');
          } else if (sandboxState === 'brown') {
            selectSandboxState('dream');
          } else {
            selectSandboxState('default');
          }
        }
      }
    });

    if (select) {
      select.addEventListener('change', (e) => {
        const newVal = e.target.value;
        if (newVal === selectedStateId) {
          selectedStateId = '0';
          select.value = '0';
        } else {
          selectedStateId = newVal;
        }
        updateActiveState();
      });
    }

    if (map) {
      map.addEventListener('click', (e) => {
        const path = e.target.closest('.map-state-path');
        if (path) {
          const id = path.getAttribute('data-state-id');
          if (id) {
            if (selectedStateId === id) {
              selectedStateId = '0';
            } else {
              selectedStateId = id;
            }
            if (select) select.value = selectedStateId;
            updateActiveState();
          }
        }
      });
    }
  }

  function selectSandboxState(mode) {
    sandboxState = mode;
    
    const defaultBtn = document.querySelector('[aria-label="Standard-Modus"]');
    const brownBtn = document.querySelector('[aria-label="Mehrheits-Modus"]');
    const dreamBtn = document.querySelector('[aria-label="Traum-Vision"]');

    if (defaultBtn) {
      defaultBtn.className = `py-2.5 px-1.5 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
        mode === 'default'
          ? 'bg-blue-600/15 border border-blue-500/30 text-blue-400 font-extrabold shadow-sm'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
      }`;
    }
    if (brownBtn) {
      brownBtn.className = `py-2.5 px-1.5 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
        mode === 'brown'
          ? 'bg-amber-600/15 border border-amber-500/30 text-amber-400 font-extrabold shadow-sm'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
      }`;
    }
    if (dreamBtn) {
      dreamBtn.className = `py-2.5 px-1.5 flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
        mode === 'dream'
          ? 'bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 font-extrabold shadow-sm'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
      }`;
    }

    const statusLabel = document.querySelector('button[aria-label="Visualisierungs-Option wechseln"] span');
    if (statusLabel) {
      statusLabel.textContent = mode === 'default'
        ? (currentLang === 'de' ? 'Standard' : 'Default')
        : mode === 'brown'
        ? (currentLang === 'de' ? 'Warnung' : 'Warning')
        : (currentLang === 'de' ? 'Traum' : 'Dream');
    }

    const dreamBanner = document.getElementById('dream-banner');
    if (dreamBanner) {
      if (mode === 'dream') {
        dreamBanner.classList.remove('hidden');
        dreamBanner.classList.add('block');
      } else {
        dreamBanner.classList.add('hidden');
        dreamBanner.classList.remove('block');
      }
    }

    updateActiveState();
  }

  function updateActiveState() {
    if (!pollingSnapshot) return;
    const snap = pollingSnapshot[selectedStateId] || pollingSnapshot['0'];
    if (!snap) return;

    const afdBar = snap.bars.find(b => b.isAfd);
    const origAfdPct = afdBar ? afdBar.pct : 0;
    const afdPct = (sandboxState === 'dream') ? 0 : origAfdPct;

    const paths = document.querySelectorAll('.map-state-path');
    paths.forEach(path => {
      const id = path.getAttribute('data-state-id');
      const isActive = selectedStateId === id;
      const stateSnap = pollingSnapshot[id];
      const stateAfd = stateSnap ? stateSnap.bars.find(b => b.isAfd) : null;
      const stateAfdPct = stateAfd ? stateAfd.pct : 0;
      
      const displayPct = (sandboxState === 'dream') ? 0 : stateAfdPct;
      path.setAttribute('fill', getChoroplethColor(id, isActive, displayPct));
      
      const activeStroke = sandboxState === 'brown' && isStateAfdMajority(id)
        ? '#f59e0b'
        : sandboxState === 'dream'
        ? '#34d399'
        : '#737373';
      
      path.setAttribute('stroke', isActive ? activeStroke : 'var(--border)');
      path.setAttribute('stroke-width', isActive ? '2.5' : '1');
    });

    const barsContainer = document.getElementById('normal-bars-container');
    if (barsContainer) {
      const barColumns = barsContainer.querySelectorAll('.bar-column');
      const maxPct = Math.max(...snap.bars.map(b => b.key === 'afd' ? afdPct : b.pct), 10);

      barColumns.forEach((col) => {
        const key = col.getAttribute('data-key');
        const isAfd = col.getAttribute('data-is-afd') === 'true';
        const defaultColor = col.getAttribute('data-default-color');
        
        let pct = snap.bars.find(b => b.key === key)?.pct || 0;
        if (key === 'afd') pct = afdPct;

        const heightPct = (pct / maxPct) * 85;
        const pctLabel = col.querySelector('.bar-pct');
        const visual = col.querySelector('.bar-visual');
        const labelEl = col.querySelector('.bar-label');

        if (pctLabel) pctLabel.textContent = `${pct.toFixed(1)} %`;
        if (visual) {
          visual.style.height = `${heightPct}%`;
          if (isAfd) {
            if (sandboxState === 'brown') {
              visual.className = 'bar-visual relative w-full rounded-t-md overflow-hidden transition-all duration-700 bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40 cursor-pointer hover:opacity-90';
            } else {
              visual.className = `bar-visual relative w-full rounded-t-md overflow-hidden transition-all duration-700 ${defaultColor} cursor-pointer hover:opacity-90`;
            }
            const labelVal = sandboxState === 'default'
              ? t('demoSwitch')
              : sandboxState === 'brown'
              ? t('demoDreamSwitch')
              : t('demoReset');
            visual.setAttribute('aria-label', labelVal);
          }
          
          const cduOverlay = visual.querySelector('.cdu-brown-overlay');
          const cduBorder = visual.querySelector('.cdu-brown-border');
          if (cduOverlay && cduBorder) {
            if (key === 'cdu' && sandboxState === 'dream') {
              cduOverlay.style.opacity = '0.85';
              cduBorder.style.opacity = '0.85';
            } else {
              cduOverlay.style.opacity = '0';
              cduBorder.style.opacity = '0';
            }
          }
        }

        if (labelEl && isAfd) {
          labelEl.className = `bar-label mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs text-center ${
            sandboxState === 'brown' ? 'font-black text-amber-500' : 'font-black text-cyan-400'
          }`;
        }
      });
    }

    const othersCombined = snap.bars.filter(b => b.key !== 'afd').reduce((sum, b) => sum + b.pct, 0);
    const comparisonMax = Math.max(origAfdPct, othersCombined, 10);

    const compBarAfd = document.getElementById('comparison-bar-afd');
    const compBarOthers = document.getElementById('comparison-bar-others');

    if (compBarAfd && compBarOthers) {
      const afdPctLabel = compBarAfd.querySelector('.comparison-pct');
      const afdVisual = compBarAfd.querySelector('.comparison-visual');
      const afdLabel = compBarAfd.querySelector('.comparison-label');
      const displayAfd = (sandboxState === 'dream') ? 0 : origAfdPct;

      if (afdPctLabel) afdPctLabel.textContent = `${displayAfd.toFixed(1)} %`;
      if (afdVisual) {
        afdVisual.style.height = `${(displayAfd / comparisonMax) * 85}%`;
        if (sandboxState === 'brown') {
          afdVisual.className = 'comparison-visual w-16 rounded-t-md transition-all duration-700 bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40';
        } else {
          afdVisual.className = 'comparison-visual w-16 rounded-t-md transition-all duration-700 bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20';
        }
      }
      if (afdLabel) {
        afdLabel.className = `comparison-label mt-2 text-[10px] font-black tracking-wide md:text-xs ${
          sandboxState === 'brown' ? 'text-amber-500' : 'text-cyan-400'
        }`;
      }

      const othersPctLabel = compBarOthers.querySelector('.comparison-pct');
      const othersVisual = compBarOthers.querySelector('.comparison-visual');
      if (othersPctLabel) othersPctLabel.textContent = `${othersCombined.toFixed(1)} %`;
      if (othersVisual) othersVisual.style.height = `${(othersCombined / comparisonMax) * 85}%`;
    }

    const sourceText = document.querySelector('section:has(#map-svg) .mb-6.mt-2 div span:nth-child(2)');
    if (sourceText) {
      const stateName = currentLang === 'de' ? snap.nameDe : snap.nameEn;
      sourceText.textContent = `${t('demoSourceApi')}${stateName ? ` (${stateName})` : ''} · ${t('demoSourceInstitute')}: ${snap.instituteName}`;
    }

    const standDateText = document.querySelector('section:has(#map-svg) .mb-6.mt-2 div:nth-child(2) span');
    if (standDateText && snap.apiUpdatedAt) {
      const date = new Date(snap.apiUpdatedAt);
      standDateText.textContent = date.toLocaleString(currentLang === 'de' ? 'de-DE' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }

    const ratioMessage = document.getElementById('comparison-ratio-message');
    if (ratioMessage) {
      const ratioVal = (othersCombined / Math.max(afdPct, 0.1)).toFixed(1);
      const valEl = ratioMessage.querySelector('.text-emerald-300');
      if (valEl) {
        const rawRatioText = t('comparisonRatio');
        valEl.textContent = rawRatioText.replace('×', ratioVal + '×');
      }
    }
  }

  function updateChartDisplay() {
    const btn = document.querySelector('[aria-label="Mehrheit umschalten"], [aria-label="Toggle majority chart"]');
    if (btn) {
      btn.className = `py-2.5 px-4 flex items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
        showComparison
          ? 'bg-purple-600/20 border-purple-500/40 text-purple-400 hover:bg-purple-600/30 shadow-inner'
          : 'bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      }`;
    }

    const normal = document.getElementById('normal-bars-container');
    const comp = document.getElementById('comparison-bars-container');
    const msg = document.getElementById('comparison-ratio-message');

    if (showComparison) {
      if (normal) { normal.classList.add('hidden', 'opacity-0'); normal.classList.remove('flex', 'opacity-100'); }
      if (comp) { comp.classList.remove('hidden', 'opacity-0'); comp.classList.add('flex', 'opacity-100'); }
      if (msg) { msg.classList.remove('hidden'); msg.classList.add('block'); }
    } else {
      if (normal) { normal.classList.remove('hidden', 'opacity-0'); normal.classList.add('flex', 'opacity-100'); }
      if (comp) { comp.classList.add('hidden', 'opacity-0'); comp.classList.remove('flex', 'opacity-100'); }
      if (msg) { msg.classList.add('hidden'); msg.classList.remove('block'); }
    }

    updateActiveState();
  }

  function getChoroplethColor(id, isActive, pct) {
    if (id === '0') return 'none';
    if (pct === 0) {
      return isActive ? 'rgba(52, 211, 153, 0.25)' : 'rgba(52, 211, 153, 0.12)';
    }

    if (sandboxState === 'brown') {
      const isMajority = isStateAfdMajority(id);
      if (isMajority) {
        return isActive ? 'rgba(120, 53, 4, 0.75)' : 'rgba(120, 53, 4, 0.55)';
      }
    }

    if (pct > 30) return isActive ? 'rgba(6, 182, 212, 0.55)' : 'rgba(6, 182, 212, 0.35)';
    if (pct > 20) return isActive ? 'rgba(6, 182, 212, 0.45)' : 'rgba(6, 182, 212, 0.25)';
    return isActive ? 'rgba(6, 182, 212, 0.35)' : 'rgba(6, 182, 212, 0.15)';
  }

  function isStateAfdMajority(id) {
    if (!pollingSnapshot) return false;
    const state = pollingSnapshot[id];
    if (!state) return false;
    let strongest = { key: '', pct: 0 };
    state.bars.forEach(bar => {
      if (bar.pct > strongest.pct) {
        strongest = { key: bar.key, pct: bar.pct };
      }
    });
    return strongest.key === 'afd';
  }

  function fetchDynamicData() {
    fetch('/polling-snapshot.json')
      .then(res => res.json())
      .then(data => {
        pollingSnapshot = data;
        
        const selectEl = document.getElementById('germany-state-select');
        if (selectEl) {
          selectEl.innerHTML = '';
          Object.entries(pollingSnapshot).forEach(([id, snap]) => {
            const afd = snap.bars.find(b => b.isAfd);
            const pct = afd ? afd.pct : 0;
            const opt = document.createElement('option');
            opt.value = id;
            opt.className = 'bg-[var(--bg-card)] text-[var(--text-primary)]';
            
            const flag = id === '0' ? '🇩🇪' : '📍';
            const name = currentLang === 'de' ? snap.nameDe : snap.nameEn;
            
            opt.textContent = `${flag} ${name} — ${pct.toFixed(1)}%`;
            if (id === selectedStateId) opt.selected = true;
            selectEl.appendChild(opt);
          });
        }

        updateActiveState();
      })
      .catch(err => console.error('Failed to load live Sunday poll snapshot:', err));

    fetch('/signature-count.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          const count = data.count;
          const formatted = count.toLocaleString(currentLang === 'de' ? 'de-DE' : 'en-US');
          
          const elements = document.querySelectorAll('.hero-slide-campaign strong, aside .text-3xl');
          elements.forEach(el => {
            el.textContent = formatted;
          });

          const badges = document.querySelectorAll('.hero-slide-campaign .bg-blue-500\\/15 span:nth-child(2), aside .text-xs.text-neutral-500');
          badges.forEach(b => {
            if (b.textContent.includes('Stand') || b.textContent.includes('snapshot') || b.textContent.includes('Zähler')) {
              b.textContent = currentLang === 'de' ? 'Live-Zähler' : 'Live Counter';
            }
          });
        }
      })
      .catch(err => console.error('Failed to load live signature count:', err));
  }
})();
