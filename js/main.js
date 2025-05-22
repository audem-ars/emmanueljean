// Main Application Entry Point
class EmmanuelJeanApp {
    constructor() {
        this.currentPage = 'home';
        this.items = {
            diamonds: [],
            cars: [],
            commodities: [],
            technology: [],
            properties: []
        };
        this.init();
    }

    async init() {
        // Load components
        await this.loadComponents();
        
        // Initialize router
        this.initRouter();
        
        // Load initial page
        this.loadPage('home');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize dynamic effects
        this.initDynamicEffects();
        
        console.log('EmmanuelJean App initialized');
    }

    async loadComponents() {
        // Load header
        const headerHtml = `
            <a href="#" class="logo" onclick="app.navigateTo('home')">
                <span class="emmanuel">Emmanuel</span><span class="jean">Jean</span>
            </a>
            
            <div class="mobile-menu-btn" onclick="app.toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <nav class="main-nav" id="mainNav">
                <a href="#" class="nav-link" onclick="app.navigateTo('diamonds')">Diamonds</a>
                <a href="#" class="nav-link" onclick="app.navigateTo('cars')">Luxury Cars</a>
                <a href="#" class="nav-link" onclick="app.navigateTo('commodities')">Commodities</a>
                <a href="#" class="nav-link" onclick="app.navigateTo('technology')">Technology</a>
                <a href="#" class="nav-link" onclick="app.navigateTo('properties')">Properties</a>
            </nav>
            <button class="contact-btn" onclick="app.openModal('contact-modal')">Contact</button>
        `;
        
        document.getElementById('main-header').innerHTML = headerHtml;

        // Load footer
        const footerHtml = `
            <div class="footer-content">
                <div class="footer-section">
                    <h3>EmmanuelJean</h3>
                    <p>Curating the world's finest luxury assets and investment opportunities for discerning clients worldwide.</p>
                    <p>Established with a vision to redefine luxury through exceptional quality and unparalleled service.</p>
                </div>
                <div class="footer-section">
                    <h3>Services</h3>
                    <a href="#" onclick="app.navigateTo('diamonds')">Diamond Acquisition</a>
                    <a href="#" onclick="app.navigateTo('cars')">Luxury Car Sourcing</a>
                    <a href="#" onclick="app.navigateTo('commodities')">Commodity Trading</a>
                    <a href="#" onclick="app.navigateTo('technology')">Tech Investments</a>
                    <a href="#" onclick="app.navigateTo('properties')">Real Estate Portfolio</a>
                </div>
                <div class="footer-section">
                    <h3>Contact</h3>
                    <p>Email: contact@emmanueljean.com</p>
                    <p>Phone: +12407266550</p>
                    <p><strong>Global Offices:</strong></p>
                    <p>New York • Saudi Arabia • Monaco</p>
                </div>
                <div class="footer-section">
                    <h3>Exclusive Access</h3>
                    <p>Join our private client network for early access to exceptional opportunities and exclusive events.</p>
                    <button class="cta-primary" onclick="app.openModal('contact-modal')" style="margin-top: 15px;">Join Network</button>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 EmmanuelJean. All rights reserved. | <a href="#" onclick="app.openModal('privacy-modal')">Privacy Policy</a> | <a href="#" onclick="app.openModal('terms-modal')">Terms of Service</a></p>
            </div>
        `;
        
        document.getElementById('main-footer').innerHTML = footerHtml;
    }

    initRouter() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
    }

    navigateTo(page) {
        this.loadPage(page, true);
        // Close mobile menu if open
        this.closeMobileMenu();
    }

    loadPage(page, pushState = true) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(p => {
            p.classList.remove('active');
        });

        // Remove existing page content
        const existingPage = document.getElementById(page);
        if (existingPage) {
            existingPage.remove();
        }

        // Create new page element
        const pageElement = document.createElement('div');
        pageElement.id = page;
        pageElement.className = 'page-content active';
        
        // Load page content
        switch(page) {
            case 'home':
                pageElement.innerHTML = this.getHomePage();
                break;
            case 'diamonds':
                pageElement.innerHTML = this.getCategoryPage('diamonds', 'Premium Diamonds', '💎', 'Exceptional diamonds and rare gemstones, carefully sourced and certified for their unmatched brilliance and investment potential.');
                break;
            case 'cars':
                pageElement.innerHTML = this.getCategoryPage('cars', 'Luxury Automobiles', '🏎️', 'Exclusive supercars, vintage classics, and limited editions from the world\'s most prestigious automotive manufacturers.');
                break;
            case 'commodities':
                pageElement.innerHTML = this.getCategoryPage('commodities', 'Precious Commodities', '🥇', 'Gold, platinum, rare metals, and exclusive commodities that provide stability and growth in luxury investment portfolios.');
                break;
            case 'technology':
                pageElement.innerHTML = this.getCategoryPage('technology', 'Advanced Technology', '⚡', 'Cutting-edge innovations, exclusive tech acquisitions, and breakthrough technologies shaping tomorrow\'s luxury landscape.');
                break;
            case 'properties':
                pageElement.innerHTML = this.getCategoryPage('properties', 'Elite Properties', '🏰', 'Exclusive real estate opportunities, luxury estates, and architectural masterpieces in the world\'s most coveted locations.');
                break;
        }

        document.getElementById('main-content').appendChild(pageElement);
        
        // Update current page
        this.currentPage = page;
        
        // Update URL
        if (pushState) {
            history.pushState({page: page}, '', `#${page}`);
        }

        // Scroll to top
        window.scrollTo(0, 0);
        
        // Setup page-specific functionality
        this.setupPageFunctionality(page);
    }

    getHomePage() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Luxury Redefined</h1>
                    <p class="hero-subtitle">Curating Excellence in Diamonds, Automobiles, Commodities, Technology & Real Estate</p>
                    <div class="hero-cta">
                        <button class="cta-primary" onclick="app.navigateTo('diamonds')">Explore Portfolio</button>
                        <button class="cta-secondary" onclick="app.openModal('contact-modal')">Get Started</button>
                    </div>
                </div>
            </section>

            <section class="portfolio-section">
                <div class="section-header">
                    <h2 class="section-title">Our Expertise</h2>
                    <p class="section-subtitle">Five pillars of luxury investment and acquisition, each representing the pinnacle of quality and exclusivity</p>
                </div>

                <div class="category-grid">
                    <div class="category-card" onclick="app.navigateTo('diamonds')">
                        <div class="category-icon">💎</div>
                        <h3 class="category-title">Premium Diamonds</h3>
                        <p class="category-description">Exceptional diamonds and rare gemstones, carefully sourced and certified for their unmatched brilliance and investment potential.</p>
                        <a href="#" class="category-link">Discover Collection →</a>
                    </div>

                    <div class="category-card" onclick="app.navigateTo('cars')">
                        <div class="category-icon">🏎️</div>
                        <h3 class="category-title">Luxury Automobiles</h3>
                        <p class="category-description">Exclusive supercars, vintage classics, and limited editions from the world's most prestigious automotive manufacturers.</p>
                        <a href="#" class="category-link">View Garage →</a>
                    </div>

                    <div class="category-card" onclick="app.navigateTo('commodities')">
                        <div class="category-icon">🥇</div>
                        <h3 class="category-title">Precious Commodities</h3>
                        <p class="category-description">Gold, platinum, rare metals, and exclusive commodities that provide stability and growth in luxury investment portfolios.</p>
                        <a href="#" class="category-link">Explore Assets →</a>
                    </div>

                    <div class="category-card" onclick="app.navigateTo('technology')">
                        <div class="category-icon">⚡</div>
                        <h3 class="category-title">Advanced Technology</h3>
                        <p class="category-description">Cutting-edge innovations, exclusive tech acquisitions, and breakthrough technologies shaping tomorrow's luxury landscape.</p>
                        <a href="#" class="category-link">Tech Portfolio →</a>
                    </div>

                    <div class="category-card" onclick="app.navigateTo('properties')">
                        <div class="category-icon">🏰</div>
                        <h3 class="category-title">Elite Properties</h3>
                        <p class="category-description">Exclusive real estate opportunities, luxury estates, and architectural masterpieces in the world's most coveted locations.</p>
                        <a href="#" class="category-link">Property Showcase →</a>
                    </div>
                </div>
            </section>

            <section class="portfolio-section">
                <div class="section-header">
                    <h2 class="section-title">Featured Collection</h2>
                    <p class="section-subtitle">A curated selection of our most exceptional offerings across all categories</p>
                </div>

                <div class="items-grid">
                    ${this.getFeaturedItems()}
                </div>
            </section>
        `;
    }

    getCategoryPage(category, title, icon, description) {
        return `
            <div class="category-page" style="padding: 120px 48px 80px; max-width: 1400px; margin: 0 auto;">
                <div class="category-header" style="text-align: center; margin-bottom: 60px;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">${icon}</div>
                    <h1 class="category-hero-title" style="font-family: 'Playfair Display', serif; font-size: 4rem; font-weight: 700; margin-bottom: 20px; background: linear-gradient(135deg, var(--luxury-gold) 0%, var(--diamond-silver) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${title}</h1>
                    <p class="section-subtitle">${description}</p>
                </div>

                <div class="upload-section">
                    <h3 style="margin-bottom: 20px; color: var(--luxury-gold);">Add New ${title.replace('Premium ', '').replace('Luxury ', '').replace('Advanced ', '').replace('Elite ', '').replace('Precious ', '')}</h3>
                    <p style="margin-bottom: 20px; color: var(--light-gray);">Upload images, videos, and details for your luxury items</p>
                    <input type="file" id="${category}-image-upload" class="file-input" accept="image/*,video/*" multiple>
                    <button class="upload-btn" onclick="document.getElementById('${category}-image-upload').click()">
                        📁 Upload Media
                    </button>
                    <button class="upload-btn" onclick="app.showAddItemForm('${category}')">
                        ➕ Add Item Details
                    </button>
                </div>

                <div class="items-grid" id="${category}-items">
                    ${this.getCategoryItems(category)}
                </div>
            </div>
        `;
    }

    getCategoryItems(category) {
        if (this.items[category].length === 0) {
            return `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--light-gray);">
                    <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;">📦</div>
                    <h3 style="margin-bottom: 10px;">No items yet</h3>
                    <p>Start building your collection by adding your first luxury item</p>
                </div>
            `;
        }

        return this.items[category].map(item => `
            <div class="item-card">
                <div class="item-image">
                    ${item.media ? (item.media.type === 'video' ? 
                        `<video src="${item.media.url}" controls style="width: 100%; height: 100%; object-fit: cover;"></video>` :
                        `<img src="${item.media.url}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">`) :
                        this.getCategoryIcon(category)}
                </div>
                <div class="item-content">
                    <h3 class="item-title">${item.title}</h3>
                    <div class="item-price">${item.price}</div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-actions">
                        <button class="btn-small btn-edit" onclick="app.editItem('${category}', ${item.id})">Edit</button>
                        <button class="btn-small btn-delete" onclick="app.deleteItem('${category}', ${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryIcon(category) {
        const icons = {
            diamonds: '💎',
            cars: '🏎️',
            commodities: '🥇',
            technology: '⚡',
            properties: '🏰'
        };
        return icons[category] || '📦';
    }

    getFeaturedItems() {
        const featured = [
            { category: 'diamonds', title: 'Flawless 5ct Diamond', price: '$2,750,000', description: 'D-grade flawless round brilliant cut diamond with exceptional fire and scintillation', icon: '💎' },
            { category: 'cars', title: 'McLaren P1 GTR', price: '$3,200,000', description: 'Track-only hypercar with hybrid powertrain, one of only 58 ever produced', icon: '🏎️' },
            { category: 'properties', title: 'Monaco Penthouse', price: '$45,000,000', description: 'Exclusive penthouse overlooking Port Hercules with private terrace and panoramic views', icon: '🏰' },
            { category: 'commodities', title: 'Rare Earth Portfolio', price: '$15,750,000', description: 'Strategic allocation of platinum, palladium, and rare earth elements', icon: '🥇' },
            { category: 'technology', title: 'AI Startup Equity', price: '$8,900,000', description: 'Pre-IPO equity in breakthrough quantum computing and AI development firm', icon: '⚡' },
            { category: 'diamonds', title: 'Pink Diamond Suite', price: '$12,400,000', description: 'Matching set of rare pink diamonds including necklace, earrings, and ring', icon: '💎' }
        ];

        return featured.map(item => `
            <div class="item-card" onclick="app.navigateTo('${item.category}')">
                <div class="item-image">
                    <div style="font-size: 4rem;">${item.icon}</div>
                </div>
                <div class="item-content">
                    <h3 class="item-title">${item.title}</h3>
                    <div class="item-price">${item.price}</div>
                    <p class="item-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    setupPageFunctionality(page) {
        if (page !== 'home') {
            // Setup file upload for category pages
            const fileInput = document.getElementById(`${page}-image-upload`);
            if (fileInput) {
                fileInput.addEventListener('change', (e) => this.handleFileUpload(e, page));
            }
        }

        // Setup category card hover effects
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.filter = 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))';
                }
            });
        });
    }

    setupEventListeners() {
        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e);
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    this.closeModal(modal.id);
                });
            }
        });
    }

    initDynamicEffects() {
        // Dynamic background glow effect
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const ambientBg = document.querySelector('.ambient-background');
            const intensity = 0.05;
            const goldIntensity = mouseX * intensity;
            const diamondIntensity = mouseY * intensity;
            
            ambientBg.style.background = `
                radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
                    rgba(212, 175, 55, ${goldIntensity}) 0%, 
                    rgba(201, 214, 255, ${diamondIntensity}) 40%,
                    transparent 70%),
                var(--bg-color-warm)
            `;
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }

    handleFileUpload(event, category) {
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaUrl = e.target.result;
                const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
                
                // For demo purposes, we'll just store the data URL
                // In a real app, you'd upload to a server
                const newItem = {
                    id: Date.now() + Math.random(),
                    title: `New ${category.charAt(0).toUpperCase() + category.slice(1)} Item`,
                    price: '$0',
                    description: 'Add description...',
                    media: {
                        url: mediaUrl,
                        type: mediaType
                    }
                };
                
                this.items[category].push(newItem);
                this.refreshCategoryItems(category);
                
                // Show success message
                this.showNotification('Media uploaded successfully!', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    showAddItemForm(category) {
        const title = prompt('Enter item title:');
        if (!title) return;
        
        const price = prompt('Enter price:');
        if (!price) return;
        
        const description = prompt('Enter description:');
        if (!description) return;
        
        const newItem = {
            id: Date.now(),
            title,
            price,
            description,
            media: null
        };
        
        this.items[category].push(newItem);
        this.refreshCategoryItems(category);
        this.showNotification('Item added successfully!', 'success');
    }

    editItem(category, itemId) {
        const item = this.items[category].find(i => i.id === itemId);
        if (!item) return;
        
        const newTitle = prompt('Edit title:', item.title);
        if (newTitle !== null) item.title = newTitle;
        
        const newPrice = prompt('Edit price:', item.price);
        if (newPrice !== null) item.price = newPrice;
        
        const newDescription = prompt('Edit description:', item.description);
        if (newDescription !== null) item.description = newDescription;
        
        this.refreshCategoryItems(category);
        this.showNotification('Item updated successfully!', 'success');
    }

    deleteItem(category, itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.items[category] = this.items[category].filter(i => i.id !== itemId);
            this.refreshCategoryItems(category);
            this.showNotification('Item deleted successfully!', 'success');
        }
    }

    refreshCategoryItems(category) {
        const container = document.getElementById(`${category}-items`);
        if (container) {
            container.innerHTML = this.getCategoryItems(category);
        }
    }

    handleContactForm(event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Contact form data:', data);
        
        this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.closeModal('contact-modal');
        event.target.reset();
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    toggleMobileMenu() {
        const nav = document.getElementById('mainNav');
        nav.classList.toggle('active');
    }

    closeMobileMenu() {
        const nav = document.getElementById('mainNav');
        nav.classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-color);
            color: var(--text-color);
            padding: 16px 24px;
            border-radius: 8px;
            border-left: 4px solid var(--luxury-gold);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make app globally available
    window.app = new EmmanuelJeanApp();
});