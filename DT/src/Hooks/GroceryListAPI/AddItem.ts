import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../Model/AxiosInstance";

export interface promiseType {
  message: string;
}

export interface addItemType {
  list_id: number | null;
  product_name: string;
  product_quantity: number;
}

const addTodoItem = async (form: addItemType): Promise<promiseType[]> => {
  const { data } = await axiosInstance.post("/grocery/add-item", form);
  return data;
};

const useAddItem = () => {
  return useMutation({ mutationFn: addTodoItem, onError:(error)=>{console.error(error)}});
};

export default useAddItem;
