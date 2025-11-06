import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useKeyboardHeight } from "../../Hooks/CustomKH";
import FloatingInput from "../UI/Floating-Input";

interface props {
  isOpen: boolean;
  onExit: () => void;
}

const AddItem: React.FC<props> = ({ isOpen, onExit }) => {
  const keyboardHeight = useKeyboardHeight(isOpen);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

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

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/10 z-31" />
      <FloatingInput
        className="bg-white z-31"
        keyboardHeight={keyboardHeight}
      >
        <nav
          aria-label="Close dialog"
          className="w-full flex items-center gap-1"
        >
          <button className="p-1" onClick={onClose}>
            <X size="24" />
          </button>
          <h1 className="floating-h1 text-black">New Item</h1>
        </nav>
        <input
          name="productName"
          ref={inputRef}
          type="text"
          placeholder="Product"
          className="input-design font-bold text-lg text-gray"
        />
        <input
          name="productQTY"
          type="text"
          placeholder="Quantity"
          className="input-design font-bold text-lg text-gray"
        />
        <button className="self-end text-primary/70 font-bold p-1 text-lg">
          Add
        </button>
      </FloatingInput>
    </>
  );
};

export default AddItem;
