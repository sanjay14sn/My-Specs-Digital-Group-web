import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';
import { Heart, ChevronRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyFavorites from '../components/EmptyFavorites';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesPage: React.FC = () => {
    const { favorites, clearFavorites } = useFavorites();

    return (
        <div className="favorites-page">
            <div className="favorites-breadcrumb-wrapper">
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <ChevronRight size={14} />
                        <span>My Favorites</span>
                    </nav>
                </div>
            </div>

            <div className="favorites-hero">
                <div className="container">
                    <div className="favorites-header">
                        <div className="header-left">
                            <h1 className="favorites-title">My Favorites</h1>
                            <div className="favorites-count">
                                <Heart size={16} fill="var(--primary-color)" color="var(--primary-color)" />
                                <span>{favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved</span>
                            </div>
                        </div>
                        {favorites.length > 0 && (
                            <button className="clear-all-btn-premium" onClick={clearFavorites}>
                                <Trash2 size={18} />
                                <span>Clear All</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="favorites-content">
                    <AnimatePresence mode="wait">
                        {favorites.length === 0 ? (
                            <EmptyFavorites key="empty" />
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ProductGrid title="" products={favorites as any} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
