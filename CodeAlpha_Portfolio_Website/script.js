document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Intersection Observer (Reveal on Scroll)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // **********************************************
    // SOPHISTICATED MOUSE SPOTLIGHT INTEGRATION
    // **********************************************
    const cursor = document.getElementById('cursor-spotlight');
    
    // 1. Smoothly follow the mouse position
    document.addEventListener('mousemove', (e) => {
        // Use translate3d for GPU acceleration and smoothness
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // 2. Adjust cursor state based on hover targets
    const defaultHoverTargets = document.querySelectorAll('.hover-target, a, button, .tag');
    const linkedinTargets = document.querySelectorAll('.hover-target-linkedin');
    const facebookTargets = document.querySelectorAll('.hover-target-facebook');
    const instagramTargets = document.querySelectorAll('.hover-target-instagram');

    // Default Theme Hover (Blue Accent)
    defaultHoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Brand Specific Hovers
    linkedinTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('cursor-linkedin'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-linkedin'));
    });
    facebookTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('cursor-facebook'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-facebook'));
    });
    instagramTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('cursor-instagram'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('cursor-instagram'));
    });


    // 3D perspective tracking for Hero Photo (Kept from previous version)
    const photo = document.querySelector('.photo-wrapper');
    document.addEventListener('mousemove', (e) => {
        if (!photo) return;
        const x = (window.innerWidth / 2 - e.pageX) / 45;
        const y = (window.innerHeight / 2 - e.pageY) / 45;
        photo.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // Project Card Hover Lift (Kept from previous version)
    const projCards = document.querySelectorAll('.project-card');
    projCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 30;
            const y = (e.clientY - rect.top - rect.height / 2) / 30;
            card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateY(0) rotateX(0) translateY(0)`;
        });
    });
});