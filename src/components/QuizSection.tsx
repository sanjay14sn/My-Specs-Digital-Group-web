import React from 'react';
import { Tablet, Sun, CheckCircle2 } from 'lucide-react';

const QuizSection: React.FC = () => {
    return (
        <section className="quiz-section">
            <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div className="quiz-content">
                    <p className="premium-note">Luxury Matchmaker</p>
                    <h2>Elite Selection</h2>
                    <p>Which style defines your vision?</p>
                    <div className="quiz-options">
                        <div className="quiz-option">
                            <Tablet size={24} style={{ color: 'var(--accent-color)' }} />
                            <span>Eyeglasses</span>
                        </div>
                        <div className="quiz-option">
                            <Sun size={24} style={{ color: 'var(--accent-color)' }} />
                            <span>Sunglasses</span>
                        </div>
                        <div className="quiz-option">
                            <CheckCircle2 size={24} style={{ color: 'var(--accent-color)' }} />
                            <span>Both</span>
                        </div>
                    </div>
                </div>
                <div
                    className="quiz-image"
                    style={{ backgroundImage: "url('/assets/images/hero/quiz_section_woman_glasses_1773749587605.png')" }}
                >
                </div>
            </div>
        </section>
    );
};

export default QuizSection;
