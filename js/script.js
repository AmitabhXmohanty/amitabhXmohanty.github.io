// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation attributes to elements
document.querySelectorAll('section').forEach(section => {
    section.setAttribute('data-animate', '');
    observer.observe(section);
});

document.querySelectorAll('.skill-card, .stat').forEach(element => {
    element.setAttribute('data-animate', '');
    observer.observe(element);
});

// Optimized cursor follow effect
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;
let rafId = null;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function updateCursor() {
    dotX += (cursorX - dotX) * 0.2;
    dotY += (cursorY - dotY) * 0.2;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    
    rafId = requestAnimationFrame(updateCursor);
}

// Only start cursor animation when mouse moves
document.addEventListener('mousemove', () => {
    if (!rafId) {
        updateCursor();
    }
});

// Stop animation when mouse leaves window
document.addEventListener('mouseout', () => {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
});

// Optimized hover effects
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
    });
});

// Optimized parallax effect with throttling
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
let ticking = false;

function updateParallax() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
                heroContent.style.opacity = 1 - Math.max(0, scrolled / 600);
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateParallax, { passive: true });

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Redirect to thank you page
            window.location.href = form.querySelector('input[name="_next"]').value;
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed. Please try again.');
            });
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        formStatus.textContent = error.message || 'Oops! There was a problem submitting your form. Please try again.';
        formStatus.style.color = 'red';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.skill-card, .stat');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animation
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
// Initial check
revealOnScroll();

// Initialize background animation with debounced resize handler
let resizeTimeout;

// Background Animation
function createBackgroundSpans() {
    const bgAnimation = document.querySelector('.bg-animation');
    const numberOfSpans = window.innerWidth < 768 ? 15 : 25;

    while (bgAnimation.firstChild) {
        bgAnimation.removeChild(bgAnimation.firstChild);
    }

    for (let i = 0; i < numberOfSpans; i++) {
        const span = document.createElement('span');
        const size = Math.random() * 10 + 5;
        span.style.width = `${size}px`;
        span.style.height = `${size}px`;
        span.style.left = `${Math.random() * 100}%`;
        const duration = Math.random() * 20 + 20;
        span.style.animation = `animate ${duration}s linear infinite`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        bgAnimation.appendChild(span);
    }
}

// Dynamic Background Animation
function createMatrixRain() {
    const matrixRain = document.querySelector('.matrix-rain');
    const numberOfColumns = Math.floor(window.innerWidth / 30);

    matrixRain.innerHTML = '';

    for (let i = 0; i < numberOfColumns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${(100 / numberOfColumns) * i}%`;
        column.style.animationDelay = `-${Math.random() * 20}s`;
        matrixRain.appendChild(column);
    }
}

// Initialize animations
createBackgroundSpans();
createMatrixRain();

// Handle window resize
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (document.visibilityState === 'visible') {
            createBackgroundSpans();
            createMatrixRain();
        }
    }, 300);
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        createBackgroundSpans();
        createMatrixRain();
    }
});

// Parallax effect for floating particles
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.floating-particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = 0.05 * (index + 1);
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        particle.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
    });
});

// Add click handlers for experience items
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('click', () => {
        // Toggle the expanded class
        item.classList.toggle('expanded');
        
        // Close other items
        document.querySelectorAll('.experience-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('expanded')) {
                otherItem.classList.remove('expanded');
            }
        });
    });
});

// Optimize animation performance
const optimizeAnimation = (element) => {
    element.style.willChange = 'transform, opacity';
    element.addEventListener('animationend', () => {
        element.style.willChange = 'auto';
    }, { once: true });
};

document.querySelectorAll('[data-animate]').forEach(optimizeAnimation);

// Remove project section link from navigation
const projectLink = document.querySelector('a[href="#projects"]');
if (projectLink) {
    projectLink.parentElement.remove();
}

// Optimize parallax effect
const optimizedParallax = (e) => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const particles = document.querySelectorAll('.floating-particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            particles.forEach((particle, index) => {
                const speed = 0.03 * (index + 1); // Reduced speed for smoother animation
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;
                particle.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${x * 0.3}deg)`;
            });
            ticking = false;
        });
        ticking = true;
    }
};

// Replace existing mousemove handler with optimized version
document.removeEventListener('mousemove', document.mousemoveHandler);
document.addEventListener('mousemove', optimizedParallax);

// Intersection Observer for project items
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate achievement texts
            const achievements = entry.target.querySelectorAll('.achievement-text');
            achievements.forEach((achievement, index) => {
                setTimeout(() => {
                    achievement.classList.add('visible');
                }, index * 200); // Stagger the animations
            });
        }
    });
}, observerOptions);

// Observe all project items
document.querySelectorAll('.project-item').forEach(item => {
    projectObserver.observe(item);
}); 