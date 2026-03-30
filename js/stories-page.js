// ===================================
// Stories Page - Pagination, Filtering, and Search
// ===================================

const storiesPerPage = 6;
let currentPage = 1;
let currentFilter = 'all';
let currentSearch = '';
let allStories = [];
let filteredStories = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Wait for stories to be loaded by load-stories.js
    waitForStories();
});

// Wait for stories to be rendered in the DOM
function waitForStories() {
    const checkStories = setInterval(() => {
        const storyCards = document.querySelectorAll('.story-card');
        
        if (storyCards.length > 0) {
            clearInterval(checkStories);
            console.log('✅ Stories loaded, initializing filters and search');
            
            allStories = Array.from(storyCards);
            filteredStories = [...allStories];
            
            initializeFilters();
            initializeSearch();
            updateDisplay();
        }
    }, 100); // Check every 100ms
    
    // Timeout after 10 seconds
    setTimeout(() => {
        clearInterval(checkStories);
        if (allStories.length === 0) {
            console.warn('⚠️ No stories loaded after 10 seconds');
        }
    }, 10000);
}

// ===================================
// Filter Functionality
// ===================================
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter value
            currentFilter = btn.getAttribute('data-filter');
            currentPage = 1; // Reset to first page
            
            // Apply filter
            applyFilters();
        });
    });
}

// ===================================
// Search Functionality
// ===================================
function initializeSearch() {
    const searchBox = document.getElementById('searchBox');
    
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            currentPage = 1; // Reset to first page
            applyFilters();
        });
    }
}

// ===================================
// Apply Filters and Search
// ===================================
function applyFilters() {
    filteredStories = allStories.filter(story => {
        // Filter by category
        const category = story.getAttribute('data-category');
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        
        // Filter by search
        const storyText = story.textContent.toLowerCase();
        const matchesSearch = currentSearch === '' || storyText.includes(currentSearch);
        
        return matchesFilter && matchesSearch;
    });
    
    updateDisplay();
}

// ===================================
// Update Display
// ===================================
function updateDisplay() {
    // Hide all stories first
    allStories.forEach(story => {
        story.style.display = 'none';
    });
    
    // Calculate pagination
    const totalStories = filteredStories.length;
    const totalPages = Math.ceil(totalStories / storiesPerPage);
    const startIndex = (currentPage - 1) * storiesPerPage;
    const endIndex = Math.min(startIndex + storiesPerPage, totalStories);
    
    // Show stories for current page
    for (let i = startIndex; i < endIndex; i++) {
        filteredStories[i].style.display = 'flex';
        
        // Add fade-in animation
        filteredStories[i].style.opacity = '0';
        filteredStories[i].style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            filteredStories[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            filteredStories[i].style.opacity = '1';
            filteredStories[i].style.transform = 'translateY(0)';
        }, (i - startIndex) * 100);
    }
    
    // Update results info
    updateResultsInfo(endIndex, totalStories);
    
    // Update pagination
    updatePagination(totalPages);
    
    // Scroll to top of stories
    if (currentPage > 1) {
        document.querySelector('.stories-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===================================
// Update Results Info
// ===================================
function updateResultsInfo(showing, total) {
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');
    
    if (showingCount) showingCount.textContent = showing;
    if (totalCount) totalCount.textContent = total;
    
    // Show message if no results
    const resultsInfo = document.getElementById('resultsInfo');
    if (total === 0) {
        // Only show "no results" message if user has applied a filter or search
        if (currentFilter !== 'all' || currentSearch !== '') {
            resultsInfo.innerHTML = '<strong style="color: var(--danger);">No stories found matching your criteria</strong>';
        } else {
            // Initial load with no stories - show loading or empty state
            resultsInfo.innerHTML = '<span style="color: var(--gray);">Loading stories...</span>';
        }
    } else {
        resultsInfo.innerHTML = `Showing <strong id="showingCount">${showing}</strong> of <strong id="totalCount">${total}</strong> stories`;
    }
}

// ===================================
// Update Pagination
// ===================================
function updatePagination(totalPages) {
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Clear existing page numbers
    pageNumbers.innerHTML = '';
    
    // Hide pagination if only one page or no results
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    pagination.style.display = 'flex';
    
    // Update prev/next buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Create page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
        addPageButton(1, pageNumbers);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 0.5rem';
            ellipsis.style.color = 'var(--gray)';
            pageNumbers.appendChild(ellipsis);
        }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i, pageNumbers);
    }
    
    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 0.5rem';
            ellipsis.style.color = 'var(--gray)';
            pageNumbers.appendChild(ellipsis);
        }
        addPageButton(totalPages, pageNumbers);
    }
    
    // Add event listeners to prev/next buttons
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    };
}

// ===================================
// Add Page Button
// ===================================
function addPageButton(pageNum, container) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    btn.textContent = pageNum;
    
    if (pageNum === currentPage) {
        btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        updateDisplay();
    });
    
    container.appendChild(btn);
}

// ===================================
// Console Message
// ===================================
console.log('%c📖 Success Stories Page Loaded', 'color: #4A90E2; font-size: 16px; font-weight: bold;');
console.log('%cFiltering and pagination active!', 'color: #50C878; font-size: 12px;');