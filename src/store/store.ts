import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
// import themeReducer from '../features/theme/themeSlice'
// import selectedItemsListReducer from '../features/selectedItemsList/selectedItemsListSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
