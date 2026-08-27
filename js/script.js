// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ========================================
    // PORTFOLIO FILTER FUNCTIONALITY
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter projects with animation
                portfolioItems.forEach((item, index) => {
                    const categories = item.getAttribute('data-category')?.split(' ') || [];
                    const match = filter === 'all' || categories.includes(filter);
                    
                    if (match) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100 * index);
                    } else {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to your backend
            // For now, we'll simulate a successful submission
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.style.cssText = `
                background-color: #10b981;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                text-align: center;
                font-weight: 500;
            `;
            successMessage.textContent = `Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`;
            
            // Reset form and show message
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode === contactForm) {
                    contactForm.removeChild(successMessage);
                }
            }, 5000);
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a tab link or has data-filter attribute
            if (this.hasAttribute('data-filter') || this.closest('.filter-container')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollPosition = 0;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            
            if (currentScrollPosition > 100) {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.background = 'var(--white)';
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollPosition = currentScrollPosition;
        });
    }

    // ========================================
    // ANIMATE ELEMENTS ON SCROLL
    // ========================================
    const animateElements = () => {
        const elements = document.querySelectorAll(
            '.expertise-card, .service-card, .skill-card, .stat, ' +
            '.portfolio-item, .process-step, .info-card, .social-profile'
        );
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                // Only animate if not already animated
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 150 * index);
                }
            }
        });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll(
        '.expertise-card, .service-card, .skill-card, .stat, ' +
        '.portfolio-item, .process-step, .info-card, .social-profile'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Trigger animations on scroll and load
    window.addEventListener('scroll', animateElements);
    window.addEventListener('load', animateElements);
    document.addEventListener('DOMContentLoaded', animateElements);

    // Trigger once on page load
    setTimeout(animateElements, 300);

    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const barWidth = bar.style.width;
                bar.style.width = '0%';
                
                // Trigger reflow to restart animation
                void bar.offsetWidth;
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = barWidth;
                }, 100);
            });
        };
        
        // Animate when skill section is in view
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(skillsSection);
        }
        
        // Fallback: animate on page load
        window.addEventListener('load', () => {
            setTimeout(animateSkillBars, 500);
        });
    }

    // ========================================
    // FORM INPUT ANIMATIONS
    // ========================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement?.classList.remove('focused');
            }
        });
        
        // Initialize for pre-filled inputs
        if (input.value.trim()) {
            input.parentElement?.classList.add('focused');
        }
    });

    // ========================================
    // PAGE TRANSITION EFFECT
    // ========================================
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ========================================
    // ACTIVE NAVIGATION LINK
    // ========================================
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    // Create and add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-md);
        transition: var(--transition);
        z-index: 999;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when button clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // FORM VALIDATION FEEDBACK
    // ========================================
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                group.classList.add('invalid');
                group.classList.remove('valid');
                
                // Show custom validation message
                let message = 'This field is required';
                if (input.type === 'email') {
                    message = 'Please enter a valid email address';
                }
                
                if (!group.querySelector('.error-message')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.style.cssText = `
                        color: var(--danger-color);
                        font-size: 0.875rem;
                        margin-top: 5px;
                        display: none;
                    `;
                    errorDiv.textContent = message;
                    group.appendChild(errorDiv);
                }
                
                group.querySelector('.error-message').style.display = 'block';
            });
            
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    group.classList.remove('invalid');
                    group.classList.add('valid');
                    if (group.querySelector('.error-message')) {
                        group.querySelector('.error-message').style.display = 'none';
                    }
                } else {
                    group.classList.remove('valid');
                }
            });
        }
    });
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
// Prevent console errors in older browsers
if (!Element.prototype.closest) {
    Element.prototype.closest = function(css) {
        let node = this;
        while (node) {
            if (node.matches(css)) return node;
            node = node.parentElement;
        }
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}