import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, ShoppingBag, TrendingUp, Gift } from 'lucide-react';
import './Login.css';
import { api } from '../services/api';

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prefilledEmail = queryParams.get('email');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (prefilledEmail) {
            setEmail(prefilledEmail);
        }
    }, [prefilledEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await api.login({ email, password });

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
                        <LogIn size={40} />
                    </div>
                    <h1>Welcome Back!</h1>
                    <p>Sign in to continue your shopping experience</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing you in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-features">
                    <div className="feature-item">
                        <ShoppingBag size={16} />
                        <span>Track orders</span>
                    </div>
                    <div className="feature-item">
                        <TrendingUp size={16} />
                        <span>Best deals</span>
                    </div>
                    <div className="feature-item">
                        <Gift size={16} />
                        <span>Exclusive offers</span>
                    </div>
                    <div className="feature-item">
                        <Gift size={16} />
                        <span>Rewards program</span>
                    </div>
                </div>

                <div className="auth-footer">
                    <p>New to First Mart? <Link to="/signup">Create an account</Link></p>
                    <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                        <Link to="/admin/login" style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Admin Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
