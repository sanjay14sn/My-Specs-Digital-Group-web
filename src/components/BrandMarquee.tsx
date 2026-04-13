import React from 'react';

const BrandMarquee: React.FC = () => {
    const brands = [
        'Ray-Ban', 'Oakley', 'Persol', 'Prada', 'Gucci',
        'Versace', 'Coach', 'Michael Kors', 'Muse', 'Ottoto'
    ];

    return (
        <section className="brands-bg">
            <div className="container">
                <h2 className="section-title">Partner Brands</h2>
                <div className="marquee-wrapper">
                    <div className="marquee">
                        <div className="brand-logo-grid">
                            {brands.concat(brands).map((brand, index) => (
                                <div key={index} className="logo-item">
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandMarquee;
