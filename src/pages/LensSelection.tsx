import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, HelpCircle, Mountain, BookOpen, Layers, Split, Glasses, MessageSquare, FileDigit, Camera, FileText, Mail, ChevronLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { motion } from 'framer-motion';
import '../lens-selection.css';

const LensSelection: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = PRODUCTS.find(p => p.id === parseInt(id || '0'));
    const [currentStep, setCurrentStep] = React.useState(1);
    const [selectedUsage, setSelectedUsage] = React.useState<string | null>(null);
    const [isNearVisionExpanded, setIsNearVisionExpanded] = React.useState(false);
    const [selectedReaderPower, setSelectedReaderPower] = React.useState<string | null>(null);
    const [selectedPrescriptionMethod, setSelectedPrescriptionMethod] = React.useState<string | null>(null);

    if (!product) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Product not found</div>;
    }

    const steps = [
        { name: 'USAGE', status: currentStep === 1 ? 'active' : 'completed', number: 1 },
        { name: 'PRESCRIPTION', status: (currentStep === 2 || currentStep === 5) ? 'active' : (currentStep > 2 && currentStep !== 5 ? 'completed' : 'pending'), number: 2 },
        { name: 'LENS', status: currentStep === 3 ? 'active' : (currentStep > 3 ? 'completed' : 'pending'), number: 3 },
        { name: 'UPGRADES', status: currentStep === 4 ? 'active' : 'pending', number: 4 }
    ];

    const usageOptions = [
        { id: 'single-vision', title: 'Single Vision', description: 'Distance', icon: <Mountain size={28} />, price: null },
        { id: 'near-vision', title: 'Near Vision', description: 'Reading', icon: <BookOpen size={28} />, price: null },
        { id: 'progressive', title: 'Progressive', description: 'Distance & Reading', icon: <Layers size={28} />, price: '+₹6,800', discount: '50% OFF' },
        { id: 'bifocal', title: 'Bifocal', description: 'Distance & Reading', icon: <Split size={28} />, price: '+₹4,200' },
        { id: 'non-prescription', title: 'Non-prescription', description: 'Fashion', icon: <Glasses size={28} />, price: null }
    ];

    const prescriptionMethods = [
        { id: 'online', title: 'Fill it out online', desc: 'Fill it manually according to your printed prescription', icon: <FileDigit size={28} /> },
        { id: 'upload', title: 'Upload image', desc: 'Upload your prescription as an image', icon: <Camera size={28} /> },
        { id: 'saved', title: 'Use saved prescription', desc: "Use a prescription that you've saved or shopped with before", icon: <FileText size={28} /> },
        { id: 'later', title: 'Send later', desc: "You can easily send it after checkout (we'll remind you)", icon: <Mail size={28} /> }
    ];

    const lensTypes = [
        { id: 'clear', title: 'Clear Lenses', desc: 'Standard transparent lenses for general use', price: 'Included', icon: <Glasses size={28} /> },
        { id: 'blue', title: 'Blue Light Blocking', desc: 'Protects eyes from digital screens and fatigue', price: '+₹1,500', icon: <BookOpen size={28} /> },
        { id: 'transitions', title: 'Transitions®', desc: 'Lenses that darken in sunlight and clear indoors', price: '+₹4,500', icon: <Mountain size={28} /> },
        { id: 'sunglasses', title: 'Sunglasses Lenses', desc: 'Permanent tint for maximum UV protection', price: '+₹2,500', icon: <Layers size={28} /> }
    ];

    const upgrades = [
        { id: 'standard', title: 'Standard Package', desc: 'Anti-scratch and UV protection', price: 'Included', icon: <Check size={28} /> },
        { id: 'premium', title: 'Premium Package', desc: 'Oil-resistant and Super Hydrophobic', price: '+₹800', icon: <Layers size={28} /> },
        { id: 'platinum', title: 'Platinum Package', desc: 'Digital Anti-Glare and Dust Repellent', price: '+₹1,400', icon: <Split size={28} /> }
    ];

    const readerPowers = ['+0.25', '+0.50', '+0.75', '+1.00', '+1.25', '+1.50', '+1.75', '+2.00', '+2.25', '+2.50', '+2.75', '+3.00', '+3.25', '+3.50', '+3.75', '+4.00'];

    return (
        <div className="lens-selection-page">
            <header className="lens-header">
                <div className="container lens-header-content">
                    <div className="lens-logo">
                        <Link to="/" style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary-color)', textDecoration: 'none' }}>
                            MY SPECS <span style={{ color: '#222' }}>COM</span>
                        </Link>
                    </div>
                    <div className="lens-steps">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.name}>
                                <div className={`lens-step ${step.status}`}>
                                    <span className="step-number">{step.number}</span>
                                    <span className="step-name">{step.name}</span>
                                </div>
                                {index < steps.length - 1 && <div className="step-divider"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="lens-help">
                        <span>Need help?</span>
                        <button className="btn-chat"><MessageSquare size={16} /> Start live chat</button>
                    </div>
                </div>
            </header>

            <div className="container lens-content-grid">
                <div className="product-summary-col">
                    <Link to={`/product/${product.id}`} className="back-link"><ArrowLeft size={16} /> Back to frame</Link>
                    <div className="summary-card">
                        <div className="summary-brand-logo"><span style={{ fontSize: '20px', fontWeight: '800', fontStyle: 'italic', color: '#555' }}>{product.brand}</span></div>
                        <div className="summary-image"><img src={product.image} alt={product.name} /></div>
                        <div className="summary-details">
                            <h3>{product.brand} {product.name}</h3>
                            <p className="summary-specs">{product.color}, Average</p>
                        </div>
                        <div className="summary-pricing">
                            <div className="coupon-badge"><span>Best value coupon applied:</span><span className="code">SAVE30</span></div>
                            <div className="shipping-line"><span>Shipping & Handling:</span><span>₹0</span></div>
                            <div className="price-line"><span>Price with coupon:</span>
                                <div className="final-price">
                                    <span className="original">₹{product.price + 1500}</span>
                                    <span className="discounted">₹{product.price}</span>
                                </div>
                            </div>
                            <div className="affirm-line">Pay over time with <strong>Klarna, PayPal</strong> or <strong>Affirm</strong> <HelpCircle size={14} /></div>
                        </div>
                    </div>
                </div>

                <div className="usage-options-col">
                    {currentStep === 1 && (
                        <>
                            <h2 className="usage-heading">What do you use your glasses for?</h2>
                            <div className="options-stack">
                                {usageOptions.map(option => (
                                    <div key={option.id} className="usage-option-wrapper">
                                        <motion.div
                                            className={`usage-option-card ${selectedUsage === option.id ? 'selected' : ''} ${option.id === 'near-vision' && isNearVisionExpanded ? 'expanded' : ''}`}
                                            onClick={() => {
                                                if (option.id === 'near-vision') {
                                                    setIsNearVisionExpanded(!isNearVisionExpanded);
                                                    setSelectedUsage(option.id);
                                                } else {
                                                    setSelectedUsage(option.id);
                                                    setIsNearVisionExpanded(false);
                                                    if (option.id === 'non-prescription') setCurrentStep(3);
                                                    else setCurrentStep(2);
                                                }
                                            }}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="option-info">
                                                <div className="title-row">
                                                    <h3>{option.title} {option.price && <span className="option-price">({option.price})</span>} <HelpCircle size={16} className="help-icon" /></h3>
                                                    {option.discount && <span className="discount-tag">{option.discount}</span>}
                                                </div>
                                                <p>{option.description}</p>
                                            </div>
                                            <div className="option-icon-box">{option.icon}</div>
                                            {selectedUsage === option.id && !isNearVisionExpanded && <div className="selection-indicator"></div>}
                                        </motion.div>
                                        {option.id === 'near-vision' && isNearVisionExpanded && (
                                            <div className="sub-options-container">
                                                <div className="sub-option" onClick={() => setCurrentStep(2)}><span>Enter your prescription</span></div>
                                                <div className="sub-option" onClick={() => setCurrentStep(5)}><span>For Readers: Just select a lens power</span></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div className="step-back-nav" onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}><ChevronLeft size={18} /> Back</div>
                            <h2 className="usage-heading" style={{ marginBottom: '30px' }}>How do you want to add your prescription?</h2>
                            <div className="options-stack">
                                {prescriptionMethods.map(option => (
                                    <motion.div key={option.id} className={`usage-option-card ${selectedPrescriptionMethod === option.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedPrescriptionMethod(option.id); setCurrentStep(3); }}
                                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <div className="option-info"><h3>{option.title}</h3><p>{option.desc}</p></div>
                                        <div className="option-icon-box">{option.icon}</div>
                                        {selectedPrescriptionMethod === option.id && <div className="selection-indicator"></div>}
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === 5 && (
                        <>
                            <div className="step-back-nav" onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}><ChevronLeft size={18} /> Back</div>
                            <h2 className="usage-heading" style={{ marginBottom: '10px' }}>Select your readers' lens power</h2>
                            <p style={{ color: '#666', marginBottom: '30px', maxWidth: '600px', lineHeight: '1.5' }}>Our high-quality Readers are ready-made glasses with an equal magnification power in both lenses.</p>
                            <div style={{ marginBottom: '20px' }}><Link to="#" style={{ color: '#3498db', textDecoration: 'underline', fontWeight: '600', fontSize: '14px' }}>What is my strength?</Link></div>
                            <div className="powers-grid">
                                {readerPowers.map(power => (
                                    <div key={power} className={`power-cell ${selectedReaderPower === power ? 'selected' : ''}`} onClick={() => setSelectedReaderPower(power)}>{power}</div>
                                ))}
                            </div>
                            <div className="usage-actions" style={{ marginTop: '40px' }}>
                                <button className={`btn btn-primary next-button ${!selectedReaderPower ? 'disabled' : ''}`}
                                    onClick={() => selectedReaderPower && setCurrentStep(3)} disabled={!selectedReaderPower}
                                    style={{ background: '#3498db', borderRadius: '50px' }}>Next</button>
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <div className="step-back-nav" onClick={() => setCurrentStep(selectedUsage === 'non-prescription' ? 1 : (selectedUsage === 'near-vision' && selectedReaderPower ? 5 : 2))} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}><ChevronLeft size={18} /> Back</div>
                            <h2 className="usage-heading" style={{ marginBottom: '30px' }}>Choose your lens type</h2>
                            <div className="options-stack">
                                {lensTypes.map(option => (
                                    <motion.div key={option.id} className={`usage-option-card ${selectedPrescriptionMethod === option.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedPrescriptionMethod(option.id); setCurrentStep(4); }}
                                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <div className="option-info"><h3>{option.title} <span className="option-price">({option.price})</span></h3><p>{option.desc}</p></div>
                                        <div className="option-icon-box">{option.icon}</div>
                                        {selectedPrescriptionMethod === option.id && <div className="selection-indicator"></div>}
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                    {currentStep === 4 && (
                        <>
                            <div className="step-back-nav" onClick={() => setCurrentStep(3)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#888', marginBottom: '15px', fontSize: '14px', fontWeight: '600' }}><ChevronLeft size={18} /> Back</div>
                            <h2 className="usage-heading" style={{ marginBottom: '30px' }}>Add premium upgrades</h2>
                            <div className="options-stack">
                                {upgrades.map(option => (
                                    <motion.div key={option.id} className={`usage-option-card ${selectedPrescriptionMethod === option.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedPrescriptionMethod(option.id); }} // Stay here or move to checkout
                                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <div className="option-info"><h3>{option.title} <span className="option-price">({option.price})</span></h3><p>{option.desc}</p></div>
                                        <div className="option-icon-box">{option.icon}</div>
                                        {selectedPrescriptionMethod === option.id && <div className="selection-indicator"></div>}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="usage-actions"><button className="btn btn-primary next-button" onClick={() => alert('Order Summary & Checkout...')}>Review Order</button></div>
                        </>
                    )}
                </div>
            </div>

            <div className="chat-bubble"><MessageSquare size={24} color="white" /></div>
        </div>
    );
};

export default LensSelection;
