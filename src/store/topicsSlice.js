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
    topics: [],
    loading: false,
    error: null,
  },
  reducers: {
    upTopics: (state, action) => ({
      ...state,
      topics: state.topics.map((hashTag) => {
        const { message } = action.payload;
        if (message.startsWith(hashTag.hashName.slice(0, -1))) {
          return ({ ...hashTag, countMessages: hashTag.countMessages + 1 });
        }
        return hashTag;
      }),
    }),
  },
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
export const { upTopics } = topicsSlice.actions;
export default topicsSlice.reducer;
