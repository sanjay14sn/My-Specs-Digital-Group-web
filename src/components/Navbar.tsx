import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, Menu, X, ChevronRight, LogOut, Settings, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar: React.FC = () => {
    const { itemCount, setIsDrawerOpen } = useCart();
    const { user, isLoggedIn, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [currentOfferIdx, setCurrentOfferIdx] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const offers = [
        'GET 60% OFF FRAMES + FREE SHIPPING | USE CODE: SAVE60',
        'BUY 1 GET 1 FREE ON ALL DESIGNER BRANDS | LIMITED TIME',
        'EXTRA 15% OFF FOR STUDENTS & HEALTHCARE HEROES',
        'NEW ARRIVALS: EXPLORE THE LUXURY COLLECTION 2024'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentOfferIdx(prev => (prev + 1) % offers.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const popularSearches = [
        'Progressive', 'Ray-Ban', 'Contacts', 'Designer Glasses',
        'Sports & Safety', 'Kids Glasses', 'Glasses on Sale',
        'Blue Light', 'Transitions'
    ];

    const mostViewedStyles = [
        {
            name: 'Ray-Ban 6363 Shiny Black, Gold',
            image: '/images/previews/rayban-6363.png',
            url: '/product/rayban-6363'
        },
        {
            name: 'Muse Elliot Black, Gold',
            image: '/images/previews/muse-elliot.png',
            url: '/product/muse-elliot'
        },
        {
            name: 'Ottoto Bellona Tortoise, Gold',
            image: '/images/previews/ottoto-bellona.png',
            url: '/product/ottoto-bellona'
        }
    ];

    return (
        <header className={`main-menu-fixed ${scrolled ? 'scrolled' : ''}`}>
            <div className="top-bar">
                <div className="top-bar-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentOfferIdx}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="offer-text"
                        >
                            {offers[currentOfferIdx]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="main-nav-container">
                <div className="container">
                    <nav className="main-header">
                        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link to="/" className="logo">
                            <div className="logo-text-wrapper">
                                <span className="brand-top">MY SPECS</span>
                                <span className="brand-bottom">COM</span>
                            </div>
                        </Link>

                        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                            <Link to="/eyeglasses" onClick={() => setIsMobileMenuOpen(false)}>Eyeglasses</Link>
                            <Link to="/sunglasses" onClick={() => setIsMobileMenuOpen(false)}>Sunglasses</Link>
                            <Link to="/brands" onClick={() => setIsMobileMenuOpen(false)}>Brands</Link>
                            <Link to="/lenses" onClick={() => setIsMobileMenuOpen(false)}>Lenses</Link>
                            <Link to="/find-hospital" onClick={() => setIsMobileMenuOpen(false)}>Hospital</Link>
                            <Link to="/sale" className="sale" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
                        </div>

                        <div className="header-actions">
                            <div className="search-wrapper" ref={searchRef}>
                                <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
                                    <Search size={18} />
                                    <input
                                        type="text"
                                        placeholder="I'm searching for..."
                                        onFocus={() => setIsSearchOpen(true)}
                                    />
                                </div>

                                <AnimatePresence>
                                    {isSearchOpen && (
                                        <motion.div
                                            className="search-dropdown"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="dropdown-section">
                                                <h4 className="section-title">Popular Searches</h4>
                                                <div className="popular-tags">
                                                    {popularSearches.map(tag => (
                                                        <button key={tag} className="tag-pill">{tag}</button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="dropdown-divider"></div>

                                            <div className="dropdown-section">
                                                <h4 className="section-title">Most Viewed Styles</h4>
                                                <div className="styles-grid">
                                                    {mostViewedStyles.map((style, idx) => (
                                                        <Link key={idx} to={style.url} className="style-card">
                                                            <div className="style-image">
                                                                <img src={style.image} alt={style.name} />
                                                            </div>
                                                            <span className="style-name">{style.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="user-icons">
                                <Link to="/favorites"><Heart size={22} /></Link>

                                <div className="user-menu-container" ref={userMenuRef}>
                                    <div className="user-trigger" onClick={() => isLoggedIn ? setIsUserMenuOpen(!isUserMenuOpen) : navigate('/login')}>
                                        {isLoggedIn && user ? (
                                            <div className="user-avatar-small">
                                                <img src={user.avatar} alt={user.name} />
                                            </div>
                                        ) : (
                                            <User size={22} />
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {isLoggedIn && isUserMenuOpen && (
                                            <motion.div
                                                className="user-dropdown"
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="dropdown-header">
                                                    <p className="user-name">{user?.name}</p>
                                                    <p className="user-email">{user?.email}</p>
                                                </div>
                                                <div className="dropdown-divider"></div>
                                                <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                                                    <User size={16} /> Account Dashboard
                                                </Link>
                                                <Link to="/profile?tab=orders" onClick={() => setIsUserMenuOpen(false)}>
                                                    <Package size={16} /> My Orders
                                                </Link>
                                                <Link to="/profile?tab=settings" onClick={() => setIsUserMenuOpen(false)}>
                                                    <Settings size={16} /> Settings
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                                <button className="logout-btn" onClick={handleLogout}>
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="cart-icon-container" onClick={() => setIsDrawerOpen(true)}>
                                    <ShoppingCart size={22} />
                                    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
