import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';

const TrustBar: React.FC = () => {
    return (
        <section className="trust-bar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <div className="trust-item">
                    <Truck size={24} />
                    <span>Free Shipping & Returns</span>
                </div>
                <div className="trust-item">
                    <RotateCcw size={24} />
                    <span>60-Day Home Try-On</span>
                </div>
                <div className="trust-item">
                    <ShieldCheck size={24} />
                    <span>365-Day Warranty</span>
                </div>
                <div className="trust-item">
                    <Star size={24} fill="#A6171E" stroke="none" />
                    <span>Trustpilot 4.8/5</span>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
