/* ==========================================
   Portfolio Filtering and Lightbox
   ========================================== */

class Portfolio {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.currentFilter = 'all';
        
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupLightbox();
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                this.filterPortfolio(category);
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterPortfolio(category) {
        this.currentFilter = category;
        
        this.portfolioItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                // Show item with animation
                setTimeout(() => {
                    item.classList.remove('hidden');
                    
                    // Use GSAP for smooth animation if available
                    if (typeof gsap !== 'undefined') {
                        gsap.from(item, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.5,
                            ease: 'back.out(1.7)'
                        });
                    }
                }, index * 50);
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
    }

    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        
        // Add click event to all portfolio images
        this.portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.portfolio-overlay h3');
            
            if (img) {
                item.addEventListener('click', () => {
                    this.openLightbox(
                        img.src,
                        overlay ? overlay.textContent : img.alt
                    );
                });
            }
        });

        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                this.closeLightbox();
            });
        }

        // Close on background click
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(src, caption) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            if (lightboxCaption) {
                lightboxCaption.textContent = caption;
            }
            lightbox.classList.add('active');
            
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Animate lightbox
            if (typeof gsap !== 'undefined') {
                gsap.from(lightboxImg, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        
        if (lightbox) {
            lightbox.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
}

// Image lazy loading with fade-in effect
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                }
            );

            this.images.forEach(img => {
                this.observer.observe(img);
                
                // Add fade-in on load
                img.addEventListener('load', () => {
                    img.style.opacity = '0';
                    
                    if (typeof gsap !== 'undefined') {
                        gsap.to(img, {
                            opacity: 1,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    } else {
                        img.style.transition = 'opacity 0.6s ease';
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 10);
                    }
                });
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Only load if not already loaded
                if (!img.src || img.src === window.location.href) {
                    const dataSrc = img.getAttribute('data-src');
                    if (dataSrc) {
                        img.src = dataSrc;
                    }
                }
                
                this.observer.unobserve(img);
            }
        });
    }
}

// Touch device support for portfolio overlay
class TouchSupport {
    constructor() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        // Detect touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            this.portfolioItems.forEach(item => {
                item.addEventListener('touchstart', (e) => {
                    // Toggle tapped class for showing overlay on touch devices
                    const wasTapped = item.classList.contains('tapped');
                    
                    // Remove tapped from all items
                    this.portfolioItems.forEach(i => i.classList.remove('tapped'));
                    
                    // Toggle current item
                    if (!wasTapped) {
                        item.classList.add('tapped');
                        e.preventDefault();
                    }
                });
            });

            // Remove tapped class when touching outside
            document.addEventListener('touchstart', (e) => {
                if (!e.target.closest('.portfolio-item')) {
                    this.portfolioItems.forEach(i => i.classList.remove('tapped'));
                }
            });
        }
    }
}

// Category counter
class CategoryCounter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.updateCounts();
    }

    updateCounts() {
        this.filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            let count;
            
            if (category === 'all') {
                count = this.portfolioItems.length;
            } else {
                count = document.querySelectorAll(
                    `.portfolio-item[data-category="${category}"]`
                ).length;
            }
            
            // Optionally add count to button text
            // button.textContent = `${button.textContent.split(' (')[0]} (${count})`;
        });
    }
}

// Initialize portfolio functionality
function initPortfolio() {
    new Portfolio();
    new LazyImageLoader();
    new TouchSupport();
    // Uncomment to show category counts
    // new CategoryCounter();
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
