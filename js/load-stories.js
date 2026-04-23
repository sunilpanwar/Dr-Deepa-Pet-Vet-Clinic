/**
 * Dynamic Stories Loader
 * Loads success stories from JSON file and renders them dynamically
 */

class StoriesLoader {
    constructor() {
        // Get JSON URL from config
        this.jsonUrl = window.CONFIG?.STORIES_JSON_URL || 'data/stories.json';
        
        this.storiesGrid = document.getElementById('storiesGrid');
        this.stories = [];
        
        this.init();
    }
    
    async init() {
        //console.log('📖 Loading success stories...');
        await this.loadStories();
    }
    
    async loadStories() {
        try {
            const response = await fetch(this.jsonUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.stories = await response.json();
            //console.log(`✅ Loaded ${this.stories.length} stories successfully`);
            
            this.renderStories();
            
        } catch (error) {
            console.error('❌ Error loading stories:', error);
            this.showError();
        }
    }
    
    renderStories() {
        if (!this.storiesGrid) {
            console.error('Stories grid element not found');
            return;
        }
        
        // Clear existing content
        this.storiesGrid.innerHTML = '';
        
        // Render each story
        this.stories.forEach(story => {
            const storyCard = this.createStoryCard(story);
            this.storiesGrid.appendChild(storyCard);
        });
        
        //console.log(`✅ Rendered ${this.stories.length} story cards`);
    }
    
    createStoryCard(story) {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.setAttribute('data-category', story.category);
        
        // Determine pet icon
        const petIcon = story.petType === 'dog' ? 'fa-dog' : 'fa-cat';
        
        card.innerHTML = `
            <div class="story-image">
                <img src="${story.image}" 
                     alt="${story.petName} the ${story.breed}" 
                     onerror="this.src='${story.fallbackImage}'">
                <div class="story-badge">${story.badge}</div>
            </div>
            <div class="story-content">
                <h3>${story.title}</h3>
                <p class="story-meta">
                    <i class="fas ${petIcon}"></i> ${story.breed} • ${story.age}
                </p>
                <p class="story-text">${story.story}</p>
                <div class="story-footer">
                    <span class="story-date">
                        <i class="fas fa-calendar"></i> ${story.date}
                    </span>
                    <span class="story-outcome">
                        <i class="fas fa-heart"></i> ${story.outcome}
                    </span>
                </div>
            </div>
        `;
        
        return card;
    }
    
    showError() {
        if (!this.storiesGrid) return;
        
        this.storiesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #E74C3C; margin-bottom: 1rem;"></i>
                <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Unable to Load Stories</h3>
                <p style="color: #7F8C8D;">Please make sure you're running a local server.</p>
                <p style="color: #7F8C8D; font-size: 0.9rem; margin-top: 1rem;">
                    See <strong>START_SERVER.md</strong> for instructions.
                </p>
            </div>
        `;
    }
    
    // Method to get stories by category (for filtering)
    getStoriesByCategory(category) {
        if (category === 'all') {
            return this.stories;
        }
        return this.stories.filter(story => story.category === category);
    }
    
    // Method to search stories
    searchStories(query) {
        const lowerQuery = query.toLowerCase();
        return this.stories.filter(story => 
            story.title.toLowerCase().includes(lowerQuery) ||
            story.petName.toLowerCase().includes(lowerQuery) ||
            story.breed.toLowerCase().includes(lowerQuery) ||
            story.story.toLowerCase().includes(lowerQuery)
        );
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.storiesLoader = new StoriesLoader();
});

//console.log('%c📖 Stories Loader Ready', 'color: #4A90E2; font-size: 14px; font-weight: bold;');