document.addEventListener("DOMContentLoaded", () => {
    // Scroll Reveal Animations
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    //Dynamic Particle Background
    const particlesContainer = document.getElementById('particles-bg');
    const particleCount = 40; // Adjust for performance / density

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        
        // Randomize properties
        const size = Math.random() * 3 + 1; // 1px to 4px
        const xPos = Math.random() * 100; // 0% to 100vw
        const yPos = Math.random() * 100; // 0% to 100vh
        const opacity = Math.random() * 0.4 + 0.1;
        const duration = Math.random() * 20 + 15; // 15s to 35s
        const delay = Math.random() * 5;

        // Styling the particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = '#0082ff'; // Vibrant Blue
        particle.style.borderRadius = '50%';
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.opacity = opacity;
        particle.style.boxShadow = '0 0 10px #0082ff, 0 0 20px #0082ff';
        
        // Add animation via Web Animations API for better performance
        particle.animate([
            { transform: `translate(0, 0)`, opacity: opacity },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200 - 50}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });

        particlesContainer.appendChild(particle);
    }

    // Developer Modal Logic
    const devCards = document.querySelectorAll('.dev-card');
    const modalOverlay = document.getElementById('dev-modal');
    const closeModal = document.querySelector('.close-modal');
    
    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalLang = document.getElementById('modal-lang');
    const modalDesc = document.getElementById('modal-desc');

    devCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const title = card.getAttribute('data-title');
            const lang = card.getAttribute('data-lang');
            const desc = card.getAttribute('data-desc');
            const avatarUrl = card.getAttribute('data-avatar');

            modalName.textContent = name;
            modalTitle.textContent = title;
            modalLang.textContent = lang;
            modalDesc.textContent = desc;
            
            const modalAvatar = document.querySelector('.modal-avatar');
            if (avatarUrl) {
                modalAvatar.style.backgroundImage = `url('${avatarUrl}')`;
            } else {
                modalAvatar.style.backgroundImage = '';
            }

            modalOverlay.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});
