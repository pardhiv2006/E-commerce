import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart_v3');
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders_v3');
        return saved ? JSON.parse(saved) : [];
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backendAvailable, setBackendAvailable] = useState(true);

    // Check if backend is available on mount
    useEffect(() => {
        const checkBackend = async () => {
            try {
                await api.healthCheck();
                setBackendAvailable(true);
            } catch (err) {
                console.warn('Backend not available, using localStorage');
                setBackendAvailable(false);
            }
        };
        checkBackend();
    }, []);

    // Sync orders when token changes
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && backendAvailable) {
            syncOrdersFromBackend(token);
        } else if (!token) {
            setOrders([]); // Clear orders on logout
        }
    }, [backendAvailable]);

    // Sync local storage
    useEffect(() => {
        localStorage.setItem('cart_v3', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('orders_v3', JSON.stringify(orders));
    }, [orders]);

    // Sync orders from backend
    const syncOrdersFromBackend = async (token) => {
        if (!token) token = localStorage.getItem('token');
        if (!token) return;

        try {
            const backendOrders = await api.getAllOrders(token);
            if (Array.isArray(backendOrders)) {
                // Format backend orders to match frontend format
                const formattedOrders = backendOrders.map(order => ({
                    id: order.id || order._id,
                    date: order.date,
                    expectedDelivery: order.expectedDelivery,
                    total: order.total,
                    subtotal: order.subtotal,
                    discount: order.discount,
                    items: order.items,
                    status: order.status,
                    discountApplied: order.discountApplied,
                    timestamp: order.timestamp || new Date(order.createdAt).getTime()
                }));
                setOrders(formattedOrders);
            }
        } catch (err) {
            console.warn('Failed to sync orders from backend:', err);
        }
    };

    const addToCart = (product, quantity = 1, selectedOptions = null) => {
        setCart(prevCart => {
            const existing = prevCart.find(item =>
                item.id === product.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );
            if (existing) {
                return prevCart.map(item =>
                    (item.id === product.id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity, selectedOptions }];
        });
    };

    const removeFromCart = (productId, selectedOptions = null) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
        ));
    };

    const updateQuantity = (productId, delta, selectedOptions = null) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const checkout = async (totalAmount, discount = 0) => {
        setIsLoading(true);
        setError(null);

        try {
            // Generate Random Delivery Date (3-7 days from now)
            const daysToAdd = Math.floor(Math.random() * 5) + 3;
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);

            const orderData = {
                items: [...cart],
                total: totalAmount,
                subtotal: totalAmount + discount,
                discount: discount,
                discountApplied: discount > 0,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                expectedDelivery: deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                status: 'Ready for Delivery'
            };

            let newOrder = null;

            // Try to save to backend if available
            if (backendAvailable) {
                try {
                    const token = localStorage.getItem('token');
                    const backendResponse = await api.createOrder(orderData, token);
                    newOrder = {
                        id: backendResponse.id,
                        date: backendResponse.date,
                        expectedDelivery: backendResponse.expectedDelivery,
                        total: backendResponse.total,
                        subtotal: backendResponse.subtotal,
                        discount: backendResponse.discount,
                        items: backendResponse.items,
                        status: backendResponse.status,
                        discountApplied: backendResponse.discountApplied,
                        timestamp: Date.now()
                    };
                } catch (err) {
                    console.warn('Failed to save to backend, using local storage:', err);
                    setBackendAvailable(false);
                }
            }

            // Fallback to local order creation if backend is not available
            if (!newOrder) {
                newOrder = {
                    id: `#ORD-${Math.floor(Math.random() * 89999) + 10000}`,
                    date: orderData.date,
                    expectedDelivery: orderData.expectedDelivery,
                    total: totalAmount,
                    subtotal: totalAmount + discount,
                    discount: discount,
                    items: [...cart],
                    status: 'Ready for Delivery',
                    discountApplied: discount > 0,
                    timestamp: Date.now()
                };
            }

            setOrders([newOrder, ...orders]);
            setCart([]);
            return newOrder.id;
        } catch (err) {
            setError(err.message);
            console.error('Checkout error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        setIsLoading(true);
        setError(null);

        try {
            // Try to update on backend if available
            if (backendAvailable) {
                try {
                    const token = localStorage.getItem('token');
                    await api.cancelOrder(orderId, token);
                } catch (err) {
                    console.warn('Failed to cancel order on backend:', err);
                }
            }

            // Update local state
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId
                    ? { ...order, status: 'Cancelled' }
                    : order
            ));
        } catch (err) {
            setError(err.message);
            console.error('Cancel order error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const markOrderDelivered = async (orderId) => {
        setIsLoading(true);
        setError(null);

        try {
            // Try to update on backend if available
            if (backendAvailable) {
                try {
                    const token = localStorage.getItem('token');
                    await api.markOrderDelivered(orderId, token);
                } catch (err) {
                    console.warn('Failed to mark order as delivered on backend:', err);
                }
            }

            // Update local state
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId
                    ? { ...order, status: 'Delivered' }
                    : order
            ));
        } catch (err) {
            setError(err.message);
            console.error('Mark delivered error:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <ShopContext.Provider value={{
            cart,
            orders,
            addToCart,
            removeFromCart,
            updateQuantity,
            checkout,
            cancelOrder,
            markOrderDelivered,
            cartCount,
            searchQuery,
            setSearchQuery,
            isLoading,
            error,
            backendAvailable,
            syncOrdersFromBackend
        }}>
            {children}
        </ShopContext.Provider>
    );
};
