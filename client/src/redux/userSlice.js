import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ordersServices from '../services/ordersServices';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const login = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  return await ordersServices.login(email, password);
});

export const register = createAsyncThunk('user/register', async ({ email, name, password }, thunkAPI) => {
  return await ordersServices.register(email, name, password);
});

export const getProfile = createAsyncThunk('user/profile', async (authToken, userID, thunkAPI) => {
  return await ordersServices.getProfile(authToken, userID);
});

export const updateUser = createAsyncThunk('user/update', async ({ email, name, password, authToken }, thunkAPI) => {
  ordersServices.updateUser({ authToken, email, name, password });
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
