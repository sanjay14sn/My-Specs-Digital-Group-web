import React from 'react';
import { Phone, MapPin, Clock, Calendar } from 'lucide-react';

const stores = [
    {
        name: "Chennai Store",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
        address: "Phoenix Marketcity, Velachery Main Rd, Chennai, Tamil Nadu 600042",
        phone: "+91 744-848-2196",
        hours: [
            { days: "Monday - Thursday", time: "10 am–8 pm" },
            { days: "Friday - Saturday", time: "10 am–9 pm" },
            { days: "Sunday", time: "11 am–7 pm" }
        ]
    },
    {
        name: "New York Flagship",
        image: "https://images.unsplash.com/photo-1574015974293-817f0efebb1b?auto=format&fit=crop&q=80&w=800",
        address: "711 5th Ave, New York, NY 10022, United States",
        phone: "+1 212-333-5555",
        hours: [
            { days: "Monday - Saturday", time: "10 am–7 pm" },
            { days: "Sunday", time: "12 pm–6 pm" }
        ]
    }
];

const StoresPage: React.FC = () => {
    return (
        <div className="stores-page">
            {/* Hero Section */}
            <section className="stores-hero" style={{
                height: '400px',
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>VISIT OUR ELITE STORES</h1>
                    <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>Experience personalized vision care and browse our full collection in person at our luxury locations.</p>
                </div>
            </section>

            {/* Stores Grid */}
            <section className="container" style={{ padding: '80px 0' }}>
                <div className="stores-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '40px' }}>
                    {stores.map(store => (
                        <div key={store.name} className="store-card" style={{
                            background: 'white',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid #eee'
                        }}>
                            <div className="store-image" style={{ height: '300px', overflow: 'hidden' }}>
                                <img src={store.image} alt={store.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="store-info" style={{ padding: '30px' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '20px' }}>{store.name}</h2>

                                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                                    <MapPin size={20} color="var(--accent-color)" />
                                    <p style={{ color: '#666', lineHeight: '1.4' }}>{store.address}</p>
                                </div>

                                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                                    <Phone size={20} color="var(--accent-color)" />
                                    <a href={`tel:${store.phone}`} style={{ color: 'var(--primary-color)', fontWeight: '700', textDecoration: 'none' }}>{store.phone}</a>
                                </div>

                                <div className="store-hours" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: '#aaa', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Clock size={16} /> Store Hours
                                    </h3>
                                    {store.hours.map(h => (
                                        <div key={h.days} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px' }}>
                                            <span style={{ color: '#666' }}>{h.days}</span>
                                            <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{h.time}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button className="btn btn-primary" style={{ flex: 1, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <Calendar size={18} /> Book Eye Exam
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StoresPage;
