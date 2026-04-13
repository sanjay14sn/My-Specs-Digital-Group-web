import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    MapPin,
    Star,
    Clock,
    Phone,
    Calendar,
    User,
    ChevronLeft,
    CheckCircle,
    Activity,
    Stethoscope,
    Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOSPITALS, Hospital, Doctor } from '../data/hospitals';
import '../hospital-booking.css';

type Step = 'search' | 'list' | 'details' | 'book' | 'confirm';

const HospitalBooking: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>('search');
    const [pinCode, setPinCode] = useState('560066');
    const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(HOSPITALS.filter(h => !h.isBranded));
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [bookingData, setBookingData] = useState({
        date: '2026-04-12',
        time: '10:30 AM',
        name: '',
        age: '',
        phone: '',
        issue: ''
    });

    useEffect(() => {
        // Initialize with default PIN results and filter out branded ones
        const results = HOSPITALS.filter(h => h.pinCode.startsWith('560') && !h.isBranded);
        setFilteredHospitals(results.length > 0 ? results : HOSPITALS.filter(h => !h.isBranded));
    }, []);

    const handleSearch = () => {
        if (!pinCode) {
            setFilteredHospitals(HOSPITALS.filter(h => !h.isBranded));
            return;
        }
        const results = HOSPITALS.filter(h => h.pinCode.startsWith(pinCode.substring(0, 3)) && !h.isBranded);
        setFilteredHospitals(results.length > 0 ? results : HOSPITALS.filter(h => !h.isBranded));
    };

    const handleHospitalSelect = (hospital: Hospital) => {
        setSelectedHospital(hospital);
        setCurrentStep('details');
    };

    const handleBookNow = (hospital: Hospital, doctor?: Doctor) => {
        setSelectedHospital(hospital);
        if (doctor) setSelectedDoctor(doctor);
        setCurrentStep('book');
    };

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();

        // Save appointment to localStorage
        if (selectedHospital) {
            const newAppointment = {
                id: `APT-${Math.floor(Math.random() * 10000)}`,
                hospitalName: selectedHospital.name,
                doctorName: selectedDoctor ? selectedDoctor.name : 'General Consultant',
                date: bookingData.date,
                time: bookingData.time,
                status: 'Confirmed',
                type: 'Eye Checkup'
            };

            const existingAppointments = JSON.parse(localStorage.getItem('my_appointments') || '[]');
            localStorage.setItem('my_appointments', JSON.stringify([newAppointment, ...existingAppointments]));
        }

        setCurrentStep('confirm');
    };

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
    ];

    return (
        <div className="hospital-booking-page">
            <div className="hospital-container">
                <AnimatePresence mode="wait">
                    {currentStep === 'search' && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="search-step"
                        >
                            <div className="search-intro">
                                <h1>Find Eye Hospitals Near You</h1>
                                <p>Book a free eye checkup at a top-rated specialty hospital in your area.</p>

                                <div className="search-box">
                                    <div className="input-group">
                                        <label>Enter PIN Code</label>
                                        <div className="input-with-button">
                                            <input
                                                type="text"
                                                className="pin-input"
                                                placeholder="e.g. 560066"
                                                value={pinCode}
                                                onChange={(e) => setPinCode(e.target.value)}
                                                maxLength={6}
                                            />
                                            <button className="btn-detect">
                                                <Navigation size={18} />
                                                Detect
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn-search" onClick={handleSearch}>
                                        Search Hospitals
                                    </button>
                                </div>

                                <div className="free-checkup-banner">
                                    <Activity size={20} />
                                    <span>Note: Your eye check-up is absolutely <strong>FREE</strong></span>
                                </div>
                            </div>

                            <div className="listing-step" style={{ padding: 0, marginTop: '50px' }}>
                                <div className="listing-header">
                                    <h2>Hospitals near {pinCode || 'you'}</h2>
                                    <span>{filteredHospitals.length} result(s) found</span>
                                </div>

                                <div className="hospital-grid">
                                    {filteredHospitals.map(hospital => (
                                        <div key={hospital.id} className="hospital-card" onClick={() => handleHospitalSelect(hospital)}>
                                            <div className="card-image">
                                                <img src={hospital.image} alt={hospital.name} />
                                            </div>
                                            <div className="card-info">
                                                <div className="card-top">
                                                    <h3>{hospital.name}</h3>
                                                    <div className="rating-badge">
                                                        <Star size={16} fill="currentColor" />
                                                        {hospital.rating}
                                                    </div>
                                                </div>
                                                <div className="card-address">
                                                    <MapPin size={16} />
                                                    {hospital.address}
                                                </div>
                                                <div className="card-meta">
                                                    <div className="meta-item">
                                                        <Navigation size={14} />
                                                        {hospital.distance}
                                                    </div>
                                                    <div className={`meta-item ${hospital.availableToday ? 'available' : ''}`}>
                                                        <Clock size={14} />
                                                        {hospital.availableToday ? 'Available Today' : 'No slots today'}
                                                    </div>
                                                </div>
                                                <div className="card-actions">
                                                    <button className="btn-outline" onClick={(e) => { e.stopPropagation(); handleHospitalSelect(hospital); }}>
                                                        View Details
                                                    </button>
                                                    <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleBookNow(hospital); }}>
                                                        Book Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'list' && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="listing-step"
                        >
                            <button className="back-btn" onClick={() => setCurrentStep('search')}>
                                <ChevronLeft size={20} /> Back to search
                            </button>
                            <div className="listing-header">
                                <h2>Hospitals near {pinCode || 'you'}</h2>
                                <span>{filteredHospitals.length} result(s) found</span>
                            </div>

                            <div className="hospital-grid">
                                {filteredHospitals.map(hospital => (
                                    <div key={hospital.id} className="hospital-card" onClick={() => handleHospitalSelect(hospital)}>
                                        <div className="card-image">
                                            <img src={hospital.image} alt={hospital.name} />
                                        </div>
                                        <div className="card-info">
                                            <div className="card-top">
                                                <h3>{hospital.name}</h3>
                                                <div className="rating-badge">
                                                    <Star size={16} fill="currentColor" />
                                                    {hospital.rating}
                                                </div>
                                            </div>
                                            <div className="card-address">
                                                <MapPin size={16} />
                                                {hospital.address}
                                            </div>
                                            <div className="card-meta">
                                                <div className="meta-item">
                                                    <Navigation size={14} />
                                                    {hospital.distance}
                                                </div>
                                                <div className={`meta-item ${hospital.availableToday ? 'available' : ''}`}>
                                                    <Clock size={14} />
                                                    {hospital.availableToday ? 'Available Today' : 'No slots today'}
                                                </div>
                                            </div>
                                            <div className="card-actions">
                                                <button className="btn-outline" onClick={(e) => { e.stopPropagation(); handleHospitalSelect(hospital); }}>
                                                    View Details
                                                </button>
                                                <button className="btn-primary" onClick={(e) => { e.stopPropagation(); handleBookNow(hospital); }}>
                                                    Book Appointment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'details' && selectedHospital && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="details-step"
                        >
                            <div className="details-hero">
                                <img src={selectedHospital.image} alt={selectedHospital.name} />
                                <div className="hero-overlay">
                                    <button className="back-btn" style={{ color: 'white' }} onClick={() => setCurrentStep('list')}>
                                        <ChevronLeft size={20} /> Back to list
                                    </button>
                                    <h2>{selectedHospital.name}</h2>
                                    <div className="card-address" style={{ color: '#eee' }}>
                                        <MapPin size={16} />
                                        {selectedHospital.address}
                                    </div>
                                </div>
                            </div>

                            <div className="details-content">
                                <div className="details-main">
                                    <div className="details-section">
                                        <h4><Stethoscope size={20} /> Available Doctors</h4>
                                        <div className="doctor-list">
                                            {selectedHospital.doctors.map(doc => (
                                                <div key={doc.id} className="doctor-card">
                                                    <div className="doc-avatar">
                                                        <User size={30} />
                                                    </div>
                                                    <div className="doc-info">
                                                        <h5>{doc.name}</h5>
                                                        <p>{doc.specialty}</p>
                                                        <span>Available: {doc.timings}</span>
                                                    </div>
                                                    <button
                                                        className="btn-primary"
                                                        style={{ marginLeft: 'auto', flex: '0 0 auto', padding: '10px 20px' }}
                                                        onClick={() => handleBookNow(selectedHospital, doc)}
                                                    >
                                                        Book Appointment
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="details-section">
                                        <h4><Activity size={20} /> Services Offered</h4>
                                        <div className="services-tags">
                                            {selectedHospital.services.map((service, idx) => (
                                                <div key={idx} className="service-tag">{service.name}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="info-sidebar">
                                    <div className="sidebar-item">
                                        <label>Contact Number</label>
                                        <p>{selectedHospital.contact}</p>
                                    </div>
                                    <div className="sidebar-item">
                                        <label>Timings</label>
                                        <p>{selectedHospital.timings}</p>
                                    </div>
                                    <div className="sidebar-item">
                                        <label>Fees</label>
                                        <p style={{ color: '#2ecc71', fontSize: '18px' }}>FREE CHECKUP</p>
                                    </div>
                                    <button className="btn-primary" style={{ width: '100%' }} onClick={() => handleBookNow(selectedHospital)}>
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'book' && selectedHospital && (
                        <motion.div
                            key="book"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="booking-step"
                        >
                            <button className="back-btn" onClick={() => setCurrentStep('details')}>
                                <ChevronLeft size={20} /> Back to details
                            </button>

                            <div className="booking-form-card">
                                <h2>Book Appointment</h2>
                                <p style={{ marginBottom: '30px', color: '#666' }}>at {selectedHospital.name} {selectedDoctor ? `with ${selectedDoctor.name}` : ''}</p>

                                <form className="form-grid" onSubmit={handleConfirmBooking}>
                                    <div className="form-field">
                                        <label>Select Date 📅</label>
                                        <input
                                            type="date"
                                            value={bookingData.date}
                                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Select Time Slot ⏰</label>
                                        <select
                                            value={bookingData.time}
                                            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                            required
                                        >
                                            {timeSlots.map(slot => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label>Patient Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            value={bookingData.name}
                                            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label>Age</label>
                                        <input
                                            type="number"
                                            placeholder="Years"
                                            value={bookingData.age}
                                            onChange={(e) => setBookingData({ ...bookingData, age: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-field field-full">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91"
                                            value={bookingData.phone}
                                            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-field field-full">
                                        <label>Eye Issue (Optional)</label>
                                        <textarea
                                            rows={2}
                                            placeholder="Briefly describe your issue..."
                                            value={bookingData.issue}
                                            onChange={(e) => setBookingData({ ...bookingData, issue: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className="field-full" style={{ marginTop: '20px' }}>
                                        <button className="btn-primary" style={{ width: '100%', padding: '18px' }}>
                                            Confirm Booking
                                        </button>
                                        <p style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '15px' }}>
                                            By confirming, you agree to our terms of service and privacy policy.
                                            Checkups are free of charge.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 'confirm' && selectedHospital && (
                        <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="confirm-step"
                        >
                            <div className="success-icon">
                                <CheckCircle size={50} />
                            </div>
                            <h1>Appointment Confirmed! 🎉</h1>
                            <p>We've sent the appointment details to your phone number.</p>

                            <div className="confirm-card">
                                <h3>Booking Details</h3>
                                <div className="booking-summary">
                                    <div className="summary-row">
                                        <label>Hospital</label>
                                        <span>{selectedHospital.name}</span>
                                    </div>
                                    <div className="summary-row">
                                        <label>Doctor</label>
                                        <span>{selectedDoctor ? selectedDoctor.name : 'General Consultant'}</span>
                                    </div>
                                    <div className="summary-row">
                                        <label>Date</label>
                                        <span>{bookingData.date}</span>
                                    </div>
                                    <div className="summary-row">
                                        <label>Time</label>
                                        <span>{bookingData.time}</span>
                                    </div>
                                    <div className="summary-row">
                                        <label>Consultation</label>
                                        <span style={{ color: '#2ecc71' }}>FREE (₹0)</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <Link to="/profile" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                                    View My Appointments
                                </Link>
                                <div style={{ marginTop: '20px' }}>
                                    <Link to="/" style={{ color: '#666', fontWeight: 700, textDecoration: 'none' }}>Return to Home</Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HospitalBooking;
