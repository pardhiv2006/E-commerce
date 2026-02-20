import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User, LogIn, CheckCircle } from 'lucide-react';
import './AdminCustomers.css';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await api.getAllUsers(token);
            // Filter out the currently logged-in user
            const currentEmail = user?.email;
            const filteredData = data.filter(c => c.email !== currentEmail);
            setCustomers(filteredData);
        } catch (err) {
            setError('Failed to load customers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickSignIn = (email) => {
        // Logout current user (Admin)
        logout();
        // Redirect to login with email pre-filled
        navigate(`/login?email=${encodeURIComponent(email)}`);
    };

    if (loading) return <div className="admin-card">Loading customers...</div>;
    if (error) return <div className="admin-card error-text">{error}</div>;

    return (
        <div className="admin-card">
            <h2 className="admin-section-title">Customers Management</h2>
            <p className="admin-section-subtitle">Manage all registered users and switch accounts quickly.</p>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>
                                <div className="customer-name-cell">
                                    <div className="customer-avatar-small">
                                        <User size={14} />
                                    </div>
                                    <span className="customer-username">{customer.username}</span>
                                </div>
                            </td>
                            <td>
                                <span className="customer-email">{customer.email}</span>
                            </td>
                            <td>
                                <button
                                    className="quick-signin-btn"
                                    onClick={() => handleQuickSignIn(customer.email)}
                                    title="Sign in as this user"
                                >
                                    <LogIn size={16} />
                                    <span>Sign In</span>
                                    <div className="checkbox-overlay">
                                        <CheckCircle size={12} />
                                    </div>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCustomers;
