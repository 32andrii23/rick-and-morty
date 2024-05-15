'use client';

import { create } from 'zustand';

interface PagesState {
  numberOfPages: number;
  setNumberOfPages: (pages: number) => void;
}

const usePagesStore = create<PagesState>((set) => ({
  numberOfPages: 42,
  setNumberOfPages: (pages) => set({ numberOfPages: pages }),
}));

export default usePagesStore;
