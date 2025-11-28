import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';
import axios from 'axios';

export interface creditType{
    product_credit_id: number;
    customer_id: number;
    product_name: string;
    product_quantity: number;
    product_type: string;
    price: number;
    is_paid: boolean;
    created_at: string;
}

const fetchCredits = async (customerId: number | null): Promise<creditType[]> => {
  try {
    const { data } = await axiosInstance.post('/customer/get-credits', {
      customer_id: customerId,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch credits');
    }
    throw error;
  }
};

const useCredits = (customerId: number | null) => {
  return useQuery({
    queryKey: ['credits', customerId],
    queryFn: () => fetchCredits(customerId),
    enabled: !!customerId,
  });
};

export default useCredits;
