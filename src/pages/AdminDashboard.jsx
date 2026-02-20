import { useState, useEffect } from 'react';
import { User } from 'lucide-react';


const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Any status');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/orders');
            const data = await response.json();
            // Add mock customer names if missing for UI demo
            const enrichedData = data.map(order => ({
                ...order,
                customerName: order.customerName || 'Guest Customer'
            }));
            setOrders(enrichedData);
            if (enrichedData.length > 0) setSelectedOrder(enrichedData[0]);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order =>
        statusFilter === 'Any status' || order.status?.toLowerCase() === statusFilter.toLowerCase()
    );

    if (loading) return <div className="admin-card">Loading orders...</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div className="admin-card">
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <select
                        className="admin-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    >
                        <option>Any status</option>
                        <option>Paid</option>
                        <option>Delivered</option>
                        <option>Completed</option>
                        <option>Pending</option>
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
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#64748b' }}>
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

            {selectedOrder && (
                <div className="admin-card" style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Order {selectedOrder.id}</h3>
                            <span className="status-badge status-paid" style={{ marginTop: '8px', display: 'inline-block' }}>Paid</span>
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
