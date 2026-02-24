import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { useShop } from '../context/ShopContext';
import { ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const { products, categories, isLoading } = useShop();

    // Correct Flipkart-style Category Images (Extracted directly from Flipkart)
    const categoryImages = {
        'Mobiles': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/5f2ee7f883cdb774.png?q=100',
        'Electronics': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/af646c36d74c4be9.png?q=100',
        'Fashion': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/ff559cb9d803d424.png?q=100',
        'Footwear': 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/i/l/10-rng-eva-740-wht-blk-10-bruton-white-black-original-imahjn6cmwhphfaw.jpeg?q=70',
        'Grocery': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e730a834ad950bae.png?q=100',
        'Appliances': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e90944802d996756.jpg?q=100',
        'Home Decor': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/1788f177649e6991.png?q=100',
        'Beauty & Toys': 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100'
    };

    const getProductsByCategory = (cat) => {
        const catProducts = products.filter(p => p.category === cat);
        // Prioritize products with actual images and limit to a premium selection
        const withImages = catProducts.filter(p => p.image && !p.image.includes('placeholder') && !p.image.includes('data:image'));
        return withImages.length >= 4 ? withImages.slice(0, 6) : catProducts.slice(0, 6);
    };

    if (isLoading && products.length === 0) {
        return <div className="home-page container section" style={{ textAlign: 'center', padding: '5rem' }}>Loading latest products...</div>;
    }

    return (
        <div className="home-page">
            {/* 1. Flipkart-style Category Bar */}
            <div className="category-nav-container">
                <div className="container category-nav">
                    {categories.filter(c => c !== 'All').map(cat => (
                        <div key={cat} className="category-item" onClick={() => navigate(`/shop?category=${encodeURIComponent(cat)}`)}>
                            <div className="cat-icon-circle">
                                <img src={categoryImages[cat] || 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/af646c36d74c4be9.png?q=100'} alt={cat} />
                            </div>
                            <span>{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container home-content">
                {/* Hero Banner Slider */}
                <HeroSlider />

                {/* Dynamic sections for each category */}
                {categories.filter(c => c !== 'All').map(cat => {
                    const catProducts = getProductsByCategory(cat);
                    if (catProducts.length === 0) return null;

                    return (
                        <section key={cat} className="deal-section">
                            <div className="section-header">
                                <h2>{cat} Picks</h2>
                                <Link to={`/shop?category=${encodeURIComponent(cat)}`} className="view-all-link">
                                    VIEW ALL <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div className="horizontal-scroll-row">
                                {catProducts.slice(0, 10).map(product => (
                                    <div key={product.id} className="scroll-card-wrapper">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Trust Banner */}
            <section className="trust-banner">
                <div className="container">
                    <p>Verified Quality • Secure Payment • Fast Delivery • 24/7 Support</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
