import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface authState {
  isLoggedIn: boolean;
  isLogging?: boolean;
  currentUser?: User;
}

const initialState: authState = {
  isLoggedIn: false,
  isLogging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isLogging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLogging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLogging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.isLogging = false;
      state.currentUser = undefined;
    },
  },
});

// action
export const { login, loginFailed, loginSuccess, logout } = authSlice.actions;

// reducer
export const authReducer = authSlice.reducer;

// selector
export const selectIsLogged = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.isLogging;
