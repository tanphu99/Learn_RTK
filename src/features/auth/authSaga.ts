import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { login, loginFailed, LoginPayload, logout } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);

    localStorage.setItem('access_token', 'TanPhu');

    // redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);

  localStorage.removeItem('access_token');

  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = !!localStorage.getItem('access_token');

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
