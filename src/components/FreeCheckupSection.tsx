import React from 'react';
import { Stethoscope, CheckCircle2, Hospital, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreeCheckupSection: React.FC = () => {
    return (
        <section className="insurance-section free-checkup-promo-section">
            <div className="container">
                <div className="insurance-card">
                    <div className="insurance-info">
                        <div className="promo-badge">Limited Time Offer</div>
                        <Stethoscope size={48} className="insurance-icon" />
                        <h2>Free Eye Checkup</h2>
                        <p>Book a comprehensive eye examination at our partner specialty hospitals in Chennai at no cost.</p>
                        <ul className="insurance-list">
                            <li><CheckCircle2 size={18} /> 6+ Top-rated specialty hospitals</li>
                            <li><CheckCircle2 size={18} /> Expert ophthalmologists</li>
                            <li><CheckCircle2 size={18} /> Advanced diagnostic equipment</li>
                            <li><CheckCircle2 size={18} /> Zero cost for your first visit</li>
                        </ul>
                        <div className="promo-actions">
                            <Link to="/hospital-booking" className="btn btn-primary">
                                <Calendar size={18} />
                                BOOK FREE CHECKUP
                            </Link>
                            <span className="offer-note">*Offer valid for new registrations</span>
                        </div>
                    </div>
                    <div className="insurance-image">
                        <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1200" alt="Free Eye Checkup" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreeCheckupSection;
