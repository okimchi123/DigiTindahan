import { axiosInstance } from "../Model/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { CreateUser } from "../Model/User.interface";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Auth/AuthStore";

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}

const registerUser = async (data: CreateUser): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/user/register", data);
  return res.data;
};

export default function useRegisterUser() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Successfully Created");
      setAuth(data.accessToken, data.user);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Error:", error);
    },
  });
}
