import { create } from 'zustand';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  isFetched: false,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/blogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs from API');
      }
      const data = await response.json();
      set({ blogs: data, loading: false, isFetched: true });
    } catch (err) {
      console.warn('API error fetching blogs: ', err.message);
      set({ error: err.message, loading: false });
    }
  },

  fetchBlogById: async (id) => {
    // If id is a standard MongoDB ObjectId or custom id, we look for it
    // First check if it exists in local state
    const localBlog = get().blogs.find((b) => b._id === id || b.id?.toString() === id);
    if (localBlog && get().isFetched) {
      return localBlog;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`API error for blog ${id}: `, err.message);
    }
  },

  createBlog: async (blogData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog');
      }

      // Update state with new blog at the top
      set((state) => ({
        blogs: [data, ...state.blogs],
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateBlog: async (id, blogData, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update blog');
      }

      set((state) => ({
        blogs: state.blogs.map((b) => (b._id === id || b.id?.toString() === id ? data : b)),
        loading: false,
      }));
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteBlog: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete blog');
      }

      set((state) => ({
        blogs: state.blogs.filter((b) => b._id !== id && b.id?.toString() !== id),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  uploadImage: async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
      }

      return data.url; // Returns the public file path
    } catch (err) {
      console.error('Image upload error:', err.message);
      throw err;
    }
  },
}));

export default useBlogStore;
