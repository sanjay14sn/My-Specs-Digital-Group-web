// Global JS for GlassesUSA clone
document.addEventListener('DOMContentLoaded', async () => {
    console.log('GlassesUSA Clone Loaded');

    // --- Global Data ---
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
        { id: 12, name: "Ottoto Bellona", category: "Eyeglasses", brand: "Ottoto", price: 9900, image: "/assets/images/products/brand_card_ottoto_couple_1773749656499.png", description: "Elegant cat-eye frames for a chic look.", gender: "Women", shape: "Cat Eye", color: "Brown", material: "Acetate", size: "Medium" }
    ];

    // --- State & Constants ---
    let allProducts = [...PRODUCTS];
    const API_URL = '/data/products.json';
    let productCardTemplate = '';

    // --- Pre-fetch Product Card Template ---
    try {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        const response = await fetch(pathPrefix + 'components/product-card.html');
        productCardTemplate = await response.text();
    } catch (err) {
        console.error('Error pre-fetching product card template:', err);
    }

    // --- Component Loader Utility ---
    async function loadComponent(id, file) {
        const el = document.getElementById(id);
        if (!el) return;

        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        const fullPath = pathPrefix + file;

        try {
            const response = await fetch(fullPath);
            const html = await response.text();
            el.innerHTML = html;
        } catch (err) {
            console.error(`Error loading component ${file}:`, err);
        }
    }

    // --- Product Rendering ---
    function renderProductGrid(containerId, products) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const grid = container.querySelector('.product-grid') || container.querySelector('.full-grid') || container;
        if (!grid) return;

        grid.innerHTML = products.map(product => {
            const displayPrice = product.salePrice ? product.salePrice : product.price;
            const hasSale = product.salePrice ? true : false;
            const isFav = window.appFavorites ? window.appFavorites.isFavorite(product.id) : false;

            if (productCardTemplate) {
                let html = productCardTemplate;
                html = html.replace(/{{id}}/g, product.id);
                html = html.replace(/{{name}}/g, product.name);
                html = html.replace(/{{image}}/g, product.image);
                html = html.replace(/{{price}}/g, product.price.toLocaleString());
                html = html.replace(/{{displayPrice}}/g, displayPrice.toLocaleString());

                // Handle basic if blocks for sale badge and heart icon
                html = html.replace(/{{#if hasSale}}([\s\S]*?){{\/if}}/g, hasSale ? '$1' : '');
                html = html.replace(/{{#if isFav}}([\s\S]*?){{else}}([\s\S]*?){{\/if}}/g, isFav ? '$1' : '$2');
                html = html.replace(/{{#if isFav}}([\s\S]*?){{\/if}}/g, isFav ? '$1' : '');

                return html;
            }

            // Fallback if template fails to load
            return `<div class="product-card">Error loading template</div>`;
        }).join('');

        // Add Event Listeners for Wishlist (Favorites)
        grid.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                const product = products.find(p => p.id === id);
                if (product && window.appFavorites) {
                    window.appFavorites.toggleFavorite(product);
                    const icon = btn.querySelector('i');
                    if (window.appFavorites.isFavorite(id)) {
                        btn.classList.add('active');
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                    } else {
                        btn.classList.remove('active');
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                }
            });
        });

        // Add to Cart listeners removed as button is no longer in the grid card
    }

    // --- Cart UI Updates ---
    function updateCartUI(items) {
        const countBadges = document.querySelectorAll('.cart-count');
        countBadges.forEach(badge => {
            badge.textContent = window.appCart.getCount();
        });

        const itemsContainer = document.getElementById('cart-items-container');
        const totalAmountEl = document.getElementById('cart-total-amount');

        if (itemsContainer) {
            if (items.length === 0) {
                itemsContainer.innerHTML = '<p style="text-align: center; margin-top: 50px; color: #666;">Your cart is empty</p>';
            } else {
                itemsContainer.innerHTML = items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                            <div class="cart-item-controls">
                                <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                                <i class="far fa-trash-alt remove-btn" data-id="${item.id}" style="margin-left: auto; cursor: pointer; color: #ff4d4d;"></i>
                            </div>
                        </div>
                    </div>
                `).join('');

                itemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.dataset.id);
                        const action = e.target.dataset.action;
                        const item = window.appCart.items.find(i => i.id === id);
                        if (item) {
                            const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                            window.appCart.updateQuantity(id, newQty);
                        }
                    });
                });

                itemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.dataset.id);
                        window.appCart.removeItem(id);
                    });
                });
            }
        }

        if (totalAmountEl) {
            totalAmountEl.textContent = `₹${window.appCart.getTotal().toLocaleString()}`;
        }
    }

    // --- Cart Drawer Logic ---
    function openCartDrawer() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.add('active');
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    window.openCartDrawer = openCartDrawer;

    function closeCartDrawer() {
        const overlay = document.getElementById('cart-overlay');
        const drawer = document.getElementById('cart-drawer');
        if (overlay && drawer) {
            overlay.classList.remove('active');
            drawer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    window.closeCartDrawer = closeCartDrawer;

    // --- Page Specific Logic ---
    function setupBrandFilters() {
        const filterBtns = document.querySelectorAll('.brand-filter-btn');
        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const brand = e.target.dataset.brand;
                const filtered = brand === 'all' ? allProducts : allProducts.filter(p => p.brand === brand);
                renderProductGrid('branded-products-grid', filtered);
            });
        });

        // Initial render
        renderProductGrid('branded-products-grid', allProducts);
    }

    function setupSaleCountdown() {
        if (!document.getElementById('days')) return;

        let d = 2, h = 14, m = 45, s = 32;
        setInterval(() => {
            s--;
            if (s < 0) { s = 59; m--; }
            if (m < 0) { m = 59; h--; }
            if (h < 0) { h = 23; d--; }

            if (document.getElementById('days')) {
                document.getElementById('days').textContent = d.toString().padStart(2, '0');
                document.getElementById('hours').textContent = h.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
            }
        }, 1000);

        renderProductGrid('sale-products-grid', allProducts.filter(p => p.salePrice));
    }

    function setupLensSelector() {
        const lensBtns = document.querySelectorAll('.lens-option button');
        lensBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.target.parentElement.querySelector('h3').textContent;
                const priceText = e.target.parentElement.querySelector('.price').textContent;
                const price = priceText === 'FREE' ? 0 : parseInt(priceText.replace('₹', '').replace(',', ''));

                if (window.appCart) {
                    window.appCart.addItem({
                        id: 100 + Math.floor(Math.random() * 100), // Dummy Lens ID
                        name: `Lens: ${title}`,
                        price: price,
                        image: '/assets/images/hero/lens_icon.png', // Replace with a generic lens icon if available
                        quantity: 1
                    });
                    openCartDrawer();
                }
            });
        });
    }

    // --- Product Detail Rendering ---
    function renderProductDetail(id) {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) {
            console.error('Product not found:', id);
            return;
        }

        const mainPlaceholder = document.getElementById('pdp-main-placeholder');
        if (mainPlaceholder) {
            const displayPrice = product.salePrice ? product.salePrice : product.price;
            mainPlaceholder.innerHTML = `
                <section class="pdp-intro">
                    <div class="container pdp-grid">
                        <div class="pdp-gallery">
                            <div class="img-zoom-container">
                                <img src="${product.image}" alt="${product.name}" id="main-product-image">
                            </div>
                        </div>
                        <div class="pdp-info">
                            <span class="pdp-brand">${product.brand}</span>
                            <h1 class="pdp-title">${product.name}</h1>
                            <div class="pdp-meta">
                                <div class="pdp-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <span>(1,248)</span>
                                </div>
                                <span class="pdp-sku">SKU: PD-${product.id}</span>
                            </div>
                            <div class="pdp-pricing">
                                ${product.salePrice ? `<span class="pdp-sale-price">₹${product.salePrice.toLocaleString()}</span>` : ''}
                                <span class="pdp-main-price" style="${product.salePrice ? 'text-decoration: line-through; color: #999; font-size: 18px;' : ''}">
                                    ₹${product.price.toLocaleString()}
                                </span>
                            </div>
                            <p class="pdp-description">${product.description || 'These luxury frames combine timeless elegance with modern craftsmanship, perfect for making a sophisticated statement.'}</p>
                            
                            <div class="pdp-options">
                                <div class="option-group">
                                    <label>Size</label>
                                    <div class="option-pills">
                                        <span class="pill active">Medium (52-18-140)</span>
                                        <span class="pill">Large (54-18-145)</span>
                                    </div>
                                </div>
                                <div class="option-group">
                                    <label>Color</label>
                                    <div class="color-options">
                                        <span class="color-dot active" style="background: ${product.color || '#000'}"></span>
                                        <span class="color-dot" style="background: #555"></span>
                                        <span class="color-dot" style="background: #224"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="pdp-cta">
                                <button class="btn btn-primary add-to-cart-pdp" data-id="${product.id}">Select Lenses</button>
                                <button class="btn btn-accent buy-now-pdp">Add to Cart Only</button>
                            </div>
                            <div class="pdp-trust-notes">
                                <div><i class="fas fa-truck"></i> Free Shipping and Returns</div>
                                <div><i class="fas fa-shield-alt"></i> 1 Year Warranty</div>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            const addBtn = mainPlaceholder.querySelector('.add-to-cart-pdp');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    if (window.appCart) {
                        window.appCart.addItem(product);
                        openCartDrawer();
                    }
                });
            }
        }
    }

    // --- Init ---
    async function init() {
        await loadComponent('navbar-placeholder', 'components/navbar.html');
        await loadComponent('footer-placeholder', 'components/footer.html');
        await loadComponent('cart-drawer-placeholder', 'components/cart-drawer.html');
        loadComponent('trust-bar-placeholder', 'components/trust-bar.html');
        loadComponent('brands-placeholder', 'components/brands.html');

        try {
            const response = await fetch(API_URL);
            allProducts = await response.json();
        } catch (err) {
            console.error('Error fetching products:', err);
        }

        const path = window.location.pathname;
        const isHome = path === '/' || path.endsWith('index.html');

        if (isHome) {
            await Promise.all([
                loadComponent('hero-placeholder', 'components/hero.html'),
                loadComponent('top-selling-placeholder', 'components/top-selling.html'),
                loadComponent('trending-now-placeholder', 'components/trending-now.html'),
                loadComponent('quiz-placeholder', 'components/quiz.html'),
                loadComponent('reviews-placeholder', 'components/reviews.html'),
                loadComponent('insurance-placeholder', 'components/insurance.html')
            ]);
            renderProductGrid('top-selling-placeholder', allProducts.slice(0, 4));
            renderProductGrid('trending-now-placeholder', allProducts.slice(4, 10));
        } else if (path.includes('sunglasses')) {
            await Promise.all([
                loadComponent('sunglasses-collection-placeholder', 'components/sunglasses-collection.html'),
                loadComponent('sunglasses-grid-placeholder', 'components/sunglasses-grid.html')
            ]);
            renderProductGrid('sunglasses-grid-placeholder', allProducts.filter(p => p.category === 'Sunglasses'));
        } else if (path.includes('eyeglasses')) {
            await Promise.all([
                loadComponent('eyeglasses-collection-placeholder', 'components/eyeglasses-collection.html'),
                loadComponent('eyeglasses-grid-placeholder', 'components/eyeglasses-grid.html')
            ]);
            renderProductGrid('eyeglasses-grid-placeholder', allProducts.filter(p => p.category === 'Eyeglasses'));
        } else if (path.includes('brands')) {
            setupBrandFilters();
        } else if (path.includes('sale')) {
            setupSaleCountdown();
            await loadComponent('insurance-placeholder', 'components/insurance.html');
        } else if (path.includes('lenses')) {
            setupLensSelector();
            await loadComponent('quiz-placeholder', 'components/quiz.html');
        } else if (path.includes('favorites')) {
            if (window.appFavorites) {
                const favs = window.appFavorites.getFavorites();
                renderProductGrid('favorites-grid-placeholder', favs);
                window.appFavorites.addListener((items) => {
                    renderProductGrid('favorites-grid-placeholder', items);
                });
            }
        } else if (path.includes('product-detail')) {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            if (productId) {
                renderProductDetail(productId);
            }
        }

        setTimeout(() => {
            if (window.appCart) {
                window.appCart.addListener(updateCartUI);
                updateCartUI(window.appCart.items);
                const openCartBtn = document.getElementById('open-cart');
                if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
                const closeCartBtn = document.getElementById('close-cart');
                const cartOverlay = document.getElementById('cart-overlay');
                if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
                if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
            }

            // Mobile Menu Toggle
            const mobileToggle = document.getElementById('mobile-toggle');
            const navLinks = document.getElementById('nav-links');
            if (mobileToggle && navLinks) {
                mobileToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = mobileToggle.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    } else {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                });
            }

            // Auth UI Update
            if (window.appAuth) {
                const updateNavbarAuth = (user) => {
                    const userLink = document.getElementById('user-link');
                    if (userLink) {
                        if (user) {
                            userLink.innerHTML = `
                                <div class="user-menu-container">
                                    <i class="fa-solid fa-circle-user" style="font-size: 22px;"></i>
                                    <div class="user-dropdown">
                                        <a href="/pages/profile.html"><i class="fa-solid fa-user"></i> My Profile</a>
                                        <a href="/pages/favorites.html"><i class="fa-solid fa-heart"></i> Favorites</a>
                                        <a href="/pages/tracking.html"><i class="fa-solid fa-truck-fast"></i> Track Order</a>
                                        <hr>
                                        <a href="#" class="logout-btn" onclick="window.appAuth.logout()"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                                    </div>
                                </div>
                            `;
                            userLink.href = "javascript:void(0)";
                        } else {
                            userLink.innerHTML = `<i class="fa-regular fa-user"></i>`;
                            userLink.href = "/pages/login-register.html";
                        }
                    }
                };
                window.appAuth.addListener(updateNavbarAuth);
                updateNavbarAuth(window.appAuth.user);
            }
        }, 300);
    }
    init();
});
