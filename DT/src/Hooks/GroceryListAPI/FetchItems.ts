import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface todoItem {
  item_id: number;
  list_id: number;
  product_name: string;
  product_quantity: number;
  is_completed: boolean;
  created_at: string;
}

const getAllItems = async (form: {list_id: number | null}): Promise<todoItem[]> => {
    const { data } = await axiosInstance.post('/grocery/fetch-Items', form);
    return data;
  }

const useItems = () => {
 return useMutation({mutationFn: getAllItems});
};

export default useItems;