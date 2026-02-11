import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    const baseClass = variant === 'outline' ? 'btn-outline' : 'btn-primary';
    return (
        <button className={`${baseClass} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
