import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart as CartIcon } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { id, name, price, image, images } = product;
    const { addToCart } = useShop();
    const [imageIndex, setImageIndex] = useState(0);

    // Mocked data for Flipkart style
    const rating = (id % 2 === 0 ? 4.2 : 4.5);
    const reviews = (id * 123) % 1000 + 50;
    const discount = (id * 7 % 30 + 10);
    const originalPrice = price / (1 - discount / 100);

    const handleMouseEnter = () => {
        if (images && images.length > 1) {
            setImageIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setImageIndex(0);
    };

    const currentImage = images && images.length > 0 ? images[imageIndex] : image;

    return (
        <div className="product-card">
            <div
                className="product-image-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Link to={`/product/${id}`}>
                    <img
                        src={currentImage}
                        alt={name}
                        className="product-image"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                        }}
                    />
                </Link>
                <div className="product-actions-overlay">
                    <button className="action-btn" onClick={() => addToCart(product, 1)} title="Add to Cart">
                        <CartIcon size={18} />
                    </button>
                    <Link to={`/product/${id}`} className="action-btn" title="View Details">
                        <Eye size={18} />
                    </Link>
                </div>
                {images && images.length > 1 && (
                    <div className="image-count-badge">{images.length} views</div>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-name">
                    <Link to={`/product/${id}`}>{name}</Link>
                </h3>
                <div className="product-rating-row">
                    <div className="rating-badge">
                        <span>{rating}</span>
                        <Star size={12} fill="white" />
                    </div>
                    <span className="review-count">({reviews})</span>
                </div>
                <div className="product-price-row">
                    <span className="product-price">${price.toFixed(2)}</span>
                    <span className="original-price">${originalPrice.toFixed(0)}</span>
                    <span className="discount-percent">{discount}% off</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
