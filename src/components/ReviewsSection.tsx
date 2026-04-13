import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
    {
        name: 'Kimberly',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        stars: 5,
        text: "I love my glasses so much I am ordering a different pair from here just for the versatility. The process was quick and easy and I got my glasses just when I was told to expect them."
    },
    {
        name: 'Mila',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        stars: 5,
        text: "So happy with my purchase, these glasses are so cute and I still get so many compliments when I wear them. I was surprised how good they fit as soon as I put them on."
    },
    {
        name: 'Bballcoachdp',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        stars: 5,
        text: "Bought these a few weeks ago and added the photo chromatic lenses. Could not be happier from the look, comfort or the ease of ordering."
    }
];

const ReviewsSection: React.FC = () => {
    return (
        <section className="trust-section">
            <div className="container">
                <h2 className="section-title">See why over 3 million customers trust us.</h2>
                <div style={{ fontSize: '18px', marginBottom: '40px', textAlign: 'center' }}>
                    Excellent <span style={{ color: '#1c7332', fontWeight: 800 }}>★★★★★</span> 4.5 out of 5 • 124,411
                    reviews on <span style={{ color: '#00b67a', fontWeight: 'bold' }}>Trustpilot</span>
                </div>

                <div className="review-carousel">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-header">
                                <img src={review.image} alt={review.name} />
                                <div className="author-info">
                                    <h4>{review.name} <CheckCircle size={14} className="verified" style={{ display: 'inline', color: '#3498db' }} /></h4>
                                    <div className="stars">
                                        {[...Array(review.stars)].map((_, i) => (
                                            <Star key={i} size={14} fill="#f1c40f" stroke="none" style={{ display: 'inline' }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="review-text">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
