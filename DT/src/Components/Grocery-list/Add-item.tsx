import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useKeyboardHeight } from "../../Hooks/CustomKH";
import FloatingInput from "../UI/Floating-Input";
import useAddItem from "../../Hooks/GroceryListAPI/AddItem";
import type { addItemType } from "../../Hooks/GroceryListAPI/AddItem";
import clsx from "clsx";

interface props {
  isOpen: boolean;
  onExit: () => void;
  list_id: number | null;
}

const AddItem: React.FC<props> = ({ isOpen, onExit, list_id }) => {
  const keyboardHeight = useKeyboardHeight(isOpen);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<addItemType>({
    list_id,
    product_name: '',
    product_quantity: 0,
  });

  const {mutate} = useAddItem();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [inputRef.current]);

  const onClose = () => {
    gsap.to('#add',{
      duration: 0.1,
      scale: 0,
      opacity: 0,
      onComplete: ()=>{
      onExit();  
      }
    })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev)=>({
      ...prev,
      [name]: value,
    }));
  };

  const onEnter = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      mutate(form);
    } catch (error) {
      console.error(error);
    }finally{
      onClose();
    }

  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/10 z-31" />
      <FloatingInput
        className="bg-white z-31"
        keyboardHeight={keyboardHeight}
        onSubmit={onEnter}
      >
        <nav
          aria-label="Close dialog"
          className="w-full flex items-center gap-1"
        >
          <button type="button" className="p-1" onClick={onClose}>
            <X size="24" />
          </button>
          <h1 className="floating-h1 text-black">New Item</h1>
        </nav>
        <input
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          ref={inputRef}
          type="text"
          placeholder="Product"
          className="input-design font-bold text-lg text-gray"
        />
        <input
          name="product_quantity"
          value={form.product_quantity || ""}
          onChange={handleChange}
          type="number"
          placeholder="Quantity"
          className="input-design font-bold text-lg text-gray"
        />
        <button disabled={!form.product_name || !form.product_quantity} type="submit" className={clsx("self-end  font-bold p-1 transition-all",{
          "text-primary text-lg":form.product_name && form.product_quantity,
          "text-primary/70 text-md":!form.product_name || !form.product_quantity
        })}>
          Add
        </button>
      </FloatingInput>
    </>
  );
};

export default AddItem;
