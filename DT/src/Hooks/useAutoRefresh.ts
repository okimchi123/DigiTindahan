import { useEffect, useState } from 'react';
import { useAuthStore } from '../Auth/AuthStore';
import { axiosInstance } from '../Model/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

interface Response {
  accessToken: string;
}

const refreshFunc = async (): Promise<Response> => {
  const res = await axiosInstance.post('/user/refresh');
  return res.data;
};

export const useAutoRefresh = () => {
  const { user, setAccessToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  const refreshMutation = useMutation({
    mutationFn: refreshFunc,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error('Auto-refresh failed:', error);
      logout();
    },
  });

  useEffect(() => {
    if (user) {
      refreshMutation.mutate();
    }else{
      setIsLoading(false);
    }
  }, []); 

  return { isLoading };
};