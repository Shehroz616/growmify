import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('growmify_admin_token') || null,
  loading: false,
  error: null,
  isInitialized: false,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('growmify_admin_token', data.token);
      set({ user: { username: data.username }, token: data.token, loading: false });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('growmify_admin_token');
    set({ user: null, token: null, error: null });
  },

  verifyToken: async () => {
    const { token } = get();
    if (!token) {
      set({ isInitialized: true });
      return;
    }

    set({ loading: true });
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      set({ user: { username: data.username }, loading: false, isInitialized: true });
    } catch (error) {
      console.error('Auth verification failed, logging out:', error.message);
      // Clear invalid token
      localStorage.removeItem('growmify_admin_token');
      set({ user: null, token: null, loading: false, isInitialized: true });
    }
  },
}));

export default useAuthStore;
