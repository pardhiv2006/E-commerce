import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';
import './Orders.css';

const OrderCard = ({ order, cancelOrder, markDelivered, isLoading }) => {
    const isRichData = Array.isArray(order.items);

    // In Flipkart, each item in an order often appears as a separate row or grouped cleanly
    return (
        <div className="orders-container">
            {isRichData ? (
                order.items.map((item, idx) => (
                    <div key={`${order.id}-${idx}`} className="order-card">
                        <div className="order-item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="order-item-details">
                            <h4>{item.name}</h4>
                            {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                                <div className="order-item-variants">
                                    {Object.entries(item.selectedOptions).map(([key, value]) => (
                                        <span key={key} style={{ fontSize: '0.8rem', color: '#878787', marginRight: '10px' }}>
                                            {key}: {value}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p>Qty: {item.quantity}</p>
                            <p>Seller: First Mart Official</p>
                        </div>
                        <div className="order-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="order-status-col">
                            <div className="status-dot-row">
                                <span className={`status-dot ${order.status === 'Cancelled' ? 'cancelled' : (order.status === 'Delivered' ? 'delivered' : 'ready')}`}></span>
                                <span>{order.status}</span>
                            </div>
                            <p className="delivery-subtext">
                                {order.status === 'Cancelled' ? 'Cancelled on request' : `Delivery expected by ${order.expectedDelivery}`}
                            </p>
                            <div className="order-actions" style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                                {order.status === 'Ready for Delivery' && (
                                    <>
                                        <button 
                                            className="remove-btn" 
                                            onClick={() => cancelOrder(order.id)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Processing...' : 'Cancel Order'}
                                        </button>
                                        <button 
                                            className="delivered-btn"
                                            onClick={() => markDelivered(order.id)}
                                            disabled={isLoading}
                                            style={{ 
                                                padding: '6px 12px', 
                                                backgroundColor: '#2874f0', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '4px', 
                                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                                opacity: isLoading ? 0.6 : 1
                                            }}
                                        >
                                            {isLoading ? 'Processing...' : 'Mark as Received'}
                                        </button>
                                    </>
                                )}
                                {order.status === 'Delivered' && (
                                    <span style={{ color: '#2874f0', fontWeight: '600' }}>✓ Received on time</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="order-card">
                    <div className="order-item-details">
                        <h4>Order #{order.id}</h4>
                        <p>{order.items}</p>
                    </div>
                    <div className="order-item-price">
                        ${order.total.toFixed(2)}
                    </div>
                    <div className="order-status-col">
                        <div className="status-dot-row">
                            <span className={`status-dot ${order.status === 'Cancelled' ? 'cancelled' : (order.status === 'Delivered' ? 'delivered' : 'ready')}`}></span>
                            <span>{order.status}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Orders = () => {
    const { orders, cancelOrder, markOrderDelivered, isLoading } = useShop();

    if (orders.length === 0) {
        return (
            <div className="orders-page container section">
                <div className="cart-empty">
                    <img src="https://rukminim1.flixcart.com/www/100/100/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" />
                    <h2>You have no orders</h2>
                    <Link to="/shop">
                        <Button style={{ marginTop: '20px' }}>Start Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page container section">
            <div className="orders-page-header">
                <h1>My Orders</h1>
                <Link to="/">
                    <Button style={{ padding: '8px 16px' }}>← Back to Home</Button>
                </Link>
            </div>
            <div className="orders-list">
                {orders.map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        cancelOrder={cancelOrder}
                        markDelivered={markOrderDelivered}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;
