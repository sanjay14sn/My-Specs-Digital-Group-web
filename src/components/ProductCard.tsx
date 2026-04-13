import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../data/products';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(product.id);

    return (
        <motion.div
            className="product-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="product-image-container">
                <Link to={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    {product.salePrice && <span className="sale-badge">SALE</span>}
                    <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-actions" style={{ zIndex: 10 }}>
                    <button
                        className={`action-btn wishlist-btn ${isFav ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product)}
                    >
                        <Heart size={20} fill={isFav ? "white" : "none"} />
                    </button>
                    <button className="action-btn cart-btn" onClick={() => addToCart(product)}>
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    {product.salePrice ? (
                        <>
                            <span className="sale-price">₹{product.salePrice.toLocaleString()}</span>
                            <span className="original-price">₹{product.price.toLocaleString()}</span>
                        </>
                    ) : (
                        <span className="main-price">₹{product.price.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
