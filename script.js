/* ==========================================================================
   MEMORY GALLERY — script.js
   Vanilla JS only. Sections: data, loader, particles, nav, reveal,
   masonry render, filters/search, lightbox, likes, counters, theme, misc.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. DATA — swap these image URLs / captions for your own photos.
     Each item needs: img, title, desc, date, category
  --------------------------------------------------------------------- */
  const funnyMoments = [
    { img: 'https://picsum.photos/seed/funny1/500/650', caption: 'The exact moment I regretted that "shortcut" trail.' },
    { img: 'https://picsum.photos/seed/funny2/500/420', caption: 'Nobody told me the dog would win the tug-of-war.' },
    { img: 'https://picsum.photos/seed/funny3/500/580', caption: 'Three takes later, still couldn\'t land the jump.' },
    { img: 'https://picsum.photos/seed/funny4/500/500', caption: 'Ice cream: 1, my shirt: 0.' },
    { img: 'https://picsum.photos/seed/funny5/500/700', caption: 'This is why we don\'t let him hold the camera.' },
    { img: 'https://picsum.photos/seed/funny6/500/450', caption: 'The face you make when the wifi finally connects.' },
    { img: 'https://picsum.photos/seed/funny7/500/600', caption: 'Pretty sure this seagull stole my fries on purpose.' },
    { img: 'https://picsum.photos/seed/funny8/500/520', caption: 'Group photo, attempt #14.' },
  ];

  const bestMoments = [
    { img: 'https://picsum.photos/seed/travel1/600/750', title: 'Sunrise over Cox\'s Bazar', desc: 'The longest beach walk of my life, and worth every step.', date: 'Mar 2023', category: 'travel' },
    { img: 'https://picsum.photos/seed/friends1/600/750', title: 'Rooftop nights', desc: 'Nothing beats old friends and city lights.', date: 'Jul 2023', category: 'friends' },
    { img: 'https://picsum.photos/seed/family1/600/750', title: 'Eid with everyone home', desc: 'The one day a year the whole family fits at one table.', date: 'Apr 2024', category: 'family' },
    { img: 'https://picsum.photos/seed/events1/600/750', title: 'Graduation day', desc: 'Four years, condensed into one very long walk across a stage.', date: 'Dec 2022', category: 'events' },
    { img: 'https://picsum.photos/seed/travel2/600/750', title: 'Lost in the hills of Bandarban', desc: 'The map said 2 hours. It was not 2 hours.', date: 'Jan 2024', category: 'travel' },
    { img: 'https://picsum.photos/seed/friends2/600/750', title: 'Late night street food run', desc: 'Best decisions are made at 1am, apparently.', date: 'Sep 2023', category: 'friends' },
    { img: 'https://picsum.photos/seed/family2/600/750', title: 'Grandma\'s kitchen', desc: 'Still the best cook in the family, no contest.', date: 'Jun 2024', category: 'family' },
    { img: 'https://picsum.photos/seed/events2/600/750', title: 'The surprise party that wasn\'t a surprise', desc: 'He knew the whole time. He just let us have it.', date: 'Feb 2024', category: 'events' },
    { img: 'https://picsum.photos/seed/travel3/600/750', title: 'Sundarbans by boat', desc: 'Three days, no signal, best trip of the year.', date: 'Nov 2023', category: 'travel' },
    { img: 'https://picsum.photos/seed/friends3/600/750', title: 'The reunion', desc: 'Five years apart, zero minutes of awkward silence.', date: 'May 2024', category: 'friends' },
    { img: 'https://picsum.photos/seed/family3/600/750', title: 'Dad\'s garden', desc: 'He grew more tomatoes than the whole street combined.', date: 'Aug 2023', category: 'family' },
    { img: 'https://picsum.photos/seed/events3/600/750', title: 'New Year, rooftop countdown', desc: 'Cold night, warm company.', date: 'Jan 2024', category: 'events' },
  ];

  /* ---------------------------------------------------------------------
     2. LOADER
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 900);
  });

  /* ---------------------------------------------------------------------
     3. PARTICLES — floating bokeh dots on the hero canvas
  --------------------------------------------------------------------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas(){
    canvas.width = canvas.offsetWidth * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  }

  function initParticles(){
    const count = window.innerWidth < 700 ? 30 : 65;
    particles = Array.from({length: count}, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
      gold: Math.random() > 0.6
    }));
  }

  function animateParticles(){
    ctx.clearRect(0,0,canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      if(p.y < -10){ p.y = canvas.offsetHeight + 10; p.x = Math.random() * canvas.offsetWidth; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.gold ? `rgba(212,175,55,${p.alpha})` : `rgba(245,243,238,${p.alpha*0.6})`;
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  }

  /* ---------------------------------------------------------------------
     4. NAV — scroll state, mobile burger, memory thread progress
  --------------------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const threadFill = document.getElementById('threadFill');

  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navBurger.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  function onScroll(){
    nav.classList.toggle('scrolled', window.scrollY > 40);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    threadFill.style.height = pct + '%';

    document.getElementById('backToTop').classList.toggle('show', scrollTop > 700);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------------------------------------------------------------------
     5. SCROLL REVEAL
  --------------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     6. RENDER — funny masonry + best moments grid
  --------------------------------------------------------------------- */
  const funnyGrid = document.getElementById('funnyGrid');
  funnyMoments.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'funny-card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.caption}" loading="lazy" data-lightbox="funny" data-index="${i}">
      <div class="funny-caption">
        <p>${item.caption}</p>
        <button class="like-btn" aria-label="Like this photo"><i class="fa-solid fa-heart"></i></button>
      </div>`;
    funnyGrid.appendChild(card);
  });

  // stagger the fade-in as cards enter viewport
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if(entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('show'), i * 60);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.funny-card').forEach(c => cardObserver.observe(c));

  // like buttons
  funnyGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.like-btn');
    if(!btn) return;
    btn.classList.toggle('liked');
  });

  // open lightbox from funny grid images
  funnyGrid.addEventListener('click', (e) => {
    const img = e.target.closest('img[data-lightbox]');
    if(!img) return;
    openLightbox('funny', parseInt(img.dataset.index));
  });

  const bestGrid = document.getElementById('bestGrid');
  function renderBest(list){
    bestGrid.innerHTML = '';
    list.forEach((item) => {
      const originalIndex = bestMoments.indexOf(item);
      const card = document.createElement('div');
      card.className = 'best-card';
      card.dataset.category = item.category;
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy" data-lightbox="best" data-index="${originalIndex}">
        <div class="best-card-overlay">
          <span class="best-card-tag">${item.category}</span>
          <h3 class="best-card-title">${item.title}</h3>
          <p class="best-card-desc">${item.desc}</p>
          <span class="best-card-date">${item.date}</span>
        </div>`;
      bestGrid.appendChild(card);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if(entry.isIntersecting){
          setTimeout(() => entry.target.classList.add('show'), i * 50);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.best-card').forEach(c => observer.observe(c));
  }
  renderBest(bestMoments);

  bestGrid.addEventListener('click', (e) => {
    const img = e.target.closest('img[data-lightbox]');
    if(!img) return;
    openLightbox('best', parseInt(img.dataset.index));
  });

  /* ---------------------------------------------------------------------
     7. FILTER + SEARCH (Best Moments)
  --------------------------------------------------------------------- */
  const filterBar = document.getElementById('filterBar');
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');
  let activeFilter = 'all';

  function applyFilters(){
    const q = searchInput.value.trim().toLowerCase();
    const filtered = bestMoments.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
      const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
    renderBest(filtered);
    emptyState.hidden = filtered.length !== 0;
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if(!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });

  let searchDebounce;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(applyFilters, 200);
  });

  /* ---------------------------------------------------------------------
     8. LIGHTBOX
  --------------------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxDate = document.getElementById('lightboxDate');
  let currentSet = [];
  let currentIndex = 0;

  function openLightbox(type, index){
    currentSet = type === 'funny' ? funnyMoments : bestMoments;
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderLightbox(){
    const item = currentSet[currentIndex];
    lightboxImg.src = item.img;
    if(item.title){
      lightboxImg.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxDesc.textContent = item.desc;
      lightboxDate.textContent = item.date || '';
    } else {
      lightboxImg.alt = item.caption;
      lightboxTitle.textContent = 'Funny Moment';
      lightboxDesc.textContent = item.caption;
      lightboxDate.textContent = '';
    }
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });

  document.getElementById('lightboxPrev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    renderLightbox();
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentSet.length;
    renderLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if(e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });

  /* ---------------------------------------------------------------------
     9. STAT COUNTERS
  --------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if(current >= target){ el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------------------------
     10. THEME TOGGLE
  --------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(isLight){
    document.body.classList.toggle('light', isLight);
    themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('light'));
  });

  /* ---------------------------------------------------------------------
     11. BACK TO TOP
  --------------------------------------------------------------------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------------------
     12. SCROLL CUE — jump to first gallery
  --------------------------------------------------------------------- */
  document.getElementById('scrollCue').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

});
