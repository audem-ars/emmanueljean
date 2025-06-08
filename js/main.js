// Main Application Entry Point - COMPLETE UNIFIED VERSION
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
        this.currentEditCategory = null;
        this.currentEditItemId = null;
        this.currentItemMedia = [];
        this.init();
    }

    async init() {
        this.loadFromLocalStorage();
        this.initRouter();
        this.loadPage('home');
        await this.loadComponents();
        this.setupEventListeners();
        this.initDynamicEffects();
    }

    async loadComponents() {
        // Load header
        const headerHtml = `
    <a href="#" class="logo" onclick="app.navigateTo('home')">
        <span class="emmanuel">Emmanuel</span><span class="jean">Jean</span>
    </a>
    
    <div class="mobile-menu-btn" onclick="app.toggleLuxuryMenu()">
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    <div class="nav-container">
    <button class="portfolio-toggle" onclick="app.togglePortfolioNav()" id="portfolioToggle">
        <span>Portfolio</span> <span class="toggle-arrow">▼</span>
    </button>
    <nav class="main-nav" id="mainNav">
        <a href="#" class="nav-link" onclick="app.navigateTo('diamonds')">Diamonds</a>
        <a href="#" class="nav-link" onclick="app.navigateTo('cars')">Luxury Cars</a>
        <a href="#" class="nav-link" onclick="app.navigateTo('commodities')">Commodities</a>
        <a href="#" class="nav-link" onclick="app.navigateTo('technology')">Technology</a>
        <a href="#" class="nav-link" onclick="app.navigateTo('properties')">Properties</a>
    </nav>
    </div>
    <div class="auth-buttons" id="authButtons">
    <button class="auth-btn login-btn" onclick="app.openModal('login-modal')">Login</button>
    <button class="auth-btn signup-btn" onclick="app.openModal('signup-modal')">Sign Up</button>
    <button class="contact-btn" onclick="app.openModal('contact-modal')">Contact</button>
</div>

    <!-- Luxury Menu Overlay -->
<div class="luxury-menu-overlay" id="luxuryMenuOverlay">
    <button class="menu-close-btn" onclick="app.closeLuxuryMenu()">&times;</button>
    <div class="luxury-menu-content">
        <h1 class="luxury-menu-title">Our Network</h1>
        <p style="color: var(--light-gray); margin-bottom: 40px; font-size: 1.1rem;">Access our exclusive partner sites and services</p>
        <div class="menu-nav-links">
            <a href="https://your-business-site.com" target="_blank" class="menu-nav-link">🌐 Business Portal</a>
            <a href="https://your-investment-site.com" target="_blank" class="menu-nav-link">📊 Investment Hub</a>
            <a href="https://your-client-dashboard.com" target="_blank" class="menu-nav-link">🎯 Client Services</a>
            <a href="https://your-mobile-app.com" target="_blank" class="menu-nav-link">📱 Mobile App</a>
            <a href="https://your-trading-platform.com" target="_blank" class="menu-nav-link">💹 Trading Platform</a>
            <a href="https://your-blog.com" target="_blank" class="menu-nav-link">📝 Market Insights</a>
            <a href="https://your-support.com" target="_blank" class="menu-nav-link">🎧 Support Center</a>
        </div>
    </div>
</div>
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
            </div>
            <div class="footer-bottom">
                <p>© 2025 EmmanuelJean. All rights reserved. | <a href="#" onclick="app.openModal('privacy-modal')">Privacy Policy</a> | <a href="#" onclick="app.openModal('terms-modal')">Terms of Service</a></p>
            </div>
        `;

        document.getElementById('main-footer').innerHTML = footerHtml;
    }

    initRouter() {
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
    }

    navigateTo(page) {
        this.loadPage(page, true);
        this.closeLuxuryMenu();
    }

    loadPage(page, pushState = true) {
        document.querySelectorAll('.page-content').forEach(p => {
            p.classList.remove('active');
        });

        const existingPage = document.getElementById(page);
        if (existingPage) {
            existingPage.remove();
        }

        const pageElement = document.createElement('div');
        pageElement.id = page;
        pageElement.className = 'page-content active';
        
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
        this.currentPage = page;
        
        if (pushState) {
            history.pushState({page: page}, '', `#${page}`);
        }

        window.scrollTo(0, 0);
        this.setupPageFunctionality(page);
    }

    getHomePage() {
        return `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Designed To Define You</h1>
                    <p class="hero-subtitle">Curating Excellence in Diamonds, Automobiles, Commodities, Technology & Real Estate</p>
                    <div class="hero-cta">
                        <button class="cta-primary" onclick="app.navigateTo('diamonds')">Explore Portfolio</button>
                        <button class="cta-secondary" onclick="app.openModal('contact-modal')">Get Started</button>
                        <button class="cta-primary" onclick="app.openModal('join-network-modal')" style="margin-top: 15px;">Join Network</button>
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
                    <h3 style="margin-bottom: 20px; font-family: 'Playfair Display', serif; font-weight: 600; background: linear-gradient(135deg, var(--text-color) 0%, var(--luxury-gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Add New ${title.replace('Premium ', '').replace('Luxury ', '').replace('Advanced ', '').replace('Elite ', '').replace('Precious ', '')}</h3>
                    <p style="margin-bottom: 20px; color: var(--light-gray);">Create complete luxury item with images, details, and formatted descriptions</p>
                    <button class="upload-btn" onclick="app.showAddItemForm('${category}')">
                        ➕ Add New Item
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
    
        return this.items[category].map(item => {
            const primaryMedia = Array.isArray(item.media) ? item.media[0] : item.media;
            const mediaArray = Array.isArray(item.media) ? item.media : (item.media ? [item.media] : []);
            const mediaCount = mediaArray.length;
            
            return `
                <div class="item-card" onclick="app.openItemModal('${category}', ${item.id})" style="cursor: pointer;">
                    <div class="item-image" style="width: 100%; aspect-ratio: 16/10; border-radius: 16px 16px 0 0; overflow: hidden; background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 214, 255, 0.1) 100%); display: flex; align-items: center; justify-content: center; position: relative;">
                        ${primaryMedia ? (primaryMedia.type === 'video' ? 
                            `<video 
                                src="${primaryMedia.url}" 
                                style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                                onclick="app.showAllImages('${category}', ${item.id})"
                            ></video>` :
                            `<img 
                                src="${primaryMedia.url}" 
                                alt="${item.title}" 
                                style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                                onclick="app.showAllImages('${category}', ${item.id})"
                            >`) :
                            `<div style="font-size: 4rem;">${this.getCategoryIcon(category)}</div>`
                        }
                        ${mediaCount > 1 ? 
                            `<div style="position: absolute; top: 8px; right: 8px; background: rgba(0, 0, 0, 0.8); color: var(--luxury-gold); padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">
                                📸 ${mediaCount}
                            </div>` : ''
                        }
                    </div>
                    <div class="item-content">
    <h3 class="item-title">${item.title}</h3>
    <div class="item-price">${item.price}</div>
    ${this.formatDescriptionWithTruncation(item.description, item.format || 'paragraph', category, item.id)}
    <div class="item-actions">
                            <button class="btn-small btn-edit" onclick="app.editItem('${category}', ${item.id})">Edit</button>
                            <button class="btn-small btn-delete" onclick="app.deleteItem('${category}', ${item.id})">Delete</button>
                            ${mediaCount > 0 ? `<button class="btn-small" onclick="app.showAllImages('${category}', ${item.id})">View All ${mediaCount > 1 ? `(${mediaCount})` : ''}</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    formatDescription(text, format) {
        if (!text) return '<p class="item-description">No description</p>';
        
        let html = '';
        
        switch(format) {
            case 'paragraph':
                html = `<p class="item-description">${text.replace(/\n/g, ' ')}</p>`;
                break;
            case 'single':
                const lines = text.split('\n').filter(line => line.trim());
                html = '<div class="item-description"><ul style="margin: 0; padding-left: 20px;">' + lines.map(line => `<li style="margin-bottom: 4px;">${line}</li>`).join('') + '</ul></div>';
                break;
            case 'features-specs':
                const sections = text.split('---').map(s => s.trim());
                if (sections.length >= 2) {
                    html = '<div class="item-description">';
                    // Features section
                    html += '<h5 style="color: var(--luxury-gold); margin-bottom: 10px; font-size: 0.9rem;">✨ Features</h5>';
                    const features = sections[0].split('\n').filter(line => line.trim());
                    html += '<ul style="margin: 0 0 15px 0; padding-left: 20px;">' + features.map(line => `<li style="margin-bottom: 4px;">${line}</li>`).join('') + '</ul>';
                    // Specs section  
                    html += '<h5 style="color: var(--luxury-gold); margin-bottom: 10px; font-size: 0.9rem;">⚙️ Specifications</h5>';
                    const specs = sections[1].split('\n').filter(line => line.trim());
                    html += '<ul style="margin: 0; padding-left: 20px;">' + specs.map(line => `<li style="margin-bottom: 4px;">${line}</li>`).join('') + '</ul>';
                    html += '</div>';
                } else {
                    // Fallback if no separator found
                    const lines = text.split('\n').filter(line => line.trim());
                    html = '<div class="item-description"><ul style="margin: 0; padding-left: 20px;">' + lines.map(line => `<li style="margin-bottom: 4px;">${line}</li>`).join('') + '</ul></div>';
                }
                break;
            default:
                html = `<p class="item-description">${text}</p>`;
        }
        
        return html;
    }

    formatDescriptionWithTruncation(text, format, category, itemId) {
        if (!text) return '<p class="item-description">No description</p>';
        
        // Count lines: title (1) + price (1) + description lines
        const descriptionLines = text.split('\n').length;
        const totalLines = 2 + descriptionLines; // title + price + description lines
        
        const isTooLong = totalLines > 8;
        
        if (isTooLong) {
            // Show truncated version
            const truncatedText = text.split('\n').slice(0, 4).join('\n'); // Show first 4 lines of description
            let html = this.formatDescription(truncatedText, format);
            
            // Add "Show More" button
html += `
<div style="margin-top: 8px; margin-bottom: 12px;">
    <button class="btn-small" onclick="app.openItemModal('${category}', ${itemId})">... Show More</button>
</div>
            `;
            return html;
        } else {
            // Show full description if not too long
            return this.formatDescription(text, format);
        }
    }

    openItemModal(category, itemId) {
        const item = this.items[category].find(i => i.id === itemId);
        if (!item) return;
        
        // Populate modal content
        document.getElementById('item-modal-title').textContent = item.title;
        document.getElementById('item-modal-price').textContent = item.price;
        
        // Show images if available
        const imagesContainer = document.getElementById('item-modal-images');
        if (item.media && item.media.length > 0) {
            const mediaArray = Array.isArray(item.media) ? item.media : [item.media];
            imagesContainer.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    ${mediaArray.map(media => `
                        <div style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/10;">
                            ${media.type === 'video' ? 
                                `<video src="${media.url}" controls style="width: 100%; height: 100%; object-fit: cover;"></video>` :
                                `<img src="${media.url}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="app.showAllImages('${category}', ${itemId})">`
                            }
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            imagesContainer.innerHTML = '';
        }
        
        // Show full formatted description
        document.getElementById('item-modal-description').innerHTML = this.formatDescription(item.description, item.format || 'paragraph');
        
        // Open modal with focus
        this.openModalWithFocus('item-description-modal');
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

    // UNIFIED ITEM MANAGEMENT SYSTEM
    showAddItemForm(category) {
        this.currentEditCategory = category;
        this.currentEditItemId = null; // New item
        this.currentItemMedia = []; // Reset media array
        
        document.getElementById('item-form-title').textContent = `Add New ${category.charAt(0).toUpperCase() + category.slice(1)} Item`;
        document.getElementById('item-form').reset();
        document.getElementById('description-preview').innerHTML = 'Type description to see preview...';
        document.getElementById('uploaded-media-preview').innerHTML = '';
        
        this.openModalWithFocus('item-form-modal');
        this.setupItemFormHandlers();
    }

    editItem(category, itemId) {
        const item = this.items[category].find(i => i.id === itemId);
        if (!item) return;
        
        this.currentEditCategory = category;
        this.currentEditItemId = itemId;
        this.currentItemMedia = Array.isArray(item.media) ? [...item.media] : (item.media ? [item.media] : []);
        
        // Populate form with existing data
        document.getElementById('item-form-title').textContent = `Edit ${item.title}`;
        document.querySelector('#item-form input[name="title"]').value = item.title || '';
        document.querySelector('#item-form input[name="price"]').value = item.price || '';
        document.querySelector('#item-form textarea[name="description"]').value = item.description || '';
        document.getElementById('description-format').value = item.format || 'paragraph';
        
        // Show existing media
        this.updateMediaPreview();
        this.updateDescriptionPreview();
        
        this.openModalWithFocus('item-form-modal');
        this.setupItemFormHandlers();
    }

    openModalWithFocus(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            // Save scroll position
            window.modalScrollPosition = window.pageYOffset;
            
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            modal.classList.add('active');
            
            // Force focus to modal
            setTimeout(() => {
                modal.scrollIntoView({ behavior: 'instant', block: 'start' });
                window.scrollTo(0, 0);
                const firstInput = modal.querySelector('input, textarea');
                if (firstInput) firstInput.focus();
            }, 50);
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            window.scrollTo(0, window.modalScrollPosition || 0);
        }
    }

    setupItemFormHandlers() {
        // File upload handler
        const fileInput = document.getElementById('modal-file-input');
        fileInput.onchange = (e) => this.handleModalFileUpload(e);
        
        // Form submission handler
        const form = document.getElementById('item-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            this.saveItemFromModal();
        };
    }

    async handleModalFileUpload(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        
        // Check total limit (existing + new)
        if (this.currentItemMedia.length + files.length > 20) {
            this.showNotification('Maximum 20 files total per item', 'error');
            return;
        }
        
        this.showNotification(`Uploading ${files.length} files...`, 'info');
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                this.showNotification(`Uploading file ${i + 1}/${files.length}...`, 'info');
                
                if (window.cloudinaryUploader && typeof window.cloudinaryUploader.uploadFile === 'function') {
                    const result = await window.cloudinaryUploader.uploadFile(file);
                
                    if (result.success) {
                        const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
                        this.currentItemMedia.push({
                            url: result.url,
                            type: mediaType,
                            public_id: result.public_id,
                            filename: file.name
                        });
                        this.updateMediaPreview();
                    } else {
                        throw new Error(result.error || 'Upload failed');
                    }
                } else {
                    this.showNotification('Upload service not available', 'error');
                    return;
                }
            } catch (error) {
                console.error('Upload failed:', error);
                this.showNotification(`Upload failed: ${error.message}`, 'error');
            }
        }
        
        if (this.currentItemMedia.length > 0) {
            this.showNotification(`✅ ${files.length} files uploaded!`, 'success');
        }
        
        // Clear file input
        event.target.value = '';
    }

    updateMediaPreview() {
        const preview = document.getElementById('uploaded-media-preview');
        if (this.currentItemMedia.length === 0) {
            preview.innerHTML = '';
            return;
        }
        
        preview.innerHTML = this.currentItemMedia.map((media, index) => `
            <div style="position: relative; border-radius: 8px; overflow: hidden; background: #333; aspect-ratio: 1;">
                ${media.type === 'video' ? 
                    `<video src="${media.url}" style="width: 100%; height: 100%; object-fit: cover;"></video>` :
                    `<img src="${media.url}" style="width: 100%; height: 100%; object-fit: cover;">`
                }
                <button type="button" onclick="app.removeMedia(${index})" style="
                    position: absolute; 
                    top: 2px; 
                    right: 2px; 
                    background: #ff4444; 
                    border: none; 
                    color: white; 
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50%; 
                    cursor: pointer; 
                    font-size: 12px;
                ">×</button>
                ${index === 0 ? '<div style="position: absolute; bottom: 2px; left: 2px; background: var(--luxury-gold); color: #000; font-size: 8px; padding: 2px 4px; border-radius: 4px; font-weight: 600;">PREVIEW</div>' : ''}
            </div>
        `).join('');
    }

    removeMedia(index) {
        this.currentItemMedia.splice(index, 1);
        this.updateMediaPreview();
        this.showNotification('Media removed', 'info');
    }

    saveItemFromModal() {
        const formData = new FormData(document.getElementById('item-form'));
        
        const itemData = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
            format: formData.get('format'),
            media: this.currentItemMedia
        };
        
        if (this.currentEditItemId) {
            // Edit existing item
            const item = this.items[this.currentEditCategory].find(i => i.id === this.currentEditItemId);
            if (item) {
                Object.assign(item, itemData);
                this.showNotification('Item updated successfully!', 'success');
            }
        } else {
            // Add new item
            itemData.id = Date.now() + Math.random();
            this.items[this.currentEditCategory].push(itemData);
            this.showNotification('Item added successfully!', 'success');
        }
        
        this.saveToLocalStorage();
        this.refreshCategoryItems(this.currentEditCategory);
        this.closeModal('item-form-modal');
    }

    updateDescriptionPreview() {
        const textarea = document.querySelector('#item-form textarea[name="description"]');
        const format = document.getElementById('description-format').value;
        const preview = document.getElementById('description-preview');
        
        if (!textarea) return;
        
        const text = textarea.value.trim();
        if (!text) {
            preview.innerHTML = 'Type description to see preview...';
            return;
        }
        
        let html = '';
        
        switch(format) {
            case 'paragraph':
                html = `<p>${text.replace(/\n/g, ' ')}</p>`;
                break;
            case 'single':
                const lines = text.split('\n').filter(line => line.trim());
                html = '<ul>' + lines.map(line => `<li>${line}</li>`).join('') + '</ul>';
                break;
            case 'features-specs':
                const sections = text.split('---').map(s => s.trim());
                if (sections.length >= 2) {
                    html = '<div>';
                    // Features section
                    html += '<h5 style="color: var(--luxury-gold); margin-bottom: 10px;">✨ Features</h5>';
                    const features = sections[0].split('\n').filter(line => line.trim());
                    html += '<ul style="margin-bottom: 20px;">' + features.map(line => `<li>${line}</li>`).join('') + '</ul>';
                    // Specs section  
                    html += '<h5 style="color: var(--luxury-gold); margin-bottom: 10px;">⚙️ Specifications</h5>';
                    const specs = sections[1].split('\n').filter(line => line.trim());
                    html += '<ul>' + specs.map(line => `<li>${line}</li>`).join('') + '</ul>';
                    html += '</div>';
                } else {
                    // Fallback if no separator found
                    const lines = text.split('\n').filter(line => line.trim());
                    html = '<ul>' + lines.map(line => `<li>${line}</li>`).join('') + '</ul>';
                }
                break;
        }
        
        preview.innerHTML = html;
    }

    deleteItem(category, itemId) {
        if (confirm('Are you sure you want to delete this item?')) {
            this.items[category] = this.items[category].filter(i => i.id !== itemId);
            this.saveToLocalStorage();
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

    // GALLERY VIEWER SYSTEM
    showAllImages(category, itemId) {
        const item = this.items[category].find(i => i.id === itemId);
        if (!item || !item.media) return;
        
        const mediaArray = Array.isArray(item.media) ? item.media : [item.media];
        let currentIndex = 0;
        
        const createViewer = (isInitial = false) => {
            const existing = document.getElementById('gallery-viewer');
            if (existing) existing.remove();
            
            const viewer = document.createElement('div');
            viewer.id = 'gallery-viewer';
            viewer.tabIndex = -1; // Make focusable
            viewer.innerHTML = `
                <div style="
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100vw; 
                    height: 100vh; 
                    background: rgba(0,0,0,0.95); 
                    z-index: 10000; 
                    display: flex; 
                    flex-direction: column;
                    overflow: auto;
                ">
                    <!-- Header Bar -->
                    <div style="
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        padding: 20px; 
                        background: rgba(0,0,0,0.8);
                        position: sticky;
                        top: 0;
                        z-index: 10001;
                    ">
                        <h3 style="color: white; margin: 0; font-size: 1.2rem;">${item.title} (${currentIndex + 1}/${mediaArray.length})</h3>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <button onclick="window.setAsPreview()" style="
                                background: var(--luxury-gold); 
                                border: none; 
                                color: #000; 
                                font-size: 12px;
                                font-weight: 600;
                                padding: 8px 12px; 
                                border-radius: 20px; 
                                cursor: pointer;
                            ">📌 Set as Preview</button>
                            <button onclick="document.getElementById('gallery-viewer').remove(); document.body.style.overflow='auto'; window.scrollTo(0, window.galleryScrollPosition || 0);" style="
                                background: #ff4444; 
                                border: none; 
                                color: white; 
                                font-size: 24px; 
                                width: 40px; 
                                height: 40px; 
                                border-radius: 50%; 
                                cursor: pointer;
                            ">×</button>
                        </div>
                    </div>
                    
                    <!-- Scrollable Content Area -->
                    <div style="
                        flex: 1; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        position: relative;
                        padding: 20px;
                        overflow: auto;
                        min-height: calc(100vh - 80px);
                    ">
                        <!-- Main Media Container -->
                        <div style="
                            max-width: 90vw;
                            max-height: 80vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                            ${mediaArray[currentIndex].type === 'video' ? 
                                `<video 
                                    src="${mediaArray[currentIndex].url}" 
                                    controls 
                                    style="
                                        max-width: 100%; 
                                        max-height: 100%; 
                                        width: auto; 
                                        height: auto; 
                                        object-fit: contain; 
                                        border-radius: 8px; 
                                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                                    "
                                ></video>` :
                                `<img 
                                    src="${mediaArray[currentIndex].url}" 
                                    alt="${item.title}"
                                    style="
                                        max-width: 100%; 
                                        max-height: 100%; 
                                        width: auto; 
                                        height: auto; 
                                        object-fit: contain; 
                                        border-radius: 8px; 
                                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                                    "
                                >`
                            }
                        </div>
                        
                        <!-- Navigation Buttons -->
                        ${mediaArray.length > 1 ? `
                            <button onclick="window.prevGalleryImage()" style="
                                position: absolute; 
                                left: 30px; 
                                top: 50%;
                                transform: translateY(-50%);
                                background: rgba(0,0,0,0.8); 
                                border: 2px solid var(--luxury-gold); 
                                color: var(--luxury-gold); 
                                width: 60px; 
                                height: 60px; 
                                border-radius: 50%; 
                                cursor: pointer; 
                                font-size: 24px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">‹</button>
                            <button onclick="window.nextGalleryImage()" style="
                                position: absolute; 
                                right: 30px; 
                                top: 50%;
                                transform: translateY(-50%);
                                background: rgba(0,0,0,0.8); 
                                border: 2px solid var(--luxury-gold); 
                                color: var(--luxury-gold); 
                                width: 60px; 
                                height: 60px; 
                                border-radius: 50%; 
                                cursor: pointer; 
                                font-size: 24px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">›</button>
                        ` : ''}
                    </div>
                </div>
            `;
            
            // FOCUS MANAGEMENT - ONLY ON INITIAL OPEN!
            document.body.appendChild(viewer);
            
            if (isInitial) {
                // Check if we're coming from a modal
                const isFromModal = document.querySelector('.modal.active');
                
                if (!isFromModal) {
                    // Save current scroll position
                    window.galleryScrollPosition = window.pageYOffset;
                    
                    // Force focus and scroll to gallery
                    setTimeout(() => {
                        viewer.focus();
                        viewer.scrollIntoView({ behavior: 'instant', block: 'start' });
                        window.scrollTo(0, 0);
                    }, 50);
                }
                
                // Always prevent background scrolling
                document.body.style.overflow = 'hidden';
                
                // Add keyboard navigation
                viewer.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        viewer.remove();
                        document.body.style.overflow = 'auto';
                        window.scrollTo(0, window.galleryScrollPosition || 0);
                    } else if (e.key === 'ArrowLeft' && mediaArray.length > 1) {
                        window.prevGalleryImage();
                    } else if (e.key === 'ArrowRight' && mediaArray.length > 1) {
                        window.nextGalleryImage();
                    }
                });
            }
        };
        
        // SET AS PREVIEW FUNCTION
        window.setAsPreview = () => {
            if (currentIndex === 0) {
                this.showNotification('This is already the preview image!', 'info');
                return;
            }
            
            // Move current image to position 0 (preview position)
            const currentMedia = mediaArray[currentIndex];
            mediaArray.splice(currentIndex, 1); // Remove from current position
            mediaArray.unshift(currentMedia);   // Add to beginning (position 0)
            
            // Update the item in storage
            item.media = mediaArray;
            this.saveToLocalStorage();
            
            // Refresh the category page to show new preview
            this.refreshCategoryItems(category);
            
            // Show success message
            this.showNotification('✅ Preview image updated!', 'success');
            
            // Update gallery to show new order (now index 0)
            currentIndex = 0;
            createViewer(false);
        };
        
        window.nextGalleryImage = () => {
            if (currentIndex < mediaArray.length - 1) {
                currentIndex++;
                createViewer(false); // NOT initial = no jumping
            }
        };
        
        window.prevGalleryImage = () => {
            if (currentIndex > 0) {
                currentIndex--;
                createViewer(false); // NOT initial = no jumping
            }
        };
        
        createViewer(true); // Initial open = true
    }

    setupEventListeners() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e);
            });
        }

        const joinNetworkForm = document.getElementById('join-network-form');
        if (joinNetworkForm) {
            joinNetworkForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleJoinNetworkForm(e);
            });
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    this.closeModal(modal.id);
                });
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || e.target.closest('.close-modal')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            }
        });
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || e.target.closest('.close-modal')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            }
        });
        
        // ADD AUTH EVENT LISTENERS HERE
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                this.loginWithEmail(formData.get('email'), formData.get('password'));
            });
        }
        
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                this.signupWithEmail(formData.get('email'), formData.get('password'), formData.get('name'));
            });
        }
        
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                this.resetPassword(formData.get('email'));
            });
        }
    }

    initDynamicEffects() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            const ambientBg = document.querySelector('.ambient-background');
            if (ambientBg) {
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
            }
        });

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }

    handleContactForm(event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        console.log('Contact form data:', data);
        
        this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.closeModal('contact-modal');
        event.target.reset();
    }

    handleJoinNetworkForm(event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        console.log('Join Network form data:', data);
        
        this.showNotification('Welcome to our exclusive network! We\'ll contact you soon.', 'success');
        this.closeModal('join-network-modal');
        event.target.reset();
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            document.body.style.overflow = 'hidden';
            modal.classList.add('active');
        }
    }

    toggleLuxuryMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const overlay = document.getElementById('luxuryMenuOverlay');
        
        btn.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (overlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    closeLuxuryMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const overlay = document.getElementById('luxuryMenuOverlay');
        
        btn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showNotification(message, type = 'info') {
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveToLocalStorage() {
        localStorage.setItem('emmanueljean-items', JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('emmanueljean-items');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }
    async loginWithEmail(email, password) {
        try {
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const userCredential = await signInWithEmailAndPassword(window.firebase.auth, email, password);
            this.showNotification('Login successful!', 'success');
            this.closeModal('login-modal');
            this.updateAuthUI(userCredential.user);
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }
    
    async signupWithEmail(email, password, name) {
        try {
            const { createUserWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            const userCredential = await createUserWithEmailAndPassword(window.firebase.auth, email, password);
            
            // Create user document
            await setDoc(doc(window.firebase.db, 'users', userCredential.user.uid), {
                email: email,
                name: name,
                isAdmin: false,
                createdAt: new Date()
            });
            
            this.showNotification('Account created successfully!', 'success');
            this.closeModal('signup-modal');
            this.updateAuthUI(userCredential.user);
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }
    
    updateAuthUI(user) {
        const authButtons = document.getElementById('authButtons');
        if (user) {
            const firstLetter = user.email.charAt(0).toUpperCase();
            authButtons.innerHTML = `
                <div class="user-avatar" onclick="app.toggleUserMenu()" title="${user.email}">
                    <span class="avatar-letter">${firstLetter}</span>
                    <div class="user-dropdown" id="userDropdown" style="display: none;">
                        <div class="user-email">${user.email}</div>
                        <button class="dropdown-btn" onclick="app.logout()">Logout</button>
                        <button class="dropdown-btn" onclick="app.openModal('contact-modal')">Contact</button>
                    </div>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="auth-btn login-btn" onclick="app.openModal('login-modal')">Login</button>
                <button class="auth-btn signup-btn" onclick="app.openModal('signup-modal')">Sign Up</button>
                <button class="contact-btn" onclick="app.openModal('contact-modal')">Contact</button>
            `;
        }
    }
    
    async loginWithGoogle() {
        try {
            const { signInWithPopup, GoogleAuthProvider } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(window.firebase.auth, provider);
            this.showNotification('Login successful!', 'success');
            this.closeModal('login-modal');
            this.updateAuthUI(userCredential.user);
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }
    
    async signupWithGoogle() {
        this.loginWithGoogle(); // Same process for signup
    }

toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}
    
    async logout() {
        try {
            const { signOut } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            await signOut(window.firebase.auth);
            this.showNotification('Logged out successfully!', 'success');
            this.updateAuthUI(null);
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }
    // Add this temporary function to your class for testing
async testGoogleAuth() {
    console.log('Testing Google Auth...');
    try {
        const { GoogleAuthProvider } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        const provider = new GoogleAuthProvider();
        console.log('Provider created:', provider);
        console.log('Firebase auth:', window.firebase.auth);
    } catch (error) {
        console.error('Test failed:', error);
    }
}
async resetPassword(email) {
    try {
        const { sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        await sendPasswordResetEmail(window.firebase.auth, email);
        this.showNotification('Password reset email sent! Check your inbox.', 'success');
        this.closeModal('forgot-password-modal');
    } catch (error) {
        this.showNotification(`Reset failed: ${error.message}`, 'error');
    }
}
togglePortfolioNav() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('portfolioToggle');
    const arrow = toggle.querySelector('.toggle-arrow');
    
    nav.classList.toggle('collapsed');
    arrow.textContent = nav.classList.contains('collapsed') ? '▲' : '▼';
}
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new EmmanuelJeanApp();
});