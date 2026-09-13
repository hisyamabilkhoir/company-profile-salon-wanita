/**
 * LUMIÈRE BEAUTY STUDIO - MAIN JAVASCRIPT
 * Senior Frontend Developer Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initStatsCounter();
  initPriceListTabs();
  initBeforeAfterSliders();
  initTransformationsControls();
  initHeroSlider();
  initBookingModal();
  initSearchModal();
  initLightbox();
  initBackToTop();
  initTeamCarousel();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & STICKY BEHAVIOR
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE DRAWER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .nav-link');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openMenu() {
    if (hamburger) hamburger.classList.add('active');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (drawer && drawer.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && drawer && overlay) {
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    const drawerBookingBtn = drawer.querySelector('.open-booking-modal');
    if (drawerBookingBtn) {
      drawerBookingBtn.addEventListener('click', () => {
        closeMenu();
      });
    }
  }
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    reveals.forEach((el) => el.classList.add('active'));
  }
}

/* --------------------------------------------------------------------------
   4. ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-grid');
  if (!statsSection) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      const counters = document.querySelectorAll('.stat-num');
      
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const duration = 2000;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            counter.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target)) + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = (isDecimal ? count.toFixed(1) : Math.floor(count)) + suffix;
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. PRICE LIST TABS & DYNAMIC CONTENT
   -------------------------------------------------------------------------- */
const priceData = {
  hair: {
    items: [
      { name: 'Hair Cut (Women)', desc: 'Precision cut & styling for your best look', price: 'Rp 150.000' },
      { name: 'Hair Coloring & Balayage', badge: 'MOST LOVED', desc: 'Customized color, balayage & professional finish', price: 'Rp 450.000' },
      { name: 'Keratin Hair Treatment', desc: 'Smoother, shinier, healthier hair', price: 'Rp 250.000' },
      { name: 'Blow Out & Hair Styling', desc: 'Perfect styling for any occasion', price: 'Rp 200.000' },
      { name: 'Detox Scalp Spa Treatment', desc: 'Refresh your scalp, healthier hair', price: 'Rp 200.000' },
      { name: 'Korean Wave Perm', desc: 'Natural and long-lasting waves', price: 'Rp 550.000' }
    ],
    image: './assets/images/service-hair-care.webp',
    alt: 'Lumière Hair Styling Detail',
    quote1: 'Healthy Hair',
    quote2: 'Happier You'
  },
  skin: {
    items: [
      { name: 'Deep Cleansing Facial', desc: 'Pore detox, blackhead extraction & calming mask', price: 'Rp 200.000' },
      { name: 'Lumière Glow Brightening', badge: 'MOST LOVED', desc: 'Triple serum infusion & vitamin C brightening boost', price: 'Rp 350.000' },
      { name: 'Acne Defense Therapy', desc: 'High-frequency & salicylic target treatment', price: 'Rp 280.000' },
      { name: 'Anti-Aging Collagen Boost', desc: 'Firming peptide massage & peptide collagen lift', price: 'Rp 400.000' },
      { name: 'Hydra Dermabrasion Glow', desc: 'Deep hydration vacuum exfoliation & cooling wand', price: 'Rp 320.000' },
      { name: 'LED Light Therapy Mask', desc: 'Photodynamic rejuvenation for smooth texture', price: 'Rp 180.000' }
    ],
    image: './assets/images/service-skin-care.webp',
    alt: 'Lumière Facial Care Detail',
    quote1: 'Glowing Skin',
    quote2: 'Confident You'
  },
  nails: {
    items: [
      { name: 'Classic Manicure Care', desc: 'Nail shaping, cuticle treatment & soft buffing', price: 'Rp 150.000' },
      { name: 'Custom Korean Nail Art', badge: 'MOST LOVED', desc: 'Trendy 3D charms, subtle gradients & chrome finish', price: 'Rp 300.000' },
      { name: 'Gel Polish & French Tip', desc: 'High gloss long-lasting gel with chip protection', price: 'Rp 250.000' },
      { name: 'Spa Pedicure + Foot Reflex', desc: 'Aromatic sea salt soak, scrub & foot massage', price: 'Rp 220.000' },
      { name: 'Nail Extension (Hard Gel)', desc: 'Lightweight, durable structure with natural curve', price: 'Rp 380.000' },
      { name: 'Keratin Nail Repair Care', desc: 'Nourishing oil soak for fragile & damaged nails', price: 'Rp 120.000' }
    ],
    image: './assets/images/service-nail-care.webp',
    alt: 'Lumière Nail Art Detail',
    quote1: 'Little Details',
    quote2: 'Make a Big Difference'
  },
  makeup: {
    items: [
      { name: 'Daily Natural Glow Makeup', desc: 'Fresh dewy look for meetings, dates & casual events', price: 'Rp 150.000' },
      { name: 'Party & Event Glam Makeup', badge: 'MOST LOVED', desc: 'Full contour, soft glam eyes & long-wear setting', price: 'Rp 350.000' },
      { name: 'Graduation / Prom Look', desc: 'Camera-ready flawless base with custom lash pair', price: 'Rp 300.000' },
      { name: 'Photoshoot Editorial Makeup', desc: 'High-definition styling tailored to studio lighting', price: 'Rp 500.000' },
      { name: 'Bridal Holy Matrimony & Party', desc: 'Premium luxury makeup, touch-up kit & veil setting', price: 'Rp 1.200.000' },
      { name: 'Personal 1-on-1 Makeup Class', desc: 'Learn tailored everyday & evening techniques', price: 'Rp 450.000' }
    ],
    image: './assets/images/service-make-up.webp',
    alt: 'Lumière Makeup Detail',
    quote1: 'More Than Makeup',
    quote2: "It's Confidence"
  },
  removal: {
    items: [
      { name: 'Underarm Gentle Waxing', desc: 'Organic honey wax, soothing chamomile serum', price: 'Rp 120.000' },
      { name: 'Underarm IPL Laser Hair Removal', badge: 'MOST LOVED', desc: 'Painless ice-cool pulse for permanent hair reduction', price: 'Rp 300.000' },
      { name: 'Full Legs Organic Waxing', desc: 'Silky smooth finish with anti-ingrown treatment', price: 'Rp 280.000' },
      { name: 'Full Legs Laser Hair Removal', desc: 'Fast glide cooling laser for soft, clear legs', price: 'Rp 650.000' },
      { name: 'Eyebrow Shaping & Threading', desc: 'Precise symmetry mapped to your facial structure', price: 'Rp 95.000' },
      { name: 'Intimate Brazilian Waxing', desc: 'Hygienic premium hard wax with calming compress', price: 'Rp 350.000' }
    ],
    image: './assets/images/service-hair-removal.webp',
    alt: 'Lumière Hair Removal Detail',
    quote1: 'Smooth Skin',
    quote2: 'Greater Confidence'
  }
};

function initPriceListTabs() {
  const tabs = document.querySelectorAll('.price-tab-btn');
  const itemsContainer = document.querySelector('.pricelist-items');
  const sideCardImg = document.querySelector('.pricelist-side-card img');
  const sideCardQuote = document.querySelector('.side-card-quote');

  if (!tabs.length || !itemsContainer) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // On mobile, gently scroll clicked tab into center of tablist
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      const category = tab.getAttribute('data-category');
      const data = priceData[category];

      if (data) {
        // Smooth transition animation
        itemsContainer.classList.remove('price-content-fade');
        void itemsContainer.offsetWidth; // Trigger reflow

        let html = '';
        data.items.forEach((item) => {
          const badgeHtml = item.badge ? `<span class="price-badge-pill">${item.badge}</span>` : '';
          const descHtml = item.desc ? `<span class="price-item-desc">${item.desc}</span>` : '';
          html += `
            <div class="price-row">
              <div class="price-item-info">
                <div class="price-item-title-wrap">
                  <span class="price-item-name">${item.name}</span>
                  ${badgeHtml}
                </div>
                ${descHtml}
              </div>
              <div class="price-item-action">
                <span class="price-item-cost">${item.price}</span>
                <button class="price-row-btn open-booking-modal" data-service="${item.name}" aria-label="Book ${item.name}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          `;
        });

        itemsContainer.innerHTML = html;
        itemsContainer.classList.add('price-content-fade');

        if (sideCardImg) {
          sideCardImg.style.opacity = '0.3';
          sideCardImg.onerror = function () {
            this.src = 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop';
          };
          setTimeout(() => {
            sideCardImg.src = data.image;
            sideCardImg.alt = data.alt || 'Lumière Service Detail';
            sideCardImg.style.opacity = '1';
          }, 150);
        }

        if (sideCardQuote && data.quote1 && data.quote2) {
          sideCardQuote.innerHTML = `<em>${data.quote1}</em><em>${data.quote2}</em>`;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE BEFORE / AFTER SLIDER (DESKTOP & TOUCH)
   -------------------------------------------------------------------------- */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.ba-container');

  containers.forEach((container) => {
    let isDragging = false;
    const badgeBefore = container.querySelector('.badge-before');
    const badgeAfter = container.querySelector('.badge-after');

    function applyPercentage(percentage) {
      if (percentage < 4) percentage = 4;
      if (percentage > 96) percentage = 96;

      container.style.setProperty('--split', `${percentage}%`);

      // Dynamic label visibility:
      // When slider moves right (> 50%), viewing Before -> After label disappears, Before label stays
      // When slider moves left (< 50%), viewing After -> Before label disappears, After label stays
      // At exactly 50% (initial), both are visible
      if (percentage > 50) {
        container.classList.add('hide-after');
        container.classList.remove('hide-before');
      } else if (percentage < 50) {
        container.classList.add('hide-before');
        container.classList.remove('hide-after');
      } else {
        container.classList.remove('hide-after');
        container.classList.remove('hide-before');
      }
    }

    function updateSlider(xPos) {
      const rect = container.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      let percentage = (offsetX / rect.width) * 100;
      applyPercentage(percentage);
    }

    // Initialize 50% state
    applyPercentage(50);

    // Clicking "Before" badge smoothly opens full Before view
    if (badgeBefore) {
      badgeBefore.addEventListener('click', (e) => {
        e.stopPropagation();
        applyPercentage(94);
      });
      badgeBefore.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        applyPercentage(94);
      }, { passive: true });
    }

    // Clicking "After" badge smoothly opens full After view
    if (badgeAfter) {
      badgeAfter.addEventListener('click', (e) => {
        e.stopPropagation();
        applyPercentage(6);
      });
      badgeAfter.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        applyPercentage(6);
      }, { passive: true });
    }

    // Prevent browser native image dragging
    container.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    function onPointerDown(e) {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    }

    function onPointerUp() {
      isDragging = false;
    }

    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('click', (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    });

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  });
}

/* --------------------------------------------------------------------------
   6B. TRANSFORMATIONS NAVIGATION & DOTS
   -------------------------------------------------------------------------- */
function initTransformationsControls() {
  const prevBtn = document.querySelector('.trans-btn-prev');
  const nextBtn = document.querySelector('.trans-btn-next');
  const dots = document.querySelectorAll('.trans-dots .dot');
  const cards = document.querySelectorAll('.transformation-card');

  if (!cards.length) return;

  let activeIndex = 0;

  function setActive(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    activeIndex = index;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });

    if (cards[activeIndex]) {
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setActive(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setActive(activeIndex + 1);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setActive(i);
    });
  });
}

/* --------------------------------------------------------------------------
   7. HERO SLIDER CONTROLS
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const heroBg = document.querySelector('#hero-bg');
  const prevBtn = document.querySelector('.hero-btn-prev');
  const nextBtn = document.querySelector('.hero-btn-next');
  const pageItems = document.querySelectorAll('.hero-slider-pagination .page-item');

  if (!heroBg || !prevBtn || !nextBtn) return;

  const heroSlides = [
    {
      url: './assets/images/bg-1.webp',
      title: 'Beauty Looks Better Here'
    },
    {
      url: './assets/images/bg-2.webp',
      title: 'A Calm Space, A Brighter You'
    },
    {
      url: './assets/images/bg-3.webp',
      title: 'Refined Care for Your Hair & Skin'
    }
  ];

  let currentSlide = 0;

  function setSlide(index) {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroBg.style.opacity = '0.35';
    heroBg.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
      heroBg.style.backgroundImage = `url('${heroSlides[currentSlide].url}')`;
      heroBg.style.opacity = '1';
      heroBg.style.transform = 'scale(1)';
    }, 250);

    pageItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => setSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => setSlide(currentSlide + 1));

  pageItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      setSlide(idx);
    });
  });
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE APPOINTMENT BOOKING MODAL & WHATSAPP GENERATOR
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.querySelector('.modal-overlay');
  const openButtons = document.querySelectorAll('.open-booking-modal, .book-btn');
  const closeBtn = document.querySelector('.modal-close-btn');
  const bookingForm = document.querySelector('#appointment-form');

  if (!modal) return;

  function openModal(defaultService = '', defaultSpecialist = '') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (defaultService) {
      const serviceSelect = document.querySelector('#modal-service');
      if (serviceSelect) {
        serviceSelect.value = defaultService;
      }
    }

    if (defaultSpecialist) {
      const specialistSelect = document.querySelector('#modal-specialist');
      if (specialistSelect) {
        for (let opt of specialistSelect.options) {
          if (opt.value.toLowerCase().includes(defaultSpecialist.toLowerCase())) {
            specialistSelect.value = opt.value;
            break;
          }
        }
      }
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-booking-modal, .book-btn');
    if (btn) {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || '';
      const specialistName = btn.getAttribute('data-specialist') || '';
      openModal(serviceName, specialistName);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Booking Form Submit to WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.querySelector('#book-name').value.trim();
      const phone = document.querySelector('#book-phone').value.trim();
      const service = document.querySelector('#modal-service').value;
      const specialist = document.querySelector('#modal-specialist').value;
      const date = document.querySelector('#book-date').value;
      const time = document.querySelector('#book-time').value;
      const notes = document.querySelector('#book-notes').value.trim();

      const waPhone = '6285973729267';
      const message = `Halo Lumière Beauty Studio! ✨%0A%0ASaya ingin reservasi appointment:%0A- *Nama:* ${encodeURIComponent(name)}%0A- *No. WhatsApp:* ${encodeURIComponent(phone)}%0A- *Layanan:* ${encodeURIComponent(service)}%0A- *Spesialis:* ${encodeURIComponent(specialist)}%0A- *Tanggal:* ${encodeURIComponent(date)}%0A- *Jam:* ${encodeURIComponent(time)}%0A${notes ? `- *Catatan:* ${encodeURIComponent(notes)}%0A` : ''}%0AMohon konfirmasi ketersediaan jadwal. Terima kasih! 🙏`;

      window.open(`https://wa.me/${waPhone}?text=${message}`, '_blank');
      closeModal();
      bookingForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   9. SEARCH OVERLAY & LIVE SERVICE FILTER
   -------------------------------------------------------------------------- */
function initSearchModal() {
  const searchBtn = document.querySelector('.search-btn');
  const searchModal = document.querySelector('.search-modal');
  const searchInput = document.querySelector('#search-input');
  const resultsContainer = document.querySelector('.search-results-list');

  if (!searchBtn || !searchModal || !searchInput) return;

  const servicesList = [
    { title: 'Hair Cut (Women)', category: 'Hair Care', price: 'Rp 150.000' },
    { title: 'Hair Coloring & Balayage', category: 'Hair Care', price: 'Rp 450.000' },
    { title: 'Keratin Hair Treatment', category: 'Hair Care', price: 'Rp 250.000' },
    { title: 'Detox Scalp Spa', category: 'Hair Care', price: 'Rp 200.000' },
    { title: 'Deep Cleansing Facial', category: 'Skin Care', price: 'Rp 200.000' },
    { title: 'Acne Defense Therapy', category: 'Skin Care', price: 'Rp 280.000' },
    { title: 'Lumière Glow Brightening', category: 'Skin Care', price: 'Rp 350.000' },
    { title: 'Classic Manicure & Pedicure', category: 'Nail Care', price: 'Rp 150.000' },
    { title: 'Custom Korean Nail Art', category: 'Nail Care', price: 'Rp 300.000' },
    { title: 'Daily Natural Glow Makeup', category: 'Make Up', price: 'Rp 150.000' },
    { title: 'Party & Bridal Makeup', category: 'Make Up', price: 'Rp 350.000' },
    { title: 'Underarm IPL Laser Hair Removal', category: 'Hair Removal', price: 'Rp 300.000' },
    { title: 'Full Legs Organic Waxing', category: 'Hair Removal', price: 'Rp 280.000' }
  ];

  function openSearch() {
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    renderResults(servicesList);
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
  }

  function renderResults(list) {
    if (!list.length) {
      resultsContainer.innerHTML = `<p style="padding:12px; color:var(--color-text-muted); font-size:0.9rem;">Layanan tidak ditemukan. Coba kata kunci lain...</p>`;
      return;
    }

    resultsContainer.innerHTML = list.map(item => `
      <div class="search-result-item">
        <div>
          <strong style="font-size:0.95rem; color:var(--color-text-main); display:block;">${item.title}</strong>
          <span style="font-size:0.75rem; color:var(--color-text-muted);">${item.category}</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-weight:700; font-size:0.9rem; color:var(--color-primary);">${item.price}</span>
          <button class="btn btn-primary open-booking-modal" data-service="${item.title}" style="padding:6px 14px; font-size:0.75rem;">Book</button>
        </div>
      </div>
    `).join('');

    // Re-attach booking open listeners
    resultsContainer.querySelectorAll('.open-booking-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        closeSearch();
        const service = btn.getAttribute('data-service');
        const modal = document.querySelector('.modal-overlay');
        const serviceSelect = document.querySelector('#modal-service');
        if (modal) modal.classList.add('active');
        if (serviceSelect) serviceSelect.value = service;
      });
    });
  }

  searchBtn.addEventListener('click', openSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = servicesList.filter(s => 
      s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
    renderResults(filtered);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });
}

/* --------------------------------------------------------------------------
   10. GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initLightbox() {
  const spaceItems = document.querySelectorAll('.space-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg) return;

  spaceItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Lumière Beauty Space';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   11. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const topBtn = document.querySelector('.float-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   12. TEAM EXPERTS CAROUSEL CONTROLS
   -------------------------------------------------------------------------- */
function initTeamCarousel() {
  const grid = document.querySelector('.team-grid');
  const prevBtn = document.querySelector('.team-prev-btn');
  const nextBtn = document.querySelector('.team-next-btn');

  if (!grid || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    const cardWidth = grid.querySelector('.team-card')?.offsetWidth || 300;
    grid.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    const cardWidth = grid.querySelector('.team-card')?.offsetWidth || 300;
    grid.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
  });
}
