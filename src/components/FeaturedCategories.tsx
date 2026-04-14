import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedCategories: React.FC = () => {
    const categories = [
        {
            id: 'best-sellers',
            title: 'Best Sellers',
            subtitle: 'Save up to 50% off.',
            image: '/images/categories/best-sellers.png',
            links: [
                { label: 'Women', url: '/eyeglasses' },
                { label: 'Men', url: '/eyeglasses' }
            ]
        },
        {
            id: 'designer-outlet',
            title: 'Designer Outlet',
            subtitle: 'Get an extra 40% off.',
            image: '/images/categories/designer-outlet.png',
            links: [
                { label: 'Women', url: '/sunglasses' },
                { label: 'Men', url: '/sunglasses' }
            ]
        },
        {
            id: 'vision-insurance',
            title: 'We Accept Vision Insurance',
            subtitle: '',
            image: '/images/categories/vision-insurance.png',
            links: [
                { label: 'Use Your Insurance', url: '/insurance' }
            ]
        },
        {
            id: 'contact-lenses',
            title: 'Contact Lenses',
            subtitle: 'Get 30% off all brands',
            image: '/images/categories/contact-lenses.png',
            links: [
                { label: 'Find Your Contacts', url: '/contacts' }
            ]
        }
    ];

    return (
        <section className="featured-categories-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Eyewear for everyone and every need.</h2>
                </div>

                <div className="featured-categories-grid">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className="category-card"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="category-image-container">
                                <img src={category.image} alt={category.title} />
                                <div className="category-overlay">
                                    <h3 className="cat-title">{category.title}</h3>
                                    {category.subtitle && <p className="cat-subtitle">{category.subtitle}</p>}
                                    <div className="cat-links">
                                        {category.links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                to={link.url}
                                                className={`cat-btn ${category.links.length === 1 ? 'large' : ''}`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
