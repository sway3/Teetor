import axios, {AxiosResponse} from 'axios';
import axiosInstance from '../utils/axiosInterceptor/axiosInterceptor';

export const getUser = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/user/' + id);
  return response;
}

export const getMentors = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/user/' + id + '/mentors');
  return response;
}