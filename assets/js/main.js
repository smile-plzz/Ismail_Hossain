
        (function() {
            const section = document.getElementById('nmfm-section');
            if (!section) return;

            const modal = section.querySelector('#nmfm-video-modal');
            const iframe = section.querySelector('#nmfm-modal-iframe');
            const modalTitle = section.querySelector('#nmfm-modal-title');
            const closeButton = section.querySelector('#nmfm-video-modal button[aria-label="Close modal"]');

            function openModal(videoId, title) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
                modalTitle.textContent = title;
                modal.classList.remove('hidden');
                modal.focus();
            }

            function closeModal() {
                iframe.src = '';
                modal.classList.add('hidden');
            }

            section.querySelectorAll('.thumbnail').forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    const videoId = thumbnail.dataset.videoId;
                    const title = thumbnail.dataset.title;
                    openModal(videoId, title);
                });
            });

            closeButton.addEventListener('click', closeModal);

            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal();
            });

            section.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    section.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.replace('bg-blue-600', 'bg-gray-200');
                        b.classList.replace('text-white', 'text-gray-800');
                    });
                    btn.classList.replace('bg-gray-200', 'bg-blue-600');
                    btn.classList.replace('text-gray-800', 'text-white');
                    const category = btn.dataset.category;
                    section.querySelectorAll('.video-container').forEach(video => {
                        video.style.display = (category === 'all' || video.dataset.category === category) ? 'block' : 'none';
                    });
                });
            });

            const carousel = section.querySelector('.video-carousel');
            section.querySelector('.carousel-prev').addEventListener('click', () => {
                carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
            });
            section.querySelector('.carousel-next').addEventListener('click', () => {
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            });
        })();
    

        // Ensure script runs after DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Cache DOM elements
            const videoModal = document.getElementById('videoModal');
            const modalIframe = document.getElementById('modalIframe');
            const modalTitle = document.getElementById('modalTitle');
            const videoCarousel = document.querySelector('.video-carousel');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const videoContainers = document.querySelectorAll('.video-container');
            const prevButton = document.querySelector('.carousel-prev');
            const nextButton = document.querySelector('.carousel-next');

            // Modal functions
            function openModal(videoId, title) {
                if (!videoModal || !modalIframe || !modalTitle) {
                    console.error('Modal elements not found');
                    return;
                }
                try {
                    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
                    modalTitle.textContent = title;
                    videoModal.classList.remove('hidden');
                    modalIframe.focus();
                    // Trap focus in modal
                    trapFocus(videoModal);
                } catch (error) {
                    console.error('Error opening modal:', error);
                }
            }

            function closeModal() {
                if (!videoModal || !modalIframe) {
                    console.error('Modal elements not found');
                    return;
                }
                modalIframe.src = '';
                videoModal.classList.add('hidden');
                // Return focus to last focused element
                if (lastFocusedElement) lastFocusedElement.focus();
            }

            // Focus trapping for accessibility
            let lastFocusedElement = null;
            function trapFocus(modal) {
                lastFocusedElement = document.activeElement;
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const first = focusableElements[0];
                const last = focusableElements[focusableElements.length - 1];

                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        } else if (!e.shiftKey && document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                });
            }

            // Filter videos
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => {
                        b.classList.replace('bg-blue-600', 'bg-gray-200');
                        b.classList.replace('text-white', 'text-gray-800');
                    });
                    btn.classList.replace('bg-gray-200', 'bg-blue-600');
                    btn.classList.replace('text-gray-800', 'text-white');
                    const category = btn.dataset.category;
                    videoContainers.forEach(video => {
                        video.classList.toggle('hidden', !(category === 'all' || video.dataset.category === category));
                    });
                    videoCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                });
            });

            // Carousel navigation
            prevButton.addEventListener('click', () => {
                const firstVisible = Array.from(videoContainers).find(v => v.getBoundingClientRect().left >= -1 && !v.classList.contains('hidden'));
                if (firstVisible) {
                    const prev = firstVisible.previousElementSibling;
                    if (prev && !prev.classList.contains('hidden')) {
                        prev.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                    } else {
                        videoCarousel.scrollBy({ left: -videoContainers[0].offsetWidth - 16, behavior: 'smooth' });
                    }
                }
            });

            nextButton.addEventListener('click', () => {
                const firstVisible = Array.from(videoContainers).find(v => v.getBoundingClientRect().left >= -1 && !v.classList.contains('hidden'));
                if (firstVisible) {
                    const next = firstVisible.nextElementSibling;
                    if (next && !next.classList.contains('hidden')) {
                        next.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                    } else {
                        videoCarousel.scrollBy({ left: videoContainers[0].offsetWidth + 16, behavior: 'smooth' });
                    }
                }
            });

            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
                    closeModal();
                }
            });

            // Close modal when clicking outside
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) closeModal();
            });
        });
    

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact-form form');
    const formStatus = document.getElementById('form-status');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          // Success message
          formStatus.classList.remove('hidden', 'bg-red-100', 'text-red-700');
          formStatus.classList.add('bg-green-100', 'text-green-700');
          formStatus.innerHTML = 'Message sent successfully! I\'ll get back to you soon.';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Error message
        formStatus.classList.remove('hidden', 'bg-green-100', 'text-green-700');
        formStatus.classList.add('bg-red-100', 'text-red-700');
        formStatus.innerHTML = 'Oops! Something went wrong. Please try again later.';
      } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  });


        document.addEventListener("DOMContentLoaded", () => {
            // Mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    mobileMenu.classList.add('hidden');
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Fade-in animation
            const fadeElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            fadeElements.forEach(el => observer.observe(el));

            // Add shadow to navbar on scroll
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 10) {
                    nav.classList.add('shadow-lg');
                } else {
                    nav.classList.remove('shadow-lg');
                }
            });
        });
    


document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
