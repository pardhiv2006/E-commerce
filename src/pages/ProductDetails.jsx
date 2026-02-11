import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useShop();
    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentImages, setCurrentImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Initialize selected options
    useEffect(() => {
        if (product && product.options) {
            const initialOptions = {};
            Object.keys(product.options).forEach(key => {
                initialOptions[key] = product.options[key][0];
            });
            setSelectedOptions(initialOptions);
        }
    }, [product]);

    // Update images when color changes or product loads
    useEffect(() => {
        if (product) {
            // If product has colorImages and a color is selected
            if (product.colorImages && selectedOptions.colors) {
                const colorKey = selectedOptions.colors;
                setCurrentImages(product.colorImages[colorKey] || product.images || [product.image]);
            }
            // If product has images array but no color-specific images
            else if (product.images) {
                setCurrentImages(product.images);
            }
            // Fallback to single image
            else {
                setCurrentImages([product.image]);
            }
            // Reset to first image when images change
            setSelectedImageIndex(0);
        }
    }, [product, selectedOptions.colors]);

    if (!product) {
        return <div className="container section">Product not found.</div>;
    }

    const { name, price, image, description, category, options, variantPricing } = product;

    // Calculate price based on selected variants
    const calculateVariantPrice = () => {
        let finalPrice = price;
        if (variantPricing && selectedOptions) {
            Object.entries(selectedOptions).forEach(([key, value]) => {
                if (variantPricing[key] && variantPricing[key][value] !== undefined) {
                    finalPrice += variantPricing[key][value];
                }
            });
        }
        return finalPrice;
    };

    const currentPrice = calculateVariantPrice();

    // Mocked data for Flipkart style
    const rating = (product.id % 2 === 0 ? 4.2 : 4.5);
    const reviews = (product.id * 123) % 1000 + 50;
    const discount = (product.id * 7 % 30 + 10);
    const originalPrice = currentPrice / (1 - discount / 100);

    const handleOptionSelect = (key, value) => {
        setSelectedOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleAddToCart = () => {
        // Pass the current price with the product
        const productWithPrice = { ...product, price: currentPrice };
        addToCart(productWithPrice, quantity, selectedOptions);
        navigate('/cart');
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    return (
        <div className="product-details-page container section">
            <button className="back-btn" onClick={() => navigate('/shop')}>
                <span>←</span> Back to Shopping
            </button>
            <div className="details-grid">
                <div className="product-image-gallery">
                    <div className="main-image-container">
                        <img
                            src={currentImages[selectedImageIndex] || image}
                            alt={`${name} - View ${selectedImageIndex + 1}`}
                            className="main-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                            }}
                        />
                        {currentImages.length > 1 && (
                            <>
                                <button className="nav-arrow prev-arrow" onClick={handlePrevImage} title="Previous image">
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="nav-arrow next-arrow" onClick={handleNextImage} title="Next image">
                                    <ChevronRight size={24} />
                                </button>
                                <div className="image-counter">
                                    {selectedImageIndex + 1} / {currentImages.length}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Image Indicators */}
                    {currentImages.length > 1 && (
                        <div className="image-indicators">
                            {currentImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`indicator ${selectedImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Thumbnail Gallery */}
                    {currentImages.length > 1 && (
                        <div className="image-thumbnails">
                            {currentImages.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`${name} - Thumbnail ${index + 1}`}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150x150?text=Img';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="product-info-col">
                    <h1 className="details-title">{name}</h1>

                    <div className="details-rating-row">
                        <div className="rating-badge">
                            <span>{rating}</span>
                            <Star size={14} fill="white" />
                        </div>
                        <span className="review-count">{reviews} Ratings & {Math.floor(reviews / 5)} Reviews</span>
                    </div>

                    <div className="details-price-row">
                        <span className="details-price">${currentPrice.toFixed(2)}</span>
                        <span className="original-price">${originalPrice.toFixed(0)}</span>
                        <span className="discount-percent">{discount}% off</span>
                    </div>

                    <div className="details-description">
                        <p>{description}</p>
                    </div>

                    {options && Object.entries(options).map(([key, values]) => (
                        <div key={key} className="variant-section">
                            <div className="label">{key.charAt(0).toUpperCase() + key.slice(1)}:</div>
                            <div className="variant-options">
                                {values.map(value => (
                                    <button
                                        key={value}
                                        className={`variant-btn ${selectedOptions[key] === value ? 'active' : ''} ${key === 'colors' ? 'color-swatch' : ''}`}
                                        style={key === 'colors' ? { backgroundColor: value.toLowerCase().replace(' ', '') } : {}}
                                        onClick={() => handleOptionSelect(key, value)}
                                        title={value}
                                    >
                                        {key !== 'colors' && value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="label">Quantity:</div>
                    <div className="quantity-selector">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <div className="details-actions">
                        <Button className="add-to-cart-btn" onClick={handleAddToCart}>
                            <ShoppingCart size={20} /> ADD TO CART
                        </Button>
                        <button className="buy-now-btn" onClick={handleAddToCart}>
                            <Zap size={20} fill="white" /> BUY NOW
                        </button>
                    </div>

                    <div className="meta-info">
                        <p>Category: {category}</p>
                        <p>Seller: First Mart Official</p>
                        <p>7 Days Replacement Policy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
