import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    User, Mail, LogOut, LayoutDashboard,
    ShoppingBag, Users, BarChart3, Settings,
    ArrowLeft, ChevronRight, Package, ShoppingCart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminCustomers from './AdminCustomers';
import './UserMenu.css';

const UserMenu = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check for initial tab in query params
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get('tab') || 'Dashboard';

    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const tab = queryParams.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const adminLinks = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, color: '#2874f0' },
        { name: 'Product Management', icon: <Package size={20} />, color: '#ff9f00' },
        { name: 'Order Processing', icon: <ShoppingCart size={20} />, color: '#388e3c' },
        { name: 'Customer Insights', icon: <Users size={20} />, color: '#00bcd4' },
    ];

    const supportLinks = [
        { name: 'Sales Reports', icon: <BarChart3 size={20} />, color: '#9c27b0' },
        { name: 'System Settings', icon: <Settings size={20} />, color: '#607d8b' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
            case 'Order Processing':
                return <AdminDashboard />;
            case 'Product Management':
                return <AdminProducts />;
            case 'Customer Insights':
                return <AdminCustomers />;
            case 'Profile':
                return (
                    <div className="admin-card profile-view-full">
                        <div className="profile-hero">
                            <div className="profile-avatar-large">
                                <User size={48} />
                            </div>
                            <h3>{user?.username}</h3>
                            <p>{user?.email}</p>
                        </div>
                        <div className="profile-details-grid">
                            <div className="detail-item">
                                <label>Account Status</label>
                                <span>Active</span>
                            </div>
                            <div className="detail-item">
                                <label>Member Since</label>
                                <span>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="admin-card">{activeTab} Section (Coming Soon)</div>;
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="user-menu-page">
            <aside className="user-menu-sidebar">
                <div className="sidebar-header">
                    <button className="back-btn" onClick={() => navigate('/')} title="Back to Home">
                        <ArrowLeft size={20} />
                    </button>
                    <span>Account Portal</span>
                </div>

                <div className="sidebar-content">
                    {/* User Profile Section */}
                    <div className="menu-group theme-blue">
                        <div className="group-label">System Access</div>
                        <button
                            className={`list-item ${activeTab === 'Profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Profile')}
                        >
                            <div className="item-icon-wrapper profile-icon">
                                <User size={20} />
                            </div>
                            <div className="item-content">
                                <div className="item-info">
                                    <span className="item-title">{user.username || 'User'}</span>
                                    <span className="item-subtitle">View Profile</span>
                                </div>
                                <ChevronRight size={18} className="chevron" />
                            </div>
                        </button>
                    </div>

                    <div className="section-divider"></div>

                    {/* Admin Panel Section */}
                    <div className="menu-group theme-white">
                        <div className="group-label">Admin Management</div>
                        <div className="vertical-list">
                            {adminLinks.map((link) => (
                                <button
                                    key={link.name}
                                    className={`list-item ${activeTab === link.name ? 'active' : ''}`}
                                    onClick={() => setActiveTab(link.name)}
                                >
                                    <div className="item-icon-wrapper" style={{ backgroundColor: `${link.color}15`, color: link.color }}>
                                        {link.icon}
                                    </div>
                                    <div className="item-content">
                                        <span>{link.name}</span>
                                        <ChevronRight size={18} className="chevron" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Support Section */}
                    <div className="menu-group theme-white">
                        <div className="group-label">Reports & Tools</div>
                        <div className="vertical-list">
                            {supportLinks.map((link) => (
                                <button
                                    key={link.name}
                                    className={`list-item ${activeTab === link.name ? 'active' : ''}`}
                                    onClick={() => setActiveTab(link.name)}
                                >
                                    <div className="item-icon-wrapper" style={{ backgroundColor: `${link.color}15`, color: link.color }}>
                                        {link.icon}
                                    </div>
                                    <div className="item-content">
                                        <span>{link.name}</span>
                                        <ChevronRight size={18} className="chevron" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Actions Section */}
                    <div className="menu-group theme-red">
                        <div className="group-label">Session</div>
                        <button onClick={handleLogout} className="list-item logout-trigger">
                            <div className="item-icon-wrapper logout-icon">
                                <LogOut size={20} />
                            </div>
                            <div className="item-content">
                                <span>Sign Out</span>
                                <ChevronRight size={18} className="chevron" />
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            <main className="portal-content-main">
                <header className="portal-main-header">
                    <h1 className="portal-title">{activeTab}</h1>
                    <div className="portal-breadcrumb">Home / Portal / {activeTab}</div>
                </header>
                <div className="portal-view-container">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default UserMenu;
