import { RootState } from './../../app/store';
import { ListResponse } from './../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  pagination: PaginationParams;
  filter: ListParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 30,
  },
  filter: {
    _page: 1,
    _limit: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchListStudent(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchListStudentSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      const { data, pagination } = action.payload;

      state.loading = false;
      state.list = data;
      state.pagination = pagination;
    },
    fetchListStudentFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const studentAction = studentSlice.actions;

// Selectors
export const selectListStudent = (state: RootState) => state.student.list;
export const selectLoading = (state: RootState) => state.student.loading;
export const selectPagination = (state: RootState) => state.student.pagination;
export const selectFilter = (state: RootState) => state.student.filter;

// Reducers
const studentReducer = studentSlice.reducer;
export default studentReducer;
