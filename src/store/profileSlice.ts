import { createSlice } from '@reduxjs/toolkit';
import type { Profile } from '../types&interfaces/Profile';

interface ProfileState {
  list: Profile[];
}

const initialState: ProfileState = {
  list: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.list.push(action.payload);
    },
    clearProfiles(state) {
      state.list = [];
    },
  },
});

export const { setProfile, clearProfiles } = profileSlice.actions;
export default profileSlice.reducer;
