import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import { useShop } from '../context/ShopContext';
import './Shop.css';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { products, categories, searchQuery, isLoading } = useShop();

    // Get filter values from URL
    const activeCategory = searchParams.get('category') || 'All';
    const activeColor = searchParams.get('color') || 'All';
    const activeSize = searchParams.get('size') || 'All';
    const minPrice = parseInt(searchParams.get('minPrice')) || 0;
    const maxPrice = parseInt(searchParams.get('maxPrice')) || 10000;
    const sortBy = searchParams.get('sort') || 'popularity-desc';

    // Available variants (derived from data or fixed for demo)
    const availableColors = ['All', 'Black', 'White', 'Blue', 'Silver', 'Gold', 'Red', 'Navy'];
    const availableSizes = ['All', 'S', 'M', 'L', 'XL', 'UK 7', 'UK 8', 'UK 9', 'UK 10'];

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value === 'All' || value === '') {
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);
    };

    const handlePriceChange = (type, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(type, value);
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams({ category: 'All' });
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesColor = activeColor === 'All' ||
            (p.options?.colors && p.options.colors.some(c => c.toLowerCase().includes(activeColor.toLowerCase())));

        const matchesSize = activeSize === 'All' ||
            (p.options?.sizes && p.options.sizes.includes(activeSize));

        const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

        return matchesCategory && matchesSearch && matchesColor && matchesSize && matchesPrice;
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

    if (isLoading && products.length === 0) {
        return <div className="shop-page container section" style={{ textAlign: 'center', padding: '5rem' }}>Loading products...</div>;
    }

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
                    onChange={(e) => updateFilter('sort', e.target.value)}
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
                    <div className="filter-group-header">
                        <h3>Filters</h3>
                        <button className="clear-btn" onClick={clearFilters}>Clear All</button>
                    </div>

                    <div className="filter-section">
                        <h4>Categories</h4>
                        <ul className="category-list">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={activeCategory === cat ? 'active' : ''}
                                        onClick={() => updateFilter('category', cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-section">
                        <h4>Price Range</h4>
                        <div className="price-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice === 0 ? '' : minPrice}
                                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice === 10000 ? '' : maxPrice}
                                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Color</h4>
                        <div className="color-filters">
                            {availableColors.map(color => (
                                <button
                                    key={color}
                                    className={`color-btn ${activeColor === color ? 'active' : ''}`}
                                    onClick={() => updateFilter('color', color)}
                                    style={color !== 'All' ? { backgroundColor: color.toLowerCase() } : {}}
                                    title={color}
                                >
                                    {color === 'All' && 'All'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Size</h4>
                        <div className="size-filters">
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${activeSize === size ? 'active' : ''}`}
                                    onClick={() => updateFilter('size', size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
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
