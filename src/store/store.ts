import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import photoReducer from './photoSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    photo: photoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
