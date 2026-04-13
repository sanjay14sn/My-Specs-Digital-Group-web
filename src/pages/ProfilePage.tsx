import React, { useState } from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Edit2, CreditCard, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const userInfo = {
        name: user?.name || 'Sanjay Naveen',
        email: user?.email || 'sanjay.naveen@example.com',
        phone: '+91 98765 43210',
        joinedDate: 'January 2024'
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const orders = [
        { id: 'ORD-7721', date: 'April 02, 2026', status: 'Delivered', total: '₹8,500', items: 1 },
        { id: 'ORD-6540', date: 'March 15, 2026', status: 'Processing', total: '₹12,400', items: 2 }
    ];

    const menuItems = [
        { id: 'dashboard', label: 'Account Dashboard', icon: <User size={20} /> },
        { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
        { id: 'appointments', label: 'My Appointments', icon: <Calendar size={20} /> },
        { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={20} /> },
        { id: 'payments', label: 'Payment Methods', icon: <CreditCard size={20} /> },
        { id: 'settings', label: 'Account Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="profile-page-wrapper container">
            <div className="profile-grid">
                {/* Sidebar Navigation */}
                <aside className="profile-sidebar">
                    <div className="user-overview">
                        <div className="avatar-large">
                            {userInfo.name.charAt(0)}
                        </div>
                        <div className="user-meta">
                            <h3>{userInfo.name}</h3>
                            <p>Member since {userInfo.joinedDate}</p>
                        </div>
                    </div>

                    <nav className="profile-nav">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className="item-icon">{item.icon}</span>
                                <span className="item-label">{item.label}</span>
                                <ChevronRight size={16} className="arrow" />
                            </button>
                        ))}
                        <button className="nav-item logout" onClick={handleLogout}>
                            <span className="item-icon"><LogOut size={20} /></span>
                            <span className="item-label">Logout</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="profile-content">
                    {activeTab === 'dashboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dashboard-view"
                        >
                            <div className="section-header">
                                <h2>Account Dashboard</h2>
                                <button className="edit-btn"><Edit2 size={16} /> Edit Profile</button>
                            </div>

                            <div className="info-cards-grid">
                                <div className="info-card">
                                    <h4>Contact Information</h4>
                                    <p><strong>Name:</strong> {userInfo.name}</p>
                                    <p><strong>Email:</strong> {userInfo.email}</p>
                                    <p><strong>Phone:</strong> {userInfo.phone}</p>
                                </div>
                                <div className="info-card">
                                    <h4>Default Address</h4>
                                    <p><strong>Home:</strong> 123, Luxury Lane, Tech Park</p>
                                    <p>Bengaluru, Karnataka - 560001</p>
                                    <p>India</p>
                                </div>
                            </div>

                            <div className="recent-orders-preview">
                                <div className="section-header-small">
                                    <h3>Recent Orders</h3>
                                    <button className="view-link" onClick={() => setActiveTab('orders')}>View All</button>
                                </div>
                                <div className="orders-table">
                                    {orders.map(order => (
                                        <div key={order.id} className="order-row">
                                            <div className="order-id">
                                                <span>Order ID</span>
                                                <p>{order.id}</p>
                                            </div>
                                            <div className="order-date">
                                                <span>Date</span>
                                                <p>{order.date}</p>
                                            </div>
                                            <div className="order-status">
                                                <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                                            </div>
                                            <div className="order-total">
                                                <span>Total</span>
                                                <p>{order.total}</p>
                                            </div>
                                            <ChevronRight size={18} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'appointments' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="appointments-view"
                        >
                            <div className="section-header">
                                <h2>My Appointments</h2>
                            </div>
                            <div className="appointments-list">
                                {JSON.parse(localStorage.getItem('my_appointments') || '[]').length > 0 ? (
                                    JSON.parse(localStorage.getItem('my_appointments') || '[]').map((apt: any) => (
                                        <div key={apt.id} className="order-card-large">
                                            <div className="card-header">
                                                <div>
                                                    <span className="label">Appointment ID</span>
                                                    <p className="value">{apt.id}</p>
                                                </div>
                                                <span className="status-pill delivered">{apt.status}</span>
                                            </div>
                                            <div className="card-body">
                                                <div className="appointment-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
                                                    <div>
                                                        <span className="label" style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>Hospital</span>
                                                        <p className="value" style={{ fontWeight: 600, fontSize: '15px' }}>{apt.hospitalName}</p>
                                                    </div>
                                                    <div>
                                                        <span className="label" style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>Doctor</span>
                                                        <p className="value" style={{ fontWeight: 600, fontSize: '15px' }}>{apt.doctorName}</p>
                                                    </div>
                                                    <div>
                                                        <span className="label" style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>Date & Time</span>
                                                        <p className="value" style={{ fontWeight: 600, fontSize: '15px' }}>{apt.date} at {apt.time}</p>
                                                    </div>
                                                    <div>
                                                        <span className="label" style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>Type</span>
                                                        <p className="value" style={{ fontWeight: 600, fontSize: '15px' }}>{apt.type}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button className="secondary-btn">Cancel Appointment</button>
                                                <button className="primary-btn">Reschedule</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <h3>No Appointments Yet</h3>
                                        <p>You haven't booked any eye checkups. Find a hospital nearby to get started!</p>
                                        <button className="primary-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/hospital-booking')}>Book Now</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'orders' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="orders-view"
                        >
                            <div className="section-header">
                                <h2>My Orders</h2>
                            </div>
                            <div className="orders-list-full">
                                {orders.map(order => (
                                    <div key={order.id} className="order-card-large">
                                        <div className="card-header">
                                            <div>
                                                <span className="label">Order Number</span>
                                                <p className="value">{order.id}</p>
                                            </div>
                                            <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="item-pills">
                                                <div className="placeholder-item"></div>
                                                {order.items > 1 && <div className="more-items">+{order.items - 1}</div>}
                                            </div>
                                            <div className="order-summary">
                                                <p>Placed on {order.date}</p>
                                                <p className="price">{order.total}</p>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="secondary-btn">Order Details</button>
                                            <button className="primary-btn">Track Order</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {(activeTab === 'addresses' || activeTab === 'payments' || activeTab === 'settings') && (
                        <div className="placeholder-content">
                            <div className="empty-state">
                                <h3>Section Coming Soon</h3>
                                <p>We are working hard to bring the {activeTab} section to you. Stay tuned!</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
