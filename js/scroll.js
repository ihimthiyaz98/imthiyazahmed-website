/* ==========================================
   Smooth Scrolling with GSAP ScrollTrigger
   ========================================== */

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
            this.setupScrollAnimations();
            this.setupNavbarScroll();
            this.setupSmoothScroll();
        }
    }

    setupScrollAnimations() {
        // Hero section animations
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.7,
            ease: 'power3.out'
        });

        gsap.from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.9,
            ease: 'power3.out'
        });

        gsap.from('.scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.1,
            ease: 'power3.out'
        });

        // Section title animations
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Section subtitle animations
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        sectionSubtitles.forEach((subtitle) => {
            gsap.from(subtitle, {
                scrollTrigger: {
                    trigger: subtitle,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out'
            });
        });

        // Portfolio items stagger animation
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        gsap.from(portfolioItems, {
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Category filter buttons animation
        const filterButtons = document.querySelectorAll('.filter-btn');
        gsap.from(filterButtons, {
            scrollTrigger: {
                trigger: '.category-filter',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power3.out'
        });

        // About section content
        const aboutText = document.querySelectorAll('.about-text p');
        gsap.from(aboutText, {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 70%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Skills grid animation
        const skillItems = document.querySelectorAll('.skill-item');
        gsap.from(skillItems, {
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });

        // Contact form animation
        const formGroups = document.querySelectorAll('.form-group');
        gsap.from(formGroups, {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 70%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Contact info animation
        const infoItems = document.querySelectorAll('.info-item');
        gsap.from(infoItems, {
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 70%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 30,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Parallax effect for sections
        gsap.utils.toArray('.portfolio-section, .about-section, .contact-section').forEach((section) => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -50,
                ease: 'none'
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { 
                className: 'scrolled', 
                targets: navbar 
            }
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        const navMenu = document.querySelector('.nav-menu');
                        const hamburger = document.querySelector('.hamburger');
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            hamburger.classList.remove('active');
                        }

                        // Update active link
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');

                        // Smooth scroll to target
                        gsap.to(window, {
                            duration: 1.5,
                            scrollTo: {
                                y: targetElement,
                                offsetY: 70
                            },
                            ease: 'power3.inOut'
                        });
                    }
                }
            });
        });

        // Update active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Reveal animations on scroll for elements with reveal classes
class RevealOnScroll {
    constructor() {
        this.revealElements = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale'
        );
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.15,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            this.revealElements.forEach(element => {
                this.observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            this.revealElements.forEach(element => {
                element.classList.add('active');
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after revealing
                // this.observer.unobserve(entry.target);
            }
        });
    }
}

// Initialize smooth scroll and reveal animations
function initScrollAnimations() {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        new SmoothScroll();
        new RevealOnScroll();
    } else {
        console.warn('GSAP not loaded, scroll animations disabled');
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}
