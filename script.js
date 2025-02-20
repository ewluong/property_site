document.addEventListener("DOMContentLoaded", function() {
    // Function to update opacity of elements with the fade-on-scroll class based on visibility
    function updateFadeOnScroll() {
      const fadeElements = document.querySelectorAll('.fade-on-scroll');
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate the visible height of the element within the viewport
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        // Compute a ratio (0 to 1) of visible area to element height
        const ratio = Math.max(0, Math.min(1, visibleHeight / rect.height));
        el.style.opacity = ratio;
      });
    }
  
    // Update fade on scroll and on resize
    window.addEventListener('scroll', updateFadeOnScroll);
    window.addEventListener('resize', updateFadeOnScroll);
    updateFadeOnScroll();
  
    // Modal functionality for gallery images
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".modal .close");
  
    // Open modal on clicking a gallery image
    const galleryImages = document.querySelectorAll(".gallery-item img");
    galleryImages.forEach(img => {
      img.addEventListener("click", function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
      });
    });
  
    // Close modal when clicking the X button
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    // Close modal when clicking anywhere outside the image
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  