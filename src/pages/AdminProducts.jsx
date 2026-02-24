import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts = () => {
    const { refreshProducts } = useShop();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        description: '',
        stock: 'In Stock'
    });

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await api.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                image: product.image || '',
                description: product.description || '',
                stock: product.stock || 'In Stock'
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category: '',
                price: '',
                image: '', // Start strictly empty, so they must upload
                description: '',
                stock: 'In Stock'
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', file);

            // Assuming your backend runs on the same host or you construct the full URL
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formDataUpload
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            // Prefix with localhost if needed so admin panel sees it, but relative is better for Prod.
            // When proxying or running locally, pointing to http://localhost:5001/uploads/... works.
            const fullUrl = `http://localhost:5001${data.url}`;
            setFormData(prev => ({ ...prev, image: fullUrl }));
        } catch (error) {
            alert('Failed to upload image. Please try again.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            alert('Please select and upload a product image.');
            return;
        }

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingProduct) {
                await api.updateProduct(editingProduct._id || editingProduct.id, productData);
            } else {
                await api.addProduct(productData);
            }

            fetchProducts();
            refreshProducts();
            handleCloseModal();
        } catch (error) {
            alert('Error saving product: ' + error.message);
        }
    };

    const handleDelete = async (product) => {
        const id = product._id || product.id;
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.deleteProduct(id);
                fetchProducts();
                refreshProducts();
            } catch (error) {
                alert('Error deleting product');
            }
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
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '350px', outline: 'none' }}
                        />
                    </div>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: '#2874f0', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                >
                    <Plus size={20} /> Add Product
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
                        <tr key={product._id || product.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', backgroundColor: '#f8f8f8' }} />
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{product.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>ID: {product.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{product.category}</td>
                            <td style={{ fontWeight: '600' }}>${product.price?.toFixed(2)}</td>
                            <td>
                                <span style={{ color: '#40c057', fontWeight: '500' }}>{product.stock || 'In Stock'}</span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => handleOpenModal(product)}
                                        style={{ background: 'none', border: 'none', color: '#228be6', cursor: 'pointer', padding: '5px' }}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product)}
                                        style={{ background: 'none', border: 'none', color: '#fa5252', cursor: 'pointer', padding: '5px' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Product Image (Required, Strictly Isolated/White Background)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ flex: 1, padding: '8px' }}
                                    />
                                    {isUploading && <span style={{ color: '#2874f0', fontSize: '14px', fontWeight: 'bold' }}>Uploading...</span>}
                                </div>
                                {formData.image && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={formData.image} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #ddd', padding: '5px', backgroundColor: '#f8f8f8' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={isUploading || !formData.image}>
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
