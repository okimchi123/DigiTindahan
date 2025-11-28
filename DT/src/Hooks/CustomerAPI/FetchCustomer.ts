import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';
import axios from 'axios';

export interface CustomerType {
  customer_id: number;
  user_id: number;
  customer_name: string;
  created_at: string;
  updated_at: string;
}

const getAllCustomer = async (): Promise<CustomerType[]> => {
  try {
    const { data } = await axiosInstance.get('/customer/');
    return data;
  } catch (error) {
     if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch credits');
    }
    throw error;
  }
    
  }

const useCustomerList = () => {
  return useQuery({
    queryKey: ['customer-list'],
    queryFn: getAllCustomer,
  });
};

export default useCustomerList;