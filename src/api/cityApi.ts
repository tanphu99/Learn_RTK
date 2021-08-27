import { City, ListResponse } from 'models';

import axiosClient from './axiosClient';

const GET_ALL_CITIES = '/cities';

export const apiGetAllCities = (): Promise<ListResponse<City>> =>
  axiosClient.get(GET_ALL_CITIES, { params: { _limit: 10, _page: 1 } });
