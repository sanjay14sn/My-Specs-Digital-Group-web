import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Chrome, Github, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            login(email, email.split('@')[0]); // Use part of email as name for dummy
            setIsLoading(false);
            navigate('/profile');
        }, 1500);
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Enter your details to access your account</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label>Password</label>
                            <Link to="#" style={{ fontSize: '12px', color: '#A6171E', fontWeight: 700, textDecoration: 'none' }}>
                                Forgot?
                            </Link>
                        </div>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '15px', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="social-login">
                    <button className="social-btn">
                        <Chrome size={18} /> Sign in with Google
                    </button>
                    <button className="social-btn">
                        <Github size={18} /> Sign in with GitHub
                    </button>
                </div>

                <div className="auth-footer">
                    Don't have an account?
                    <Link to="/signup">Create account</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
