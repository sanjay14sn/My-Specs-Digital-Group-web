import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../data/products';

interface ProductGridProps {
    title: string;
    products: Product[];
    subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, subtitle }) => {
    return (
        <section className="product-section">
            <div className="container">
                <h2 className="section-title">{title}</h2>
                {subtitle && <p className="section-subtitle">{subtitle}</p>}
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
