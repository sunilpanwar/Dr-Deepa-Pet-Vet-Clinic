// Load and display reviews from JSON file
class ReviewsLoader {
    constructor() {
        this.reviews = [];
        
        // Get JSON URL from config
        this.jsonUrl = window.CONFIG?.REVIEWS_JSON_URL || 'data/reviews.json';
        
        this.init();
    }

    async init() {
        //console.log('ReviewsLoader: Initializing...');
        await this.loadReviews();
        if (this.reviews.length > 0) {
            this.renderReviews();
            //console.log(`ReviewsLoader: Loaded ${this.reviews.length} reviews`);
        } else {
            console.warn('ReviewsLoader: No reviews loaded');
        }
    }

    async loadReviews() {
        try {
            //console.log(`ReviewsLoader: Fetching ${this.jsonUrl}...`);
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.reviews = await response.json();
            //console.log('ReviewsLoader: Successfully loaded reviews:', this.reviews);
        } catch (error) {
            console.error('ReviewsLoader Error:', error);
            // Fallback to empty array if loading fails
            this.reviews = [];
        }
    }

    renderReviews() {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        if (!testimonialsGrid) {
            console.error('ReviewsLoader: .testimonials-grid not found!');
            return;
        }

        // Clear existing reviews
        testimonialsGrid.innerHTML = '';
        //console.log('ReviewsLoader: Rendering reviews...');

        // Render each review
        this.reviews.forEach(review => {
            const card = this.createReviewCard(review);
            testimonialsGrid.appendChild(card);
        });

        //console.log(`ReviewsLoader: Rendered ${this.reviews.length} review cards`);

        // Trigger carousel initialization after reviews are loaded
        // Wait a bit for DOM to update
        setTimeout(() => {
            if (window.TestimonialsCarousel) {
                //console.log('ReviewsLoader: Initializing carousel...');
                new window.TestimonialsCarousel();
            }
        }, 100);
    }

    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        // Create stars HTML
        const starsHTML = this.createStarsHTML(review.rating);

        // Check if review has a URL link (stored in image field or separate reviewUrl field)
        const reviewLink = review.reviewUrl || review.image;
        
        card.innerHTML = `
            <div class="testimonial-header">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=4A90E2&color=fff" alt="${review.name}">
                <div class="testimonial-info" style="cursor: pointer;" onclick="window.open('${reviewLink}', '_blank', 'noopener,noreferrer')">
                    <h4 style="transition: color 0.3s ease;">${review.name}</h4>
                    <div class="testimonial-rating">
                        ${starsHTML}
                    </div>
                </div>
            </div>
            <p>${review.review}</p>
            <div class="testimonial-footer">
                <i class="fab fa-google"></i>
                <span>Google Review</span>
            </div>
        `;

        // Add hover effect to testimonial-info
        const testimonialInfo = card.querySelector('.testimonial-info');
        if (testimonialInfo) {
            testimonialInfo.addEventListener('mouseenter', function() {
                this.querySelector('h4').style.color = 'var(--primary-color)';
            });
            testimonialInfo.addEventListener('mouseleave', function() {
                this.querySelector('h4').style.color = '';
            });
        }

        return card;
    }

    createStarsHTML(rating) {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }

        // Add half star if needed
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }

        // Add empty stars to make 5 total
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        return starsHTML;
    }
}

// Initialize reviews loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.testimonials-grid')) {
        new ReviewsLoader();
    }
});