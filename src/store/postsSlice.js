import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/posts.json');
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

export const newPost = createAsyncThunk('posts/newPost', async (post) => {
  const response = await fetch('/posts.json', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
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

export const fetchPostsUser = createAsyncThunk(
  'posts/fetchPostsUser',
  async (id) => {
    const response = await fetch(`/posts/user/${id}.json`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);

export const fetchPostsProfile = createAsyncThunk(
  'posts/fetchPostsProfile',
  async (id) => {
    const response = await fetch(`/posts/user/${id}.json`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);

export const fetchPostsSubscriptions = createAsyncThunk('posts/fetchSubscriptions', async () => {
  const response = await fetch('/posts/subscriptions');
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    homePosts: [],
    feedPosts: [],
    profilePosts: [],
    userPosts: [],
    loading: false,
    newPostLoading: false,
  },
  reducers: {
    addPost: (state, action) => ({
      ...state,
      feedPosts: [action.payload, ...state.feedPosts],
      profilePosts: [action.payload, ...state.profilePosts],
      message: null,
    }),
    upFeedPosts: (state, action) => {
      if (action.payload.subscriptionMessage === 'Не читать') {
        return {
          ...state,
          feedPosts: state.feedPosts?.filter((item) => !(item.id === action.payload.id)),
        };
      }
      if (state.feedPosts.length !== 0) {
        return {
          ...state,
          feedPosts: [...state.userPosts, ...state.feedPosts],
        };
      }
      return {
        ...state,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        homePosts: action.payload,
      }))
      .addCase(fetchPosts.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(newPost.pending, (state) => ({
        ...state,
        newPostLoading: true,
      }))
      .addCase(newPost.fulfilled, (state, action) => ({
        ...state,
        newPostLoading: false,
        message: action.payload.message,
      }))
      .addCase(newPost.rejected, (state, action) => ({
        ...state,
        newPostLoading: false,
        error: action.error.message,
      }))
      .addCase(fetchPostsUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchPostsUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        userPosts: action.payload.posts,
      }))
      .addCase(fetchPostsUser.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(fetchPostsProfile.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchPostsProfile.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        profilePosts: action.payload.posts,
      }))
      .addCase(fetchPostsProfile.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(fetchPostsSubscriptions.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchPostsSubscriptions.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        feedPosts: action.payload.posts,
      }))
      .addCase(fetchPostsSubscriptions.rejected, (state) => ({
        ...state,
        loading: false,
      }));
  },
});
export const { addPost, upFeedPosts } = postsSlice.actions;
export default postsSlice.reducer;
