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
    const { user } = useAuth();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (location.pathname !== '/shop') {
            navigate('/shop');
        }
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-left">
                    {user ? (
                        <div className="user-menu-container">
                            <button
                                className="user-icon-btn-group"
                                onClick={() => navigate('/user-menu')}
                                title="User Menu"
                            >
                                <div className="user-icon-circle">
                                    <User size={18} />
                                </div>
                                <span className="user-name-display">{user.username || 'User'}</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-item user-login">
                            <User size={18} />
                            <span>Login</span>
                        </Link>
                    )}

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
                    <div className="nav-group-right">
                        <Link to="/orders" className="nav-item orders-link">
                            <span>My Orders</span>
                        </Link>

                        <Link to="/cart" className="nav-item cart-link">
                            <ShoppingCart size={20} />
                            <span>Cart</span>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </div>

                    <div className="nav-item more-menu">
                        <Menu size={20} className="mobile-only" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
