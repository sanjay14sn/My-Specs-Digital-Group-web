import React from 'react';
import { Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const StoresBanner: React.FC = () => {
    return (
        <section className="stores-banner">
            <div className="container">
                <div className="stores-content">
                    <div className="stores-text">
                        <h2>Find a Store Near You</h2>
                        <p>Experience our luxury collections in person. Visit one of our 50+ premium locations across the country.</p>
                        <div className="stores-actions">
                            <Link to="/stores" className="btn btn-accent">VIEW ALL STORES</Link>
                            <button className="btn btn-transparent">USE MY LOCATION</button>
                        </div>
                    </div>
                    <div className="stores-image">
                        <Store size={120} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoresBanner;
