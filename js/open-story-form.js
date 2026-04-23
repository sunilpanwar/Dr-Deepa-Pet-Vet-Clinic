/**
 * Open Google Apps Script Story Form in Modal
 * Simple script to open the Google-hosted form in an iframe modal
 */

// Get Google Form URL from config - MUST use /exec (production) URL for iframe embedding
// This will be populated from GitHub Secrets during deployment
const GOOGLE_FORM_URL = window.CONFIG?.GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// Create modal HTML
const modalHTML = `
<div id="storyFormModal" class="story-form-modal" style="display: none;">
    <div class="modal-overlay"></div>
    <div class="modal-container">
        <button class="modal-close" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
        <iframe
            id="storyFormIframe"
            src="${GOOGLE_FORM_URL}"
            frameborder="0"
            style="width: 100%; height: 100%; border: none; border-radius: 0 0 20px 20px;">
        </iframe>
    </div>
</div>

<style>
.story-form-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.3s ease;
}

.story-form-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    cursor: pointer;
}

.story-form-modal .modal-container {
    position: relative;
    background: white;
    border-radius: 20px;
    max-width: 900px;
    width: 100%;
    height: 90vh;
    max-height: 800px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    overflow: hidden;
}

.story-form-modal .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2C3E50;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.story-form-modal .modal-close:hover {
    background: #E74C3C;
    color: white;
    transform: rotate(90deg);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .story-form-modal {
        padding: 10px;
    }
    
    .story-form-modal .modal-container {
        height: 95vh;
        max-height: none;
        border-radius: 15px;
    }
}
</style>
`;

/**
 * Open the story form modal
 */
function openStoryFormModal() {
    const modal = document.getElementById('storyFormModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reload iframe to ensure fresh form
        const iframe = document.getElementById('storyFormIframe');
        if (iframe) {
            iframe.src = iframe.src;
        }
    }
}

/**
 * Close the story form modal
 */
function closeStoryFormModal() {
    const modal = document.getElementById('storyFormModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Add modal to page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add modal HTML to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add click event to close button
    const closeBtn = document.querySelector('.story-form-modal .modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeStoryFormModal);
    }
    
    // Add click event to overlay
    const overlay = document.querySelector('.story-form-modal .modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeStoryFormModal);
    }
    
    // Add click listeners to all "Share Your Story" links/buttons
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.share-story-link, .share-story-btn-top, #shareStoryBtnTop, #shareStoryBtn');
        if (target) {
            e.preventDefault();
            openStoryFormModal();
        }
    });
});

// Make functions globally available
window.openStoryFormModal = openStoryFormModal;
window.closeStoryFormModal = closeStoryFormModal;

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStoryFormModal();
    }
});

//console.log('%c📝 Story Form Modal Ready', 'color: #4A90E2; font-size: 14px; font-weight: bold;');