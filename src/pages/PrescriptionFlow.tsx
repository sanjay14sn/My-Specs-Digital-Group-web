import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, MousePointer2, Plus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PrescriptionFlow.css';

type FlowStep = 'select' | 'upload' | 'online';

const PrescriptionFlow: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialState = location.state as { method?: FlowStep, productId?: string } | null;

    const [step, setStep] = useState<FlowStep>(initialState?.method || 'select');
    const [comments, setComments] = useState('');
    const [hasPrism, setHasPrism] = useState(false);

    const renderHeader = (title: string) => (
        <div className="prescription-header">
            <button onClick={() => step === 'select' ? navigate(-1) : setStep('select')} className="back-link border-none bg-transparent cursor-pointer">
                <ChevronLeft size={18} /> Back
            </button>
            <h1 className="prescription-steps-title">{title}</h1>
        </div>
    );

    const renderSelectMethod = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="method-options"
        >
            <button className="method-card" onClick={() => setStep('online')}>
                <div className="plus-icon" style={{ margin: 0, width: 40, height: 40 }}>
                    <MousePointer2 size={24} className="text-blue-500" />
                </div>
                <div>
                    <h3>Fill it out online</h3>
                    <p>Fill it manually according to your printed prescription</p>
                </div>
            </button>

            <button className="method-card" onClick={() => setStep('upload')}>
                <div className="plus-icon" style={{ margin: 0, width: 40, height: 40 }}>
                    <Upload size={24} className="text-blue-500" />
                </div>
                <div>
                    <h3>Upload image</h3>
                    <p>Upload your prescription as an image</p>
                </div>
            </button>
        </motion.div>
    );

    const renderUpload = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <p className="upload-instruction">
                You can easily upload your prescription file in any of the following formats: PDF, JPG, GIF, PNG, JPEG
            </p>

            <div className="upload-dropzone">
                <div className="plus-icon">
                    <Plus size={24} />
                </div>
                <p className="upload-text">Drag and drop file or <span>click to upload</span></p>
                <p className="max-size">(Max Size 5 MB)</p>
            </div>

            <div className="checkbox-group">
                <label className="checkbox-item">
                    <input
                        type="checkbox"
                        checked={hasPrism}
                        onChange={(e) => setHasPrism(e.target.checked)}
                    />
                    My prescription includes prism (+$30)
                </label>
            </div>

            <div className="comment-section">
                <h4>Additional comments</h4>
                <textarea
                    className="comment-textarea"
                    placeholder="Add a comment..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </div>

            <div className="prescription-actions">
                <button className="btn-continue" onClick={() => navigate('/checkout')}>Continue</button>
                <button className="btn-send-later" onClick={() => navigate('/cart')}>Send Later</button>
            </div>
        </motion.div>
    );

    const renderOnlineForm = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <a href="#" className="form-help-link">How to read my prescription <Info size={16} /></a>

            <div className="prescription-table-wrapper">
                <table className="prescription-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sphere (SPH)</th>
                            <th>Cylinder (CYL)</th>
                            <th>Axis (AXI)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {['Right (OD)', 'Left (OS)'].map((eye) => (
                            <tr key={eye}>
                                <td><strong>{eye}</strong></td>
                                <td>
                                    <select defaultValue="None">
                                        <option>None</option>
                                        <option>-0.25</option>
                                        <option>-0.50</option>
                                        <option>-0.75</option>
                                        <option>-1.00</option>
                                    </select>
                                </td>
                                <td>
                                    <select defaultValue="None">
                                        <option>None</option>
                                        <option>-0.25</option>
                                        <option>-0.50</option>
                                        <option>-0.75</option>
                                    </select>
                                </td>
                                <td>
                                    <select defaultValue="None">
                                        <option>None</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>
                                        <option>50</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pd-selection-row">
                <label>PD <Info size={14} /></label>
                <select>
                    <option>62</option>
                    <option>63</option>
                    <option>64</option>
                    <option>65</option>
                    <option>66</option>
                </select>
            </div>

            <div className="checkbox-group">
                <label className="checkbox-item">
                    <input type="checkbox" />
                    I have 2 PD numbers <Info size={14} />
                </label>
                <label className="checkbox-item">
                    <input
                        type="checkbox"
                        checked={hasPrism}
                        onChange={(e) => setHasPrism(e.target.checked)}
                    />
                    My prescription includes prism (+$30)
                </label>
            </div>

            <div className="comment-section">
                <h4>Additional comments</h4>
                <textarea
                    className="comment-textarea"
                    placeholder="Add a comment..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </div>

            <div className="checkbox-group">
                <label className="checkbox-item">
                    <input type="checkbox" />
                    Save your prescription for quick reuse <strong>(Recommended)</strong>
                </label>
            </div>

            <div className="prescription-actions">
                <button className="btn-continue" onClick={() => navigate('/checkout')}>Continue</button>
                <button className="btn-send-later" onClick={() => navigate('/cart')}>Send Later</button>
            </div>
        </motion.div>
    );

    const getTitle = () => {
        switch (step) {
            case 'select': return 'How would you like to provide your prescription?';
            case 'upload': return 'Upload image';
            case 'online': return 'Fill it out online';
            default: return 'Prescription';
        }
    };

    return (
        <div className="prescription-container">
            {renderHeader(getTitle())}
            <AnimatePresence mode="wait">
                {step === 'select' && renderSelectMethod()}
                {step === 'upload' && renderUpload()}
                {step === 'online' && renderOnlineForm()}
            </AnimatePresence>
        </div>
    );
};

export default PrescriptionFlow;
