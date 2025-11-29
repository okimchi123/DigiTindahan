import { ChevronRight } from "lucide-react";
import CustomSearch from "../../Components/UI/Search";
import useCustomerList from "../../Hooks/CustomerAPI/FetchCustomer";
import type { CustomerType } from "../../Hooks/CustomerAPI/FetchCustomer";
import { useState } from "react";
import Customer from "./Customer";
import { createPortal } from "react-dom";

export interface selectedCustomerType {
  customer_id: number;
  customer_name: string;
}

const Lists: React.FC = () => {
  const { data } = useCustomerList();
  const [selectedCustomer, setSelectedCustomer] = useState<selectedCustomerType>({customer_id: 0, customer_name:''});
  const [modal, setModal] = useState(false);

  const onSelect = (c: CustomerType) => {
    setSelectedCustomer({
      customer_id: c.customer_id,
      customer_name: c.customer_name,
    });
    setModal(true);
  };

  return (
    <>
    {modal && createPortal(<Customer customer={selectedCustomer} onClose={()=>setModal(false)} />, document.getElementById('mainPage')!)}
      <section className="w-[80%] flex flex-col gap-2">
        <CustomSearch />
        {data?.length ? (
          <ul className="flex flex-col gap-4">
            {data.map((customer: CustomerType) => (
              <li key={customer.customer_id} className="relative">
                <button
                  onClick={() => onSelect(customer)}
                  aria-haspopup="dialog"
                  className="relative bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] select-none w-full flex flex-col items-start justify-center h-22 pl-4 rounded-xl"
                >
                  <h2 className="font-bold text-xl">
                    {customer.customer_name}
                  </h2>
                  <ChevronRight size="22" className="absolute right-1" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default Lists;
