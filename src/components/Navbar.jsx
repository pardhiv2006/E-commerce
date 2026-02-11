import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, User, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount, searchQuery, setSearchQuery } = useShop();
    const { user, logout } = useAuth();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (location.pathname !== '/shop') {
            navigate('/shop');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="logo">
                        <span className="logo-first">First</span>
                        <span className="logo-mart">Mart</span>
                    </Link>
                </div>

                <div className="navbar-search">
                    <div className="search-container">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for Products, Categories and More"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="navbar-right">
                    {user ? (
                        <div className="nav-item user-info">
                            <User size={18} />
                            <span>{user.email}</span>
                            <button onClick={handleLogout} className="logout-btn" title="Logout">
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-item user-login">
                            <User size={18} />
                            <span>Login</span>
                        </Link>
                    )}

                    <Link to="/orders" className="nav-item orders-link">
                        <span>My Orders</span>
                    </Link>

                    <Link to="/cart" className="nav-item cart-link">
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    <div className="nav-item more-menu">
                        <Menu size={20} className="mobile-only" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
