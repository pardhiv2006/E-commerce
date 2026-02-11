import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { coupons } from '../data';
import './Cart.css';

const Cart = () => {
    const { cart, orders, removeFromCart, updateQuantity, checkout } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalOriginalPrice = cart.reduce((acc, item) => {
        const discount = (item.id * 7 % 30 + 10);
        const originalPrice = item.price / (1 - discount / 100);
        return acc + originalPrice * item.quantity;
    }, 0);

    const totalDiscount = totalOriginalPrice - subtotal;

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (cart.length === 0) return;
        setTimeout(() => {
            checkout(subtotal, totalDiscount);
            navigate('/orders');
        }, 1000);
    };

    if (cart.length === 0) {
        return (
            <div className="container section">
                <div className="cart-empty">
                    <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" width="200" />
                    <h2>Your cart is empty!</h2>
                    <p>Add items to it now.</p>
                    <Button onClick={() => navigate('/shop')} style={{ marginTop: '20px' }}>Shop Now</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page container section">
            <div className="cart-grid">
                <div className="cart-items-container">
                    <h2 className="cart-page-title">My Cart ({cart.length})</h2>
                    {cart.map(item => {
                        const discount = (item.id * 7 % 30 + 10);
                        const originalPrice = item.price / (1 - discount / 100);
                        return (
                            <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="cart-item">
                                <div className="cart-item-image-col">
                                    <div className="cart-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-qty-controls">
                                        <button onClick={() => updateQuantity(item.id, -1, item.selectedOptions)} disabled={item.quantity <= 1}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1, item.selectedOptions)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-details-col">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                    {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                                        <div className="cart-item-variants">
                                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                                                <span key={key} className="variant-tag">{key}: {value}</span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="cart-item-seller">Seller: First Mart Official</p>
                                    <div className="cart-item-price-row">
                                        <span className="cart-item-original-price">${originalPrice.toFixed(0)}</span>
                                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                                        <span className="cart-item-discount">{discount}% Off</span>
                                    </div>
                                    <div className="cart-item-actions">
                                        <button className="cart-action-btn" onClick={() => removeFromCart(item.id, item.selectedOptions)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="place-order-container">
                        <Button className="place-order-btn" onClick={handleCheckout}>PLACE ORDER</Button>
                    </div>
                </div>

                <div className="price-details-sidebar">
                    <div className="price-details-card">
                        <h3 className="price-details-title">Price Details</h3>
                        <div className="price-details-content">
                            <div className="price-row">
                                <span>Price ({cart.length} items)</span>
                                <span>${totalOriginalPrice.toFixed(0)}</span>
                            </div>
                            <div className="price-row free">
                                <span>Discount</span>
                                <span>−${totalDiscount.toFixed(0)}</span>
                            </div>
                            <div className="price-row free">
                                <span>Delivery Charges</span>
                                <span>FREE</span>
                            </div>
                            <div className="total-amount-row">
                                <span>Total Amount</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <p className="savings-text">You will save ${totalDiscount.toFixed(0)} on this order</p>
                    </div>

                    {orders.length > 0 && (
                        <div className="my-orders-sidebar">
                            <h3 className="orders-sidebar-title">My Orders ({orders.length})</h3>
                            <div className="orders-sidebar-list">
                                {orders.slice(0, 3).map(order => (
                                    <div key={order.id} className="order-sidebar-item">
                                        <div className="order-sidebar-header">
                                            <span className="order-id">{order.id}</span>
                                            <span className={`order-status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="order-sidebar-details">
                                            <p className="order-date">{order.date}</p>
                                            <p className="order-total">₹{order.total.toFixed(2)}</p>
                                            <p className="order-items">{order.items.length} item(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/orders" style={{ textDecoration: 'none' }}>
                                <Button style={{ width: '100%', marginTop: '12px', padding: '10px' }}>
                                    View All Orders
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
