import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User, Clock } from 'lucide-react';
import './AdminCustomers.css';

const formatLoginTime = (dateStr) => {
    if (!dateStr) return { date: 'Never logged in', time: '' };
    const d = new Date(dateStr);
    const date = d.toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric'
    });
    const time = d.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });
    return { date, time };
};

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await api.getAllUsers(token);
            // Filter out the currently logged-in admin
            const filteredData = data.filter(c => c.email !== user?.email);
            setCustomers(filteredData);
        } catch (err) {
            setError('Failed to load customers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="admin-card">Loading customers...</div>;
    if (error) return <div className="admin-card error-text">{error}</div>;

    return (
        <div className="admin-card">
            <h2 className="admin-section-title">Customers Management</h2>
            <p className="admin-section-subtitle">View all registered users and their last login activity.</p>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => {
                        const { date, time } = formatLoginTime(customer.lastLoginAt);
                        return (
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
                                    <div className="last-login-cell">
                                        <Clock size={13} className="login-clock-icon" />
                                        <div className="login-datetime">
                                            <span className="login-date">{date}</span>
                                            {time && <span className="login-time">{time}</span>}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCustomers;
