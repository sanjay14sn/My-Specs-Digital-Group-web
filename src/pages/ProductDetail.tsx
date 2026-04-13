import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Truck, Check, HelpCircle, ChevronRight, Video, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [selectedColor, setSelectedColor] = React.useState(0);
    const [selectedSize, setSelectedSize] = React.useState('Medium');
    const [activeTab, setActiveTab] = React.useState<'about' | 'shipping'>('about');

    const product = PRODUCTS.find(p => p.id === parseInt(id || '0'));

    if (!product) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Product not found</div>;
    }

    const isFav = isFavorite(product.id);

    // Filter recommended products (same category, different id)
    const recommended = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="product-detail-page" style={{ padding: '20px 0 80px' }}>
            <div className="container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs" style={{ marginBottom: '25px', fontSize: '13px', color: '#888' }}>
                    <Link to="/" style={{ color: '#888' }}>Home</Link> <span> &gt; </span>
                    <Link to={`/${product.category.toLowerCase()}`} style={{ color: '#888' }}>{product.category}</Link> <span> &gt; </span>
                    <span style={{ color: '#888' }}>{product.brand}</span> <span> &gt; </span>
                    <span style={{ color: '#888' }}>{product.shape}</span> <span> &gt; </span>
                    <span style={{ color: '#333', fontWeight: '600' }}>{product.name}</span>
                </div>

                <div className="pdp-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
                    {/* Left: Gallery */}
                    <div className="pdp-gallery">
                        <div className="main-image-container" style={{
                            background: '#fcfcfc',
                            borderRadius: '12px',
                            padding: '60px',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #f0f0f0'
                        }}>
                            <span style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#999' }}>
                                <RotateCcw size={16} />
                            </span>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                            <div className="live-try-on-btn" style={{
                                position: 'absolute',
                                bottom: '25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#111',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}>
                                <Video size={18} /> Live Try On
                            </div>
                        </div>
                        <div className="gallery-thumbs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                            <div style={{ background: '#fcfcfc', borderRadius: '12px', padding: '30px', border: '1px solid #f0f0f0' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={{ background: '#fcfcfc', borderRadius: '12px', padding: '30px', border: '1px solid #f0f0f0' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', objectFit: 'contain', transform: 'scaleX(-1)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="pdp-info">
                        <div className="brand-header">
                            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#222', marginBottom: '8px' }}>{product.brand} {product.name}</h1>
                            <div className="rating-line" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                                <div className="stars" style={{ color: '#f1c40f', display: 'flex', gap: '2px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f1c40f" stroke="none" />)}
                                </div>
                                <span style={{ fontWeight: '700', fontSize: '15px' }}>4.8</span>
                                <span style={{ color: '#888', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>429 reviews</span>
                            </div>
                        </div>

                        <div className="price-section" style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                {product.salePrice && (
                                    <span style={{ fontSize: '20px', color: '#888', textDecoration: 'line-through' }}>₹{product.price.toLocaleString()}</span>
                                )}
                                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)' }}>
                                    ₹{(product.salePrice || product.price).toLocaleString()}
                                </span>
                            </div>
                            <p style={{ marginTop: '10px', fontSize: '14px', color: '#444' }}>
                                Pay over time with <b>Klarna, PayPal</b> or <b>Affirm</b> <HelpCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', opacity: 0.6 }} />
                            </p>
                        </div>

                        <ul className="pdp-bullets" style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
                            {[
                                'Single vision lenses included',
                                '45-day home try-on',
                                'Free shipping and returns'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '14px', color: '#555' }}>
                                    <Check size={16} color="#2ecc71" /> {item} {i > 0 && <HelpCircle size={12} color="#999" />}
                                </li>
                            ))}
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px', padding: '10px 15px', background: '#eefcf4', borderRadius: '6px', color: '#27ae60', fontWeight: '700', fontSize: '13px' }}>
                                Best value coupon applied: SAVE30
                            </li>
                        </ul>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', padding: '12px 15px', background: '#f8f8f8', borderRadius: '8px', border: '1px solid #eee' }}>
                            <Truck size={18} color="#2ecc71" />
                            <span style={{ fontSize: '13px', color: '#2ecc71', fontWeight: '600' }}>Eligible for Next-Day Delivery</span>
                            <span style={{ fontSize: '13px', color: '#3498db', marginLeft: 'auto', cursor: 'pointer' }}>Details</span>
                        </div>

                        <div className="color-selection">
                            <div className="color-swatches">
                                {[product.color, 'Purple', 'Black'].map((c, i) => (
                                    <div
                                        key={c}
                                        className={`swatch ${selectedColor === i ? 'active' : ''}`}
                                        style={{ background: c.toLowerCase() === 'tortoise' ? 'url(/assets/images/swatch_tortoise.png) #8b4513' : c.toLowerCase() }}
                                        onClick={() => setSelectedColor(i)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="size-selector">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <h4 style={{ margin: 0 }}>Size: <b>{selectedSize}</b></h4>
                                <span style={{ fontSize: '13px', color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}>Find Your Size</span>
                            </div>
                            <div className="size-options">
                                {['Small', 'Average', 'Large'].map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pdp-actions" style={{ marginBottom: '40px', display: 'flex', gap: '15px' }}>
                            <button
                                className="btn btn-primary"
                                style={{
                                    flex: 1,
                                    padding: '18px',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    borderRadius: '12px',
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/product/${product.id}/lenses`)}
                            >
                                Choose Lenses
                            </button>
                            <button
                                onClick={() => toggleFavorite(product)}
                                style={{
                                    width: '60px',
                                    background: 'white',
                                    border: `2px solid var(--primary-color)`,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Heart
                                    size={24}
                                    color="var(--primary-color)"
                                    fill={isFav ? "var(--primary-color)" : "none"}
                                />
                            </button>
                        </div>

                        {/* Expandable Sections */}
                        <div className="expandables" style={{ borderTop: '1px solid #eee' }}>
                            {[
                                { title: 'Frame & Measurements', icon: <HelpCircle size={18} /> },
                                { title: `Customer Reviews (429)`, icon: <Star size={18} /> },
                                { title: 'Lenses & Coatings Options', icon: <HelpCircle size={18} /> },
                                { title: 'Apply Insurance Benefits', icon: <HelpCircle size={18} /> }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                                    <span style={{ fontWeight: '600', color: '#444' }}>{item.title}</span>
                                    <ChevronRight size={18} color="#999" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recommended Section */}
                <div className="recommendations-section" style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '80px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '40px' }}>Recommended For You:</h3>
                    <div className="recommend-grid">
                        {recommended.map(p => (
                            <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                                <div className="recommend-card">
                                    <div style={{ background: '#fcfcfc', padding: '30px', borderRadius: '12px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                                        <img src={p.image} alt={p.name} style={{ width: '100%', objectFit: 'contain', height: '120px' }} />
                                    </div>
                                    <h4 style={{ fontSize: '15px', color: '#111', fontWeight: '800', textAlign: 'center' }}>{p.brand} {p.name}</h4>
                                    <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginTop: '5px' }}>₹{p.price.toLocaleString()} Including lenses</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Measurements Detail */}
                <div className="pdp-specs-section" style={{ marginTop: '100px', borderTop: '1px solid #eee', paddingTop: '80px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '50px' }}>Frame Measurements:</h2>
                    <div className="specs-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div className="measurement-visual" style={{ textAlign: 'center' }}>
                            <img src={product.image} style={{ width: '80%', height: 'auto', objectFit: 'contain' }} alt="Frame Measurements" />
                        </div>
                        <div className="measurement-grid">
                            {[
                                { label: 'Lens Width', value: '54 mm / 2.13"' },
                                { label: 'Lens Height', value: '41 mm / 1.61"' },
                                { label: 'Bridge Width', value: '14 mm / 0.55"' },
                                { label: 'Temple Length', value: '140 mm / 5.51"' }
                            ].map(item => (
                                <div key={item.label} className="measure-box">
                                    <span style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>{item.label}:</span>
                                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#222' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>Need help finding your size? <span style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}>Find My Size</span></p>

                    {/* Tabs */}
                    <div className="pdp-tabs" style={{ marginTop: '80px' }}>
                        <div className="tab-nav" style={{ display: 'flex', gap: '30px', borderBottom: '10px solid #f8f8f8', marginBottom: '40px' }}>
                            <button
                                onClick={() => setActiveTab('about')}
                                style={{
                                    paddingBottom: '15px',
                                    borderBottom: activeTab === 'about' ? '3px solid #111' : 'none',
                                    fontWeight: '800',
                                    fontSize: '18px',
                                    background: 'none',
                                    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                                    color: activeTab === 'about' ? '#111' : '#ccc',
                                    cursor: 'pointer'
                                }}
                            >
                                About the frame
                            </button>
                            <button
                                onClick={() => setActiveTab('shipping')}
                                style={{
                                    paddingBottom: '15px',
                                    borderBottom: activeTab === 'shipping' ? '3px solid #111' : 'none',
                                    fontWeight: '800',
                                    fontSize: '18px',
                                    background: 'none',
                                    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                                    color: activeTab === 'shipping' ? '#111' : '#ccc',
                                    cursor: 'pointer'
                                }}
                            >
                                Shipping & Returns
                            </button>
                        </div>
                        <div className="tab-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
                            <div className="about-text">
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>{product.brand} {product.name}</h3>
                                <p style={{ lineHeight: '1.8', color: '#555', fontSize: '16px' }}>{product.description} This oversized frame oozes with style and glamour. Crafted from premium materials, its sleek components and rich hue make it a thing of beauty.</p>
                            </div>
                            <div className="specs-table" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px', padding: '30px', background: '#fdfdfd', borderRadius: '12px' }}>
                                {[
                                    { label: 'Size', value: product.size },
                                    { label: 'Progressive / Bifocal eligible', value: 'Yes' },
                                    { label: 'Material', value: product.material },
                                    { label: 'Color', value: product.color },
                                    { label: 'Shape', value: product.shape },
                                    { label: 'Gender', value: product.gender },
                                    { label: 'Spring Hinges', value: 'No' },
                                    { label: 'Type', value: 'Full-Rim' }
                                ].map(item => (
                                    <React.Fragment key={item.label}>
                                        <div style={{ fontSize: '13px', color: '#999' }}>{item.label}:</div>
                                        <div style={{ fontWeight: '600', color: '#222' }}>{item.value}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="reviews-section">
                    <div className="reviews-header">
                        <div className="overall-rating">
                            <span className="rating-number">4.8</span>
                            <div>
                                <h3 style={{ margin: 0 }}>429 customer reviews</h3>
                                <div className="stars rating-stars-large" style={{ marginTop: '5px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#f1c40f" stroke="none" />)}
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline" style={{ padding: '12px 30px' }}>Write a Review</button>
                    </div>

                    <div className="review-photos" style={{ marginBottom: '60px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="review-photo" style={{ minWidth: '150px', height: '150px' }}>
                                <img src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80`} alt="Review" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>

                    <div className="user-reviews-list">
                        <div className="review-item">
                            <div className="review-meta">
                                <div className="review-user">
                                    <span>Saree</span>
                                    <Check className="verified-badge" size={14} />
                                </div>
                                <span className="review-date">04/04/2026</span>
                            </div>
                            <div className="stars" style={{ color: '#f1c40f', marginBottom: '15px' }}>
                                {[...Array(4)].map((_, i) => <Star key={i} size={16} fill="#f1c40f" stroke="none" />)}
                                <Star size={16} fill="#eee" stroke="none" />
                            </div>
                            <div className="review-content">
                                <h4>Great look for a great price</h4>
                                <p className="review-text">My current glasses were 20 years old. I only wear them in the evenings and mornings... There is no way you can beat that price anywhere. And they look and feel great! The only downfall is the one pair feels stiff to open and I'm fearful I will break them but I haven't tried to loosen the screw they just feel tougher to open so I'm extra careful.</p>
                                <div className="review-photos">
                                    <div className="review-photo">
                                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
