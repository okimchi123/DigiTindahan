import { ChevronRight } from "lucide-react";
import CustomSearch from "../../Components/UI/Search";
import useCustomerList from "../../Hooks/CustomerAPI/FetchCustomer";
import type { CustomerType } from "../../Hooks/CustomerAPI/FetchCustomer";

const Lists: React.FC = () => {
  const { data } = useCustomerList();

  return (
    <section className="w-[80%] flex flex-col gap-2">
      <CustomSearch />
      {data?.length ? (
        <ul className="flex flex-col gap-4">
          {data.map((customer: CustomerType) => (
            <li className="relative">
              <button
                aria-haspopup="dialog"
                className="relative bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] select-none w-full flex flex-col items-start justify-center h-22 pl-4 rounded-xl"
              >
                <h2 className="font-bold text-2xl">{customer.customer_name}</h2>
                <ChevronRight size="22" className="absolute right-1" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Lists;
