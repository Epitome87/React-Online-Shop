import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`/api/users/login`, { email, password }, axiosConfig);

  // TODO: Do we need to payload all of User's properties?!
  //   At the moment our data is: { user: { etc}, token: ""}
  return { ...data.user };
});

export const register = createAsyncThunk('user/register', async ({ email, name, password }, thunkAPI) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`/api/users`, { email, name, password }, axiosConfig);

  // Data holds User information like email, name, password, ._id, and their Auth Token
  return { ...data };
});

export const getProfile = createAsyncThunk('user/profile', async (id, thunkAPI) => {
  const userToken = '';
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };

  // Id could be a User._id or 'profile' (self)
  const { data } = await axios.get(`/api/users/${id}`, axiosConfig);

  // Data holds User information like email, name, password, ._id, and their Auth Token
  return { ...data };
});

export const updateUser = createAsyncThunk('user/update', async ({ email, name, password, token }, thunkAPI) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(`/api/users/profile`, { email, name, password }, axiosConfig);

  // Data holds User information like email, name, password, ._id, and their Auth Token
  return { ...data };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for Logging In
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;

        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Cases for Registration
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(register.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Cases for getting Profile
      .addCase(getProfile.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Cases for Updating
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export auto-generated actions
export const { logout } = userSlice.actions;

// Export selectors

export default userSlice.reducer;
