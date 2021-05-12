import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../api/userApi';

export const fetchSignin = createAsyncThunk(
  'user/fetchSignin',
  async (loginInput, thunkAPI) => {
    try {
      const response = await userApi.requestSignin(loginInput);
      // const { accessToken, currentUser } = response;

      if (response.status === 200) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const registerHabit = createAsyncThunk(
  'user/registerHabit',
  async (registerInput, thunkAPI) => {
    try {
      const response = await userApi.postHabit(registerInput);

      if (response.status === 201) {
        return response.habits;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateHabit = createAsyncThunk(
  'user/updateHabit',
  async (updateInput, thunkAPI) => {
    try {
      const response = await userApi.patchHabit(updateInput);

      if (response.status === 200) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const removeHabit = createAsyncThunk(
  'user/removeHabit',
  async (deleteInput, thunkAPI) => {
    try {
      const response = await userApi.deleteHabit(deleteInput);

      if (response.status === 200) {
        return deleteInput.targetIndex;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userEmail, thunkAPI) => {
    try {
      const response = await userApi.fetchUserName(userEmail);

      if (response.status === 200) {
        return response.payload;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (followingInfo, thunkApi) => {
    try {
      const response = await userApi.patchUserFollow(followingInfo);

      if (response.status === 200) {
        return response.following;
      }

      return thunkApi.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateImageUri = createAsyncThunk(
  'user/updateImageUri',
  async (imageUriPayload, thunkApi) => {
    try {
      const response = await userApi.patchImageUri(imageUriPayload);

      if (response.status === 201) {
        return response.uri;
      }

      return thunkApi.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    userName: '',
    imageUri: '',
    followers: [],
    following: [],
    completedHabits: [],
    completedDates: [],
    habits: [],
    accessToken: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    allUsers: []
  },
  reducers: {
  },
  extraReducers: {
    [fetchSignin.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.email = payload.email;
      state.userName = payload.userName;
      state.habits = payload.habits;
      state.following = payload.following;
      state.imageUri = payload.imageUri;
      state.completedDates = payload.completedDates;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [fetchSignin.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchSignin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [registerHabit.fulfilled]: (state, { payload }) => {
      state.habits = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [registerHabit.pending]: (state) => {
      state.isFetching = true;
    },
    [registerHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [removeHabit.fulfilled]: (state, { payload }) => {
      state.habits.splice(payload, 1);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [removeHabit.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [removeHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updateHabit.fulfilled]: (state, { payload }) => {
      state.habits = payload.habits;
      state.completedHabits = payload.completedHabits;
      state.completedDates = payload.completedDates;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [updateHabit.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [updateHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.allUsers = payload.users;
      state.following = payload.following;
    },
    [fetchUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.following = payload;
    },
    [followUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [followUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updateImageUri.fulfilled]: (state, { payload }) => {
      state.imageUri = payload;
      state.isFetching = false;
      state.isSuccess = true;
    }
  }
});
