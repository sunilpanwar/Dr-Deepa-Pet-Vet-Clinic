// Load and display quotes from JSON file
class QuotesLoader {
    constructor() {
        this.quotes = [];
        this.currentQuoteIndex = 0;
        this.rotationInterval = null;
        
        // Get JSON URL from config
        this.jsonUrl = window.CONFIG?.QUOTES_JSON_URL || 'data/quotes.json';
        
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        
        this.init();
    }

    async init() {
        //console.log('QuotesLoader: Initializing...');
        await this.loadQuotes();
        if (this.quotes.length > 0) {
            this.startQuoteRotation();
            //console.log(`QuotesLoader: Loaded ${this.quotes.length} quotes`);
        } else {
            console.warn('QuotesLoader: No quotes loaded');
        }
    }

    async loadQuotes() {
        try {
            //console.log(`QuotesLoader: Fetching ${this.jsonUrl}...`);
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.quotes = await response.json();
            //console.log('QuotesLoader: Successfully loaded quotes:', this.quotes);
        } catch (error) {
            console.error('QuotesLoader Error:', error);
            // Fallback to empty array if loading fails
            this.quotes = [];
        }
    }

    displayQuote(index) {
        if (this.quoteText && this.quoteAuthor && this.quotes.length > 0) {
            // Remove fade-out class
            this.quoteText.classList.remove('fade-out');
            this.quoteAuthor.classList.remove('fade-out');
            
            // Set the new quote
            this.quoteText.textContent = this.quotes[index].text;
            this.quoteAuthor.textContent = `— ${this.quotes[index].author}`;
        }
    }

    rotateQuote() {
        if (this.quoteText && this.quoteAuthor && this.quotes.length > 0) {
            // Add fade-out class
            this.quoteText.classList.add('fade-out');
            this.quoteAuthor.classList.add('fade-out');
            
            // Wait for fade-out animation to complete, then change quote
            setTimeout(() => {
                this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
                this.displayQuote(this.currentQuoteIndex);
            }, 500); // Match the fadeOut animation duration
        }
    }

    startQuoteRotation() {
        if (!this.quoteText || !this.quoteAuthor || this.quotes.length === 0) {
            //console.warn('QuotesLoader: Cannot start rotation - missing elements or quotes');
            return;
        }

        // Display first quote
        this.displayQuote(0);
        
        // Rotate quotes every 15 seconds (15000ms)
        this.rotationInterval = setInterval(() => {
            this.rotateQuote();
        }, 15000);
        
        //console.log('QuotesLoader: Quote rotation started (15s interval)');
    }

    stopQuoteRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
            //console.log('QuotesLoader: Quote rotation stopped');
        }
    }
}

// Initialize quotes loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quoteText') && document.getElementById('quoteAuthor')) {
        window.quotesLoader = new QuotesLoader();
    }
});

// Also listen for componentsLoaded event if using components loader
window.addEventListener('componentsLoaded', () => {
    if (document.getElementById('quoteText') && document.getElementById('quoteAuthor') && !window.quotesLoader) {
        window.quotesLoader = new QuotesLoader();
    }
});