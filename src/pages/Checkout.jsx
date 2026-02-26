import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

/* ── helpers ── */
const calcDiscount = (id) => (id * 7) % 30 + 10;
const originalPrice = (item) => item.price / (1 - calcDiscount(item.id) / 100);

const INDIA_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

/* ────────────────────────────── */
/* STEP 1 — Address Form          */
/* ────────────────────────────── */
const AddressStep = ({ onDeliver }) => {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: user?.username || '',
        phone: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        addressType: 'Home',
    });
    const [errors, setErrors] = useState({});

    const set = (field, val) => {
        setForm(f => ({ ...f, [field]: val }));
        setErrors(e => ({ ...e, [field]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number';
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
        if (!form.address.trim()) e.address = 'Address is required';
        if (!form.city.trim()) e.city = 'City is required';
        if (!form.state) e.state = 'Select a state';
        return e;
    };

    const handleDeliver = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        onDeliver(form);
    };

    return (
        <div>
            <p className="address-section-title">Add a New Delivery Address</p>
            <div className="address-form-grid">
                <div className="form-group">
                    <label>Full Name *</label>
                    <input className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Full Name" value={form.name}
                        onChange={e => set('name', e.target.value)} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Mobile Number *</label>
                    <input className={`form-input${errors.phone ? ' error' : ''}`}
                        placeholder="10-digit mobile number" value={form.phone} maxLength={10}
                        onChange={e => set('phone', e.target.value.replace(/\D/g, ''))} />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <label>Pincode *</label>
                    <input className={`form-input${errors.pincode ? ' error' : ''}`}
                        placeholder="6-digit Pincode" value={form.pincode} maxLength={6}
                        onChange={e => set('pincode', e.target.value.replace(/\D/g, ''))} />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                </div>
                <div className="form-group">
                    <label>City / District *</label>
                    <input className={`form-input${errors.city ? ' error' : ''}`}
                        placeholder="City" value={form.city}
                        onChange={e => set('city', e.target.value)} />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="form-group full-width">
                    <label>Address (Flat, House no., Building, Street, Area) *</label>
                    <input className={`form-input${errors.address ? ' error' : ''}`}
                        placeholder="Address" value={form.address}
                        onChange={e => set('address', e.target.value)} />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                <div className="form-group">
                    <label>Locality / Town</label>
                    <input className="form-input" placeholder="Locality / Town" value={form.locality}
                        onChange={e => set('locality', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>State *</label>
                    <select className={`form-input${errors.state ? ' error' : ''}`}
                        value={form.state} onChange={e => set('state', e.target.value)}>
                        <option value="">Select State</option>
                        {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <span className="form-error">{errors.state}</span>}
                </div>
                <div className="form-group full-width">
                    <label>Address Type</label>
                    <div className="address-type-row">
                        {['Home', 'Work', 'Other'].map(t => (
                            <button key={t}
                                className={`address-type-btn${form.addressType === t ? ' selected' : ''}`}
                                onClick={() => set('addressType', t)}>{t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button className="deliver-here-btn" onClick={handleDeliver}>
                DELIVER HERE
            </button>
        </div>
    );
};

/* ────────────────────────────── */
/* STEP 2 — Order Summary         */
/* ────────────────────────────── */
const OrderSummaryStep = ({ cart, onContinue }) => (
    <div>
        <div className="order-review-items">
            {cart.map(item => {
                const disc = calcDiscount(item.id);
                const orig = originalPrice(item);
                return (
                    <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="order-review-item">
                        <img
                            className="order-review-img"
                            src={item.image}
                            alt={item.name}
                            onError={e => { e.target.src = 'https://via.placeholder.com/80'; }}
                        />
                        <div className="order-review-details">
                            <p className="order-review-name">{item.name}</p>
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                <div className="order-review-variants">
                                    {Object.entries(item.selectedOptions).map(([k, v]) => (
                                        <span key={k} className="review-variant-tag">{k}: {v}</span>
                                    ))}
                                </div>
                            )}
                            <div className="order-review-price-row">
                                <span className="review-price">${item.price.toFixed(2)}</span>
                                <span className="review-original-price">${orig.toFixed(0)}</span>
                                <span className="review-discount">{disc}% Off</span>
                            </div>
                            <p className="review-qty">Qty: {item.quantity}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        <button className="continue-btn" onClick={onContinue}>CONTINUE</button>
    </div>
);

/* ────────────────────────────── */
/* STEP 3 — Payment               */
/* ────────────────────────────── */
const PaymentStep = ({ total, couponDiscount, onPlaceOrder, isPlacing }) => {
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [selectedUpiApp, setSelectedUpiApp] = useState('');
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    const methods = [
        { id: 'upi', icon: '📱', label: 'UPI' },
        { id: 'card', icon: '💳', label: 'Credit / Debit Card' },
        { id: 'netbank', icon: '🏦', label: 'Net Banking' },
        { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
    ];

    const upiApps = [
        { id: 'gpay', icon: '🟢', name: 'Google Pay' },
        { id: 'phonepe', icon: '🔵', name: 'PhonePe' },
        { id: 'paytm', icon: '🔷', name: 'Paytm' },
        { id: 'bhim', icon: '🇮🇳', name: 'BHIM UPI' },
    ];

    const banks = [
        { id: 'sbi', icon: '🏛️', name: 'SBI' },
        { id: 'hdfc', icon: '🏦', name: 'HDFC Bank' },
        { id: 'icici', icon: '🏧', name: 'ICICI Bank' },
        { id: 'axis', icon: '💼', name: 'Axis Bank' },
        { id: 'kotak', icon: '🪙', name: 'Kotak Bank' },
        { id: 'pnb', icon: '🏬', name: 'PNB' },
    ];

    return (
        <div>
            <div className="payment-section">
                {/* Left: method list */}
                <div className="payment-methods-list">
                    {methods.map(m => (
                        <div
                            key={m.id}
                            className={`payment-method-tab${selectedMethod === m.id ? ' selected-tab' : ''}`}
                            onClick={() => setSelectedMethod(m.id)}
                        >
                            <span className="pm-icon">{m.icon}</span>
                            <span>{m.label}</span>
                        </div>
                    ))}
                </div>

                {/* Right: payment detail panel */}
                <div className="payment-panel">
                    {selectedMethod === 'upi' && (
                        <>
                            <p className="payment-panel-title">Pay via UPI App</p>
                            <div className="upi-options">
                                {upiApps.map(app => (
                                    <label key={app.id} className={`upi-option-row${selectedUpiApp === app.id ? ' selected-upi' : ''}`}>
                                        <input type="radio" name="upi_app" value={app.id}
                                            checked={selectedUpiApp === app.id}
                                            onChange={() => setSelectedUpiApp(app.id)} />
                                        <span className="upi-logo">{app.icon}</span>
                                        <span className="upi-name">{app.name}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="upi-input-row" style={{ marginTop: '16px' }}>
                                <input className="upi-id-input" placeholder="Enter UPI ID (e.g. name@upi)"
                                    value={upiId} onChange={e => setUpiId(e.target.value)} />
                                <button className="verify-btn">VERIFY</button>
                            </div>
                        </>
                    )}

                    {selectedMethod === 'card' && (
                        <>
                            <p className="payment-panel-title">Credit / Debit Card Details</p>
                            <div className="card-form">
                                <div className="form-group">
                                    <label>Card Number *</label>
                                    <input className="form-input" placeholder="•••• •••• •••• ••••" maxLength={19}
                                        onChange={e => {
                                            const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                            e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
                                        }} />
                                </div>
                                <div className="form-group">
                                    <label>Name on Card *</label>
                                    <input className="form-input" placeholder="As printed on card" />
                                </div>
                                <div className="card-row">
                                    <div className="form-group">
                                        <label>Expiry (MM/YY) *</label>
                                        <input className="form-input" placeholder="MM / YY" maxLength={5} />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV *</label>
                                        <input className="form-input" type="password" placeholder="•••" maxLength={3} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {selectedMethod === 'netbank' && (
                        <>
                            <p className="payment-panel-title">Select Your Bank</p>
                            <div className="bank-grid">
                                {banks.map(b => (
                                    <div key={b.id}
                                        className={`bank-card${selectedBank === b.id ? ' selected-bank' : ''}`}
                                        onClick={() => setSelectedBank(b.id)}>
                                        <span className="bank-icon">{b.icon}</span>
                                        {b.name}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {selectedMethod === 'cod' && (
                        <div className="cod-info">
                            <span className="cod-icon">💵</span>
                            <div>
                                <strong>Cash on Delivery available</strong>
                                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#388e3c' }}>
                                    Pay when your order arrives at your door. No extra charges.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Place Order */}
            <button
                className={`place-order-payment-btn${isPlacing ? ' loading' : ''}`}
                onClick={onPlaceOrder}
                disabled={isPlacing}
            >
                {isPlacing ? (
                    <>⏳ Placing Your Order…</>
                ) : (
                    <>🔒 PAY ${total.toFixed(2)} &amp; PLACE ORDER</>
                )}
            </button>
            <p className="secure-note">🔐 100% Secure Payments | SSL Encrypted</p>
        </div>
    );
};

/* ══════════════════════════════════ */
/* MAIN CHECKOUT PAGE                 */
/* ══════════════════════════════════ */
const Checkout = () => {
    const navigate = useNavigate();
    const { cart, checkout, isLoading } = useShop();

    const [activeStep, setActiveStep] = useState(1); // 1, 2, 3
    const [deliveryAddress, setDeliveryAddress] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [isPlacing, setIsPlacing] = useState(false);

    // Price calculations — same logic as Cart.jsx
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalOriginal = cart.reduce((acc, item) => acc + originalPrice(item) * item.quantity, 0);
    const totalDiscount = totalOriginal - subtotal;
    const finalTotal = subtotal; // no additional coupon here (handled in Cart)

    // if cart is empty, redirect
    if (cart.length === 0 && !showSuccess) {
        return (
            <div className="checkout-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center', background: '#fff', padding: '48px', borderRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,.1)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
                    <h2 style={{ marginBottom: '8px', color: '#212121' }}>Your cart is empty</h2>
                    <p style={{ color: '#878787', marginBottom: '24px' }}>Add items to your cart before proceeding to checkout.</p>
                    <button className="deliver-here-btn" onClick={() => navigate('/shop')}>CONTINUE SHOPPING</button>
                </div>
            </div>
        );
    }

    const handleDeliverHere = (address) => {
        setDeliveryAddress(address);
        setActiveStep(2);
    };

    const handleContinueToPayment = () => {
        setActiveStep(3);
    };

    const handlePlaceOrder = async () => {
        setIsPlacing(true);
        try {
            const id = await checkout(finalTotal, totalDiscount);
            setOrderId(id || '#ORD-' + Math.floor(Math.random() * 89999 + 10000));
            setShowSuccess(true);
        } catch (err) {
            console.error('Order failed:', err);
            setIsPlacing(false);
        }
    };

    // Badge label for completed step
    const stepBadge = (step) => {
        if (step < activeStep) return '✓';
        return step;
    };

    const stepBadgeClass = (step) => {
        if (step < activeStep) return 'done';
        if (step === activeStep) return 'active';
        return 'pending';
    };

    const stepTitleClass = (step) => {
        if (step < activeStep) return 'done-title';
        if (step === activeStep) return 'active-title';
        return '';
    };

    return (
        <>
            {/* ── Success Overlay ── */}
            {showSuccess && (
                <div className="order-success-overlay">
                    <div className="order-success-card">
                        <div className="success-checkmark">🎉</div>
                        <h2 className="success-title">Order Placed Successfully!</h2>
                        <p className="success-msg">
                            Your order has been confirmed and will be delivered to<br />
                            <strong>{deliveryAddress?.address}, {deliveryAddress?.city}</strong>
                        </p>
                        <div className="success-order-id">Order ID: {orderId}</div>
                        <div className="success-actions">
                            <button className="success-primary-btn" onClick={() => navigate('/orders')}>
                                View Orders
                            </button>
                            <button className="success-secondary-btn" onClick={() => navigate('/')}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="checkout-page">
                <div className="checkout-layout">
                    {/* ── LEFT — accordion steps ── */}
                    <div className="checkout-steps">

                        {/* STEP 1 — LOGIN (auto-complete if user logged in) */}
                        <div className="checkout-step">
                            <div className={`step-header${activeStep > 1 ? ' clickable' : ''}`}
                                onClick={() => activeStep > 1 && setActiveStep(1)}>
                                <div className={`step-badge ${stepBadgeClass(1)}`}>{stepBadge(1)}</div>
                                <div className="step-title-area">
                                    <p className={`step-title ${stepTitleClass(1)}`}>
                                        DELIVERY ADDRESS
                                        {activeStep > 1 && (
                                            <button className="step-change-btn">Change</button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            {activeStep > 1 && deliveryAddress && (
                                <div className="step-summary">
                                    <strong>{deliveryAddress.name} — {deliveryAddress.phone}</strong>
                                    {deliveryAddress.address}{deliveryAddress.locality ? ', ' + deliveryAddress.locality : ''}, {deliveryAddress.city}, {deliveryAddress.state} — {deliveryAddress.pincode}
                                    &nbsp;<span style={{ background: '#f0f0f0', padding: '1px 6px', borderRadius: '2px', fontSize: '0.75rem', fontWeight: 600 }}>{deliveryAddress.addressType}</span>
                                </div>
                            )}
                            {activeStep === 1 && (
                                <div className="step-body">
                                    <AddressStep onDeliver={handleDeliverHere} />
                                </div>
                            )}
                        </div>

                        {/* STEP 2 — ORDER SUMMARY */}
                        <div className="checkout-step">
                            <div className={`step-header${activeStep === 2 || activeStep > 2 ? ' clickable' : ''}`}
                                onClick={() => activeStep > 2 && setActiveStep(2)}>
                                <div className={`step-badge ${stepBadgeClass(2)}`}>{stepBadge(2)}</div>
                                <div className="step-title-area">
                                    <p className={`step-title ${stepTitleClass(2)}`}>
                                        ORDER SUMMARY
                                        {activeStep > 2 && (
                                            <button className="step-change-btn">Change</button>
                                        )}
                                    </p>
                                </div>
                            </div>
                            {activeStep > 2 && (
                                <div className="step-summary">
                                    <strong>{cart.length} item{cart.length > 1 ? 's' : ''}</strong>
                                    {cart.slice(0, 2).map(i => i.name).join(', ')}{cart.length > 2 ? ` +${cart.length - 2} more` : ''}
                                </div>
                            )}
                            {activeStep === 2 && (
                                <div className="step-body">
                                    <OrderSummaryStep cart={cart} onContinue={handleContinueToPayment} />
                                </div>
                            )}
                        </div>

                        {/* STEP 3 — PAYMENT */}
                        <div className="checkout-step">
                            <div className="step-header">
                                <div className={`step-badge ${stepBadgeClass(3)}`}>{stepBadge(3)}</div>
                                <div className="step-title-area">
                                    <p className={`step-title ${stepTitleClass(3)}`}>PAYMENT OPTIONS</p>
                                </div>
                            </div>
                            {activeStep === 3 && (
                                <div className="step-body">
                                    <PaymentStep
                                        total={finalTotal}
                                        couponDiscount={0}
                                        onPlaceOrder={handlePlaceOrder}
                                        isPlacing={isPlacing}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT — sticky price panel ── */}
                    <div className="checkout-price-panel">
                        <div className="checkout-price-card">
                            <h3 className="checkout-price-title">Price Details</h3>
                            <div className="checkout-price-rows">
                                <div className="c-price-row">
                                    <span>Price ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                                    <span>${totalOriginal.toFixed(0)}</span>
                                </div>
                                <div className="c-price-row">
                                    <span>Discount</span>
                                    <span className="green">− ${totalDiscount.toFixed(0)}</span>
                                </div>
                                <div className="c-price-row">
                                    <span>Delivery Charges</span>
                                    <span className="green">FREE</span>
                                </div>
                                <div className="c-price-row">
                                    <span>Secured Packaging</span>
                                    <span className="green">FREE</span>
                                </div>
                            </div>
                            <div className="c-price-total">
                                <span>Total Amount</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                            <div className="checkout-savings-banner">
                                🎉 You will save ${totalDiscount.toFixed(0)} on this order!
                            </div>
                        </div>

                        {/* Delivery promises */}
                        <div className="delivery-info-box">
                            <div className="di-row">
                                <span className="di-icon">🚚</span>
                                <span>Free Delivery on all orders</span>
                            </div>
                            <div className="di-row">
                                <span className="di-icon">🔄</span>
                                <span>Easy 7-day returns &amp; exchanges</span>
                            </div>
                            <div className="di-row">
                                <span className="di-icon">✅</span>
                                <span>100% Authentic products</span>
                            </div>
                            <div className="di-row">
                                <span className="di-icon">🔐</span>
                                <span>Secure payment gateway</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
