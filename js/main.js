/**
 * Advocate Portfolio - Premium Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 2. Scroll Reveal Logic (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // If it's a counter, animate it
                if (entry.target.classList.contains('counter-num')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const headerBtn = item.querySelector('.faq-header');
        if (headerBtn) {
            headerBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 5. Counter Animation Logic
    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        let current = 0;
        const increment = target / 100;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                el.innerText = Math.ceil(current) + '+';
                setTimeout(updateCount, 15);
            } else {
                el.innerText = target + '+';
            }
        };
        updateCount();
    }

    // 6. Smooth Scroll for Page Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
    });

    // 7. Announcement Bar Close Logic
    const announcementBar = document.getElementById('top-promo-bar');
    const closeBtn = document.getElementById('close-promo-bar');

    if (announcementBar && closeBtn) {
        const header = document.getElementById('main-header');
        
        closeBtn.addEventListener('click', () => {
            announcementBar.classList.add('hidden');
            document.body.style.setProperty('--top-offset', '0px');
            if (header) header.style.top = '0px';
        });
    }

});
