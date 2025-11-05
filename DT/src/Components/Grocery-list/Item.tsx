import AnimatedPage from "../UI/Animated-Container";
import gsap from "gsap";
import { ChevronLeft, Plus } from "lucide-react";
import AddItem from "./Add-item";
import { useEffect, useState } from "react";
import GroceryDummy from "../../Model/Dummy";
import SingleItem from "./Single-Item";
import clsx from "clsx";

interface props {
  onClose: () => void;
  isAdd: boolean;
}

const Item: React.FC<props> = ({ isAdd, onClose }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const closeModal = () => {
    gsap.to(".modal", {
      x: "100%",
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        onClose();
      },
    });
  };

  useEffect(() => {
    if (isAdd) {
      setTimeout(() => {
        setIsAddOpen(true);
      }, 250);
    }
  }, []);

  return (
    <>
      {isAddOpen && (
        <AddItem isOpen={isAddOpen} onExit={() => setIsAddOpen(false)} />
      )}
      <AnimatedPage className="modal">
        <nav
          aria-label="Close dialog"
          className="w-full flex justify-between pr-4 py-4"
        >
          <div className="flex items-center">
            <button onClick={closeModal}>
              <ChevronLeft size="31" />
            </button>
            <h1 className="text-[18px] font-bold">Grocery To-Do List</h1>
          </div>
          <button className="text-primary/70 font-bold p-1 text-lg">
            Save
          </button>
        </nav>
        <section className="w-[85%] flex flex-col gap-2 py-2">
          {GroceryDummy.map((item) => (
            <div
              className={clsx("list-card", {
                "border-input bg-input":item.checked,
                "border-gray":!item.checked
              })}
              key={item.id}
            >
              <SingleItem item={item} />
            </div>
          ))}
        </section>
        <button onClick={()=>setIsAddOpen(true)} className="absolute bottom-10 right-10 p-3 bg-primary rounded-full">
          <Plus size="26" color="white" />
        </button>
      </AnimatedPage>
    </>
  );
};

export default Item;
