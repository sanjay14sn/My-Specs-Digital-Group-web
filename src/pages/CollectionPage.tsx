import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CollectionHero, { Filters } from '../components/CollectionHero';
import { PRODUCTS, Product } from '../data/products';

const CollectionPage: React.FC = () => {
    const location = useLocation();
    const path = location.pathname.toLowerCase();

    let title = "Collection";
    let subtitle = "Modern designs for every vision";
    let filteredProducts = PRODUCTS;

    const [activeFilters, setActiveFilters] = useState<Filters>({
        gender: [], shape: [], size: [], features: [], brands: [], color: [], material: [], price: []
    });

    if (path.includes('eyeglasses')) {
        title = "Designer Eyeglasses";
        subtitle = "Premium frames for daily clarity and style";
        filteredProducts = PRODUCTS.filter(p => p.category === 'Eyeglasses');
    } else if (path.includes('sunglasses')) {
        title = "Elite Sunglasses";
        subtitle = "Iconic shades with premium UV protection";
        filteredProducts = PRODUCTS.filter(p => p.category === 'Sunglasses');
    } else if (path.includes('sale')) {
        title = "Exclusive Sale";
        subtitle = "Luxury eyewear at exceptional prices";
        filteredProducts = PRODUCTS.filter(p => p.salePrice !== undefined);
    }

    // Apply dynamic filters
    const finalProducts = filteredProducts.filter(product => {
        if (activeFilters.gender.length > 0 && !activeFilters.gender.includes(product.gender)) return false;
        if (activeFilters.shape.length > 0 && !activeFilters.shape.includes(product.shape)) return false;
        if (activeFilters.size.length > 0 && !activeFilters.size.includes(product.size)) return false;
        if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) return false;
        if (activeFilters.color.length > 0 && !activeFilters.color.includes(product.color)) return false;
        if (activeFilters.material.length > 0 && !activeFilters.material.includes(product.material)) return false;

        if (activeFilters.features.length > 0) {
            const matchesFeature = activeFilters.features.some(feature => {
                if (feature === 'On Sale') return product.salePrice !== undefined;
                if (feature === 'New Arrivals') return product.id > 10;
                if (feature === 'Polarized') return product.description.toLowerCase().includes('polarized');
                return true;
            });
            if (!matchesFeature) return false;
        }

        if (activeFilters.price.length > 0) {
            const matchesPrice = activeFilters.price.some(range => {
                const p = product.salePrice || product.price;
                if (range === 'Under ₹10,000') return p < 10000;
                if (range === '₹10,000 - ₹15,000') return p >= 10000 && p <= 15000;
                if (range === '₹15,000 - ₹20,000') return p > 15000 && p <= 20000;
                if (range === 'Over ₹20,000') return p > 20000;
                return true;
            });
            if (!matchesPrice) return false;
        }

        return true;
    });

    const handleFilterChange = (newFilters: Filters) => {
        setActiveFilters(newFilters);
    };

    return (
        <div className="collection-page">
            <CollectionHero
                title={title}
                itemCount={finalProducts.length}
                category={path.includes('eyeglasses') ? 'Eyeglasses' : 'Sunglasses'}
                onFilterChange={handleFilterChange}
            />

            <div className="container" style={{ padding: '40px 0' }}>
                <ProductGrid title="" products={finalProducts} />
            </div>
        </div>
    );
};

export default CollectionPage;
