// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            console.log('Container is now visible');
        } else {
            entry.target.classList.remove('is-visible');
            console.log('Container is not visible');
        }
    });
}, observerOptions);

// Initialize code containers
function initializeCodeContainers() {
    const codeContainers = document.querySelectorAll('.code-animation-container');
    console.log('Found code containers:', codeContainers.length);
    
    codeContainers.forEach(container => {
        // Set initial state
        container.style.display = 'flex';
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        container.classList.add('is-visible');
        
        const codeWindow = container.querySelector('.code-window');
        if (codeWindow) {
            codeWindow.style.opacity = '1';
            codeWindow.style.visibility = 'visible';
        }
        
        console.log('Container initialized');
    });
}

// Run initialization immediately
initializeCodeContainers();

// Also run when DOM is fully loaded to ensure we catch all containers
document.addEventListener('DOMContentLoaded', initializeCodeContainers); 