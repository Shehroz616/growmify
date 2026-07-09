import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useCareerStore = create((set, get) => ({
  roles: [],
  loading: false,
  error: null,
  isFetched: false,

  fetchCareers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/careers`);
      if (!response.ok) {
        throw new Error('Failed to fetch careers from API');
      }
      const data = await response.json();
      set({ roles: data, loading: false, isFetched: true });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCareerById: async (id) => {
    const localRole = get().roles.find((r) => r._id === id || r.id?.toString() === id);
    if (localRole && get().isFetched) {
      return localRole;
    }

    try {
      const response = await fetch(`${API_URL}/careers/${id}`);
      if (!response.ok) {
        throw new Error('Career position not found');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`API error for career ${id}:`, err.message);
      return null;
    }
  },

  createCareer: async (careerData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/careers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(careerData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create career position');
      }

      set((state) => ({
        roles: [data, ...state.roles],
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateCareer: async (id, careerData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/careers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(careerData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update career position');
      }

      set((state) => ({
        roles: state.roles.map((r) => (r._id === id || r.id?.toString() === id ? data : r)),
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteCareer: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/careers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete career position');
      }

      set((state) => ({
        roles: state.roles.filter((r) => r._id !== id && r.id?.toString() !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));

export default useCareerStore;
