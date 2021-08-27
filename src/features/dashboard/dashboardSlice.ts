import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface DashBoardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashBoardState {
  loading: boolean;
  statistics: DashBoardStatistics;
  highestMarkList: Student[];
  lowestMarkList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashBoardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestMarkList: [],
  lowestMarkList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistic(state, action: PayloadAction<DashBoardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestMarkList(state, action: PayloadAction<Student[]>) {
      state.highestMarkList = action.payload;
    },
    setLowestMarkList(state, action: PayloadAction<Student[]>) {
      state.lowestMarkList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

// Actions
export const dashboardAction = dashboardSlice.actions;

// Selectors
export const selectLoadingStatistics = (state: RootState) =>
  state.dashboard.loading;
export const selectStatistics = (state: RootState) =>
  state.dashboard.statistics;

export const selectHighestMarkList = (state: RootState) =>
  state.dashboard.highestMarkList;
export const selectLowestMarkList = (state: RootState) =>
  state.dashboard.lowestMarkList;
export const selectRankingByCityList = (state: RootState) =>
  state.dashboard.rankingByCityList;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
