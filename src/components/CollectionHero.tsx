import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Square, MinusSquare, Circle, CircleDashed, Laptop, Glasses, Eye, Tag, DollarSign, Palette, HardHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Genders, Shapes, Sizes, Brands, Colors, Materials } from '../data/products';

export interface Filters {
    gender: string[];
    shape: string[];
    size: string[];
    features: string[];
    brands: string[];
    color: string[];
    material: string[];
    price: string[];
    [key: string]: string[];
}

interface CollectionHeroProps {
    title: string;
    itemCount: number;
    category: string;
    onFilterChange: (filters: Filters) => void;
}

const CollectionHero: React.FC<CollectionHeroProps> = ({ title, itemCount, category, onFilterChange }) => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<Filters>({
        gender: [],
        shape: [],
        size: [],
        features: [],
        brands: [],
        color: [],
        material: [],
        price: []
    });

    const brandsNav = ['RAY-BAN', 'OAKLEY', 'MICHAEL KORS', 'VERSACE', 'TOM FORD', 'PERSOL', 'COSTA', 'MAUI JIM'];
    const tags = [
        `Women's ${category}`,
        `Men's ${category}`,
        'Polarized',
        'New Arrivals',
        'Oakley'
    ];

    const filterConfigs = [
        { id: 'gender', label: 'Gender' },
        { id: 'shape', label: 'Shape' },
        { id: 'size', label: 'Size' },
        { id: 'features', label: 'Features' },
        { id: 'brands', label: 'Brands' },
        { id: 'color', label: 'Color' },
        { id: 'material', label: 'Material' },
        { id: 'price', label: 'Price' }
    ];

    // Helper to get icon for shape
    const getShapeIcon = (shape: string) => {
        const lower = shape.toLowerCase();
        if (lower.includes('square')) return <Square size={20} />;
        if (lower.includes('rectangle')) return <MinusSquare size={20} />;
        if (lower.includes('round')) return <Circle size={20} />;
        if (lower.includes('oval')) return <CircleDashed size={20} />;
        if (lower.includes('cat eye')) return <Eye size={20} />;
        if (lower.includes('aviator')) return <Glasses size={20} />;
        if (lower.includes('wrap')) return <Laptop size={20} />;
        return <Glasses size={20} />;
    };

    // Helper to get emoji for gender
    const getGenderIcon = (gender: string) => {
        const lower = gender.toLowerCase();
        if (lower === 'men') return '👨';
        if (lower === 'women') return '👩';
        if (lower === 'unisex') return '👫';
        if (lower === 'kids') return '👶';
        return '👓';
    };

    const genderOptions = Genders.map(g => ({ label: g, icon: getGenderIcon(g) }));
    const shapeOptions = Shapes.map(s => ({ label: s, icon: getShapeIcon(s) }));
    const sizeOptions = Sizes;
    const featureOptions = ['On Sale', 'New Arrivals', 'Best Sellers', 'Polarized'];
    const brandOptions = Brands;
    const colorOptions = Colors;
    const materialOptions = Materials;
    const priceOptions = ['Under ₹10,000', '₹10,000 - ₹15,000', '₹15,000 - ₹20,000', 'Over ₹20,000'];

    const toggleFilterCategory = (filterId: string) => {
        setActiveFilter(activeFilter === filterId ? null : filterId);
    };

    const toggleOption = (categoryKey: keyof Filters, option: string) => {
        const currentSelections = selectedFilters[categoryKey];
        const newSelections = currentSelections.includes(option)
            ? currentSelections.filter(i => i !== option)
            : [...currentSelections, option];

        const newFilters = { ...selectedFilters, [categoryKey]: newSelections };
        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const cleared = {
            gender: [], shape: [], size: [], features: [], brands: [], color: [], material: [], price: []
        };
        setSelectedFilters(cleared);
        onFilterChange(cleared);
        setActiveFilter(null);
    };

    return (
        <div className="collection-hero-wrapper">
            {/* Brand Nav */}
            <div className="collection-brand-nav">
                <button className="nav-arrow left"><ChevronLeft size={20} /></button>
                <div className="brand-list">
                    {brandsNav.map(brand => (
                        <span key={brand} className="brand-item">{brand}</span>
                    ))}
                </div>
                <button className="nav-arrow right"><ChevronRight size={20} /></button>
            </div>

            {/* Title & Stats */}
            <div className="collection-header-main container">
                <h1 className="collection-title">
                    {title} <span className="item-count">({itemCount} Items)</span>
                </h1>

                {/* Tags */}
                <div className="collection-tags">
                    {tags.map(tag => (
                        <button key={tag} className="tag-pill">{tag}</button>
                    ))}
                </div>
            </div>

            {/* Filter Bar (Sticky) */}
            <div className="filter-bar-wrapper">
                <div className="container">
                    <div className="filter-bar">
                        <div className="filter-buttons">
                            {filterConfigs.map(filter => (
                                <button
                                    key={filter.id}
                                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''} ${selectedFilters[filter.id].length > 0 ? 'selected' : ''}`}
                                    onClick={() => toggleFilterCategory(filter.id)}
                                >
                                    {filter.label}
                                    {selectedFilters[filter.id].length > 0 && (
                                        <span className="selection-badge">{selectedFilters[filter.id].length}</span>
                                    )}
                                    <ChevronDown size={14} className="chevron" />
                                </button>
                            ))}
                            {(Object.values(selectedFilters).some(s => s.length > 0)) && (
                                <button className="clear-all-btn" onClick={clearFilters}>Clear All</button>
                            )}
                        </div>
                        <div className="sort-view-controls">
                            <div className="view-toggle">
                                <button className="view-btn active"><Glasses size={20} /></button>
                                <button className="view-btn"><Eye size={20} /></button>
                            </div>
                            <div className="sort-wrapper">
                                <span className="sort-label">Most Relevant</span>
                                <ChevronDown size={14} className="chevron" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Filter Menus */}
                <AnimatePresence>
                    {activeFilter && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="filter-submenu-container"
                        >
                            <div className="container">
                                <div className="filter-submenu-content">
                                    {activeFilter === 'gender' && (
                                        <div className="gender-grid">
                                            {genderOptions.map(option => (
                                                <div
                                                    key={option.label}
                                                    className={`option-card ${selectedFilters.gender.includes(option.label) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('gender', option.label)}
                                                >
                                                    <span className="option-icon">{option.icon}</span>
                                                    <span className="option-label">{option.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'shape' && (
                                        <div className="shape-grid">
                                            {shapeOptions.map(option => (
                                                <div
                                                    key={option.label}
                                                    className={`option-card small ${selectedFilters.shape.includes(option.label) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('shape', option.label)}
                                                >
                                                    <span className="option-icon">{option.icon}</span>
                                                    <span className="option-label">{option.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'size' && (
                                        <div className="pill-list">
                                            {sizeOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.size.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('size', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'features' && (
                                        <div className="pill-list">
                                            {featureOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.features.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('features', option)}
                                                >
                                                    <Tag size={14} /> {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'brands' && (
                                        <div className="pill-list">
                                            {brandOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.brands.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('brands', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'color' && (
                                        <div className="pill-list">
                                            {colorOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.color.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('color', option)}
                                                >
                                                    <Palette size={14} /> {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'material' && (
                                        <div className="pill-list">
                                            {materialOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.material.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('material', option)}
                                                >
                                                    <HardHat size={14} /> {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {activeFilter === 'price' && (
                                        <div className="pill-list">
                                            {priceOptions.map(option => (
                                                <button
                                                    key={option}
                                                    className={`option-pill ${selectedFilters.price.includes(option) ? 'active' : ''}`}
                                                    onClick={() => toggleOption('price', option)}
                                                >
                                                    <DollarSign size={14} /> {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <button className="close-submenu" onClick={() => setActiveFilter(null)}>
                                        Close <X size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CollectionHero;
