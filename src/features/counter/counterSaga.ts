import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('waiting 2s');
  yield delay(2000);

  console.log('dispatch action when wait success', action);
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('Counter saga', incrementSaga.toString);

  // yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}
