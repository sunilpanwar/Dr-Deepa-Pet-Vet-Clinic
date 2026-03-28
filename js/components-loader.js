/**
 * Components Loader - Dynamically loads common header and footer across all pages
 * This ensures consistent navigation and footer across the entire website
 * Loads components BEFORE showing page content to prevent flash of unstyled content
 */

(function() {
    'use strict';
    
    /**
     * Load header and footer HTML from includes folder
     * Uses async/await to ensure proper loading order
     */
    async function loadComponents() {
        try {
            // Load header first
            await loadHeader();
            
            // Then load footer
            await loadFooter();
            
            console.log('✅ Header and Footer loaded successfully');
            
            // Trigger custom event to notify other scripts that components are ready
            window.dispatchEvent(new Event('componentsLoaded'));
        } catch (error) {
            console.error('❌ Error loading components:', error);
            // Still trigger event even on error so page doesn't hang
            window.dispatchEvent(new Event('componentsLoaded'));
        }
    }
    
    /**
     * Load header HTML from includes/header.html
     */
    async function loadHeader() {
        const response = await fetch('includes/header.html');
        
        if (!response.ok) {
            throw new Error('Header file not found');
        }
        
        const html = await response.text();
        
        // Insert header at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', html);
        
        // Initialize header functionality
        initializeHeader();
        setActiveNavLink();
    }
    
    /**
     * Load footer HTML from includes/footer.html
     */
    async function loadFooter() {
        const response = await fetch('includes/footer.html');
        
        if (!response.ok) {
            throw new Error('Footer file not found');
        }
        
        const html = await response.text();
        
        // Insert footer at the end of body
        document.body.insertAdjacentHTML('beforeend', html);
        
        // Initialize footer functionality
        initializeFooter();
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
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Update active link on hash change (for single-page navigation)
        window.addEventListener('hashchange', setActiveNavLink);
    }
    
    /**
     * Initialize footer functionality (scroll to top button)
     */
    function initializeFooter() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            // Show/hide scroll to top button
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            // Scroll to top on click
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Load components when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
    
    console.log('%c🔧 Components Loader Ready', 'color: #4A90E2; font-size: 14px; font-weight: bold;');
})();