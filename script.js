document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Scroll Animations (IntersectionObserver)
  // ========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // ========================================
  // Sticky Navbar
  // ========================================
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 80) {
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
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ========================================
  // Hero Background Zoom on Load
  // ========================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(function () {
      heroBg.style.transform = 'scale(1)';
    }, 100);
  }

  // ========================================
  // Image Modal Gallery with Navigation
  // ========================================
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCounter = document.getElementById('modal-counter');
  const closeBtn = document.querySelector('.modal .close');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  var currentIndex = 0;
  var imageSources = [];

  // Collect all image sources
  galleryImages.forEach(function (img) {
    imageSources.push(img.src);
  });

  function showImage(index) {
    if (index < 0) index = imageSources.length - 1;
    if (index >= imageSources.length) index = 0;
    currentIndex = index;
    modalImg.src = imageSources[currentIndex];
    modalCounter.textContent = (currentIndex + 1) + ' / ' + imageSources.length;
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

  // Open modal on image click
  galleryImages.forEach(function (img, i) {
    img.addEventListener('click', function () {
      openModal(i);
    });
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Navigation buttons
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
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

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
  // Smooth Scroll for CTA links (fallback)
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
