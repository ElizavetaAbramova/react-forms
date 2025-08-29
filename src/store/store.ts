import { configureStore } from '@reduxjs/toolkit';
import { regionReducer } from './regionSlice';

export const store = configureStore({
  reducer: {
    regions: regionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
