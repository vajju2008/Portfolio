document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
        });
    }

    // 2. Smooth scrolling & closing mobile menu
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
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

    // 3. Dynamic Navbar Background
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init on load

    // 4. Scroll Spy with IntersectionObserver
    const sections = document.querySelectorAll('.section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const spyOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, spyOptions);

    sections.forEach(section => spyObserver.observe(section));

    // 5. Reveal Animations with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Enhanced Typing Effect
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const phrases = [
            "Student Developer",
            "Problem Solver",
            "Tech Enthusiast"
        ];
        let currentPhraseIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        
        const typeLoop = () => {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Adjust typing speed
            let typeSpeed = isDeleting ? 40 : 100;
            typeSpeed += Math.random() * 50; // Randomize slightly for a human feel

            // Behavior at end of phrase
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end of word before deleting
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeLoop, typeSpeed);
        };
        
        setTimeout(typeLoop, 1000); // Initial delay
    }

    // 7. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 8. Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const statusMsg = document.getElementById('contact-form-status');
        const submitBtn = document.getElementById('contact-submit');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock a loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            statusMsg.style.display = 'none';

            // Simulate an API call / submission delay
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success state and reset form
                contactForm.reset();
                statusMsg.textContent = 'Message sent successfully! I will get back to you soon.';
                statusMsg.style.color = '#34d399'; // subtle green matching dark theme
                statusMsg.style.display = 'block';

                // Hide message after a while
                setTimeout(() => {
                    statusMsg.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
