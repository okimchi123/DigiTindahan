import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Model/AxiosInstance";

export interface promiseType {
  customer_id: number;
}

export interface addCreditType {
  customer_id: number;
  product_name: string;
  product_quantity: number;
  product_type: string;
  price: number;
}

const addCredit = async (form: addCreditType): Promise<promiseType> => {
  const { data } = await axiosInstance.post("/customer/add-credit", form);
  return data;
};

const useAddCredit = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCredit,
    onSuccess:(data)=>{
    queryClient.invalidateQueries({ queryKey: ['credits', data.customer_id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useAddCredit;
