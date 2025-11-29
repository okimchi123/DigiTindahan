import AnimatedPage from "../UI/Animated-Container";
import { closeModal } from "../../Hooks/CloseHelper";
import { ChevronLeft, Plus } from "lucide-react";
import type { selectedCustomerType } from "./Lists";
import useCredits from "../../Hooks/CustomerAPI/FetchCredits";
import AddCredit from "./Add-credit";
import { useState } from "react";
import dayjs from "dayjs";

interface props {
  customer: selectedCustomerType;
  onClose: () => void;
}

const Customer: React.FC<props> = ({ customer, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: credits } = useCredits(customer!.customer_id);

  const totalPrice = credits?.reduce((total, item) => total + item.price, 0);

  return (
    <>
      {isOpen && <AddCredit customer_id={customer.customer_id} onExit={()=>setIsOpen(false)}  />}
      <AnimatedPage className="modal">
        <nav
          aria-label="Close dialog"
          className="w-full relative flex justify-between pr-4 py-4 shadow-nav"
        >
          <div
            onClick={() => closeModal(onClose)}
            className="flex items-center select-none"
          >
            <button>
              <ChevronLeft size="31" />
            </button>
            <h1 className="text-[18px] font-bold">
              {customer?.customer_name} Credits
            </h1>
          </div>
        </nav>
        {credits?.length ? (
          <header className="w-full py-2 px-3 flex justify-center ">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-semibold">TOTAL :</h1>
              <span className="text-3xl text-orange-600">
                ₱<strong className="font-bold">{totalPrice}</strong>
              </span>
            </div>
          </header>
        ) : (
          <></>
        )}
        <section className="w-[88%] px-2 max-h-[90%] overflow-y-auto flex flex-col gap-2 py-2">
          <ul className="flex flex-col gap-2">
            {credits?.length ? (
              credits.map((item) => (
                <li
                  key={item.product_credit_id}
                  className="list-card py-3 pl-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                >
                  <label className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded border-2 border-primary flex items-center justify-center"></div>
                    <div className="flex flex-col gap-0.5 justify-between">
                      <span className="text-xl">
                        {item.product_quantity}{" "}
                        <span className="text-primary">
                          {item.product_type}
                        </span>
                      </span>
                      <span className="text-2xl">{item.product_name}</span>
                    </div>
                  </label>
                  <div className="flex flex-col gap-1 items-end">
                    <h1 className="text-lg text-gray">{dayjs(item.created_at).format('MMMM D')}</h1>
                    <span className="text-2xl font-semibold">
                      ₱{item.price}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </section>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-10 right-10 p-3 bg-primary rounded-full"
        >
          <Plus size="26" color="white" />
        </button>
      </AnimatedPage>
    </>
  );
};

export default Customer;
