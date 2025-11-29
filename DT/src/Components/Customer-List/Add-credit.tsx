import type React from "react";
import FloatingInput from "../UI/Floating-Input";
import { closeFloatingInput } from "../../Hooks/CloseHelper";
import { useKeyboardHeight } from "../../Hooks/CustomKH";
import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import gsap from "gsap";
import useAddCredit from "../../Hooks/CustomerAPI/AddCredit";

interface formProp {
  customer_id: number;
  product_name: string;
  product_quantity: number;
  product_type: string;
  price: number;
}

interface prop {
  customer_id: number;
  onExit: () => void;
}

const AddCredit: React.FC<prop> = ({ customer_id, onExit }) => {
  const keyboardHeight = useKeyboardHeight();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<formProp>({
    customer_id,
    product_name: "",
    product_quantity: 0,
    product_type: "pcs",
    price: 0,
  });

  const {mutate} = useAddCredit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onEnter = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      mutate(form);
    } finally{
      closeFloatingInput(onExit);
    }
  };

  const handleTypeChange = () => {
    const newType = form.product_type === "pcs" ? "kg" : "pcs";

    gsap.to(".product-type-text", {
      x: -50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setForm({ ...form, product_type: newType });
        gsap.fromTo(
      ".product-type-text",
      { x: 50,},
      { x: 0, duration: 0.3, ease: "power2.out" });
      },
    })
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [inputRef.current]);

  return (
    <>
      <div
        onClick={() => closeFloatingInput(onExit)}
        className="fixed inset-0 bg-black/10 z-31"
      />
      <FloatingInput
        className="bg-white z-31"
        keyboardHeight={keyboardHeight}
        onSubmit={onEnter}
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
          <h1 className="floating-h1 text-black">New Credit</h1>
        </nav>
        <input
          name="product_name"
          onChange={handleChange}
          value={form.product_name}
          ref={inputRef}
          type="text"
          placeholder="Product"
          className="input-design font-bold text-lg text-gray"
        />
        <input
          name="product_quantity"
          onChange={handleChange}
          value={form.product_quantity || ""}
          type="number"
          placeholder="Quantity"
          className="input-design font-bold text-lg text-gray"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTypeChange}
            className="relative py-2 px-6 bg-primary text-white rounded-full text-lg font-medium transition-colors overflow-hidden w-20 flex justify-center"
          >
            <h3 className="product-type-text">{form.product_type}</h3>
          </button>
          <p className="text-lg">Click to change type pcs/kg</p>
        </div>
        <input
          name="price"
          onChange={handleChange}
          value={form.price || ""}
          type="number"
          placeholder="Total Price"
          className="input-design font-bold text-lg text-gray"
        />
        <button
          disabled={!form.product_name || !form.product_quantity || !form.price}
          type="submit"
          className={clsx("self-end  font-bold p-1 transition-all", {
            "text-primary text-lg":
              form.product_name && form.product_quantity && form.price,
            "text-primary/70 text-md":
              !form.product_name || !form.product_quantity || !form.price,
          })}
        >
          Add
        </button>
      </FloatingInput>
    </>
  );
};

export default AddCredit;
