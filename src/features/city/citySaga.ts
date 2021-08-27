import { apiGetAllCities } from './../../api/cityApi';
import { cityActions } from './citySlice';
import { takeLatest, call, put } from 'redux-saga/effects';
import { City, ListResponse } from 'models';

function* sgFetchListCity() {
  try {
    const response: ListResponse<City> = yield call(apiGetAllCities);

    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    yield put(cityActions.fetchCityListFailed());
  }
}

function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, sgFetchListCity);
}

export default citySaga;
