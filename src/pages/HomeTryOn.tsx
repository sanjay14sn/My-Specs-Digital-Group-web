import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check, MapPin, Phone, User, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/home-try-on.css';

type Step = 1 | 2 | 3;

interface FormData {
    name: string;
    phone: string;
    address: string;
}

const HomeTryOn: React.FC = () => {
    const [step, setStep] = useState<Step>(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>('4:30 PM');
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        address: ''
    });

    // Calendar logic
    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Add empty slots for days of the week before the 1st
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Add actual days
        for (let i = 1; i <= totalDays; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }, [currentMonth]);

    const changeMonth = (offset: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + offset);
        setCurrentMonth(newMonth);
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelected = (date: Date) => {
        return selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    const isPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const timeSlots = ['9:00 AM', '11:00 AM', '2:20 PM', '4:30 PM', '6:00 PM'];

    const handleNext = () => {
        if (step === 1 && !selectedDate) {
            alert('Please select a date');
            return;
        }
        if (step === 1 && !selectedTime) {
            alert('Please select a time slot');
            return;
        }
        if (step === 2) {
            if (!formData.name || !formData.phone || !formData.address) {
                alert('Please fill in all details');
                return;
            }
            // Save booking to localStorage
            const newBooking = {
                id: `TRY-${Math.floor(Math.random() * 10000)}`,
                type: 'Home Try-On',
                date: selectedDate?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
                time: selectedTime,
                patientName: formData.name,
                phone: formData.phone,
                address: formData.address,
                status: 'Requested',
                timestamp: new Date().toISOString()
            };

            const existing = JSON.parse(localStorage.getItem('my_appointments') || '[]');
            localStorage.setItem('my_appointments', JSON.stringify([newBooking, ...existing]));
        }
        setStep((prev) => (prev + 1) as Step);
    };

    return (
        <div className="home-try-on-page">
            <div className="tryon-container">
                {/* Stepper */}
                <div className="tryon-stepper">
                    <div className={`step-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                        <div className={`step-circle ${step > 1 ? 'completed' : ''}`}>
                            {step > 1 ? <Check size={20} /> : '1'}
                        </div>
                        <div className="step-label">
                            <span className="step-title">Select Date & Time</span>
                            <span className="step-subtitle">Choose your slot</span>
                        </div>
                    </div>
                    <div className={`step-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                        <div className={`step-circle ${step > 2 ? 'completed' : ''}`}>
                            {step > 2 ? <Check size={20} /> : '2'}
                        </div>
                        <div className="step-label">
                            <span className="step-title">Your Details</span>
                            <span className="step-subtitle">Contact & Address</span>
                        </div>
                    </div>
                    <div className={`step-item ${step === 3 ? 'active' : ''}`}>
                        <div className="step-circle">3</div>
                        <div className="step-label">
                            <span className="step-title">Confirmation</span>
                            <span className="step-subtitle">Request Sent</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="booking-content">
                                {/* Calendar Section */}
                                <div className="calendar-card">
                                    <div className="calendar-header">
                                        <button className="nav-btn" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button>
                                        <div className="month-nav">
                                            <h2>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                                        </div>
                                        <button className="nav-btn" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button>
                                    </div>

                                    <div className="calendar-grid">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                            <div key={day} className="day-header">{day}</div>
                                        ))}
                                        {daysInMonth.map((date, idx) => (
                                            <div
                                                key={idx}
                                                className={`calendar-day ${!date ? 'disabled' : ''} ${date && isPast(date) ? 'disabled' : ''} ${date && isSelected(date) ? 'selected' : ''}`}
                                                onClick={() => date && !isPast(date) && setSelectedDate(date)}
                                            >
                                                {date ? date.getDate() : ''}
                                                {date && isToday(date) && !isSelected(date) && (
                                                    <div style={{ position: 'absolute', top: '4px', right: '4px', width: '4px', height: '4px', background: '#A6171E', borderRadius: '50%' }}></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slots Section */}
                                <div className="time-slots-container">
                                    <h3><Clock size={16} /> Available Slots</h3>
                                    <div className="time-grid">
                                        {timeSlots.map(slot => (
                                            <div
                                                key={slot}
                                                className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                                                onClick={() => setSelectedTime(slot)}
                                            >
                                                {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="appointment-info">
                                <h4><CalendarIcon size={16} /> Selected Slot</h4>
                                <p className="info-text">
                                    {selectedDate ? selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Please select a date'}
                                    {selectedTime ? ` at ${selectedTime}` : ''}
                                </p>
                                <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                                    This slot will be reserved for your home try-on once confirmed.
                                </p>
                            </div>

                            <div className="tryon-actions">
                                <button className="btn-next" onClick={handleNext}>Continue to Details</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="booking-step-form" style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                                <h2 style={{ marginBottom: '30px', color: '#A6171E' }}>Patient Information</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: '700' }}>
                                            <User size={16} /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px' }}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: '700' }}>
                                            <Phone size={16} /> Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="e.g. +91 84478 21891"
                                            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px' }}
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: '700' }}>
                                            <MapPin size={16} /> Full Home Address
                                        </label>
                                        <textarea
                                            placeholder="Enter your complete address for delivery"
                                            rows={4}
                                            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', resize: 'none' }}
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="tryon-actions" style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button
                                        onClick={() => setStep(1)}
                                        style={{ background: 'none', border: 'none', color: '#666', fontWeight: '700', cursor: 'pointer' }}
                                    >
                                        Back to Calendar
                                    </button>
                                    <button className="btn-next" onClick={handleNext}>Confirm Appointment</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ textAlign: 'center', background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' }}
                        >
                            <div style={{ width: '80px', height: '80px', background: '#4caf50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 30px' }}>
                                <Check size={40} strokeWidth={3} />
                            </div>
                            <h1 style={{ marginBottom: '15px', color: '#A6171E' }}>Booking Request Sent!</h1>
                            <p style={{ color: '#666', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                                Your request for a Home Try-On on <strong>{selectedDate?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} at {selectedTime}</strong> has been received.
                                We will confirm your appointment within 60 minutes.
                            </p>
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <Link to="/profile" className="btn-next" style={{ textDecoration: 'none', background: '#333' }}>View My Bookings</Link>
                                <Link to="/" className="btn-next" style={{ textDecoration: 'none' }}>Back to Home</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HomeTryOn;
