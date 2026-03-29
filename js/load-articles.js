/**
 * Articles Loader
 * Dynamically loads and displays articles from data/articles.json
 */

class ArticlesLoader {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.jsonUrl = 'https://gist.githubusercontent.com/sunilpanwar/fa4e354dc34faf45136f9eed89d07c7c/raw/d3f24571647fdf34dfd2a05960579a667f6cce42/articles.json';
    }

    async init() {
        try {
            await this.loadArticles();
            this.setupEventListeners();
            this.displayArticles();
        } catch (error) {
            console.error('Error initializing articles:', error);
            this.showError();
        }
    }

    async loadArticles() {
        try {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.articles = await response.json();
            this.filteredArticles = [...this.articles];
            console.log(`Loaded ${this.articles.length} articles successfully`);
        } catch (error) {
            console.error('Error loading articles:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Apply filter
                this.currentFilter = btn.dataset.filter;
                this.applyFilters();
            });
        });

        // Search box
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
            searchBox.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Modal close
        const closeModal = document.getElementById('closeModal');
        const articleModal = document.getElementById('articleModal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                articleModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close modal on overlay click
        if (articleModal) {
            articleModal.addEventListener('click', (e) => {
                if (e.target === articleModal) {
                    articleModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && articleModal.classList.contains('active')) {
                articleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Share buttons
        this.setupShareButtons();
    }

    setupShareButtons() {
        const shareFacebook = document.getElementById('shareFacebook');
        const shareTwitter = document.getElementById('shareTwitter');
        const shareWhatsapp = document.getElementById('shareWhatsapp');
        const shareLinkedin = document.getElementById('shareLinkedin');
        const shareEmail = document.getElementById('shareEmail');
        const shareCopy = document.getElementById('shareCopy');

        if (shareFacebook) {
            shareFacebook.addEventListener('click', () => this.shareOnFacebook());
        }
        if (shareTwitter) {
            shareTwitter.addEventListener('click', () => this.shareOnTwitter());
        }
        if (shareWhatsapp) {
            shareWhatsapp.addEventListener('click', () => this.shareOnWhatsapp());
        }
        if (shareLinkedin) {
            shareLinkedin.addEventListener('click', () => this.shareOnLinkedin());
        }
        if (shareEmail) {
            shareEmail.addEventListener('click', () => this.shareViaEmail());
        }
        if (shareCopy) {
            shareCopy.addEventListener('click', () => this.copyLink());
        }
    }

    applyFilters() {
        this.filteredArticles = this.articles.filter(article => {
            // Category filter
            const matchesCategory = this.currentFilter === 'all' || 
                                   article.category === this.currentFilter;
            
            // Search filter
            const matchesSearch = this.searchQuery === '' ||
                                 article.title.toLowerCase().includes(this.searchQuery) ||
                                 article.excerpt.toLowerCase().includes(this.searchQuery) ||
                                 article.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
            
            return matchesCategory && matchesSearch;
        });

        this.displayArticles();
        this.updateResultsInfo();
    }

    displayArticles() {
        const grid = document.getElementById('articlesGrid');
        if (!grid) return;

        if (this.filteredArticles.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--light-gray); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--gray); margin-bottom: 0.5rem;">No articles found</h3>
                    <p style="color: var(--gray);">Try adjusting your filters or search query</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredArticles.map(article => this.createArticleCard(article)).join('');

        // Add click listeners to article cards
        const articleCards = grid.querySelectorAll('.article-card');
        articleCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.openArticle(this.filteredArticles[index]);
            });
        });
    }

    createArticleCard(article) {
        const categoryIcons = {
            health: 'fa-heartbeat',
            nutrition: 'fa-utensils',
            preventive: 'fa-shield-alt',
            dental: 'fa-tooth',
            seasonal: 'fa-sun'
        };

        const categoryIcon = categoryIcons[article.category] || 'fa-file-alt';

        return `
            <div class="article-card" data-id="${article.id}">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" onerror="this.src='images/quiz/dog/golden-retriever.jpg'">
                    <div class="article-category">
                        <i class="fas ${categoryIcon}"></i> ${this.formatCategory(article.category)}
                    </div>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span><i class="fas fa-user"></i> ${article.author}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a class="read-more-btn">
                        Read Full Article <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }

    openArticle(article) {
        const modal = document.getElementById('articleModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalMeta = document.getElementById('modalMeta');
        const modalContent = document.getElementById('modalContent');

        // Store current article for sharing
        this.currentArticle = article;

        // Set content
        modalImage.src = article.image;
        modalImage.alt = article.title;
        modalTitle.textContent = article.title;
        
        modalMeta.innerHTML = `
            <span><i class="fas fa-user"></i> ${article.author}</span>
            <span><i class="fas fa-calendar"></i> ${this.formatDate(article.date)}</span>
            <span><i class="fas fa-clock"></i> ${article.readTime}</span>
            <span><i class="fas fa-tag"></i> ${this.formatCategory(article.category)}</span>
        `;

        // Format content with proper HTML
        modalContent.innerHTML = this.formatArticleContent(article.content);

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Scroll to top of modal
        modal.scrollTop = 0;
    }

    formatArticleContent(content) {
        // Convert markdown-style formatting to HTML
        let formatted = content
            // Headers
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Paragraphs
            .split('\n\n')
            .map(para => {
                if (para.trim().startsWith('**') && para.trim().endsWith('**')) {
                    return `<h3>${para.replace(/\*\*/g, '')}</h3>`;
                } else if (para.trim().match(/^\d+\./)) {
                    // Numbered list
                    const items = para.split('\n').map(item => {
                        const match = item.match(/^\d+\.\s*\*\*(.*?)\*\*(.*)/);
                        if (match) {
                            return `<li><strong>${match[1]}</strong>${match[2]}</li>`;
                        }
                        return `<li>${item.replace(/^\d+\.\s*/, '')}</li>`;
                    }).join('');
                    return `<ol>${items}</ol>`;
                } else if (para.trim().startsWith('-') || para.trim().startsWith('•')) {
                    // Bullet list
                    const items = para.split('\n').map(item => 
                        `<li>${item.replace(/^[-•]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
                    ).join('');
                    return `<ul>${items}</ul>`;
                } else if (para.trim().startsWith('✓') || para.trim().startsWith('❌')) {
                    // Checklist
                    const items = para.split('\n').map(item => {
                        const icon = item.startsWith('✓') ? '✓' : '❌';
                        return `<li>${item.replace(/^[✓❌]\s*/, icon + ' ')}</li>`;
                    }).join('');
                    return `<ul style="list-style: none; padding-left: 0;">${items}</ul>`;
                } else {
                    return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                }
            })
            .join('');

        return formatted;
    }

    formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    updateResultsInfo() {
        const showingCount = document.getElementById('showingCount');
        const totalCount = document.getElementById('totalCount');
        
        if (showingCount) showingCount.textContent = this.filteredArticles.length;
        if (totalCount) totalCount.textContent = this.articles.length;
    }

    shareOnFacebook() {
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    shareOnTwitter() {
        const text = encodeURIComponent(this.currentArticle.title);
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    shareOnWhatsapp() {
        const text = encodeURIComponent(`${this.currentArticle.title}\n\n${window.location.href}`);
        const shareUrl = `https://wa.me/?text=${text}`;
        window.open(shareUrl, '_blank');
    }

    shareOnLinkedin() {
        const url = encodeURIComponent(window.location.href);
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    shareViaEmail() {
        const subject = encodeURIComponent(this.currentArticle.title);
        const body = encodeURIComponent(`I thought you might find this article interesting:\n\n${this.currentArticle.title}\n\n${this.currentArticle.excerpt}\n\nRead more: ${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    async copyLink() {
        const copyBtn = document.getElementById('shareCopy');
        const copyIcon = copyBtn.querySelector('i');
        
        try {
            await navigator.clipboard.writeText(window.location.href);
            
            // Visual feedback
            copyBtn.classList.add('copied');
            copyIcon.className = 'fas fa-check';
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyIcon.className = 'fas fa-link';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                copyBtn.classList.add('copied');
                copyIcon.className = 'fas fa-check';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyIcon.className = 'fas fa-link';
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    }

    showError() {
        const grid = document.getElementById('articlesGrid');
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--danger); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark-color); margin-bottom: 0.5rem;">Error Loading Articles</h3>
                    <p style="color: var(--gray); margin-bottom: 1rem;">We couldn't load the articles. Please try refreshing the page.</p>
                    <p style="color: var(--gray); font-size: 0.875rem;">Make sure you're running a local server (see START_SERVER.md)</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new ArticlesLoader();
        loader.init();
    });
} else {
    const loader = new ArticlesLoader();
    loader.init();
}