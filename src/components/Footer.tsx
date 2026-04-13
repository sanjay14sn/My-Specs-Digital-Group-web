import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <h3>Shop</h3>
                    <ul>
                        <li><a href="/eyeglasses">Eyeglasses</a></li>
                        <li><a href="/sunglasses">Sunglasses</a></li>
                        <li><a href="/brands">Brands</a></li>
                        <li><a href="/sale">Sale</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Customer Care</h3>
                    <ul>
                        <li><a href="/help">Help Center</a></li>
                        <li><a href="/shipping">Shipping & Returns</a></li>
                        <li><a href="/warranty">Warranty</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="/story">Our Story</a></li>
                        <li><a href="/stores">Find a Store</a></li>
                        <li><a href="/careers">Careers</a></li>
                    </ul>
                </div>

                <div className="footer-col newsletter-col">
                    <h3>Stay in the Loop</h3>
                    <p>Get ₹830 off your first order!</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button className="btn btn-accent">Sign Up</button>
                    </div>
                    <div className="social-links">
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Instagram size={20} />
                        <Youtube size={20} />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>© 2026 My Specs Com. All Rights Reserved.</p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
