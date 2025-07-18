
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import languageSlice from './slices/languageSlice';
import itemsSlice from './slices/itemsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    language: languageSlice,
    items: itemsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
