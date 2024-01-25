import axios, {AxiosResponse} from 'axios';
import axiosInstance from '../utils/axiosInterceptor/axiosInterceptor';

export const getNotifications = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(`users/${id}/notifications`);
  return response;
};