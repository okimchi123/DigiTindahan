import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface GroceryListType {
  list_id: number;
  user_id: number;
  list_name: string;
  latest_item: string;
  latest_item_quantity: number;
  created_at: string;
  updated_at: string;
}

const getAllLists = async (): Promise<GroceryListType[]> => {
    const { data } = await axiosInstance.get('/grocery/');
    return data;
  }

const useGroceryLists = () => {
  return useQuery({
    queryKey: ['grocery-lists'],
    queryFn: getAllLists,
  });
};

export default useGroceryLists;