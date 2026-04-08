/* js/main.css */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Intersection Observer for Scroll Animations --- */
    const faders = document.querySelectorAll('.animate-fade-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* --- Header Background Change on Scroll --- */
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    /* --- Modal Logic for "About Me" --- */
    const modalTrigger = document.getElementById('about-trigger');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalWindow = document.getElementById('about-modal');
    const modalClose = document.getElementById('modal-close');

    if(modalTrigger && modalOverlay && modalWindow && modalClose) {
        // Open Modal
        modalTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            modalWindow.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scrolling
        });

        // Close on Button Click
        modalClose.addEventListener('click', () => {
            closeModal();
        });

        // Close on Overlay Click (outside the modal)
        modalOverlay.addEventListener('click', (e) => {
            closeModal();
        });

        // Prevent click inside modal from closing
        modalWindow.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close on Escape Key
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modalWindow.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if(modalOverlay && modalWindow) {
            modalOverlay.classList.remove('active');
            modalWindow.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    /* --- Hero Background Mouse Parallax --- */
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        let targetX = 0, targetY = 0, curX = 0, curY = 0;

        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth  - 0.5) * 28;
            targetY = (e.clientY / window.innerHeight - 0.5) * 18;
        });

        (function tick() {
            curX += (targetX - curX) * 0.05;
            curY += (targetY - curY) * 0.05;
            heroBg.style.transform = `translate(${curX}px, ${curY}px)`;
            requestAnimationFrame(tick);
        })();
    }

    /* --- Styleguide Active Section Highlight --- */
    const sgContentBlocks = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sg-nav a[href^="#"]');
    
    if (navLinks.length > 0) {
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sgContentBlocks.forEach(sec => {
            if(sec.id) sectionObserver.observe(sec);
        });
    }

    /* --- Typing Animation for Hero Section --- */
    const textElement = document.querySelector('.typing-text');
    if(textElement) {
        const words = ['Interactive Developer.', 'Visual Designer.', 'Creative Technologist.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect slightly after load
        setTimeout(type, 1000);
    }
});
