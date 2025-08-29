import { createSlice } from '@reduxjs/toolkit';

const initialState: Record<string, string[]> = {
  Asia: [
    'China',
    'India',
    'Uzbekistan',
    'Japan',
    'Mongolia',
    'Indonesia',
    'Philippines',
  ],
  Europe: ['Norway', 'France', 'Slovakia', 'Finland', 'Ireland', 'Latvia'],
  'South America': [
    'Argentina',
    'Brazil',
    'Chile',
    'Colombia',
    'Paraguay',
    'Peru',
  ],
  'North America': ['United States of America', 'USA', 'Canada', 'Greenland'],
  'North Africa': ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Sudan', 'Tunisia'],
  'Eastern Africa': [
    'Burundi',
    'Comoros',
    'Djibouti',
    'Eritrea',
    'Ethiopia',
    'Kenya',
    'Madagascar',
  ],
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
});

export const regionReducer = regionsSlice.reducer;
