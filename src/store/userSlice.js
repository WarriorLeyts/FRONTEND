import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData) => {
    const response = await fetch('/createUser', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 400) {
      throw new Error((await response.json()).error);
    }
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 400) {
    throw new Error((await response.json()).error);
  }
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const getFeedPage = createAsyncThunk('user/getFeedPage', async () => {
  const response = await fetch('/feed');

  if (response.status === 400) {
    throw new Error((await response.json()).error);
  }
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isAuth: false,
    loading: false,
    error: null,
    errorAuth: null,
  },
  reducers: {
    logout: (state) => ({
      ...state,
      userInfo: null,
      isLoggedIn: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        loading: true,
        userInfo: action.payload,
        isAuth: true,
        error: null,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuth: false,
        error: action.error.message,
      }))

      .addCase(loginUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
        isAuth: true,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        isAuth: false,
        error: action.error.message,
      }))
      .addCase(getFeedPage.fulfilled, (state) => ({
        ...state,
        isAuth: true,
      }))
      .addCase(getFeedPage.rejected, (state, action) => ({
        ...state,
        isAuth: false,
        errorAuth: action.error.message,
      }));
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
