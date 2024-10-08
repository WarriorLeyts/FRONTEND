import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    modalsActive: {
      authorActive: false,
      registrActive: false,
      newPostActive: false,
    },
  },
  reducers: {
    setModalActive: (state, action) => ({
      ...state,
      modalsActive: {
        ...state.modalsActive,
        ...action.payload,
      },
    }),
  },
});
export const { setModalActive } = modalsSlice.actions;
export default modalsSlice.reducer;
