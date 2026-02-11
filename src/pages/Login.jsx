import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, ShoppingBag, TrendingUp, Gift } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
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
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

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
                                placeholder="Enter your password"
                                required
                            />
                            <Lock size={20} className="input-icon" />
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
                </div>
            </div>
        </div>
    );
};

export default Login;
