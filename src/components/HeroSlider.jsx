import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const sliderData = [
    {
        id: 1,
        title: "Summer Sale is Live!",
        description: "Get up to 50% off on all fashion items.",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=2000", // Using the isolated denim jacket
        btnText: "Shop Now",
        link: "/shop?category=Fashion",
        highlightTitle: true // Flag to apply special color
    },
    {
        id: 2,
        title: "New iPhone 15 Pro",
        description: "Titanium design, A17 Pro chip. The ultimate iPhone.",
        image: "/images/iphone_natural_titanium_clean_1771847498961.png", // Isolated iPhone image
        btnText: "Learn More",
        link: "/product/1"
    },
    {
        id: 3,
        title: "Ultimate Sound",
        description: "Experience the Sony WH-1000XM5. Industry-leading noise cancellation.",
        image: "/images/sony_silver_clean_1771847590469.png", // Isolated Sony headphones
        btnText: "Buy Now",
        link: "/product/14"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev === sliderData.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? sliderData.length - 1 : current - 1);
    };

    return (
        <div className="hero-slider-main">
            <button className="slider-arrow prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>
            <button className="slider-arrow next" onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>

            <div className="slider-container" style={{ transform: `translateX(-${current * 100}%)` }}>
                {sliderData.map((slide) => (
                    <div key={slide.id} className="slide">
                        <img src={slide.image} alt={slide.title} className="slide-image" />
                        <div className="slide-content">
                            <h2 className={slide.highlightTitle ? 'highlight-title' : ''}>{slide.title}</h2>
                            <p className={slide.highlightTitle ? 'highlight-text' : ''}>{slide.description}</p>
                            <a href={slide.link} className="slide-btn">{slide.btnText}</a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-dots">
                {sliderData.map((_, idx) => (
                    <div
                        key={idx}
                        className={`dot ${current === idx ? 'active' : ''}`}
                        onClick={() => setCurrent(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
