// ===================================
// Share Story Modal Functionality
// ===================================

// Google Apps Script Web App URL
// IMPORTANT: Replace this with your actual Google Apps Script Web App URL
// See GOOGLE_APPS_SCRIPT_SETUP.md for instructions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvjw5yxcFgGk1h3g8aCwm3w24WdJROcU8qkHlZCbLho1C6zFNv8r6S1SazRlCS4KdJFw/exec';

const modal = document.getElementById('shareStoryModal');
const shareStoryForm = document.getElementById('shareStoryForm');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const petTypeSelect = document.getElementById('petType');
const petBreedSelect = document.getElementById('petBreed');
const otherBreedGroup = document.getElementById('otherBreedGroup');
const otherBreedInput = document.getElementById('otherBreed');

// Breed lists from quiz data
const dogBreeds = [
    "Golden Retriever", "Labrador Retriever", "German Shepherd", "Beagle", "Pug",
    "Boxer", "Chihuahua", "Cocker Spaniel", "Dachshund", "Dalmatian",
    "Doberman Pinscher", "English Bulldog", "French Bulldog", "Great Dane",
    "Indian Pariah Dog (Indie)", "Indian Spitz", "Maltese", "Mudhol Hound",
    "Pomeranian", "Poodle", "Rajapalayam Dog", "Rottweiler", "Saint Bernard",
    "Shih Tzu", "Siberian Husky", "Tibetan Mastiff"
];

const catBreeds = [
    "Persian Cat", "Siamese Cat", "Maine Coon", "British Shorthair Cat",
    "Bengal Cat", "Abyssinian Cat", "Himalayan Cat", "Indie Cat",
    "Ragdoll Cat", "Scottish Fold", "Sphynx Cat"
];

// Open modal when "Share Your Story" button is clicked
document.addEventListener('click', (e) => {
    if (e.target.closest('.share-story-cta .btn') ||
        e.target.closest('a[href*="#contact"]')?.textContent.includes('Share Your Story') ||
        e.target.closest('#shareStoryBtnTop') ||
        e.target.closest('.share-story-btn-top')) {
        e.preventDefault();
        openModal();
    }
});

// Also add direct listener for the top button
document.addEventListener('DOMContentLoaded', () => {
    const shareStoryBtnTop = document.getElementById('shareStoryBtnTop');
    if (shareStoryBtnTop) {
        shareStoryBtnTop.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
});

// ===================================
// Initialize Breed Dropdown
// ===================================
function populateBreedDropdown(petType) {
    petBreedSelect.innerHTML = '<option value="">Select breed</option>';
    
    const breeds = petType === 'dog' ? dogBreeds : catBreeds;
    
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        petBreedSelect.appendChild(option);
    });
    
    // Add "Other" option
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = 'Other (please specify)';
    petBreedSelect.appendChild(otherOption);
}

// Handle pet type change
petTypeSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        populateBreedDropdown(e.target.value);
        petBreedSelect.disabled = false;
    } else {
        petBreedSelect.innerHTML = '<option value="">Select breed</option>';
        petBreedSelect.disabled = true;
        otherBreedGroup.style.display = 'none';
    }
});

// Handle breed selection
petBreedSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherBreedGroup.style.display = 'block';
        otherBreedInput.required = true;
    } else {
        otherBreedGroup.style.display = 'none';
        otherBreedInput.required = false;
        otherBreedInput.value = '';
    }
});

// ===================================
// Modal Controls
// ===================================
function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    petBreedSelect.disabled = true;
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    shareStoryForm.reset();
    imagePreview.style.display = 'none';
    otherBreedGroup.style.display = 'none';
    petBreedSelect.disabled = true;
    petBreedSelect.innerHTML = '<option value="">Select breed</option>';
}

// Close modal events
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close on overlay click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// ===================================
// Form Validation and Submission
// ===================================
shareStoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate story length
    const storyContent = document.getElementById('storyContent').value;
    if (storyContent.length < 100) {
        alert('Please write at least 100 characters for your story.');
        return;
    }
    
    // Validate consent
    if (!document.getElementById('consent').checked) {
        alert('Please agree to the consent terms.');
        return;
    }
    
    // Handle "Other" breed
    let finalBreed = petBreedSelect.value;
    if (petBreedSelect.value === 'other' && otherBreedInput.value) {
        finalBreed = otherBreedInput.value;
    }
    
    // Get form data
    const formData = {
        petName: document.getElementById('petName').value,
        petType: document.getElementById('petType').value,
        petBreed: finalBreed,
        ownerName: document.getElementById('ownerName').value,
        storyTitle: document.getElementById('storyTitle').value,
        storyText: storyContent,
        email: document.getElementById('email').value,
        photoUrl: document.getElementById('photoUrl').value || ''
    };
    
    // Show loading state
    const submitBtn = shareStoryForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            throw new Error('Google Apps Script URL not configured. Please see GOOGLE_APPS_SCRIPT_SETUP.md');
        }
        
        // Submit to Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Note: With no-cors mode, we can't read the response
        // But if we get here without error, the submission likely succeeded
        showSuccessConfirmation(formData.ownerName);
        
    } catch (error) {
        console.error('Submission error:', error);
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Show error message
        alert('Sorry, there was an error submitting your story. Please try again or contact us directly.');
    }
});

// ===================================
// Helper Functions
// ===================================
function showSuccessConfirmation(name) {
    const modalBody = document.querySelector('#shareStoryModal .modal-body');
    const originalContent = modalBody.innerHTML;
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
            <div style="background: linear-gradient(135deg, #27AE60, #50C878); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <i class="fas fa-check-circle" style="font-size: 3.5rem; color: white;"></i>
            </div>
            
            <h2 style="color: #27AE60; font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-heading);">
                Story Submitted Successfully!
            </h2>
            
            <p style="color: #2C3E50; font-size: 1.125rem; margin-bottom: 0.5rem; font-weight: 600;">
                Thank you, ${name}!
            </p>
            
            <p style="color: #7F8C8D; font-size: 1rem; margin-bottom: 2rem; line-height: 1.6;">
                Your success story has been sent to our team.<br>
                We'll review it and add it to our website soon!<br>
                <small style="display: block; margin-top: 0.5rem; font-size: 0.9rem;">Check your email for confirmation.</small>
            </p>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="addAnotherStory" class="btn btn-primary" style="min-width: 200px;">
                    <i class="fas fa-plus-circle"></i> Share Another Story
                </button>
                <button id="backToStories" class="btn btn-secondary" style="min-width: 200px; background: #3498DB; border-color: #3498DB; color: white;">
                    <i class="fas fa-arrow-left"></i> Back to Stories
                </button>
            </div>
            
            <button id="goToHome" style="margin-top: 1rem; background: none; border: none; color: #7F8C8D; text-decoration: underline; cursor: pointer; font-size: 0.95rem;">
                <i class="fas fa-home"></i> Go to Homepage
            </button>
        </div>
    `;
    
    document.getElementById('addAnotherStory').addEventListener('click', () => {
        modalBody.innerHTML = originalContent;
        const newCancelBtn = document.getElementById('cancelBtn');
        newCancelBtn.addEventListener('click', closeModal);
        shareStoryForm.reset();
        imagePreview.style.display = 'none';
        otherBreedGroup.style.display = 'none';
        petBreedSelect.disabled = true;
        petBreedSelect.innerHTML = '<option value="">Select breed</option>';
        initializeCharCounter();
    });
    
    document.getElementById('backToStories').addEventListener('click', () => {
        closeModal();
    });
    
    document.getElementById('goToHome').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function initializeCharCounter() {
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    const storyGroup = storyContent.closest('.form-group');
    const existingCounter = storyGroup.querySelector('small:last-child');
    if (existingCounter && existingCounter.textContent.includes('characters')) {
        existingCounter.remove();
    }
    
    const charCounter = document.createElement('small');
    charCounter.style.cssText = 'display: block; margin-top: 0.5rem; color: var(--gray);';
    storyGroup.appendChild(charCounter);
    
    storyContent.addEventListener('input', () => {
        const length = storyContent.value.length;
        const remaining = Math.max(0, 100 - length);
        
        if (length < 100) {
            charCounter.textContent = `${remaining} more characters needed (minimum 100)`;
            charCounter.style.color = '#E74C3C';
        } else {
            charCounter.textContent = `${length} characters (looks great!)`;
            charCounter.style.color = '#27AE60';
        }
    });
}

// ===================================
// Form Input Validation (Real-time)
// ===================================
const formInputs = shareStoryForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = '#BDC3C7';
        }
    });
    
    input.addEventListener('invalid', () => {
        input.style.borderColor = '#E74C3C';
    });
});

// Initialize character counter on page load
initializeCharCounter();

console.log('%c📝 Share Story Modal Ready', 'color: #4A90E2; font-size: 14px; font-weight: bold;');