import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import topicsReducer from './topicsSlice.js';
import blogsReducer from './blogsSlice.js';
import userReducer from './userSlice.js';
import profileReducer from './profileSlice.js';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    topics: topicsReducer,
    blogs: blogsReducer,
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
