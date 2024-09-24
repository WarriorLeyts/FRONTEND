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
export const fetchPostsUser = createAsyncThunk('posts/fetchPostsUser', async (id) => {
  const response = await fetch(`/posts/user/${id}.json`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [1, 2, 3, 4],
    loading: false,
    newPostLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearDate: (state) => ({
      ...state,
      posts: [1, 2, 3, 4],
      error: null,
      message: null,
    }),
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
        posts: action.payload,
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
        posts: action.payload.posts,
      }))
      .addCase(fetchPostsUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});
export const { clearDate } = postsSlice.actions;
export default postsSlice.reducer;
