// Force scroll to top on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2500);

    // Custom Cursor Movement
    const cursor = document.getElementById('pacman-cursor');
    const pacmanTop = cursor.querySelector('.pacman-top');
    const pacmanBottom = cursor.querySelector('.pacman-bottom');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor Animation on Hover
    const interactiveElements = document.querySelectorAll('a, button, .timeline-header, .project-card');
    
    let chompInterval;
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            let rotation = 0;
            chompInterval = setInterval(() => {
                rotation = rotation === 0 ? 30 : 0;
                pacmanTop.style.transform = `rotate(-${rotation}deg)`;
                pacmanBottom.style.transform = `rotate(${rotation}deg)`;
            }, 150);
        });
        
        el.addEventListener('mouseleave', () => {
            clearInterval(chompInterval);
            pacmanTop.style.transform = `rotate(0deg)`;
            pacmanBottom.style.transform = `rotate(0deg)`;
        });
    });

    // Typewriter Effect
    const roles = [
        "DATA ANALYST",
        "BUSINESS ANALYST",
        "PEOPLE ANALYTICS",
        "AI & ML ENTHUSIAST",
        "BUSINESS INTELLIGENCE"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    const typeWriterElement = document.getElementById('typewriter-text');

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeWriter, typeSpeed);
    }
    setTimeout(typeWriter, 2600);

    // Navbar active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Contact Countdown
    const countdownEl = document.querySelector('.countdown');
    let count = 9;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && count > 0) {
                const countInterval = setInterval(() => {
                    count--;
                    countdownEl.textContent = count;
                    if(count === 0) {
                        clearInterval(countInterval);
                        countdownEl.innerHTML = '<span class="text-red">0</span>';
                    }
                }, 1000);
                observer.disconnect();
            }
        });
    });
    observer.observe(document.getElementById('contact'));
});

// Experience Dropdown
window.toggleDetails = function(element) {
    const details = element.nextElementSibling;
    const icon = element.querySelector('.expand-icon');
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        icon.textContent = '▲';
        element.parentElement.style.background = 'rgba(255, 184, 82, 0.1)';
    } else {
        details.classList.add('hidden');
        icon.textContent = '▼';
        element.parentElement.style.background = '#111';
    }
};

// Borwita Nested Tabs Filtering
window.filterNested = function(btn, category) {
    // Update active state of buttons
    const container = btn.closest('.timeline-details');
    container.querySelectorAll('.nested-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter content
    const cards = container.querySelectorAll('.nested-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
};

// Project Section Filtering
window.filterProjects = function(category) {
    // Update buttons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (category === 'all' || categories.includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Modal Logic
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    if(modal && overlay) {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
};

window.closeModals = function() {
    document.querySelectorAll('.project-modal').forEach(m => m.classList.add('hidden'));
    document.getElementById('modal-overlay').classList.add('hidden');
};

// Lightbox Gallery Logic
let currentGallery = [];
let currentImageIndex = 0;

window.openGallery = function(imagesArray, startIndex = 0) {
    currentGallery = imagesArray;
    currentImageIndex = startIndex;
    document.getElementById('lightbox-overlay').classList.remove('hidden');
    updateLightbox();
};

window.closeLightbox = function() {
    document.getElementById('lightbox-overlay').classList.add('hidden');
};

window.changeLightboxImage = function(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = currentGallery.length - 1;
    if (currentImageIndex >= currentGallery.length) currentImageIndex = 0;
    updateLightbox();
};

function updateLightbox() {
    const contentContainer = document.getElementById('lightbox-media-container');
    const captionElement = document.getElementById('lightbox-caption');
    const mediaData = currentGallery[currentImageIndex];
    
    contentContainer.innerHTML = '';
    
    if (mediaData.type === 'video') {
        const vid = document.createElement('video');
        vid.src = mediaData.src;
        vid.controls = true;
        vid.autoplay = true;
        vid.className = 'lightbox-media border-cyan';
        contentContainer.appendChild(vid);
    } else {
        const img = document.createElement('img');
        img.src = mediaData.src;
        img.className = 'lightbox-media border-cyan';
        img.onerror = function() { this.src='https://via.placeholder.com/800x600/111/FFFF00?text=MEDIA+NOT+FOUND'; };
        contentContainer.appendChild(img);
    }
    
    captionElement.innerText = mediaData.caption || `Item ${currentImageIndex + 1} of ${currentGallery.length}`;
}
