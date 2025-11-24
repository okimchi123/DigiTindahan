import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

interface PropType{
    list_id: number;
}

const getFinishedLists = async (): Promise<PropType[]> => {
    const { data } = await axiosInstance.get('/grocery/finished-lists');
    return data;
  }

const useFinishedLists = () => {
  return useQuery({
    queryKey: ['finished-lists'],
    queryFn: getFinishedLists,
  });
};

export default useFinishedLists;