import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mobileMenuReducer from '@/features/MobleMenu/mobileMenuSlice';

export const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
