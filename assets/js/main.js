document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            e.preventDefault();
            if (mobileMenu) mobileMenu.classList.add('hidden');
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        });
    });

    // Fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        if (window.scrollY > 10) nav.classList.add('shadow-lg'); else nav.classList.remove('shadow-lg');
    });

    // Secure external links
    document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
        const currentRel = (anchor.getAttribute('rel') || '').toLowerCase();
        const needed = ['noopener', 'noreferrer', 'external'];
        const relParts = new Set(currentRel.split(/\s+/).filter(Boolean));
        needed.forEach(p => relParts.add(p));
        anchor.setAttribute('rel', Array.from(relParts).join(' '));
        if (!anchor.getAttribute('aria-label')) {
            const text = (anchor.textContent || anchor.getAttribute('href') || 'External link').trim();
            anchor.setAttribute('aria-label', text + ' (opens in new tab)');
        }
    });
});

