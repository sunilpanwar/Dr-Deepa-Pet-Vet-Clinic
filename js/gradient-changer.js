/**
 * Dynamic Gradient Color Changer
 * Automatically changes hero section gradient colors every 10 seconds
 */

class GradientChanger {
    constructor() {
        this.gradients = [
            // Purple & Violet
        //    { start: 'rgba(102, 126, 234, 0.88)', end: 'rgba(118, 75, 162, 0.88)', name: 'Royal Purple' },
            
            // Blue Variations
        //    { start: 'rgba(74, 144, 226, 0.88)', end: 'rgba(80, 200, 120, 0.88)', name: 'Ocean Breeze' },
            /*{ start: 'rgba(52, 152, 219, 0.88)', end: 'rgba(41, 128, 185, 0.88)', name: 'Deep Blue' },
            { start: 'rgba(135, 206, 250, 0.88)', end: 'rgba(70, 130, 180, 0.88)', name: 'Sky Blue' },
            
            // Teal & Cyan
            { start: 'rgba(26, 188, 156, 0.88)', end: 'rgba(22, 160, 133, 0.88)', name: 'Turquoise' },
            { start: 'rgba(72, 219, 251, 0.88)', end: 'rgba(0, 180, 216, 0.88)', name: 'Cyan Wave' },
            
            // Green Variations
            { start: 'rgba(46, 213, 115, 0.88)', end: 'rgba(0, 148, 50, 0.88)', name: 'Fresh Green' },
            { start: 'rgba(123, 237, 159, 0.88)', end: 'rgba(0, 180, 219, 0.88)', name: 'Mint Breeze' },
            
            // Warm Colors
            { start: 'rgba(250, 177, 160, 0.88)', end: 'rgba(255, 107, 107, 0.88)', name: 'Coral Sunset' },*/
        //    { start: 'rgba(255, 159, 64, 0.88)', end: 'rgba(255, 99, 132, 0.88)', name: 'Warm Peach' },
            /*{ start: 'rgba(255, 195, 113, 0.88)', end: 'rgba(255, 107, 129, 0.88)', name: 'Golden Hour' },
            
            // Pink & Rose
            { start: 'rgba(255, 118, 117, 0.88)', end: 'rgba(253, 121, 168, 0.88)', name: 'Rose Garden' },
            { start: 'rgba(250, 130, 176, 0.88)', end: 'rgba(184, 59, 94, 0.88)', name: 'Pink Blossom' },*/
            
            // Purple to Pink
         //   { start: 'rgba(159, 122, 234, 0.88)', end: 'rgba(255, 107, 129, 0.88)', name: 'Lavender Dream' },
            //{ start: 'rgba(186, 104, 200, 0.88)', end: 'rgba(244, 143, 177, 0.88)', name: 'Purple Haze' },
            
            // Multi-color Blends
          //  { start: 'rgba(255, 121, 63, 0.88)', end: 'rgba(255, 224, 130, 0.88)', name: 'Sunset Glow' },
            /*{ start: 'rgba(67, 233, 123, 0.88)', end: 'rgba(56, 249, 215, 0.88)', name: 'Tropical' },
            { start: 'rgba(250, 208, 196, 0.88)', end: 'rgba(255, 209, 255, 0.88)', name: 'Pastel Dream' },*/
            
            // Cool Tones
            { start: 'rgba(106, 17, 203, 0.88)', end: 'rgba(37, 117, 252, 0.88)', name: 'Electric Blue' },
            //{ start: 'rgba(79, 172, 254, 0.88)', end: 'rgba(0, 242, 254, 0.88)', name: 'Ice Blue' }
        ];
        
        this.currentIndex = 0;
        this.heroOverlay = null;
        this.intervalId = null;
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }
    
    start() {
        this.heroOverlay = document.querySelector('.hero-overlay');
        
        if (!this.heroOverlay) {
            console.warn('Hero overlay element not found');
            return;
        }
        
        // Apply first gradient immediately
        this.applyGradient(0);
        
        // Start rotation every 10 seconds
        this.intervalId = setInterval(() => {
            this.rotateGradient();
        }, 10000);
        
        console.log('Gradient changer initialized with', this.gradients.length, 'color combinations');
    }
    
    applyGradient(index) {
        const gradient = this.gradients[index];
        const gradientCSS = `linear-gradient(135deg, ${gradient.start} 0%, ${gradient.end} 100%)`;
        
        // Add transition for smooth color change
        this.heroOverlay.style.transition = 'background 2s ease-in-out';
        this.heroOverlay.style.background = gradientCSS;
        
        console.log(`Applied gradient: ${gradient.name}`);
    }
    
    rotateGradient() {
        // Move to next gradient
        this.currentIndex = (this.currentIndex + 1) % this.gradients.length;
        this.applyGradient(this.currentIndex);
    }
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('Gradient changer stopped');
        }
    }
    
    // Method to manually set a specific gradient
    setGradient(index) {
        if (index >= 0 && index < this.gradients.length) {
            this.currentIndex = index;
            this.applyGradient(index);
        }
    }
    
    // Get list of all gradient names
    getGradientNames() {
        return this.gradients.map((g, i) => `${i + 1}. ${g.name}`);
    }
}

// Initialize gradient changer when script loads
const gradientChanger = new GradientChanger();
gradientChanger.init();

// Make it globally accessible for debugging
window.gradientChanger = gradientChanger;