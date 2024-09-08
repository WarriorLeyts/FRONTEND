import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopics = createAsyncThunk('topics/fetchTopics', async () => {
  const response = await fetch('/topics.json');
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке данных: ${response.status}`);
  }
  return response.json();
});

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [1, 2, 3, 4],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchTopics.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        topics: action.payload,
      }))
      .addCase(fetchTopics.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export default topicsSlice.reducer;
