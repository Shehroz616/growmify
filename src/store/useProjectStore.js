import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api';

const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  isFetched: false,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects from API');
      }
      const data = await response.json();
      set({ projects: data, loading: false, isFetched: true });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProjectById: async (id) => {
    const localProject = get().projects.find((p) => p._id === id || p.id?.toString() === id);
    if (localProject && get().isFetched) {
      return localProject;
    }

    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      if (!response.ok) {
        throw new Error('Project not found');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`API error for project ${id}: `, err.message);
      return null;
    }
  },

  createProject: async (projectData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }

      set((state) => ({
        projects: [data, ...state.projects],
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateProject: async (id, projectData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
      }

      set((state) => ({
        projects: state.projects.map((p) => (p._id === id || p.id?.toString() === id ? data : p)),
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteProject: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
      }

      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id && p.id?.toString() !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));

export default useProjectStore;
