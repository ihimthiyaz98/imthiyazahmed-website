/* ==========================================
   Main JavaScript Entry Point
   ========================================== */

class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupMobileMenu();
        this.setupContactForm();
        this.setupScrollIndicator();
        this.setupPerformanceOptimizations();
    }

    setupLoadingScreen() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            
            if (loadingScreen) {
                // Hide loading screen with fade out
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    
                    // Remove from DOM after transition
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 500);
                }, 500);
            }
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger && navMenu) {
            // Toggle menu
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };

                // Validate
                if (this.validateForm(formData)) {
                    this.handleFormSubmission(formData);
                }
            });
        }
    }

    validateForm(formData) {
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            this.showFormMessage('Please fill in all fields', 'error');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showFormMessage('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    handleFormSubmission(formData) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log data (in production, send to server)
            console.log('Form submitted:', formData);
            
            // In production, you would send the data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     this.showFormMessage('Message sent successfully!', 'success');
            //     document.getElementById('contact-form').reset();
            // })
            // .catch(error => {
            //     this.showFormMessage('Failed to send message. Please try again.', 'error');
            // })
            // .finally(() => {
            //     submitBtn.textContent = originalText;
            //     submitBtn.disabled = false;
            // });
        }, 1500);
    }

    showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            background: ${type === 'success' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
            border: 1px solid ${type === 'success' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
            color: ${type === 'success' ? '#a78bfa' : '#fca5a5'};
        `;

        // Insert after form
        const contactForm = document.getElementById('contact-form');
        contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);

        // Animate in
        if (typeof gsap !== 'undefined') {
            gsap.from(messageEl, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        // Remove after 5 seconds
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.to(messageEl, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => messageEl.remove()
                });
            } else {
                messageEl.remove();
            }
        }, 5000);
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            // Hide scroll indicator when scrolled down
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                
                if (scrollPosition > 200) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            });

            // Smooth scroll to portfolio on click
            scrollIndicator.addEventListener('click', () => {
                const portfolioSection = document.getElementById('portfolio');
                
                if (portfolioSection) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(window, {
                            duration: 1.5,
                            scrollTo: {
                                y: portfolioSection,
                                offsetY: 70
                            },
                            ease: 'power3.inOut'
                        });
                    } else {
                        portfolioSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    }

    setupPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Refresh ScrollTrigger on resize if available
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 250);
        });

        // Add will-change property to animated elements
        const animatedElements = document.querySelectorAll(
            '.hero-title, .hero-subtitle, .portfolio-item, .skill-item'
        );
        
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });

        // Remove will-change after animations complete
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 3000);

        // Prefetch images on hover (for desktop)
        if (!('ontouchstart' in window)) {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const img = item.querySelector('img');
                    if (img && img.loading === 'lazy') {
                        img.loading = 'eager';
                    }
                });
            });
        }
    }
}

// Utility functions
const utils = {
    // Smooth scroll to element
    scrollTo: (elementId, offset = 70) => {
        const element = document.getElementById(elementId);
        if (element) {
            const y = element.offsetTop - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize app
let app;

function initApp() {
    app = new App();
    console.log('Photography Portfolio initialized');
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export utils for use in other scripts
if (typeof window !== 'undefined') {
    window.portfolioUtils = utils;
}
