import { axiosInstance } from "../Model/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

interface CheckUser{
    username: string;
}

const CheckUser = async (data: CheckUser): Promise<any> => {
  const res = await axiosInstance.post("/user/check-user", data);
  return res.data;
};

export default function useCheckUser() {
  return useMutation({
    mutationFn: CheckUser,
    onSuccess: () => {
      console.log("Username is valid");
    },
    onError: (error: Error) => {
      console.error("Error:", error);
    },
  });
}
