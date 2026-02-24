import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';

const AdminCategories = () => {
    const { refreshProducts } = useShop();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const products = await api.getAllProducts();
            const uniqueCategories = [...new Set(products.map(p => p.category))];

            const categoryList = uniqueCategories.map((name, index) => ({
                id: index + 1,
                name: name,
                productCount: products.filter(p => p.category === name).length,
                status: 'Active'
            }));

            setCategories(categoryList);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName) return;

        try {
            await api.addProduct({
                name: `Initial Product for ${newCategoryName}`,
                category: newCategoryName,
                price: 0,
                image: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
                description: `Placeholder for ${newCategoryName} category`,
                stock: 'Out of Stock'
            });
            fetchCategories();
            refreshProducts();
            setIsModalOpen(false);
            setNewCategoryName('');
        } catch (error) {
            alert('Error adding category');
        }
    };

    const handleDeleteCategory = async (categoryName) => {
        if (!window.confirm(`Are you sure you want to delete the category "${categoryName}"? All products in this category will be deleted.`)) return;

        try {
            await api.deleteCategory(categoryName);
            fetchCategories();
            refreshProducts();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error deleting category');
        }
    };

    const handleOpenEditModal = (category) => {
        setEditingCategory(category);
        setEditCategoryName(category.name);
        setIsEditModalOpen(true);
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        if (!editCategoryName || !editingCategory) return;

        try {
            await api.updateCategory(editingCategory.name, editCategoryName);
            fetchCategories();
            refreshProducts();
            setIsEditModalOpen(false);
            setEditingCategory(null);
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category');
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-card">Loading categories...</div>;

    return (
        <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', width: '350px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                    />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#2874f0', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', border: 'none' }}
                >
                    <Plus size={20} /> Add Category
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id}>
                            <td style={{ fontWeight: '600', color: '#1e293b' }}>{category.name}</td>
                            <td>{category.productCount} Products</td>
                            <td>
                                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '500' }}>
                                    {category.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => handleOpenEditModal(category)}
                                        style={{ color: '#2563eb', padding: '8px', borderRadius: '8px', background: '#eff6ff', border: 'none', cursor: 'pointer' }}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category.name)}
                                        style={{ color: '#dc2626', padding: '8px', borderRadius: '8px', background: '#fef2f2', border: 'none', cursor: 'pointer' }}
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
                            <h2>Add New Category</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Add Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Category</h2>
                            <button onClick={() => setIsEditModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleEditCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
