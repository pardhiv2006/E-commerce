import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data';
import { Smartphone, Watch, Headphones, ShoppingBag, Coffee, Home as HomeIcon, Zap, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    // Correct Flipkart-style Category Images (Extracted directly from Flipkart)
    const categoryImages = {
        'Mobiles': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/5f2ee7f883cdb774.png?q=100',
        'Electronics': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/af646c36d74c4be9.png?q=100',
        'Fashion': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/ff559cb9d803d424.png?q=100',
        'Footwear': 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/i/l/10-rng-eva-740-wht-blk-10-bruton-white-black-original-imahjn6cmwhphfaw.jpeg?q=70',
        'Grocery': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e730a834ad950bae.png?q=100',
        'Appliances': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e90944802d996756.jpg?q=100',
        'Home Decor': 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/1788f177649e6991.png?q=100',
        'Beauty & Toys': 'https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' // Using rukminim2 pattern
    };


    const getProductsByCategory = (cat) => products.filter(p => p.category === cat);

    return (
        <div className="home-page">
            {/* 1. Flipkart-style Category Bar */}
            <div className="category-nav-container">
                <div className="container category-nav">
                    {categories.filter(c => c !== 'All').map(cat => (
                        <div key={cat} className="category-item" onClick={() => navigate(`/shop?category=${encodeURIComponent(cat)}`)}>
                            <div className="cat-icon-circle">
                                <img src={categoryImages[cat] || categoryImages['Electronics']} alt={cat} />
                            </div>
                            <span>{cat}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container home-content">
                {/* Hero Banner */}
                <div className="hero-slider">
                    <div className="hero-slide">
                        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" alt="Sale Banner" />
                    </div>
                </div>

                {/* 3. Horizontal Deal Sections */}
                <section className="deal-section">
                    <div className="section-header">
                        <h2>Top Mobile Picks</h2>
                        <Link to="/shop?category=Mobiles" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Mobiles').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Best of Electronics</h2>
                        <Link to="/shop?category=Electronics" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Electronics').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Home & Kitchen Appliances</h2>
                        <Link to="/shop?category=Appliances" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Appliances').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Fashion Top Picks</h2>
                        <Link to="/shop?category=Fashion" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Fashion').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Daily Essentials</h2>
                        <Link to="/shop?category=Grocery" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Grocery').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Beauty, Toys & More</h2>
                        <Link to="/shop?category=Beauty & Toys" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Beauty & Toys').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="deal-section">
                    <div className="section-header">
                        <h2>Home Decor</h2>
                        <Link to="/shop?category=Home Decor" className="view-all-link">
                            VIEW ALL <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="horizontal-scroll-row">
                        {getProductsByCategory('Home Decor').map(product => (
                            <div key={product.id} className="scroll-card-wrapper">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </section>
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
