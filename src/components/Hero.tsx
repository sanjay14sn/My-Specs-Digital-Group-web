import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-video">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video-element"
                >
                    <source src="https://optimaxweb.glassesusa.com/video/upload/q_auto/v1773589646/media/wysiwyg/audiobanner-hp.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="hero-container">
                <div className="hero-content-box">
                    <span className="hero-badge">PREMIUM COLLECTION 2026</span>
                    <h1 className="hero-title">
                        ELITE <br />
                        CRAFTSMANSHIP <br />
                        FOR YOUR EYES
                    </h1>
                    <p className="hero-description">
                        Experience the perfect blend of luxury and clarity with our designer collection.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-hero btn-hero-primary">ELITE EYEGLASSES</button>
                        <button className="btn-hero btn-hero-accent">ELITE SUNGLASSES</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
