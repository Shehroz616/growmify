import { create } from 'zustand';

const useAppStore = create((set) => ({
  isLoaded: false,
  activeNav: 'Home',
  commandInput: '',

  setLoaded: () => set({ isLoaded: true }),
  setActiveNav: (nav) => set({ activeNav: nav }),
  setCommandInput: (val) => set({ commandInput: val }),
}));

export default useAppStore;
