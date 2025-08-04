// Testimonials Carousel Functionality
let currentSlide = 0;
let slides = [];
let dots = [];

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements after DOM is loaded
    slides = document.querySelectorAll('.testimonial-slide');
    dots = document.querySelectorAll('.dot');
    
    // Only initialize carousel if testimonial elements exist
    if (slides.length > 0) {
        showSlide(currentSlide);
        
        // Auto-advance carousel every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Initialize contact form if it exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Initialize mobile menu toggle
    initializeMobileMenu();
});

// Show specific slide
function showSlide(slideIndex) {
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    
    // Activate corresponding dot
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// Go to next slide
function nextSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Go to previous slide
function previousSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Go to specific slide (called by dot clicks)
function goToSlide(slideIndex) {
    if (slides.length === 0) return;
    currentSlide = slideIndex - 1;
    showSlide(currentSlide);
}

// Make functions available globally for onclick handlers
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (in a real application, this would send to a server)
    alert('Thank you for your message! We will get back to you within 24-48 hours.');
    
    // Reset form
    event.target.reset();
}

// Initialize mobile menu toggle functionality
function initializeMobileMenu() {
    // Create mobile menu button if screen is small
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            addMobileMenuButton();
        } else {
            removeMobileMenuButton();
        }
    });
}

function addMobileMenuButton() {
    const headerContainer = document.querySelector('.header-container');
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;
        
        // Insert after logo
        const logo = document.querySelector('.logo');
        logo.parentNode.insertBefore(mobileMenuBtn, logo.nextSibling);
        
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function removeMobileMenuButton() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.remove();
    }
    
    // Ensure nav is visible
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.style.display = '';
    }
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const shopButton = document.querySelector('.shop-button');
    
    if (nav.style.display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.backgroundColor = '#2e7d32';
        nav.style.padding = '1rem';
        nav.style.zIndex = '999';
        
        // Stack nav items vertically
        const navList = nav.querySelector('.nav-list');
        navList.style.flexDirection = 'column';
        navList.style.alignItems = 'center';
        navList.style.gap = '1rem';
        
        // Also show shop button in mobile menu
        if (shopButton) {
            shopButton.style.display = 'block';
            shopButton.style.marginTop = '1rem';
        }
    } else {
        nav.style.display = 'none';
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Check if clicked element is an internal anchor link
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for buttons
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Add loading state to buttons when clicked
    if (target.classList.contains('btn') && !target.classList.contains('carousel-btn')) {
        const originalText = target.textContent;
        target.textContent = 'Loading...';
        target.disabled = true;
        
        // Reset button after 2 seconds (simulating action completion)
        setTimeout(function() {
            target.textContent = originalText;
            target.disabled = false;
        }, 2000);
    }
});

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2e7d32;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add animation classes for elements as they come into view
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles to elements
    const animatedElements = document.querySelectorAll('.impact-box, .testimonial-card, .product-card, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);
