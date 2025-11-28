import AnimatedPage from "../UI/Animated-Container";
import { closeModal } from "../../Hooks/CloseHelper";
import { ChevronLeft } from "lucide-react";
import type { selectedCustomerType } from "./Lists";
import useCredits from "../../Hooks/CustomerAPI/FetchCredits";

interface props {
  customer: selectedCustomerType | null;
  onClose: () => void;
}

const Customer: React.FC<props> = ({ customer, onClose }) => {
  const { data: credits } = useCredits(customer!.customer_id);

  return (
    <AnimatedPage className="modal">
      <nav
        aria-label="Close dialog"
        className="w-full relative flex justify-between pr-4 py-4"
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
      <section className="w-[88%] px-2 max-h-[90%] overflow-y-auto flex flex-col gap-2 py-2">
        <ul className="flex flex-col">
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
                      {item.product_quantity} <span className="text-primary">{item.product_type}</span>
                    </span>
                    <span className="text-2xl">{item.product_name}</span>
                  </div>
                </label>
                <div className="flex flex-col gap-1 items-end">
                  <h1 className="text-lg text-gray">September 11</h1>
                  <span className="text-2xl font-semibold">₱{item.price}</span>
                </div>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </section>
    </AnimatedPage>
  );
};

export default Customer;
