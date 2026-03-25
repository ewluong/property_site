document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Scroll Reveal (IntersectionObserver)
  // ========================================
  var revealEls = document.querySelectorAll('.reveal');
  var i;

  for (i = 0; i < revealEls.length; i++) {
    revealEls[i].classList.add('reveal-ready');
  }

  var revealObs = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (entries[e].isIntersecting) {
        entries[e].target.classList.add('visible');
        revealObs.unobserve(entries[e].target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  for (i = 0; i < revealEls.length; i++) {
    revealObs.observe(revealEls[i]);
  }

  // ========================================
  // Sticky Navbar
  // ========================================
  var navbar = document.getElementById('navbar');
  var lastScrollY = 0;
  var ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(function () {
        navbar.classList.toggle('scrolled', lastScrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ========================================
  // Mobile Menu
  // ========================================
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      menuBtn.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      if (isOpen) navbar.classList.add('scrolled');
      else onScroll();
    });

    var links = mobileMenu.querySelectorAll('a');
    for (i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.querySelector('i').className = 'fas fa-bars';
        onScroll();
      });
    }
  }

  // ========================================
  // Hero Background Zoom
  // ========================================
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    requestAnimationFrame(function () {
      heroBg.classList.add('loaded');
    });
  }

  // ========================================
  // Image Modal with Navigation + Touch Swipe
  // ========================================
  var modal = document.getElementById('image-modal');
  var modalImg = document.getElementById('modal-img');
  var modalCounter = document.getElementById('modal-counter');
  var closeBtn = document.querySelector('.modal .close');
  var prevBtn = document.querySelector('.modal-prev');
  var nextBtn = document.querySelector('.modal-next');
  var galleryItems = document.querySelectorAll('.gallery-item');

  var currentIdx = 0;
  var srcs = [];

  // Collect sources from img children
  for (i = 0; i < galleryItems.length; i++) {
    var img = galleryItems[i].querySelector('img');
    if (img) srcs.push(img.src);
  }

  function show(idx) {
    if (idx < 0) idx = srcs.length - 1;
    if (idx >= srcs.length) idx = 0;
    currentIdx = idx;
    modalImg.src = srcs[currentIdx];
    if (modalCounter) modalCounter.textContent = (currentIdx + 1) + ' / ' + srcs.length;
  }

  function open(idx) {
    modal.style.display = 'flex';
    show(idx);
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Gallery click handlers
  for (i = 0; i < galleryItems.length; i++) {
    (function (idx) {
      galleryItems[idx].addEventListener('click', function () { open(idx); });
    })(i);
  }

  if (closeBtn) closeBtn.addEventListener('click', function (e) { e.stopPropagation(); close(); });

  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(currentIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(currentIdx + 1); });

  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) close(); });

  // Keyboard nav
  document.addEventListener('keydown', function (e) {
    if (modal.style.display !== 'flex') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(currentIdx - 1);
    else if (e.key === 'ArrowRight') show(currentIdx + 1);
  });

  // Touch swipe support for modal
  var touchStartX = 0;
  var touchEndX = 0;
  var SWIPE_THRESHOLD = 50;

  modalImg.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modalImg.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) show(currentIdx + 1); // Swipe left = next
      else show(currentIdx - 1);          // Swipe right = prev
    }
  }, { passive: true });

  // ========================================
  // Smooth Scroll
  // ========================================
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

});
