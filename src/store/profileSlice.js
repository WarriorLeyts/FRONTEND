import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserInfo = createAsyncThunk(
  'settings/fetchUser',
  async () => {
    const response = await fetch('/api/settings/profile');
    if (response.status === 401) {
      throw new Error((await response.json()).error);
    }
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);

export const updateUser = createAsyncThunk(
  'settings/updateUser',
  async (updateDate) => {
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
  },
);

export const updatePassword = createAsyncThunk(
  'settings/updatePassword',
  async (updateDate) => {
    const response = await fetch('/api/settings/password', {
      method: 'POST',
      body: JSON.stringify(updateDate),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 400 || response.status === 401) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    if (!response.ok) {
      throw new Error(
        `error: "Ошибка при загрузке данных: ${response.status}"`,
      );
    }
    return response.json();
  },
);

export const updateEmail = createAsyncThunk(
  'settings/updateEmail',
  async (updateDate) => {
    const response = await fetch('/api/settings/email', {
      method: 'POST',
      body: JSON.stringify(updateDate),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 400 || response.status === 401) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);

export const getOtherProfile = createAsyncThunk(
  'profile/otherProfile',
  async (id) => {
    const response = await fetch(`/api/profile/${id}`);
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: ${response.status}`);
    }
    return response.json();
  },
);
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userInfo: null,
    error: null,
    message: null,
    errorsServer: null,
    otherProfile: null,
    errorOtherProfile: null,
    loading: false,
  },
  reducers: {
    addSetting: (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        ...action.payload,
      },
      message: null,
      error: null,
    }),
    updateUserInfo: (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        ...action.payload,
      },
    }),
    updateOtherProfile: (state, action) => ({
      ...state,
      otherProfile: {
        ...state.otherProfile,
        ...action.payload,
      },
    }),
    setErrors: (state, action) => ({
      ...state,
      errorsServer: {
        ...state.errorsServer,
        ...action.payload,
      },
    }),
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
      }))
      .addCase(updatePassword.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updatePassword.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload.message,
        errors: null,
      }))
      .addCase(updatePassword.rejected, (state, action) => ({
        ...state,
        loading: false,
        errorsServer: {
          ...JSON.parse(action.error.message),
        },
      }))
      .addCase(updateEmail.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateEmail.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload.message,
        errorsServer: null,
      }))
      .addCase(updateEmail.rejected, (state, action) => ({
        ...state,
        loading: false,
        errorsServer: {
          error: action.error.message,
          ...JSON.parse(action.error.message),
        },
      }))
      .addCase(getOtherProfile.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getOtherProfile.fulfilled, (state, action) => ({
        ...state,
        otherProfile: {
          ...action.payload.profile,
        },
        error: null,
        loading: false,
      }))
      .addCase(getOtherProfile.rejected, (state, action) => ({
        ...state,
        errorOtherProfile: action.error.message,
        loading: false,
      }));
  },
});
export const {
  addSetting, updateUserInfo, setErrors, updateOtherProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
