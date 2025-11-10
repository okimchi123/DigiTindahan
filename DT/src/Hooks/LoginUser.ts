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

const loginUser = async (data: CreateUser): Promise<AuthResponse> => {
  const res = await axiosInstance.post("/user/login", data);
  return res.data;
};

export default function useLoginUser() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Successfully Logged in");
      setAuth(data.accessToken, data.user);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Error:", error);
    },
  });
}
