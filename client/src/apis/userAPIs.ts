import axios, {AxiosResponse} from 'axios';
import axiosInstance from '../utils/axiosInterceptor/axiosInterceptor';

export const getUser = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/users/' + id);
  return response;
}