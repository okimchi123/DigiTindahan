import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface promiseType {
    message: string;
}

interface formType {
    ids: number[];
}

const deleteItems = async (form: formType): Promise<promiseType> => {
    const { data } = await axiosInstance.delete('/grocery/delete-items', { data: form });
    return data;
}

const useDeleteItems = () => {

    return useMutation({
        mutationFn: deleteItems,
        onError: (error) => console.error(error)
    });
};

export default useDeleteItems;