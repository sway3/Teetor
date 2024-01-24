import axios, {AxiosResponse} from 'axios';
import axiosInstance from '../utils/axiosInterceptor/axiosInterceptor';

export const getUser = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/users/' + id);
  return response;
}

export const getMentors = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/users/' + id + '/mentors');
  return response;
}

export const sendMentoringRequest = async (menteeId: string, mentorId: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.post('/mentoring-request', {
    mentorId: mentorId,
    menteeId: menteeId
  });
  return response;
}

export const getNotifications = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/users/' + id + '/notifications');
  return response;
}