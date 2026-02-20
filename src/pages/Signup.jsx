import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, UserPlus, Shield, Zap, CheckCircle, User } from 'lucide-react';
import './Login.css';
import { api } from '../services/api';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await api.signup({ email, password, username });

            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon-wrapper">
                        <UserPlus size={40} />
                    </div>
                    <h1>Join First Mart</h1>
                    <p>Create your account and start shopping amazing deals</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Full Name / Username</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                            <User size={20} className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                            <Mail size={20} className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password"
                                required
                                minLength={6}
                            />
                            <Lock size={20} className="input-icon" />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating your account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-features">
                    <div className="feature-item">
                        <Shield size={16} />
                        <span>Secure checkout</span>
                    </div>
                    <div className="feature-item">
                        <Zap size={16} />
                        <span>Fast delivery</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle size={16} />
                        <span>Easy returns</span>
                    </div>
                    <div className="feature-item">
                        <CheckCircle size={16} />
                        <span>24/7 support</span>
                    </div>
                </div>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
