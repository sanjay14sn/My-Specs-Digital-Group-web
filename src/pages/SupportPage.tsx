import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail, Headphones, Check, Send, X, MessageSquare, Info } from 'lucide-react';
import '../styles/support-page.css';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'expert';
    time: string;
}

const SupportPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm Sarah, your optical expert. How can I help you today?", sender: 'expert', time: '10:00 AM' }
    ]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Simulate expert typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const expertMsg: Message = {
                id: Date.now() + 1,
                text: "Thanks for reaching out! I'm reviewing your request and will provide the best advice for your prescription/style shortly. Is there anything specific you'd like to ask?",
                sender: 'expert',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, expertMsg]);
        }, 2000);
    };

    const contactMethods = [
        {
            icon: MessageSquare,
            title: 'Live Chat',
            value: 'Online Now',
            desc: 'Real-time conversation with our certified optical experts.',
            onClick: () => setIsChatOpen(true),
            btnText: 'Start Live Chat',
            highlight: true
        },
        {
            icon: Phone,
            title: 'Call Support',
            value: '+91 99998-99998',
            desc: 'Expert assistance available Monday to Saturday, 9am - 8pm.',
            link: 'tel:+919999899998',
            btnText: 'Call Now'
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp Experts',
            value: '84478-21891',
            desc: 'Quick chat for styling advice, prescriptions and order updates.',
            link: 'https://wa.me/8447821891',
            btnText: 'Start Chat'
        },
        {
            icon: Mail,
            title: 'Email Us',
            value: 'support@myspecs.com',
            desc: 'General inquiries and complex prescription assistance.',
            link: 'mailto:support@myspecs.com',
            btnText: 'Send Email'
        }
    ];

    if (formSubmitted) {
        return (
            <div className="support-page">
                <div className="support-hero">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="container"
                    >
                        <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A6171E', margin: '0 auto 30px' }}>
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h1>Request Received!</h1>
                        <p>Thank you for reaching out to our experts. A dedicated optical consultant will get back to you within 2-4 business hours.</p>
                        <button
                            onClick={() => setFormSubmitted(false)}
                            style={{ marginTop: '30px', padding: '12px 30px', background: '#fff', color: '#A6171E', border: 'none', borderRadius: '30px', fontWeight: '700', cursor: 'pointer' }}
                        >
                            Back to Support
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="support-page">
            <div className="support-hero">
                <div className="container">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        Find Expert Assistance
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        Whether you need help with your prescription, styling advice, or order tracking, our experts are here to help.
                    </motion.p>
                </div>
            </div>

            <div className="support-container">
                <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    {contactMethods.map((method, idx) => {
                        const Icon = method.icon;
                        return (
                            <motion.div
                                key={idx}
                                className={`contact-card ${method.highlight ? 'highlighted' : ''}`}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * idx }}
                                style={method.highlight ? { border: '2px solid #A6171E', background: '#fffcfc' } : {}}
                            >
                                <div className="contact-icon" style={method.highlight ? { background: '#A6171E', color: '#fff' } : {}}>
                                    <Icon size={30} />
                                </div>
                                <h3>{method.title}</h3>
                                <p>{method.desc}</p>
                                <strong style={{ display: 'block', marginBottom: '20px', fontSize: '18px', color: '#A6171E' }}>{method.value}</strong>
                                {method.link ? (
                                    <a href={method.link} className="contact-btn">{method.btnText}</a>
                                ) : (
                                    <button onClick={method.onClick} className="contact-btn">{method.btnText}</button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="support-section-flex">
                    <div className="form-wrapper">
                        <h2><Info size={24} style={{ marginRight: '10px', color: '#A6171E', verticalAlign: 'middle' }} /> Send us an Inquiry</h2>
                        <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-input" placeholder="John" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-input" placeholder="Doe" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-input" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input type="tel" className="form-input" placeholder="+91 84478 21891" required />
                                </div>
                                <div className="form-group-full">
                                    <label className="form-label">How can we help you?</label>
                                    <textarea className="form-input" rows={5} placeholder="Tell us more about your request..."></textarea>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn" style={{ background: '#A6171E' }}>
                                Submit Request <Send size={18} style={{ marginLeft: '10px', display: 'inline-block' }} />
                            </button>
                        </form>
                    </div>

                    <div className="info-sidebar">
                        <div className="info-card">
                            <h3>Expert Benefits</h3>
                            <ul className="expert-features">
                                <li>
                                    <Check className="feature-check" size={20} />
                                    <span><strong>Certified Opticians</strong>: Get advice from our team of qualified experts.</span>
                                </li>
                                <li>
                                    <Check className="feature-check" size={20} />
                                    <span><strong>Fit & Style Consultation</strong>: Finding the perfect frame for your face shape.</span>
                                </li>
                                <li>
                                    <Check className="feature-check" size={20} />
                                    <span><strong>Prescription Analysis</strong>: We help verify your complex prescription.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat FAB */}
            <button className={`chat-fab ${!isChatOpen ? 'pulse' : ''}`} onClick={() => setIsChatOpen(!isChatOpen)}>
                {isChatOpen ? <X size={30} /> : <MessageSquare size={30} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    >
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="expert-avatar">
                                    S
                                    <div className="status-indicator"></div>
                                </div>
                                <div>
                                    <h4>Sarah Experts</h4>
                                    <span>Optical Consultant</span>
                                </div>
                            </div>
                            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsChatOpen(false)} />
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.text}
                                    <div style={{ fontSize: '10px', opacity: 0.6, textAlign: 'right', marginTop: '4px' }}>
                                        {msg.time}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator">
                                    <span>Sarah is typing...</span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <form className="chat-input-area" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Type your message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" className="send-btn">
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SupportPage;
