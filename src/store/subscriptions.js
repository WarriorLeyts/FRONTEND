import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIsFollowing = createAsyncThunk('subscriptions/isFollowing', async (followedId) => {
  const response = await fetch(`/api/subscriptions/is-following/${followedId}`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const toggleSubscription = createAsyncThunk('subscriptions/toggle', async (followedId) => {
  const response = await fetch(`/api/subscriptions/toggle/${followedId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    loading: false,
    subscriptionMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsFollowing.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchIsFollowing.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        subscriptionMessage: action.payload.subscriptionMessage,
      }))
      .addCase(fetchIsFollowing.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(toggleSubscription.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(toggleSubscription.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        subscriptionMessage: action.payload.subscriptionMessage,
      }))
      .addCase(toggleSubscription.rejected, (state) => ({
        ...state,
        loading: false,
      }));
  },
});

export default subscriptionsSlice.reducer;
