document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
        });
    }

    // Smooth scrolling & closing mobile menu
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu
                if (navMenu && navMenu.classList.contains('nav-active')) {
                    navMenu.classList.remove('nav-active');
                }

                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 70;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scroll Spy (Active nav links) & Scroll Reveal
    const sections = document.querySelectorAll('.section');
    const revealElements = document.querySelectorAll('.reveal');

    const onScroll = () => {
        const scrollPos = window.scrollY + 80; // offset for navbar
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        // Scroll Spy
        sections.forEach(section => {
            if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                navLinksList.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });

        // Reveal Animation
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Trigger once on load
    onScroll();
    window.addEventListener('scroll', onScroll);

    // Typing Effect
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const textToType = "Student Developer | Problem Solver";
        let charIndex = 0;
        
        const typeWriter = () => {
            if (charIndex < textToType.length) {
                typeWriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
});
