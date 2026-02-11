import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { id, name, price, image, images } = product;
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
            <Link 
                to={`/product/${id}`} 
                className="product-image-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img 
                    src={currentImage} 
                    alt={name} 
                    className="product-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                    }}
                />
                {images && images.length > 1 && (
                    <div className="image-count-badge">{images.length} views</div>
                )}
            </Link>
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
