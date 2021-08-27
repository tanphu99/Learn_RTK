import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetAllCities } from './../../api/cityApi';
import { apiGetAllStudents } from './../../api/studentApi';
import { dashboardAction, RankingByCity } from './dashboardSlice';

function* sgFetchStatistics() {
  const listRespone: Array<ListResponse<Student>> = yield all([
    call(apiGetAllStudents, { _limit: 1, _page: 1, gender: 'male' }),
    call(apiGetAllStudents, { _limit: 1, _page: 1, gender: 'female' }),
    call(apiGetAllStudents, { _limit: 1, _page: 1, mark_gte: 8 }),
    call(apiGetAllStudents, { _limit: 1, _page: 1, mark_lte: 5 }),
  ]);

  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = listRespone.map(
    (x) => x.pagination._totalRows
  );

  yield put(
    dashboardAction.setStatistic({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}
function* sgFetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(apiGetAllStudents, {
    _limit: 5,
    _page: 1,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardAction.setHighestMarkList(data));
}
function* sgFetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(apiGetAllStudents, {
    _limit: 5,
    _page: 1,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardAction.setLowestMarkList(data));
}
function* sgFetchRankingByCityList() {
  // fetch data city
  const { data: cityList }: ListResponse<City> = yield call(apiGetAllCities);

  const callList = cityList.map((x) =>
    call(apiGetAllStudents, {
      _limit: 5,
      _page: 1,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );

  const listResponse: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = listResponse.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      cityName: cityList[idx].name,
      rankingList: x.data,
    })
  );

  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}

function* sgFetchDataDashboard() {
  try {
    yield all([
      call(sgFetchStatistics),
      call(sgFetchHighestStudentList),
      call(sgFetchLowestStudentList),
      call(sgFetchRankingByCityList),
    ]);

    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    yield put(dashboardAction.fetchDataFailed());
  }
}

function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.type, sgFetchDataDashboard);
}

export default dashboardSaga;
