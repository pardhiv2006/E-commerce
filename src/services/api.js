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

    // Auth
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        return data;
    },

    signup: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }
        return data;
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
