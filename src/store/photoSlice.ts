import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PhotoState {
  base64: string[];
}

const initialState: PhotoState = {
  base64: [],
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto(state, action: PayloadAction<string>) {
      state.base64.push(action.payload);
    },
    clearPhotos(state) {
      state.base64 = [];
    },
  },
});

export const { setPhoto, clearPhotos } = photoSlice.actions;
export default photoSlice.reducer;
