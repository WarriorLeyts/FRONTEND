import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserInfo = createAsyncThunk('settings/fetchUser', async () => {
  const response = await fetch('/api/settings/profile');
  if (response.status === 401) {
    throw new Error((await response.json()).error);
  }
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});
export const updateUser = createAsyncThunk('settings/updateUser', async (updateDate) => {
  const response = await fetch('/api/settings/profile', {
    method: 'POST',
    body: JSON.stringify(updateDate),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 401) {
    throw new Error((await response.json()).error);
  }
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearDateProfile: ((state) => ({
      ...state,
      error: null,
      message: null,
    })),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => ({
        ...state,
        userInfo: action.payload.user,
        error: null,
      }))
      .addCase(fetchUserInfo.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
      }))
      .addCase(updateUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload.message,
        error: null,
      }))
      .addCase(updateUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});
export const { clearDateProfile } = profileSlice.actions;
export default profileSlice.reducer;
