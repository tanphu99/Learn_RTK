import { ListParams, ListResponse, Student } from 'models';
import axiosClient from './axiosClient';

const BASE_URL = '/students';

export const apiGetAllStudents = (params: ListParams): Promise<ListResponse<Student>> =>
  axiosClient.get(BASE_URL, { params });

export const apiGetStudentsById = (id: string): Promise<Student> =>
  axiosClient.get(`${BASE_URL}/${id}`);

export const apiAddStudent = (data: Student): Promise<Student> =>
  axiosClient.post(BASE_URL, { data });

export const apiUpdateStudent = (data: Student): Promise<Student> =>
  axiosClient.patch(BASE_URL, { data });

export const apiRemoveStudent = (id: string): Promise<any> =>
  axiosClient.delete(`${BASE_URL}/${id}`);
