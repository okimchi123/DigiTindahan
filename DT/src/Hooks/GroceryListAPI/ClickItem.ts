import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface promiseType {
  message: string;
}

interface formType {
  value: boolean;
  item_id: number;
  list_id: number;
}

const fetchClickItem = async (form: formType): Promise<promiseType[]> => {
  const { data } = await axiosInstance.put('/grocery/click-item', form);
  return data;
}

const useClickItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchClickItem, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finished-lists'] });
    }
  });
};

export default useClickItem;