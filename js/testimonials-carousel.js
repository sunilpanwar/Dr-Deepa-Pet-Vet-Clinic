// Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.currentPage = 0;
        this.itemsPerPage = 3;
        this.testimonialCards = [];
        this.totalPages = 0;
        this.init();
    }

    init() {
        // Get all testimonial cards
        this.testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
        this.totalPages = Math.ceil(this.testimonialCards.length / this.itemsPerPage);

        // Add read more functionality to all cards
        this.addReadMoreButtons();

        // Create carousel wrapper
        this.createCarouselStructure();
        
        // Show initial page
        this.showPage(0);
        
        // Add event listeners
        this.addEventListeners();
    }

    addReadMoreButtons() {
        this.testimonialCards.forEach(card => {
            // Find the paragraph that contains the review text (not the footer)
            const paragraphs = card.querySelectorAll('p');
            let paragraph = null;
            
            // Get the first paragraph (review text), skip if it's in footer
            for (let p of paragraphs) {
                if (!p.closest('.testimonial-footer')) {
                    paragraph = p;
                    break;
                }
            }
            
            if (!paragraph) return;

            // Check if already processed
            if (paragraph.querySelector('.testimonial-text')) return;

            // Wrap text in a div for better control
            const textContent = paragraph.textContent.trim();
            paragraph.innerHTML = '';
            
            const textDiv = document.createElement('div');
            textDiv.className = 'testimonial-text';
            textDiv.textContent = textContent;
            
            paragraph.appendChild(textDiv);

            // Check if text is long enough to need "Read More"
            // Approximate: if text is longer than 150 characters, add button
            if (textContent.length > 150) {
                const readMoreBtn = document.createElement('button');
                readMoreBtn.className = 'read-more-btn';
                readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
                
                readMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    textDiv.classList.toggle('expanded');
                    readMoreBtn.classList.toggle('expanded');
                    
                    if (textDiv.classList.contains('expanded')) {
                        readMoreBtn.innerHTML = 'Read Less <i class="fas fa-chevron-down"></i>';
                    } else {
                        readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
                    }
                });
                
                paragraph.appendChild(readMoreBtn);
            }
        });
    }

    createCarouselStructure() {
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        
        // Wrap grid in carousel container
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'testimonials-carousel-container';
        
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'testimonials-carousel-wrapper';
        
        // Move grid into wrapper
        testimonialsGrid.parentNode.insertBefore(carouselContainer, testimonialsGrid);
        carouselWrapper.appendChild(testimonialsGrid);
        carouselContainer.appendChild(carouselWrapper);
        
        // Create navigation
        const navigation = document.createElement('div');
        navigation.className = 'carousel-navigation';
        navigation.innerHTML = `
            <button class="carousel-btn carousel-prev" aria-label="Previous reviews">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-dots"></div>
            <button class="carousel-btn carousel-next" aria-label="Next reviews">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        carouselContainer.appendChild(navigation);
        
        // Create dots
        this.createDots();
    }

    createDots() {
        const dotsContainer = document.querySelector('.carousel-dots');
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.dataset.page = i;
            
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dotsContainer.appendChild(dot);
        }
    }

    addEventListeners() {
        // Previous button
        document.querySelector('.carousel-prev').addEventListener('click', () => {
            this.previousPage();
        });
        
        // Next button
        document.querySelector('.carousel-next').addEventListener('click', () => {
            this.nextPage();
        });
        
        // Dots
        document.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                this.showPage(page);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        const carouselWrapper = document.querySelector('.testimonials-carousel-wrapper');
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.nextPage();
            }
            if (touchEndX > touchStartX + 50) {
                this.previousPage();
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

    showPage(pageNumber) {
        // Validate page number
        if (pageNumber < 0 || pageNumber >= this.totalPages) {
            return;
        }
        
        this.currentPage = pageNumber;
        
        // Hide all cards
        this.testimonialCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('carousel-active');
        });
        
        // Show cards for current page
        const startIndex = pageNumber * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.testimonialCards.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            this.testimonialCards[i].style.display = 'block';
            // Add animation class
            setTimeout(() => {
                this.testimonialCards[i].classList.add('carousel-active');
            }, 50);
        }
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            if (index === pageNumber) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update button states
        this.updateButtonStates();
    }

    updateButtonStates() {
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        // Disable prev button on first page
        if (this.currentPage === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.disabled = true;
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.disabled = false;
        }
        
        // Disable next button on last page
        if (this.currentPage === this.totalPages - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.disabled = false;
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.showPage(this.currentPage + 1);
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.showPage(this.currentPage - 1);
        }
    }
}

// Make TestimonialsCarousel available globally
window.TestimonialsCarousel = TestimonialsCarousel;

// Don't auto-initialize - let load-reviews.js initialize after loading reviews
// The carousel will be initialized by load-reviews.js after reviews are loaded
console.log('TestimonialsCarousel: Class loaded, waiting for reviews...');