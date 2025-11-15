import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface promiseType {
  message: string;
}

interface formType{
    value: boolean;
    item_id: number;
    list_id: number;
}

const fetchClickItem = async (form: formType): Promise<promiseType[]> => {
    const { data } = await axiosInstance.put('/grocery/click-item', form);
    return data;
  }

const useClickItem = () => {
 return useMutation({mutationFn: fetchClickItem});
};

export default useClickItem;