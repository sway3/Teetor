import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../utils/axiosInterceptor/axiosInterceptor';

export const getDashInfo = async (): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(`/dashboard`);
  return response;
};

export const getMentors = async (id: string): Promise<AxiosResponse> => {
  const response = await axiosInstance.get('/users/' + id + '/mentors');
  return response;
};

export const sendMentoringRequest = async (
  menteeId: string,
  mentorId: string
): Promise<AxiosResponse> => {
  const response = await axiosInstance.post('/mentoring-request', {
    mentorId: mentorId,
    menteeId: menteeId,
  });
  return response;
};

export const getMentoringRequest = async (
  id: string
): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(`mentoring-request/${id}`);
  return response;
};

export const setMentoringRequestStatus = async (
  id: string,
  status: string
): Promise<AxiosResponse> => {
  const response = await axiosInstance.patch(`mentoring-request/${id}`, {
    status: status,
  });
  return response;
};
