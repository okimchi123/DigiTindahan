import { useAuthStore } from "../../Auth/AuthStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Model/AxiosInstance";

const logoutUser = async (): Promise<void> => {
    await axiosInstance.post('/user/logout');
}

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

 return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate('/');
    },
    onError: (error) => {
      logout();
      queryClient.clear();
      navigate('/');
      console.error('Logout error:', error);
    },
  });
};