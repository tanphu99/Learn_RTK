import { PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, Student } from 'models';
import { call, takeLatest, put, debounce } from 'redux-saga/effects';
import { apiGetAllStudents } from './../../api/studentApi';
import { ListParams } from './../../models/common';
import { studentAction } from './studentSlice';

function* fetchListStudent(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      apiGetAllStudents,
      action.payload
    );

    yield put(studentAction.fetchListStudentSuccess(response));
  } catch (error) {
    yield put(studentAction.fetchListStudentFailed(error.message));
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentAction.setFilter(action.payload));
}

function* studentSaga() {
  yield takeLatest(studentAction.fetchListStudent.type, fetchListStudent);

  yield debounce(
    500,
    studentAction.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}

export default studentSaga;
