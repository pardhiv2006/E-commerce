import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data';
import { useShop } from '../context/ShopContext';
import './Shop.css';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { searchQuery } = useShop();
    const initialCategory = searchParams.get('category') || 'All';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState('popularity-desc');

    // Update state if URL changes (e.g. back button)
    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setActiveCategory(cat);
    }, [searchParams]);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort products based on selected option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Calculate rating and popularity for sorting (mocked data)
        const getRating = (product) => (product.id % 2 === 0 ? 4.2 : 4.5);
        const getPopularity = (product) => (product.id * 123) % 1000 + 50;

        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating-asc':
                return getRating(a) - getRating(b);
            case 'rating-desc':
                return getRating(b) - getRating(a);
            case 'popularity-asc':
                return getPopularity(a) - getPopularity(b);
            case 'popularity-desc':
                return getPopularity(b) - getPopularity(a);
            default:
                return 0;
        }
    });

    return (
        <div className="shop-page container section">
            <button className="back-home-btn" onClick={() => navigate('/')}>
                <span>←</span> Back to Home
            </button>
            <div className="shop-header">
                <h1>{activeCategory} Products</h1>
                <p>Explore our wide range of collections</p>
            </div>

            <div className="sort-controls">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-dropdown"
                >
                    <option value="popularity-desc">Popularity: High to Low</option>
                    <option value="popularity-asc">Popularity: Low to High</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                </select>
                <span className="product-count">{sortedProducts.length} Products</span>
            </div>

            <div className="shop-layout">
                <aside className="filters">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    className={activeCategory === cat ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="product-grid">
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
