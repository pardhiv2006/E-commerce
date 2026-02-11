const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = {
    // Products
    getAllProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products`);
        return response.json();
    },

    getProductById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return response.json();
    },

    getProductsByCategory: async (category) => {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        return response.json();
    },

    searchProducts: async (query) => {
        const response = await fetch(`${API_BASE_URL}/products/search/${query}`);
        return response.json();
    },

    // Orders
    createOrder: async (orderData, token) => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(orderData),
        });
        return response.json();
    },

    getAllOrders: async (token) => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            }
        });
        return response.json();
    },

    getOrderById: async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
        return response.json();
    },

    getOrdersByStatus: async (status) => {
        const response = await fetch(`${API_BASE_URL}/orders/status/${status}`);
        return response.json();
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        return response.json();
    },

    // Cancel order
    cancelOrder: async (orderId) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Cancelled' }),
        });
        return response.json();
    },

    // Mark order as delivered
    markOrderDelivered: async (orderId, token) => {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({ status: 'Delivered' }),
        });
        return response.json();
    },

    // Health check
    healthCheck: async () => {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    },
};
