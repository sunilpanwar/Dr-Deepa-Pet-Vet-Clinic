/**
 * Header Loader - Dynamically loads common header across all pages
 * This ensures consistent navigation across the entire website
 */

(function() {
    'use strict';
    
    /**
     * Load header HTML from includes/header.html
     */
    function loadHeader() {
        fetch('includes/header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Header file not found');
                }
                return response.text();
            })
            .then(html => {
                // Insert header at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', html);
                
                // Initialize header functionality
                initializeHeader();
                setActiveNavLink();
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }
    
    /**
     * Set active navigation link based on current page
     */
    function setActiveNavLink() {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if this link matches the current page
            const linkPage = link.getAttribute('data-page');
            const linkHref = link.getAttribute('href');
            
            // For index.html or root
            if (currentPage === 'index' || currentPage === '') {
                // Check if we're on a specific section
                const hash = window.location.hash;
                if (hash && linkHref.includes(hash)) {
                    link.classList.add('active');
                } else if (!hash && linkPage === 'home') {
                    link.classList.add('active');
                }
            }
            // For other pages
            else if (linkHref.includes(currentPage + '.html')) {
                link.classList.add('active');
            }
        });
    }
    
    /**
     * Get current page name from URL
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    }
    
    /**
     * Initialize header functionality (mobile menu, scroll effects, etc.)
     */
    function initializeHeader() {
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
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
                if (!e.target.closest('.nav-wrapper')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        }
        
        // Header scroll effect
        let lastScroll = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
        
        // Update active link on hash change (for single-page navigation)
        window.addEventListener('hashchange', setActiveNavLink);
    }
    
    // Load header when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();