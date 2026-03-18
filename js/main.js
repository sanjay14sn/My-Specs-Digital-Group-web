// Global JS for GlassesUSA clone
document.addEventListener('DOMContentLoaded', async () => {
    console.log('GlassesUSA Clone Loaded');

    // Component Loader Utility
    async function loadComponent(id, file) {
        const el = document.getElementById(id);
        if (!el) return;

        // Adjust path if on a subpage
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

    // Load Global Components
    await loadComponent('navbar-placeholder', 'components/navbar.html');
    await loadComponent('footer-placeholder', 'components/footer.html');

    // Load Page-Specific Components
    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('index.html');
    const isSunglasses = path.includes('sunglasses');
    const isEyeglasses = path.includes('eyeglasses');

    if (isHome) {
        await loadComponent('hero-placeholder', 'components/hero.html');
        await loadComponent('trust-bar-placeholder', 'components/trust-bar.html');
        await loadComponent('top-selling-placeholder', 'components/top-selling.html');
        await loadComponent('trending-now-placeholder', 'components/trending-now.html');
        await loadComponent('quiz-placeholder', 'components/quiz.html');
        await loadComponent('brands-placeholder', 'components/brands.html');
        await loadComponent('reviews-placeholder', 'components/reviews.html');
        await loadComponent('insurance-placeholder', 'components/insurance.html');
    } else if (isSunglasses) {
        await loadComponent('sunglasses-collection-placeholder', 'components/sunglasses-collection.html');
        await loadComponent('sunglasses-grid-placeholder', 'components/sunglasses-grid.html');
    } else if (isEyeglasses) {
        await loadComponent('eyeglasses-collection-placeholder', 'components/eyeglasses-collection.html');
        await loadComponent('eyeglasses-grid-placeholder', 'components/eyeglasses-grid.html');
    } else if (path.includes('product-detail')) {
        await loadComponent('pdp-main-placeholder', 'components/pdp-main.html');
        await loadComponent('pdp-specs-placeholder', 'components/pdp-specs.html');
        await loadComponent('pdp-recommendations-placeholder', 'components/pdp-recommendations.html');
    } else if (path.includes('stores')) {
        await loadComponent('stores-hero-placeholder', 'components/stores-hero.html');
        await loadComponent('stores-grid-placeholder', 'components/stores-grid.html');
    }

    // Add sticky header behavior refinement
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
            } else {
                header.style.padding = '15px 0';
            }
        });
    }

    // PDP Interactivity
    if (path.includes('product-detail')) {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-content-panel');

        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                tabPanels[index].classList.add('active');
            });
        });

        // Accordion behavior
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const icon = header.querySelector('i');
                if (icon.classList.contains('fa-chevron-right')) {
                    icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                } else {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                }
                // In a real app, this would expand a panel below
            });
        });
    }

    // Add smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
