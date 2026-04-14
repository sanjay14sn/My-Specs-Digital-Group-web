import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Zap, MessageCircle, Headphones, X, Bell } from 'lucide-react';

const ServicesSection: React.FC = () => {
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
    const navigate = useNavigate();

    const services = [
        {
            id: 'visit-store',
            title: 'Visit Your Nearest Hospital',
            badge: 'Try in store',
            badgeColor: '#A6171E', // Theme Red
            icon: MapPin,
            image: '/images/services/hos.png',
            link: '/find-hospital'
        },
        {
            id: 'home-try-on',
            title: 'Experience Our Home Try-On',
            badge: 'In 60 mins',
            badgeColor: '#A6171E', // Theme Red
            icon: Zap,
            image: '/images/services/tryon1.png',
            link: '/home-try-on'
        },
        {
            id: 'whatsapp',
            title: 'Service hub',
            badge: '84478-21891',
            badgeColor: '#A6171E', // Theme Red
            icon: MessageCircle,
            image: '/images/services/repair.png',
            link: '#',
            isComingSoon: true
        },
        {
            id: 'expert-connect',
            title: 'Connect with your Experts',
            badge: '99998-99998',
            badgeColor: '#bfa145', // Gold/Yellow
            icon: Headphones,
            image: '/images/services/support.png',
            link: '/connect'
        }
    ];

    const handleCardClick = (service: any) => {
        if (service.isComingSoon) {
            setIsComingSoonOpen(true);
        } else if (service.link.startsWith('http')) {
            window.open(service.link, '_blank');
        } else {
            navigate(service.link);
        }
    };

    return (
        <section className="services-section">
            <div className="container">
                <div className="services-grid">
                    {services.map((service) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                className="service-card"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleCardClick(service)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-top-badge" style={{ backgroundColor: service.badgeColor }}>
                                    <span className="badge-icon">
                                        <Icon size={16} strokeWidth={2.5} />
                                    </span>
                                    {service.badge}
                                </div>

                                <h3 className="service-card-title">{service.title}</h3>

                                <div className="service-card-image">
                                    <img src={service.image} alt={service.title} />
                                </div>

                                <div className="service-card-arrow">
                                    <span>→</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Coming Soon Modal */}
            <AnimatePresence>
                {isComingSoonOpen && (
                    <>
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsComingSoonOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(8px)',
                                zIndex: 1000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.div
                                className="coming-soon-modal"
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: '#fff',
                                    padding: '40px',
                                    borderRadius: '24px',
                                    maxWidth: '450px',
                                    width: '90%',
                                    textAlign: 'center',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    onClick={() => setIsComingSoonOpen(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: '#f5f5f5',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    <X size={20} color="#666" />
                                </button>

                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    background: '#fdf2f2',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 25px',
                                    color: '#A6171E'
                                }}>
                                    <Bell size={32} />
                                </div>

                                <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '15px', color: '#333' }}>Service Hub</h2>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    background: '#A6171E',
                                    color: '#fff',
                                    borderRadius: '30px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '20px'
                                }}>
                                    Coming Soon
                                </div>
                                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                                    We're building a state-of-the-art service experience to handle all your eyewear repairs and adjustments.
                                    Stay tuned for the launch!
                                </p>

                                <button
                                    onClick={() => setIsComingSoonOpen(false)}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: '#333',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = '#000'}
                                    onMouseOut={(e) => e.currentTarget.style.background = '#333'}
                                >
                                    Notify Me
                                </button>

                                <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
                                    No spam, just a one-time launch update.
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServicesSection;
