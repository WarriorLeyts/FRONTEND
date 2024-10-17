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

export const getFollowers = createAsyncThunk('profile/followers', async (id) => {
  const response = await fetch(`/api/profile/${id}/followers`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const getFollowing = createAsyncThunk('profile/following', async (id) => {
  const response = await fetch(`/api/profile/${id}/following`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const getUserFollowers = createAsyncThunk('profile/user/followers', async (id) => {
  const response = await fetch(`/api/profile/${id}/followers`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const getUserFollowing = createAsyncThunk('profile/user/following', async (id) => {
  const response = await fetch(`/api/profile/${id}/following`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    followers: [],
    following: [],
    userFollowers: [],
    userFollowing: [],
    loading: false,
    subscriptionMessage: null,
  },
  reducers: {
    upFollowers: (state, action) => ({
      ...state,
      followers: state.followers.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return { ...item };
      }),
    }),
    addSubscription: (state, action) => ({
      ...state,
      following: state.following.length ? [...state.following, action.payload] : [],
    }),
    deleteSubscription: (state, action) => ({
      ...state,
      following: state.following.filter((item) => item.id !== action.payload.id),
    }),
    upSubscriptions: (state, action) => ({
      ...state,
      userFollowers: state.userFollowers.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return { ...item };
      }),
      userFollowing: state.userFollowing.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return { ...item };
      }),
    }),
    addUserFollowers: (state, action) => ({
      ...state,
      userFollowers: [...state.userFollowers, action.payload],
    }),
    deleteUserFollowers: (state, action) => ({
      ...state,
      userFollowers: state.userFollowers.filter((item) => item.id !== action.payload.id),
    }),
  },
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
      }))
      .addCase(getFollowers.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getFollowers.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        followers: action.payload.followers,
      }))
      .addCase(getFollowers.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(getFollowing.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getFollowing.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        following: action.payload.following,
      }))
      .addCase(getFollowing.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(getUserFollowers.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserFollowers.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userFollowers: action.payload.followers,
      }))
      .addCase(getUserFollowers.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(getUserFollowing.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserFollowing.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userFollowing: action.payload.following,
      }))
      .addCase(getUserFollowing.rejected, (state) => ({
        ...state,
        loading: false,
      }));
  },
});
export const {
  upFollowers, addSubscription, deleteSubscription,
  upSubscriptions, addUserFollowers, deleteUserFollowers,
} = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
