/* ============================================
   CIRCULA — B2B Environmental Intelligence Platform
   Landing Page JavaScript (Gaya Orion - Interaktivitas Penuh)
   ============================================ */

// ---------- Language System ----------
let currentLang = 'en';

const langTranslations = {
  en: {
    alertResolved: "Adjustment actions applied successfully! Wastewater treatment parameters restored to safe levels.",
    onboardSuccess: "Welcome back Imamul Soifillah S.Kom M.Si! Accessing Circula Dashboard.",
    downloadingPdf: "Downloading ESG Report PDF...",
    downloadPdfSuccess: "ESG_Compliance_Report_Audited.pdf downloaded successfully!"
  },
  id: {
    alertResolved: "Tindakan penyesuaian berhasil diterapkan! Parameter pengolahan air limbah kembali ke batas aman.",
    onboardSuccess: "Selamat datang kembali Imamul Soifillah S.Kom M.Si! Mengakses Dashboard Circula.",
    downloadingPdf: "Mengunduh PDF Laporan ESG...",
    downloadPdfSuccess: "ESG_Compliance_Report_Audited.pdf berhasil diunduh!"
  }
};

const calculatorLabels = {
  wastewater: {
    en: "Weekly Wastewater Output",
    id: "Keluaran Air Limbah Mingguan",
    unit: "m³"
  },
  chemical: {
    en: "Weekly Chemical Residues",
    id: "Keluaran Residu Kimia Mingguan",
    unit: "kg"
  },
  cod: {
    en: "Weekly Organic COD Load",
    id: "Beban Organik COD Mingguan",
    unit: "kg"
  },
  tss: {
    en: "Weekly Suspended Solids (TSS)",
    id: "Zat Padat Terlarut (TSS) Mingguan",
    unit: "kg"
  }
};

function setLanguage(lang) {
  currentLang = lang;

  // Update all elements with data-lang attributes
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) {
      el.innerHTML = text; // supports HTML tags
    }
  });

  // Update desktop toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update mobile toggle buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Save preference
  localStorage.setItem('circula-lang', lang);

  // Recalculate impact display based on new language format
  const slider = document.getElementById('impactSlider');
  if (slider) {
    calculateImpact(slider.value);
  }

  // Update headers time or titles if needed
  updateHeaderTitle();
}

// ---------- Navbar Scroll Effect ----------
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ---------- Mobile Navigation ----------
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileNav() {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileNav() {
  hamburger.classList.remove('active');
  mobileNav.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', toggleMobileNav);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

// Close mobile nav when clicking nav links
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ---------- Scroll Reveal Animations ----------
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = windowHeight - 80;

    if (elementTop < revealPoint) {
      el.classList.add('active');
    }
  });
}

// ---------- Smooth Scroll for Nav Links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ---------- Active Nav Link Highlight ----------
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.opacity = link.getAttribute('href') === `#${sectionId}` ? '1' : '';
        link.style.fontWeight = link.getAttribute('href') === `#${sectionId}` ? '700' : '';
      });
    }
  });
}

// ---------- Parallax on Hero Visual ----------
function parallaxHero() {
  if (window.innerWidth <= 900) return;
  const scrollY = window.scrollY;
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && scrollY < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrollY * 0.06}px)`;
  }
}

// ---------- Smartphone Simulator Logic ----------
let activeMobileState = 'login'; // login, dashboard, risk, report, insight, profile

function initMobileSimulator() {
  const guideItems = document.querySelectorAll('.sim-step-item');
  const navItems = document.querySelectorAll('.phone-nav-item');

  // Checklist Guide clicks on the left
  guideItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetState = item.dataset.targetState;
      setMobileSimulatorState(targetState);
    });
  });

  // Phone Navigation Bar clicks on the phone bottom
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetState = item.dataset.targetState;
      setMobileSimulatorState(targetState);
    });
  });
}

function setMobileSimulatorState(state) {
  activeMobileState = state;

  // 1. Update left Guide checklist items
  document.querySelectorAll('.sim-step-item').forEach(item => {
    item.classList.toggle('active', item.dataset.targetState === state);
  });

  // 2. Update Phone bottom navbar items
  document.querySelectorAll('.phone-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.targetState === state);
  });

  // 3. Update Phone screens visibility
  document.querySelectorAll('.phone-state').forEach(screen => {
    screen.classList.remove('active');
  });
  const targetScreen = document.getElementById(`state-${state}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // 4. Update Header display
  const phoneHeader = document.getElementById('phoneHeader');
  const phoneNavBar = document.getElementById('phoneNavBar');

  if (state === 'login') {
    if (phoneHeader) phoneHeader.style.display = 'none';
    if (phoneNavBar) phoneNavBar.style.display = 'none';
  } else {
    if (phoneHeader) phoneHeader.style.display = 'flex';
    if (phoneNavBar) phoneNavBar.style.display = 'flex';
  }

  updateHeaderTitle();
}

function updateHeaderTitle() {
  const headerTitle = document.getElementById('phoneHeaderTitle');
  const editBtn = document.getElementById('phoneEditBtn');
  if (!headerTitle) return;

  if (editBtn) editBtn.style.display = 'none';

  switch (activeMobileState) {
    case 'dashboard':
      headerTitle.textContent = 'Dashboard';
      break;
    case 'risk':
      headerTitle.textContent = currentLang === 'en' ? 'AI Risk Detection' : 'Deteksi Risiko AI';
      break;
    case 'report':
      headerTitle.textContent = 'ESG Reporting';
      break;
    case 'insight':
      headerTitle.textContent = 'Insight';
      break;
    case 'profile':
      headerTitle.textContent = 'Profile';
      if (editBtn) editBtn.style.display = 'block';
      break;
  }
}

// Phone simulator interactive actions
function handleMobileLogin(e) {
  e.preventDefault();
  
  // Show welcome alert
  alert(langTranslations[currentLang].onboardSuccess);

  // Transition to Dashboard
  setMobileSimulatorState('dashboard');
}

function dismissRiskAlert(btn) {
  const alertCard = document.getElementById('riskAlertCard');
  if (alertCard) {
    alertCard.style.transition = 'all 0.4s ease';
    alertCard.style.opacity = '0.3';
    alertCard.style.transform = 'scale(0.95)';
  }

  // Lower AI Risk Level UI on the top card
  const riskLevelVal = document.getElementById('riskLevelVal');
  const riskLevelBadge = document.getElementById('riskLevelBadge');
  const riskCircle = document.getElementById('riskCircle');
  const riskPercent = document.getElementById('riskPercent');

  if (riskLevelVal) {
    riskLevelVal.textContent = currentLang === 'en' ? 'Low' : 'Rendah';
    riskLevelVal.style.color = '#2E7D32';
  }
  if (riskLevelBadge) {
    riskLevelBadge.textContent = 'Healthy';
    riskLevelBadge.style.background = '#E8F5E9';
    riskLevelBadge.style.color = '#2E7D32';
  }
  if (riskCircle) {
    riskCircle.style.background = 'conic-gradient(#2E7D32 24%, #F1F5F9 0)';
  }
  if (riskPercent) {
    riskPercent.innerHTML = `24<span>/100</span>`;
  }

  // Update button state
  btn.disabled = true;
  btn.textContent = currentLang === 'en' ? "Adjustments Applied" : "Tindakan Diterapkan";
  btn.style.background = "rgba(0, 0, 0, 0.05)";
  btn.style.color = "#94A3B8";

  // Update dashboard values in home tab
  const valPh = document.getElementById('valPh');
  const lblPh = document.getElementById('lblPh');
  if (valPh) valPh.textContent = "7.1";
  if (lblPh) {
    lblPh.textContent = "Normal";
    lblPh.style.background = "#E8F5E9";
    lblPh.style.color = "#2E7D32";
  }

  alert(langTranslations[currentLang].alertResolved);
}

function triggerMobileReportPdf() {
  alert(langTranslations[currentLang].downloadingPdf);
  setTimeout(() => {
    alert(langTranslations[currentLang].downloadPdfSuccess);
  }, 1000);
}

// ---------- Impact Calculator Logic ----------
let currentWasteType = 'wastewater'; // wastewater, chemical, cod, tss

const factorMapping = {
  wastewater: { riverMult: 10, complianceBase: 85, complianceMult: 0.001, recycleMult: 0.4, savingsMult: 12000 },
  chemical: { riverMult: 25, complianceBase: 80, complianceMult: 0.0015, recycleMult: 0.15, savingsMult: 45000 },
  cod: { riverMult: 15, complianceBase: 78, complianceMult: 0.002, recycleMult: 0.3, savingsMult: 22000 },
  tss: { riverMult: 18, complianceBase: 82, complianceMult: 0.0018, recycleMult: 0.25, savingsMult: 18000 }
};

function initImpactCalculator() {
  const wasteButtons = document.querySelectorAll('.waste-btn');
  const slider = document.getElementById('impactSlider');

  wasteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      wasteButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWasteType = btn.dataset.type;
      
      if (slider) {
        calculateImpact(slider.value);
      }
    });
  });

  if (slider) {
    calculateImpact(slider.value);
  }
}

function calculateImpact(weight) {
  const factors = factorMapping[currentWasteType];
  const labelData = calculatorLabels[currentWasteType];
  if (!factors || !labelData) return;

  // Update slider label & unit dynamically
  const sliderValLabel = document.getElementById('sliderValLabel');
  if (sliderValLabel) {
    sliderValLabel.textContent = currentLang === 'id' ? labelData.id : labelData.en;
  }

  const displayVal = document.getElementById('sliderValDisplay');
  if (displayVal) {
    displayVal.textContent = `${Number(weight).toLocaleString(currentLang === 'id' ? 'id-ID' : 'en-US')} ${labelData.unit}`;
  }

  // Calculate new aligned values
  const riverValue = weight * factors.riverMult;
  const complianceValue = Math.min(100, factors.complianceBase + (weight * factors.complianceMult));
  const recycleValue = weight * factors.recycleMult;
  const savingsValue = weight * factors.savingsMult;

  // Update UI Elements
  const co2El = document.getElementById('co2Offset');
  const treesEl = document.getElementById('treesSaved');
  const milesEl = document.getElementById('carMiles');
  const creditsEl = document.getElementById('creditsEarned');

  if (co2El) {
    co2El.textContent = `${riverValue.toLocaleString(currentLang === 'id' ? 'id-ID' : 'en-US', {maximumFractionDigits:0})} m³`;
  }
  if (treesEl) {
    const complianceRounded = Math.round(complianceValue * 10) / 10;
    treesEl.textContent = currentLang === 'en' ? `${complianceRounded}% Compliance` : `${complianceRounded}% Kepatuhan`;
  }
  if (milesEl) {
    milesEl.textContent = `${recycleValue.toLocaleString(currentLang === 'id' ? 'id-ID' : 'en-US', {maximumFractionDigits:0})} m³`;
  }
  if (creditsEl) {
    creditsEl.textContent = `Rp ${savingsValue.toLocaleString(currentLang === 'id' ? 'id-ID' : 'en-US', {maximumFractionDigits:0})}`;
  }
}

// ---------- Touch Interactions for Mobile feedback ----------
function setupTouchInteractions() {
  document.addEventListener('touchstart', function () { }, { passive: true });

  function addFeedback(selector, duration) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => {
      function activate() {
        el.classList.add('touch-active');
      }
      function deactivate() {
        setTimeout(() => {
          el.classList.remove('touch-active');
        }, duration);
      }
      function deactivateNow() {
        el.classList.remove('touch-active');
      }

      el.addEventListener('touchstart', activate, { passive: true });
      el.addEventListener('touchend', deactivate, { passive: true });
      el.addEventListener('touchcancel', deactivateNow, { passive: true });

      el.addEventListener('mousedown', activate);
      el.addEventListener('mouseup', deactivate);
      el.addEventListener('mouseleave', deactivateNow);
    });
  }

  addFeedback('.btn-primary', 400);
  addFeedback('.btn-secondary', 400);
  addFeedback('.sim-step-item', 300);
  addFeedback('.phone-nav-item', 300);
  addFeedback('.waste-btn', 400);
  addFeedback('.demo-btn', 400);
  addFeedback('.back-to-top', 300);
}

// ---------- Window Event Listeners ----------
window.addEventListener('scroll', () => {
  handleNavbarScroll();
  revealOnScroll();
  updateActiveNavLink();
  parallaxHero();
}, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMobileNav();
  }
  // Clear parallax translate on mobile
  if (window.innerWidth <= 900) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) heroVisual.style.transform = '';
  }
});

// ---------- Initialization ----------
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved language
  const savedLang = localStorage.getItem('circula-lang');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    setLanguage('id'); // Default to ID since user is Indonesian
  }

  // Initial scroll reveals
  handleNavbarScroll();
  revealOnScroll();

  // Setup components
  initMobileSimulator();
  initImpactCalculator();
  setupTouchInteractions();

  // Set initial screen to login
  setMobileSimulatorState('login');

  // Clone items in Operator Mobile Carousel for infinite loop
  const track = document.getElementById('previewTrack');
  if (track) {
    const children = Array.from(track.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  // Smooth opacity fade-in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
