import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Model/AxiosInstance";

interface formtype{
    customer_name: string;
}

const addNewCustomer = async (form: formtype): Promise<{ message: string }> => {
  const { data } = await axiosInstance.post("/customer/add-customer", form);
  return data;
};

const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-list"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useAddCustomer;
