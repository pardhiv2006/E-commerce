import { useState, useEffect } from 'react';


const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id?.toString().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-card">Loading products...</div>;

    return (
        <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Search products by name, ID or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #ddd', width: '350px' }}
                    />
                </div>
                <button style={{ padding: '10px 20px', borderRadius: '12px', background: '#2874f0', color: 'white', border: 'none', fontWeight: '600' }}>
                    + Add Product
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id || product._id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{product.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>ID: {product.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{product.category}</td>
                            <td style={{ fontWeight: '600' }}>${product.price?.toFixed(2)}</td>
                            <td>
                                <span style={{ color: '#40c057', fontWeight: '500' }}>In Stock</span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button style={{ background: 'none', border: 'none', color: '#228be6', cursor: 'pointer' }}>Edit</button>
                                    <button style={{ background: 'none', border: 'none', color: '#fa5252', cursor: 'pointer' }}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
