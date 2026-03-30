// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Sticky Header on Scroll
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// Appointment Form Validation & Submission
// ===================================
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(appointmentForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const requiredFields = ['petOwnerName', 'email', 'phone', 'petName', 'petType', 'appointmentDate', 'appointmentTime', 'service'];
        
        requiredFields.forEach(field => {
            const input = appointmentForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#E74C3C';
            } else {
                input.style.borderColor = '#BDC3C7';
            }
        });
        
        // Email validation
        const emailInput = appointmentForm.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#E74C3C';
        }
        
        // Phone validation (basic)
        const phoneInput = appointmentForm.querySelector('[name="phone"]');
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phoneInput.value) || phoneInput.value.length < 10) {
            isValid = false;
            phoneInput.style.borderColor = '#E74C3C';
        }
        
        // Date validation (not in the past)
        const dateInput = appointmentForm.querySelector('[name="appointmentDate"]');
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            dateInput.style.borderColor = '#E74C3C';
            alert('Please select a future date for your appointment.');
        }
        
        if (isValid) {
            // Show success message
            showNotification('Appointment request submitted successfully! We will contact you soon to confirm.', 'success');
            
            // Reset form
            appointmentForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Appointment Data:', data);
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
    
    // Remove error styling on input
    const formInputs = appointmentForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#BDC3C7';
        });
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#4A90E2'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .pet-type-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Gallery Image Modal (Optional Enhancement)
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = createImageModal(img.src, img.alt);
        document.body.appendChild(modal);
    });
});

function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        z-index: 1;
    `;
    
    const img = modal.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.parentElement) {
            closeModal();
        }
    });
    
    return modal;
}

// Add modal animations
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(modalStyle);

// ===================================
// Set minimum date for appointment form
// ===================================
const appointmentDateInput = document.getElementById('appointmentDate');
if (appointmentDateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', minDate);
}

// ===================================
// Rotating Quotes in Hero Section
// ===================================
// NOTE: Quotes are now loaded dynamically from data/quotes.json
// See js/load-quotes.js for the implementation
// The quotes loader handles initialization, rotation, and display automatically

// ===================================
// Success Stories - Load More Functionality
// ===================================
// Note: To add more stories, simply add more .story-card elements in the HTML
// The system will automatically handle showing/hiding them

const loadMoreBtn = document.getElementById('loadMoreBtn');
const storiesGrid = document.querySelector('.stories-grid');
const viewMoreSection = document.getElementById('viewMoreStories');

if (loadMoreBtn && storiesGrid) {
    // Initially hide stories beyond the first 2
    const allStories = storiesGrid.querySelectorAll('.story-card');
    const initialDisplay = 2;
    
    // Hide stories beyond initial display count
    allStories.forEach((story, index) => {
        if (index >= initialDisplay) {
            story.style.display = 'none';
            story.setAttribute('data-hidden', 'true');
        }
    });
    
    // Update counter
    updateStoriesCounter();
    
    // Show/hide the "View More" button based on total stories
    if (allStories.length <= initialDisplay) {
        viewMoreSection.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', () => {
        const hiddenStories = storiesGrid.querySelectorAll('.story-card[data-hidden="true"]');
        const loadCount = 3; // Load 3 more stories at a time
        
        // Show next batch of stories
        for (let i = 0; i < Math.min(loadCount, hiddenStories.length); i++) {
            hiddenStories[i].style.display = 'flex';
            hiddenStories[i].removeAttribute('data-hidden');
            
            // Add fade-in animation
            hiddenStories[i].style.opacity = '0';
            hiddenStories[i].style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                hiddenStories[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                hiddenStories[i].style.opacity = '1';
                hiddenStories[i].style.transform = 'translateY(0)';
            }, i * 100);
        }
        
        // Update counter
        updateStoriesCounter();
        
        // Hide button if all stories are shown
        const remainingHidden = storiesGrid.querySelectorAll('.story-card[data-hidden="true"]');
        if (remainingHidden.length === 0) {
            loadMoreBtn.innerHTML = '<i class="fas fa-check-circle"></i> All Stories Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.6';
            loadMoreBtn.style.cursor = 'not-allowed';
        }
    });
}

function updateStoriesCounter() {
    if (!storiesGrid) return;
    
    const totalStories = storiesGrid.querySelectorAll('.story-card').length;
    const visibleStories = storiesGrid.querySelectorAll('.story-card:not([data-hidden="true"])').length;
    
    const storiesShownEl = document.getElementById('storiesShown');
    const totalStoriesEl = document.getElementById('totalStories');
    
    if (storiesShownEl) storiesShownEl.textContent = visibleStories;
    if (totalStoriesEl) totalStoriesEl.textContent = totalStories;
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🐾 Dr. Deepa Pet Vet Clinic', 'color: #4A90E2; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #50C878; font-size: 14px;');
console.log('%cFor appointments, call: +91 98765 43210', 'color: #7F8C8D; font-size: 12px;');