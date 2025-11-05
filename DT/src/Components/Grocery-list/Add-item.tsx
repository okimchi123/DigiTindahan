import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface props {
  isOpen: boolean;
  onExit: () => void;
}

const AddItem: React.FC<props> = ({ isOpen, onExit }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        const visualViewport = window.visualViewport;
        if (visualViewport) {
          const keyboardHeight = window.innerHeight - visualViewport.height;
          setKeyboardHeight(keyboardHeight);
        }
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, [isOpen]);

  const onClose = () => {
    gsap.to('#add',{
      duration: 0.1,
      scale: 0,
      opacity: 0,
      onComplete: ()=>{
      setKeyboardHeight(0);
      onExit();  
      }
    })
  };

  useGSAP(()=>{
    gsap.to('#add',
    { 
      duration: 0.08, 
      opacity:1,
      scale: 1, 
      ease: "expo.out"
    }
  )
  },[])

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/10 z-10" />
      <div
        id="add"
        className={`fixed flex flex-col scale-0 gap-4 px-5 left-0 right-0 pt-5 pb-4 bg-white rounded-t-xl z-20 transition-all `}
        style={{bottom: `${keyboardHeight}px`}}
      >
        <nav
          aria-label="Close dialog"
          className="w-full flex items-center gap-1"
        >
          <button className="p-1" onClick={onClose}>
            <X size="24" />
          </button>
          <h1 className="font-semibold text-lg">New Item</h1>
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
      </div>
    </>
  );
};

export default AddItem;
