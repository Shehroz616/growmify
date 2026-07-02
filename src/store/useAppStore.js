import { create } from 'zustand';

const useAppStore = create((set) => ({
  isLoaded: false,
  commandInput: '',

  setLoaded: () => set({ isLoaded: true }),
  setCommandInput: (val) => set({ commandInput: val }),
}));

export default useAppStore;
