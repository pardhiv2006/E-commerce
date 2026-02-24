import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { useShop } from '../context/ShopContext';
import { api } from '../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToCart } = useShop();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentImages, setCurrentImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Fetch product details from backend
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Ensure ID is passed correctly, whether string or integer based on backend expectation
                const fetchedProduct = await api.getProductById(id);
                setProduct(fetchedProduct);
            } catch (err) {
                console.error("Failed to fetch product details:", err);
                setError("Product not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    // Initialize/Sync selected options with URL query parameters
    useEffect(() => {
        if (!product || !product.options) return;

        const newOptions = {};
        let hasUrlUpdates = false;
        const updatedParams = new URLSearchParams(searchParams);

        Object.entries(product.options).forEach(([key, values]) => {
            const urlValue = searchParams.get(key);
            if (urlValue && values.includes(urlValue)) {
                newOptions[key] = urlValue;
            } else {
                // Default to first option if not in URL
                newOptions[key] = values[0];
                updatedParams.set(key, values[0]);
                hasUrlUpdates = true;
            }
        });

        // Only update state if options actually changed to avoid re-renders
        setSelectedOptions(prev => {
            const isSame = Object.keys(newOptions).every(k => prev[k] === newOptions[k]);
            return isSame ? prev : newOptions;
        });

        // If we set defaults that weren't in the URL, update the URL silently
        if (hasUrlUpdates) {
            setSearchParams(updatedParams, { replace: true });
        }
    }, [product, searchParams, setSearchParams]);

    // Update images when color changes or product loads
    useEffect(() => {
        if (product) {
            // If product has colorImages and a color is selected
            if (product.colorImages && selectedOptions.colors) {
                const colorKey = selectedOptions.colors;
                const images = product.colorImages[colorKey] || product.images || [product.image];
                setCurrentImages(images);
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

    if (loading) {
        return <div className="container section" style={{ textAlign: 'center', padding: '5rem' }}>Loading product details...</div>;
    }

    if (error || !product) {
        return <div className="container section" style={{ textAlign: 'center', padding: '5rem', color: 'red' }}>{error || 'Product not found.'}</div>;
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
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedOptions, currentPrice);
        navigate('/cart');
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    // Color Mapping for Premium Swatches
    const getColorValue = (colorName) => {
        const colorMap = {
            'Natural Titanium': '#bebebe',
            'Blue Titanium': '#464e56',
            'White Titanium': '#f2f2f2',
            'Black Titanium': '#2c2c2c',
            'Titanium Gray': '#8c8c8c',
            'Titanium Black': '#212121',
            'Titanium Violet': '#4b4b7c',
            'Titanium Yellow': '#f5e49e',
            'Obsidian': '#2b2b2b',
            'Porcelain': '#f0ede5',
            'Bay': '#7fbde1',
            'Flowy Emerald': '#50c878',
            'Silky Black': '#1a1a1a',
            'Silver': '#c0c0c0',
            'Black': '#000000',
            'Midnight Blue': '#191970',
            'Light Wash': '#add8e6',
            'Dark Wash': '#00008b'
        };
        return colorMap[colorName] || colorName.toLowerCase().replace(' ', '');
    };

    // Calculate dynamic CSS filter for specific products to simulate perfect color-variants
    const getImageStyle = () => {
        if (name === "Levi's Denim Jacket" && selectedOptions.colors) {
            if (selectedOptions.colors === 'Light Wash') {
                return { filter: 'brightness(1.5) saturate(0.6) hue-rotate(-10deg)' };
            }
            if (selectedOptions.colors === 'Black') {
                return { filter: 'grayscale(1) brightness(0.6) contrast(1.2)' };
            }
            // Dark Wash is the base image, no filter needed
        }
        return {};
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
                            style={getImageStyle()}
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
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
                                        style={getImageStyle()}
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PC9zdmc+';
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
                                        style={key === 'colors' ? { backgroundColor: getColorValue(value) } : {}}
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
