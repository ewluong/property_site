document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Scroll Reveal Animations
  // Mark elements as ready for animation, then observe.
  // Without JS, elements remain fully visible (no .reveal-ready class).
  // ========================================
  var revealElements = document.querySelectorAll('.reveal');

  // Mark all elements as animation-ready (sets opacity: 0 via CSS)
  revealElements.forEach(function (el) {
    el.classList.add('reveal-ready');
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ========================================
  // Sticky Navbar (transparent -> solid on scroll)
  // ========================================
  var navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      var icon = mobileMenuBtn.querySelector('i');
      if (isOpen) {
        icon.className = 'fas fa-times';
        // Ensure navbar has background when menu is open
        navbar.classList.add('scrolled');
      } else {
        icon.className = 'fas fa-bars';
        updateNavbar();
      }
    });

    // Close menu when a link is clicked
    var menuLinks = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        updateNavbar();
      });
    }
  }

  // ========================================
  // Hero Background Slow Zoom on Load
  // ========================================
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    // Small delay so the transition is visible
    setTimeout(function () {
      heroBg.classList.add('loaded');
    }, 100);
  }

  // ========================================
  // Image Modal with Navigation
  // ========================================
  var modal = document.getElementById('image-modal');
  var modalImg = document.getElementById('modal-img');
  var modalCounter = document.getElementById('modal-counter');
  var closeBtn = document.querySelector('.modal .close');
  var prevBtn = document.querySelector('.modal-prev');
  var nextBtn = document.querySelector('.modal-next');
  var galleryImages = document.querySelectorAll('.gallery-item img');

  var currentIndex = 0;
  var imageSources = [];

  // Collect image sources
  for (var j = 0; j < galleryImages.length; j++) {
    imageSources.push(galleryImages[j].src);
  }

  function showImage(index) {
    if (index < 0) index = imageSources.length - 1;
    if (index >= imageSources.length) index = 0;
    currentIndex = index;
    modalImg.src = imageSources[currentIndex];
    if (modalCounter) {
      modalCounter.textContent = (currentIndex + 1) + ' / ' + imageSources.length;
    }
  }

  function openModal(index) {
    modal.style.display = 'flex';
    showImage(index);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Click handlers on gallery images
  for (var k = 0; k < galleryImages.length; k++) {
    (function (idx) {
      galleryImages[idx].addEventListener('click', function () {
        openModal(idx);
      });
    })(k);
  }

  // Also allow clicking the gallery-item div itself (not just the img)
  var galleryItems = document.querySelectorAll('.gallery-item');
  for (var g = 0; g < galleryItems.length; g++) {
    (function (idx) {
      galleryItems[idx].addEventListener('click', function () {
        openModal(idx);
      });
    })(g);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (modal.style.display !== 'flex') return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    }
  });

  // ========================================
  // Smooth Scroll for all anchor links
  // ========================================
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchors.length; a++) {
    anchors[a].addEventListener('click', function (e) {
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
