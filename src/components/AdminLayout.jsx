import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Tag, Users, Settings, LogOut } from 'lucide-react';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { name: 'Products', icon: <ShoppingBag size={20} />, path: '/admin/products' },
        { name: 'Categories', icon: <Tag size={20} />, path: '/admin/categories' },
        { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
        { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        // Implement logout logic
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">First<span>Mart</span></div>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header">
                    <h1>{menuItems.find(item => item.path === location.pathname)?.name || 'Admin'}</h1>
                    <div className="admin-user-profile">
                        {/* Add admin user profile info here if needed */}
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
