import React from 'react';
import { Link } from 'react-router-dom';
import BrandMarquee from '../components/BrandMarquee';

const brands = [
    'Ray-Ban', 'Oakley', 'Gucci', 'Prada', 'Versace', 'Burberry',
    'Coach', 'Michael Kors', 'Persol', 'Armani Exchange', 'Vogue', 'Costa'
];

const BrandPage: React.FC = () => {
    return (
        <div className="brands-page" style={{ padding: '80px 0' }}>
            <div className="container">
                <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Designer Brands</h1>

                <BrandMarquee />

                <div className="brands-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '30px',
                    marginTop: '60px'
                }}>
                    {brands.map(brand => (
                        <Link
                            key={brand}
                            to={`/brands/${brand.toLowerCase()}`}
                            style={{
                                background: 'white',
                                padding: '40px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                fontWeight: '900',
                                fontSize: '20px',
                                color: 'var(--primary-color)',
                                textTransform: 'uppercase',
                                border: '1px solid #eee',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = '#eee';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {brand}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
