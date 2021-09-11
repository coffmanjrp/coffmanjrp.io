import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type MobileMenuState = {
  showMenu: boolean;
};

const initialState: MobileMenuState = {
  showMenu: false,
};

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
  },
});

export const { toggleMenu } = mobileMenuSlice.actions;

export const selectShowMenu = (state: RootState) => state.mobileMenu.showMenu;

export default mobileMenuSlice.reducer;
