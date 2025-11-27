import AnimatedPage from "../UI/Animated-Container";
import { closeModal } from "../../Hooks/CloseHelper";
import { ChevronLeft } from "lucide-react";
import type { selectedCustomerType } from "./Lists";

interface props{
  customer: selectedCustomerType | null;
  onClose: () => void;
}

const Customer: React.FC<props> = ({ customer, onClose}) => {
  return (
    <AnimatedPage className="modal">
      <nav
          aria-label="Close dialog"
          className="w-full relative flex justify-between pr-4 py-4"
        >
          <div onClick={()=>closeModal(onClose)} className="flex items-center select-none">
            <button>
              <ChevronLeft size="31" />
            </button>
            <h1 className="text-[18px] font-bold">{customer?.customer_name} Credits</h1>
          </div>
        </nav>
    </AnimatedPage>
  );
};

export default Customer;
