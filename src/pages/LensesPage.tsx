import React from 'react';
import { motion } from 'framer-motion';
import '../lenses-page.css';

const LensesPage: React.FC = () => {
    const brands = [
        {
            name: "ESSILOR",
            title: "World Leader in Prescription Lenses",
            badge: "⭐ Most Popular",
            positioning: "Mid-Premium Segment",
            image: "/images/essilor-lenses.png",
            categories: [
                {
                    name: "Single Vision",
                    items: ["Crizal Anti-Glare", "Eyezen (Digital screen lenses)", "Blue Cut (Blue UV Capture)", "High Index (1.56 / 1.6 / 1.67 / 1.74)"]
                },
                {
                    name: "Bifocal",
                    items: ["Essilor Bifocal Flat-Top", "Essilor Executive Bifocal"]
                },
                {
                    name: "Progressive",
                    items: ["Varilux Comfort", "Varilux Physio", "Varilux X Series (Premium)"]
                },
                {
                    name: "Special Lenses",
                    items: ["Transitions (Photochromic)", "Drive lenses (Night driving)", "Polarized lenses"]
                }
            ]
        },
        {
            name: "ZEISS",
            title: "Pioneering Optical Excellence",
            badge: "⭐ Premium Segment",
            positioning: "Higher Profit + Brand Trust",
            image: "/images/zeiss-lenses.png",
            categories: [
                {
                    name: "Single Vision",
                    items: ["ZEISS ClearView", "ZEISS SmartLife Single Vision", "BlueGuard Blue Light Protection", "High Index (1.6 / 1.67 / 1.74)"]
                },
                {
                    name: "Bifocal",
                    items: ["ZEISS Bifocal Standard", "ZEISS Digital Bifocal"]
                },
                {
                    name: "Progressive",
                    items: ["ZEISS SmartLife Progressive", "ZEISS Precision Progressive", "ZEISS Individual (Premium)"]
                },
                {
                    name: "Special Lenses",
                    items: ["PhotoFusion (Photochromic)", "DriveSafe (Driving lenses)", "DuraVision coatings"]
                }
            ]
        },
        {
            name: "HOYA",
            title: "Precision Japanese Optics",
            badge: "⭐ Mid Segment",
            positioning: "Good Balance Price + Quality",
            image: "/images/hoya-lenses.png",
            categories: [
                {
                    name: "Single Vision",
                    items: ["Hoya Hilux", "BlueControl", "Hoya Sync (Digital use)", "High Index options"]
                },
                {
                    name: "Bifocal",
                    items: ["Hoya Standard Bifocal", "Hoya Executive"]
                },
                {
                    name: "Progressive",
                    items: ["Hoya Amplitude", "Hoya Balansis", "Hoya MyStyle (Premium)"]
                },
                {
                    name: "Special Lenses",
                    items: ["Sensity (Photochromic)", "Polarized lenses", "UV control"]
                }
            ]
        },
        {
            name: "ADOPT",
            title: "Your Personalized Vision Solution",
            badge: "⭐ Best Value",
            positioning: "High Margin for MySpecz",
            image: "/images/adopt-lenses.png",
            categories: [
                {
                    name: "Single Vision",
                    items: ["Basic Anti-Glare", "Blue Cut", "Scratch Resistant", "UV Protection"]
                },
                {
                    name: "Bifocal",
                    items: ["Standard Bifocal"]
                },
                {
                    name: "Progressive",
                    items: ["Basic Progressive", "Digital Progressive"]
                },
                {
                    name: "Special",
                    items: ["Photochromic", "High Index"]
                }
            ]
        }
    ];

    return (
        <div className="lenses-info-page">
            <section className="lenses-modern-intro">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="intro-content"
                    >
                        <span className="section-tag">Premium Collection</span>
                        <h1>Exquisite Lens Technology</h1>
                        <div className="accent-line"></div>
                        <p>Advanced optical technology tailored for your unique vision. We partner with the world's leading lens manufacturers to provide you with unmatched clarity, protection, and comfort.</p>
                    </motion.div>
                </div>
            </section>

            {brands.map((brand, index) => (
                <section key={brand.name} className="brand-section">
                    <div className="container brand-grid">
                        <div className={`brand-image ${index % 2 === 1 ? 'brand-image-order' : ''}`}>
                            <div className="positioning-badge">{brand.badge}</div>
                            <img src={brand.image} alt={brand.name} />
                        </div>
                        <div className="brand-info">
                            <h2>{brand.name} LENSES</h2>
                            <h3>{brand.title}</h3>
                            <div className="brand-categories">
                                {brand.categories.map(cat => (
                                    <div key={cat.name} className="category-group">
                                        <h4>{cat.name}</h4>
                                        <ul>
                                            {cat.items.map(item => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="brand-description">
                                <strong>Positioning:</strong> {brand.positioning}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default LensesPage;
