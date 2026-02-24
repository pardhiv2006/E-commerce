import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { api } from '../services/api';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Any status');

    useEffect(() => {
        fetchOrders();

        // Add polling for auto-refresh
        const interval = setInterval(fetchOrders, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await api.getAllOrders(token);
            // Add mock customer names if missing for UI demo
            const enrichedData = (data || []).map(order => ({
                ...order,
                customerName: order.customerName || 'Guest Customer'
            }));
            setOrders(enrichedData);

            // Update selected order details if it's currently open
            if (selectedOrder) {
                const updatedSelectedOrder = enrichedData.find(o => o.id === selectedOrder.id);
                if (updatedSelectedOrder) setSelectedOrder(updatedSelectedOrder);
            } else if (enrichedData.length > 0) {
                setSelectedOrder(enrichedData[0]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.updateOrderStatus(orderId, newStatus);
            fetchOrders(); // Refresh data
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const filteredOrders = orders.filter(order =>
        statusFilter === 'Any status' || order.status?.toLowerCase() === statusFilter.toLowerCase()
    );

    // Calculate Live Category-wise Stats (Live tracking)
    const categoryStats = filteredOrders.reduce((acc, order) => {
        (order.items || []).forEach(item => {
            const cat = item.category || 'Other';
            if (!acc[cat]) {
                acc[cat] = { revenue: 0, pending: 0, completed: 0, totalOrders: 0 };
            }
            acc[cat].revenue += (item.price || 0);

            if (order.status === 'Pending' || order.status === 'Processing') {
                acc[cat].pending += 1;
            } else if (order.status === 'Delivered') {
                acc[cat].completed += 1;
            }
        });
        return acc;
    }, {});


    if (loading) return <div className="admin-card">Loading orders...</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div className="admin-main-col">
                {/* Live Category Tracking Section */}
                {/* Advanced Analytics Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="admin-card">
                        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Orders Velocity</span>
                            <span style={{ color: '#10b981', fontSize: '0.8rem' }}>+12% today</span>
                        </h3>
                        <div style={{ height: '150px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '10px 0' }}>
                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, #2874f0, #054bb4)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#64748b' }}>{h}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>

                    <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h3 style={{ margin: '0 0 1rem 0', alignSelf: 'flex-start' }}>Target Achievement</h3>
                        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                            <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#eef2f6" strokeWidth="3" />
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#2874f0" strokeWidth="3" strokeDasharray="40, 100" />
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>40%</div>
                                <div style={{ fontSize: '0.6rem', color: '#64748b' }}>of Goal</div>
                            </div>
                        </div>
                        <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Monthly Sales Progress</p>
                    </div>
                </div>

                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', color: '#1a1c1e' }}>Live Category Tracking</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {Object.entries(categoryStats).map(([cat, stats]) => (
                            <div key={cat} className="category-live-card" style={{
                                padding: '15px',
                                borderRadius: '12px',
                                border: '1px solid #eef2f6',
                                background: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#64748b' }}>{cat}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: '#666' }}>Revenue</span>
                                        <span style={{ fontWeight: '600' }}>${stats.revenue.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: '#666' }}>Pending</span>
                                        <span style={{ color: '#f59e0b', fontWeight: '600' }}>{stats.pending}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <span style={{ color: '#666' }}>Completed</span>
                                        <span style={{ color: '#10b981', fontWeight: '600' }}>{stats.completed}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Registered Customers Log Section */}
                <div className="admin-card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Recent Active Shoppers</h3>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead style={{ position: 'sticky', top: 0, background: 'white', borderBottom: '2px solid #f1f5f9' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '10px' }}>User</th>
                                    <th style={{ padding: '10px' }}>Email</th>
                                    <th style={{ padding: '10px' }}>Last Activity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 10).map((order, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '10px', fontWeight: '500' }}>{order.customerName}</td>
                                        <td style={{ padding: '10px', color: '#64748b' }}>{order.customerEmail || 'N/A'}</td>
                                        <td style={{ padding: '10px', fontSize: '0.8rem' }}>{order.date}</td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No recent customer activity logged</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="admin-card">
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <select
                            className="admin-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        >
                            <option>Any status</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                        <select className="admin-select" style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                            <option>$100 - $1500</option>
                        </select>
                        <div style={{ marginLeft: 'auto' }}>
                            <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>Sort by Date</span>
                        </div>
                    </div>

                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} onClick={() => setSelectedOrder(order)} style={{ cursor: 'pointer' }}>
                                    <td style={{ fontWeight: '600' }}>{order.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                <User size={16} />
                                            </div>
                                            {order.customerName}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${(order.status || 'pending').toLowerCase().split(' ')[0]}`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '600' }}>${order.total?.toFixed(2)}</td>
                                    <td style={{ color: '#6c757d' }}>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <div className="admin-card" style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Order {selectedOrder.id}</h3>
                            <select
                                value={selectedOrder.status || 'Pending'}
                                onChange={(e) => handleStatusUpdate(selectedOrder._id || selectedOrder.id, e.target.value)}
                                style={{
                                    marginTop: '8px',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    border: '1px solid #ddd',
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}
                            >
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                            <p style={{ fontSize: '0.8rem', color: '#6c757d', margin: '4px 0' }}>{selectedOrder.date}, 14:32</p>
                        </div>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto', color: '#64748b' }}>
                            <User size={40} />
                        </div>
                        <h4 style={{ margin: 0 }}>{selectedOrder.customerName}</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white' }}>✉</button>
                            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white' }}>📞</button>
                            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white' }}>💬</button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                        <h5 style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>Order items</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {selectedOrder.items?.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                                    <img src={item.image} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>${item.price?.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <span style={{ color: '#6c757d' }}>Total</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>${selectedOrder.total?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button style={{ padding: '12px', borderRadius: '12px', border: 'none', background: '#1a1c1e', color: 'white', fontWeight: '600' }}>Track</button>
                            <button style={{ padding: '12px', borderRadius: '12px', border: 'none', background: '#ffc107', color: '#1a1c1e', fontWeight: '600' }}>Refund</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
