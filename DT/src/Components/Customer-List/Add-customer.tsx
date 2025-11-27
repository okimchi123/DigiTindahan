import FloatingInput from "../UI/Floating-Input";
import { useKeyboardHeight } from "../../Hooks/CustomKH";
import {closeFloatingInput} from "../../Hooks/CloseHelper";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import useAddCustomer from "../../Hooks/CustomerAPI/AddCustomer";

interface props {
  isOpen: boolean;
  onExit: () => void;
}

const AddUser: React.FC<props> = ({ isOpen, onExit }) => {
  const keyboardHeight = useKeyboardHeight(isOpen);
  const [customerName, setCustomerName] = useState("");
  const InputRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useAddCustomer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    mutate(
      { customer_name: customerName },
      {
        onSuccess: () => {
          closeFloatingInput(onExit);
        },
      }
    );
  };

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  }, [InputRef.current]);

  return (
    <>
      <div
        onClick={() => closeFloatingInput(onExit)}
        className="fixed inset-0 bg-black/10 z-31"
      />
      <FloatingInput
        className="bg-white z-31"
        keyboardHeight={keyboardHeight}
        onSubmit={handleSubmit}
      >
        <nav
          aria-label="Close dialog"
          className="w-full flex items-center gap-1"
        >
          <button
            type="button"
            className="p-1"
            onClick={() => closeFloatingInput(onExit)}
          >
            <X size="24" />
          </button>
          <h1 className="floating-h1 text-black">New Customer Credit</h1>
        </nav>
        <input
          ref={InputRef}
          name="customer_name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          type="text"
          placeholder="Customer Name"
          className="input-design font-bold text-lg text-gray"
        />
        <button
          disabled={!customerName.trim()}
          type="submit"
          className={clsx("self-end  font-bold p-1 transition-all", {
            "text-primary text-lg": customerName.trim(),
            "text-primary/70 text-md": !customerName.trim(),
          })}
        >
          Add
        </button>
      </FloatingInput>
    </>
  );
};

export default AddUser;
