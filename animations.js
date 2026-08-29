document.addEventListener('DOMContentLoaded', () => {
    // 2. Scroll-Driven Reveal (Add reveal class dynamically)
    const revealElements = document.querySelectorAll('.bento-card, .exp-row, .proj-card, .skill-folder, .cert-card, .about-header-centered, .section-header-centered, .contact-card');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Add a slight stagger delay for consecutive elements
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only reveal once for a clean, non-distracting experience
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Mouse Parallax for Hero Section Floating Cards
    const heroSection = document.querySelector('.hero');
    const floatCards = document.querySelectorAll('.floating-card');
    
    if (heroSection && floatCards.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40; // High denominator for gentle movement
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            floatCards.forEach((card, i) => {
                const isLeft = card.classList.contains('card-left');
                const baseRotation = isLeft ? -5 : 5;
                const multiplier = isLeft ? 1 : -1;
                
                card.style.transform = `translate(${xAxis * multiplier}px, ${yAxis * multiplier}px) rotate(${baseRotation}deg)`;
            });
        });
        
        // Reset on leave for a clean look
        heroSection.addEventListener('mouseleave', () => {
            floatCards.forEach(card => {
                card.style.transition = 'transform 0.5s ease-out';
                const isLeft = card.classList.contains('card-left');
                const baseRotation = isLeft ? -5 : 5;
                card.style.transform = `rotate(${baseRotation}deg)`;
            });
            
            setTimeout(() => {
                floatCards.forEach(card => card.style.transition = ''); // Remove transition for next mousemove
            }, 500);
        });
    }

    // 4. Initialize Vanilla Tilt (Subtle, professional)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".bento-card, .proj-card, .skill-folder"), {
            max: 3, // Very subtle tilt
            speed: 400,
            glare: true,
            "max-glare": 0.08, // Low glare so it's not "too AI" or plastic-looking
            scale: 1.01
        });
    }
});
