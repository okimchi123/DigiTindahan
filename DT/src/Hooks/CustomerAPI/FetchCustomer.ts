import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../Model/AxiosInstance';

export interface CustomerType {
  customer_id: number;
  user_id: number;
  customer_name: string;
  created_at: string;
  updated_at: string;
}

const getAllCustomer = async (): Promise<CustomerType[]> => {
    const { data } = await axiosInstance.get('/customer/');
    return data;
  }

const useCustomerList = () => {
  return useQuery({
    queryKey: ['customer-list'],
    queryFn: getAllCustomer,
  });
};

export default useCustomerList;