/**
 * Collection Filter System
 * Handles filter bar, dropdown panels, and product rendering for
 * Eyeglasses & Sunglasses pages.
 */

const PRODUCTS = [
    { id: 1, name: "Classic Midnight", category: "Eyeglasses", brand: "Muse", price: 8134, salePrice: 6500, image: "/assets/images/products/best_seller_glasses_1_1773742904220.png", description: "Includes Basic Rx Lenses. Timeless black frames for a sophisticated look.", gender: "Men", shape: "Rectangle", color: "Black", material: "Metal", size: "Medium" },
    { id: 2, name: "Amber Fade", category: "Sunglasses", brand: "Ottoto", price: 9545, salePrice: 7600, image: "/assets/images/products/best_seller_glasses_2_1773742924754.png", description: "Includes Premium Lenses. Stylish tortoise shell pattern with a modern twist.", gender: "Women", shape: "Cat Eye", color: "Tortoise", material: "Acetate", size: "Medium" },
    { id: 3, name: "Modern Scholar", category: "Eyeglasses", brand: "Muse", price: 7387, image: "/assets/images/products/best_seller_glasses_1_1773742904220.png", description: "Clean lines and lightweight comfort for daily wear.", gender: "Men", shape: "Square", color: "Black", material: "Metal", size: "Large" },
    { id: 4, name: "Coastal Breeze", category: "Sunglasses", brand: "Ray-Ban", price: 10707, salePrice: 8500, image: "/assets/images/products/best_seller_glasses_2_1773742924754.png", description: "Polarized lenses for maximum clarity and eye protection.", gender: "Men", shape: "Aviator", color: "Gold", material: "Metal", size: "Large" },
    { id: 5, name: "Amelia E Nettle", category: "Eyeglasses", brand: "Amelia E", price: 6500, image: "/assets/images/products/amelia_e_nettle_tortoise_glasses_1773744146557.png", description: "Elegant tortoise design with a comfortable fit.", gender: "Women", shape: "Round", color: "Tortoise", material: "Acetate", size: "Small" },
    { id: 6, name: "Amelia E Pam Purple", category: "Eyeglasses", brand: "Amelia E", price: 7200, salePrice: 5800, image: "/assets/images/products/amelia_e_pam_purple_1773744094353.png", description: "Vibrant purple frames for a bold statement.", gender: "Women", shape: "Cat Eye", color: "Purple", material: "Acetate", size: "Medium" },
    { id: 7, name: "Muse Karri Shiny Black", category: "Eyeglasses", brand: "Muse", price: 8900, image: "/assets/images/products/muse_karri_shiny_black_glasses_1773744111567.png", description: "Sleek and professional shiny black frames.", gender: "Men", shape: "Rectangle", color: "Shiny Black", material: "Metal", size: "Large" },
    { id: 8, name: "Ray-Ban 6363 Black Gold", category: "Eyeglasses", brand: "Ray-Ban", price: 12500, salePrice: 10000, image: "/assets/images/products/ray_ban_6363_black_gold_1773744130001.png", description: "Iconic Ray-Ban quality with a luxurious aesthetic.", gender: "Men", shape: "Rectangle", color: "Gold", material: "Metal", size: "Large" },
    { id: 9, name: "Oakley Meta Mbappe", category: "Sunglasses", brand: "Oakley", price: 15000, image: "/assets/images/products/brand_card_oakley_meta_mbappe_1773749622633.png", description: "Sporty and high-performance sunglasses by Oakley.", gender: "Men", shape: "Wrap", color: "Black", material: "Plastic", size: "Large" },
    { id: 10, name: "Ray-Ban Meta Smart", category: "Sunglasses", brand: "Ray-Ban", price: 25000, salePrice: 19000, image: "/assets/images/products/brand_card_rayban_meta_1773749605454.png", description: "Next-gen smart sunglasses with built-in camera and audio.", gender: "Unisex", shape: "Square", color: "Black", material: "Mixed", size: "Medium" },
    { id: 11, name: "Oakley Holbrook", category: "Sunglasses", brand: "Oakley", price: 13000, image: "/assets/images/products/brand_card_oakley_meta_mbappe_1773749622633.png", description: "A classic design fused with modern Oakley technology.", gender: "Men", shape: "Square", color: "Brown", material: "Plastic", size: "Large" },
    { id: 12, name: "Ottoto Bellona", category: "Eyeglasses", brand: "Ottoto", price: 9900, image: "/assets/images/products/brand_card_ottoto_couple_1773749656499.png", description: "Elegant cat-eye frames for a chic look.", gender: "Women", shape: "Cat Eye", color: "Brown", material: "Acetate", size: "Medium" },
];

const FILTER_CONFIG = {
    gender: { label: 'Gender', options: ['Men', 'Women', 'Unisex', 'Kids'] },
    shape: { label: 'Shape', options: ['Square', 'Rectangle', 'Round', 'Oval', 'Cat Eye', 'Aviator', 'Wrap', 'Browline', 'Geometric'] },
    size: { label: 'Size', options: ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'] },
    features: { label: 'Features', options: ['Polarized', 'Anti-Reflective', 'Blue Light Blocking', 'Photochromic', 'UV400'] },
    brands: { label: 'Brands', options: ['Muse', 'Ottoto', 'Ray-Ban', 'Oakley', 'Amelia E', 'Michael Kors', 'Gucci', 'Versace'] },
    color: {
        label: 'Color', options: [
            { name: 'Black', hex: '#111' }, { name: 'Gray', hex: '#888' }, { name: 'Tortoise', hex: '#8B4513' },
            { name: 'Brown', hex: '#7B4F2E' }, { name: 'Green', hex: '#2E7D32' }, { name: 'Blue', hex: '#1565C0' },
            { name: 'Clear', hex: '#f0f0f0' }, { name: 'Gold', hex: '#D4AF37' }, { name: 'Shiny Black', hex: '#222' },
            { name: 'Red', hex: '#C62828' }, { name: 'Silver', hex: '#aaa' }, { name: 'Purple', hex: '#6A1B9A' }
        ]
    },
    material: { label: 'Material', options: ['Metal', 'Acetate', 'Plastic', 'Titanium', 'Mixed', 'Wood'] },
    price: { label: 'Price', min: 0, max: 30000 },
    sort: { label: 'Most Relevant', options: ['Most Relevant', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Best Sellers'] }
};

class CollectionPage {
    constructor(category) {
        this.category = category; // 'Eyeglasses' or 'Sunglasses'
        this.activeFilters = {};
        this.maxPrice = 30000;
        this.activePanel = null;
        this.sortBy = 'Most Relevant';
        this.gridView = 4;
        this.init();
    }

    init() {
        this.renderFilterBar();
        this.renderProducts(this.getFilteredProducts());
        this.bindGlobalClose();
    }

    getFilteredProducts() {
        let products = PRODUCTS.filter(p => p.category === this.category);
        const f = this.activeFilters;
        if (f.gender) products = products.filter(p => p.gender === f.gender || p.gender === 'Unisex');
        if (f.shape) products = products.filter(p => p.shape === f.shape);
        if (f.size) products = products.filter(p => p.size === f.size);
        if (f.brands) products = products.filter(p => p.brand === f.brands);
        if (f.color) products = products.filter(p => p.color === f.color);
        if (f.material) products = products.filter(p => p.material === f.material);
        if (f.features) products = products.filter(p => p.features && p.features.includes(f.features));
        products = products.filter(p => (p.salePrice || p.price) <= this.maxPrice);
        // Sort
        if (this.sortBy === 'Price: Low to High') products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        else if (this.sortBy === 'Price: High to Low') products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        return products;
    }

    renderFilterBar() {
        const bar = document.getElementById('filter-bar');
        if (!bar) return;

        const filterKeys = ['gender', 'shape', 'size', 'features', 'brands', 'color', 'material', 'price'];
        bar.innerHTML = '';

        filterKeys.forEach(key => {
            const cfg = FILTER_CONFIG[key];
            const hasActive = this.activeFilters[key];
            const btn = document.createElement('button');
            btn.className = `filter-btn${hasActive ? ' active' : ''}`;
            btn.dataset.filter = key;
            btn.innerHTML = `${hasActive ? hasActive : cfg.label} <i class="fa fa-chevron-down chevron"></i>`;
            btn.addEventListener('click', (e) => { e.stopPropagation(); this.togglePanel(key, btn); });
            bar.appendChild(btn);
        });

        // Right side
        const right = document.createElement('div');
        right.className = 'filter-bar-right';
        right.innerHTML = `
            <div class="view-toggles">
                <button class="view-toggle-btn${this.gridView === 4 ? ' active' : ''}" id="grid4-btn" title="4 columns"><i class="fa fa-th"></i></button>
                <button class="view-toggle-btn${this.gridView === 2 ? ' active' : ''}" id="grid2-btn" title="2 columns"><i class="fa fa-th-large"></i></button>
            </div>
            <button class="sort-btn" id="sort-btn">${this.sortBy} <i class="fa fa-chevron-down chevron"></i></button>
        `;
        bar.appendChild(right);

        document.getElementById('grid4-btn').addEventListener('click', () => this.setGridView(4));
        document.getElementById('grid2-btn').addEventListener('click', () => this.setGridView(2));
        document.getElementById('sort-btn').addEventListener('click', (e) => { e.stopPropagation(); this.togglePanel('sort', document.getElementById('sort-btn')); });
    }

    togglePanel(key, btn) {
        const wrapper = document.getElementById('filter-bar-wrapper');
        // Close existing
        if (this.activePanel === key) {
            this.closePanel();
            return;
        }
        this.closePanel(false);
        this.activePanel = key;

        // Mark btn active
        document.querySelectorAll('.filter-btn, .sort-btn').forEach(b => b.classList.remove('open-panel'));
        btn.classList.add('open-panel');

        const existing = document.getElementById('filter-panel-popup');
        if (existing) existing.remove();

        const panel = document.createElement('div');
        panel.id = 'filter-panel-popup';
        panel.className = 'filter-panel open';
        panel.innerHTML = this.buildPanelContent(key);
        wrapper.appendChild(panel);

        this.bindPanelEvents(key, panel);

        // backdrop
        let backdrop = document.getElementById('filter-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'filter-backdrop';
            backdrop.className = 'filter-panel-overlay visible';
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', () => this.closePanel());
        }
        backdrop.classList.add('visible');
    }

    buildPanelContent(key) {
        const cfg = FILTER_CONFIG[key];
        let html = `<div class="filter-panel-inner">`;

        if (key === 'gender') {
            cfg.options.forEach(o => {
                html += `<div class="gender-option${this.activeFilters[key] === o ? ' selected' : ''}" data-val="${o}">${o}</div>`;
            });
        } else if (key === 'shape') {
            const icons = { Square: 'fa-stop', Rectangle: 'fa-rectangle-ad', Round: 'fa-circle', Oval: 'fa-circle', 'Cat Eye': 'fa-eye', Aviator: 'fa-glasses', Wrap: 'fa-shield', Browline: 'fa-glasses', Geometric: 'fa-star' };
            cfg.options.forEach(o => {
                html += `<div class="shape-option${this.activeFilters[key] === o ? ' selected' : ''}" data-val="${o}"><i class="fa ${icons[o] || 'fa-glasses'}"></i>${o}</div>`;
            });
        } else if (key === 'color') {
            cfg.options.forEach(o => {
                html += `<div class="color-option${this.activeFilters[key] === o.name ? ' selected' : ''}" data-val="${o.name}"><span class="color-dot" style="background:${o.hex};"></span>${o.name}</div>`;
            });
        } else if (key === 'price') {
            const cur = this.maxPrice;
            html += `<div class="price-range-panel">
                <div class="price-labels"><span>₹0</span><span id="price-val">₹${cur.toLocaleString('en-IN')}</span></div>
                <input type="range" class="price-slider" id="price-slider" min="0" max="30000" step="500" value="${cur}">
                <button class="pill-option" id="apply-price" style="align-self:flex-start;">Apply</button>
            </div>`;
        } else if (key === 'sort') {
            cfg.options.forEach(o => {
                html += `<div class="pill-option${this.sortBy === o ? ' selected' : ''}" data-val="${o}">${o}</div>`;
            });
        } else {
            // pills for size, features, brands, material
            cfg.options.forEach(o => {
                html += `<div class="pill-option${this.activeFilters[key] === o ? ' selected' : ''}" data-val="${o}">${o}</div>`;
            });
        }

        html += `<span class="filter-panel-close" id="close-panel-btn">Close</span></div>`;
        return html;
    }

    bindPanelEvents(key, panel) {
        panel.querySelector('#close-panel-btn').addEventListener('click', () => this.closePanel());

        if (key === 'price') {
            const slider = panel.querySelector('#price-slider');
            const label = panel.querySelector('#price-val');
            slider.addEventListener('input', () => {
                label.textContent = `₹${parseInt(slider.value).toLocaleString('en-IN')}`;
            });
            panel.querySelector('#apply-price').addEventListener('click', () => {
                this.maxPrice = parseInt(slider.value);
                this.closePanel();
                this.refresh();
            });
            return;
        }

        if (key === 'sort') {
            panel.querySelectorAll('.pill-option').forEach(el => {
                el.addEventListener('click', () => {
                    this.sortBy = el.dataset.val;
                    this.closePanel();
                    this.refresh();
                });
            });
            return;
        }

        const options = panel.querySelectorAll('[data-val]');
        options.forEach(el => {
            el.addEventListener('click', () => {
                const val = el.dataset.val;
                if (this.activeFilters[key] === val) {
                    delete this.activeFilters[key];
                } else {
                    this.activeFilters[key] = val;
                }
                this.closePanel();
                this.refresh();
            });
        });
    }

    setQuickFilter(key, val) {
        this.activeFilters[key] = val;
        this.refresh();
    }

    clearFilters() {
        this.activeFilters = {};
        this.maxPrice = 30000;
        this.refresh();
    }

    closePanel(updateUI = true) {
        const panel = document.getElementById('filter-panel-popup');
        if (panel) panel.remove();
        const backdrop = document.getElementById('filter-backdrop');
        if (backdrop) backdrop.classList.remove('visible');
        if (updateUI) this.activePanel = null;
        document.querySelectorAll('.filter-btn, .sort-btn').forEach(b => b.classList.remove('open-panel'));
    }

    setGridView(cols) {
        this.gridView = cols;
        const grid = document.getElementById('collection-grid');
        if (!grid) return;
        grid.className = cols === 2 ? 'collection-grid grid-2' : 'collection-grid';
        document.getElementById('grid4-btn').classList.toggle('active', cols === 4);
        document.getElementById('grid2-btn').classList.toggle('active', cols === 2);
    }

    refresh() {
        this.renderFilterBar();
        this.renderProducts(this.getFilteredProducts());
        this.updateActiveTags();
    }

    renderProducts(products) {
        const grid = document.getElementById('collection-grid');
        const info = document.getElementById('results-info');
        if (!grid) return;
        if (info) info.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
        grid.className = this.gridView === 2 ? 'collection-grid grid-2' : 'collection-grid';

        if (products.length === 0) {
            grid.innerHTML = '<div class="no-results">No products match your filters. Try removing some filters.</div>';
            return;
        }

        grid.innerHTML = products.map(p => {
            const displayPrice = p.salePrice || p.price;
            const badgeHTML = p.salePrice ? `<div class="col-badge-sale">SALE</div>` : '';
            const priceHTML = p.salePrice
                ? `<span class="col-price-sale">₹${displayPrice.toLocaleString('en-IN')}</span><span class="col-price-original">₹${p.price.toLocaleString('en-IN')}</span>`
                : `<span class="col-price-sale">₹${displayPrice.toLocaleString('en-IN')}</span>`;

            return `
            <div class="col-product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
                ${badgeHTML}
                <button class="col-wishlist-btn" onclick="event.stopPropagation(); this.style.color='#A6171E';"><i class="fa-regular fa-heart"></i></button>
                <img class="col-product-img" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='/assets/images/products/best_seller_glasses_1_1773742904220.png'">
                <div class="col-product-body">
                    <div class="col-product-brand">${p.brand}</div>
                    <div class="col-product-name">${p.name}</div>
                    <div class="col-product-desc">${p.description}</div>
                    <div class="col-product-price">${priceHTML}</div>
                </div>
            </div>`;
        }).join('');
    }

    updateActiveTags() {
        const bar = document.getElementById('active-filters-bar');
        if (!bar) return;
        const entries = Object.entries(this.activeFilters);
        if (entries.length === 0) {
            bar.classList.remove('has-filters');
            bar.innerHTML = '';
            return;
        }
        bar.classList.add('has-filters');
        bar.innerHTML = entries.map(([k, v]) =>
            `<span class="filter-tag">${v} <span class="remove-tag" data-key="${k}">✕</span></span>`
        ).join('') + `<span class="clear-all-btn" id="clear-all">Clear All</span>`;

        bar.querySelectorAll('.remove-tag').forEach(el => {
            el.addEventListener('click', () => {
                delete this.activeFilters[el.dataset.key];
                this.refresh();
            });
        });
        document.getElementById('clear-all').addEventListener('click', () => {
            this.activeFilters = {};
            this.maxPrice = 30000;
            this.refresh();
        });
    }

    bindGlobalClose() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePanel();
        });
    }
}
