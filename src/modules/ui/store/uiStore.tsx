import { create } from 'zustand';

interface State {
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;

    isFilterSideMenuOpen: boolean;
    openFilterSideMenu: () => void;
    closeFilterSideMenu: () => void;
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  isFilterSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  openFilterSideMenu: () => set({ isFilterSideMenuOpen: true }),
  closeFilterSideMenu: () => set({ isFilterSideMenuOpen: false }),
}));