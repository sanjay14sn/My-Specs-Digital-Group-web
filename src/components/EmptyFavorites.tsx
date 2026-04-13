import React from 'react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyFavorites: React.FC = () => {
    return (
        <motion.div
            className="empty-favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="empty-icon-wrapper">
                <Heart size={64} className="heart-outline" />
                <Search size={32} className="search-overlay" />
            </div>
            <h2>Your wishlist is feeling a bit light</h2>
            <p>Save your favorite frames to compare them and find your perfect pair.</p>
            <div className="empty-actions">
                <Link to="/eyeglasses" className="btn btn-primary">Shop Eyeglasses</Link>
                <Link to="/sunglasses" className="btn btn-accent">Shop Sunglasses</Link>
            </div>
        </motion.div>
    );
};

export default EmptyFavorites;
