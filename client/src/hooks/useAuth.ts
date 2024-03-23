import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { checkUserAuth, refreshAccessToken } from '../apis/authAPIs';

const useAuth = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isSuccess, isPending, error, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: () => checkUserAuth(),
    retry: false,
  });

  useEffect(() => {
    const auth = async () => {
      if (isSuccess) {
        setIsAuthed(true);
      } else if (isError) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
          const authHeader = data?.headers['www-authenticate'];
          console.log(authHeader);

          if (authHeader.includes('invalid_token')) {
            setIsAuthed(false);
          } else {
            try {
              await refreshAccessToken();
              queryClient.invalidateQueries({ queryKey: ['auth'] });
            } catch (refreshError) {
              setIsAuthed(false);
            }
          }
        }
      }
    };

    auth();
  });

  return { isAuthed, isPending };
};

export default useAuth;
