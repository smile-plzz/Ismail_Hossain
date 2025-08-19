// NMFM Section logic (scoped)
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

  if (closeButton) closeButton.addEventListener('click', closeModal);

  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

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
  const prev = section.querySelector('.carousel-prev');
  const next = section.querySelector('.carousel-next');
  if (prev && next && carousel) {
    prev.addEventListener('click', () => {
      carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    });
  }
})();

// 15-Miles section logic (global since markup uses inline handlers; provide global helpers)
document.addEventListener('DOMContentLoaded', () => {
  const videoModal = document.getElementById('videoModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const videoCarousel = document.querySelector('.video-carousel');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const videoContainers = document.querySelectorAll('.video-container');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  window.openModal = function(videoId, title) {
    if (!videoModal || !modalIframe || !modalTitle) return;
    try {
      modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
      modalTitle.textContent = title;
      videoModal.classList.remove('hidden');
      modalIframe.focus();
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };

  window.closeModal = function() {
    if (!videoModal || !modalIframe) return;
    modalIframe.src = '';
    videoModal.classList.add('hidden');
  };

  if (filterButtons.length) {
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
        if (videoCarousel) videoCarousel.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });
  }

  if (prevButton && nextButton && videoCarousel) {
    prevButton.addEventListener('click', () => {
      const firstVisible = Array.from(videoContainers).find(v => v.getBoundingClientRect().left >= -1 && !v.classList.contains('hidden'));
      if (firstVisible) {
        const prev = firstVisible.previousElementSibling;
        if (prev && !prev.classList.contains('hidden')) prev.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        else videoCarousel.scrollBy({ left: -videoContainers[0].offsetWidth - 16, behavior: 'smooth' });
      }
    });
    nextButton.addEventListener('click', () => {
      const firstVisible = Array.from(videoContainers).find(v => v.getBoundingClientRect().left >= -1 && !v.classList.contains('hidden'));
      if (firstVisible) {
        const next = firstVisible.nextElementSibling;
        if (next && !next.classList.contains('hidden')) next.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        else videoCarousel.scrollBy({ left: videoContainers[0].offsetWidth + 16, behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('hidden')) window.closeModal(); });
  if (videoModal) videoModal.addEventListener('click', (e) => { if (e.target === videoModal) window.closeModal(); });
});

