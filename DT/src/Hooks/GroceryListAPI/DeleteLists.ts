import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface promiseType {
    message: string;
}

interface formType {
    ids: number[];
}

const deletelists = async (form: formType): Promise<promiseType> => {
    const { data } = await axiosInstance.delete('/grocery/delete-lists', { data: form });
    return data;
}

const useDeleteLists = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletelists,
        onSuccess: () => { 
            queryClient.invalidateQueries({queryKey: ['grocery-lists']});
        },
        onError: (error) => console.error(error)
    });
};

export default useDeleteLists;