import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await fetch('/blogs.json');
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
  },
  reducers: {
    upBlogs: (state, action) => ({
      ...state,
      blogs: state.blogs.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, ...action.payload };
        }
        return { ...blog };
      }),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchBlogs.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        blogs: action.payload,
      }))
      .addCase(fetchBlogs.rejected, (state, action) => ({
        ...state,
        loading: true,
        error: action.error.message,
      }));
  },
});
export const { upBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
