import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useInquiryStore = create((set) => ({
  inquiries: [],
  loading: false,
  error: null,

  submitInquiry: async (inquiryData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit inquiry');
      }
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  fetchInquiries: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries from API');
      }
      const data = await response.json();
      set({ inquiries: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteInquiry: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete inquiry');
      }

      set((state) => ({
        inquiries: state.inquiries.filter((inq) => inq._id !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));

export default useInquiryStore;
