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
    const [isCartBumping, setIsCartBumping] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Cart bump animation effect
    React.useEffect(() => {
        if (cartCount === 0) return;
        setIsCartBumping(true);
        const timer = setTimeout(() => setIsCartBumping(false), 300);
        return () => clearTimeout(timer);
    }, [cartCount]);

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
                    <div className="nav-item mobile-menu-toggle" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </div>

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
                        {user ? (
                            <div className="user-menu-container desktop-only">
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
                            <Link to="/login" className="nav-item user-login desktop-only">
                                <User size={18} />
                                <span>Login</span>
                            </Link>
                        )}

                        <Link to="/orders" className="nav-item orders-link desktop-only">
                            <span>My Orders</span>
                        </Link>

                        <Link to="/cart" className="nav-item cart-link">
                            <ShoppingCart size={20} />
                            <span className="cart-text">Cart</span>
                            {cartCount > 0 && <span className={`cart-badge ${isCartBumping ? 'bump' : ''}`}>{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Side Drawer */}
            <div className={`mobile-drawer-overlay ${isMenuOpen ? 'show' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
            <div className={`mobile-drawer ${isMenuOpen ? 'show' : ''}`}>
                <div className="drawer-header">
                    <div className="user-info-mobile">
                        <div className="user-icon-circle">
                            <User size={20} />
                        </div>
                        <span>Hello, {user ? user.username : 'User'}</span>
                    </div>
                    <button className="close-drawer" onClick={() => setIsMenuOpen(false)}>×</button>
                </div>
                <div className="drawer-content">
                    <Link to="/" className="drawer-item" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/shop" className="drawer-item" onClick={() => setIsMenuOpen(false)}>All Products</Link>
                    <Link to="/orders" className="drawer-item" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                    {user ? (
                        <>
                            <Link to="/user-menu" className="drawer-item" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                            <div className="drawer-divider"></div>
                            {/* Assuming AuthService has a logout or we use AuthContext */}
                            <button className="drawer-item logout-btn" onClick={() => { /* Logout logic */ setIsMenuOpen(false); }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="drawer-item login-highlight" onClick={() => setIsMenuOpen(false)}>Login / Signup</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
