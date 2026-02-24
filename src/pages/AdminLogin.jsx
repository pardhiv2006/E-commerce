import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import '../pages/Login.css'; // Reuse existing login styles for base

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Normalize email to prevent copy-paste errors with whitespace or casing
            const normalizedEmail = email.trim().toLowerCase();

            // Check for admin credentials
            // In a real app, this would be an API call
            if (normalizedEmail === 'admin@firstmart.com' && password === 'admin123') {
                localStorage.setItem('token', 'mock-admin-token');
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid admin credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="login-card" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                <div className="login-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div className="login-logo" style={{ fontSize: '2rem', fontWeight: '800', color: '#2874f0', marginBottom: '0.5rem' }}>
                        First<span style={{ color: '#1a1c1e' }}>Mart</span> Admin
                    </div>
                    <p style={{ color: '#64748b' }}>Administrative Access Only</p>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@firstmart.com"
                                required
                                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '8px', background: '#2874f0', color: 'white', fontWeight: '600' }}
                    >
                        {loading ? 'Authenticating...' : (
                            <>
                                Sign In to Admin <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <p>© 2026 FirstMart Ecommerce. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
