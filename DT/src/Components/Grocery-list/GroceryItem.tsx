import AnimatedPage from "../UI/Animated-Container";
import gsap from "gsap";
import { ChevronLeft, Plus } from "lucide-react";
import AddItem from "./Add-item";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import useItems from "../../Hooks/GroceryListAPI/FetchItems";
import type { todoItem } from "../../Hooks/GroceryListAPI/FetchItems";
import useClickItem from "../../Hooks/GroceryListAPI/ClickItem";

interface props {
  onClose: () => void;
  listId: number | null;
}

const GroceryItem: React.FC<props> = ({ onClose, listId }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [data, setData] = useState<todoItem[] | null>(null);
  const getItemMutation = useItems();
  const clickItemMutation = useClickItem();

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
    getItemMutation.mutate(
      { list_id: listId },
      {
        onSuccess: (data) => {
          setData(data);
        },
      }
    );
  }, [listId, isAddOpen]);
  const onClick = (e:todoItem) => {
    clickItemMutation.mutate({value: e.is_completed ? false : true, item_id: e.item_id, list_id: e.list_id},{
      onSuccess: ()=>{
        getItemMutation.mutate({ list_id: listId },
      {
        onSuccess: (data) => {
          setData(data);
        },
      });
      }
    });
  }

  return (
    <>
      {isAddOpen && (
        <AddItem isOpen={isAddOpen} onExit={() => setIsAddOpen(false)} list_id={listId} />
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
        </nav>
        <section className="w-[85%] flex flex-col gap-2 py-2">
          {data &&
            data.map((item) => (
              <div
              onClick={()=>onClick(item)}
                className={clsx("list-card", {
                  "border-input bg-input": item.is_completed,
                  "border-gray": !item.is_completed,
                })}
                key={item.item_id}
              >
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={item.is_completed}
                      readOnly
                    />
                    <div
                      className={clsx(
                        "w-9 h-9 rounded border-2 flex items-center justify-center",
                        {
                          "bg-white border-white": item.is_completed,
                          "": !item.is_completed,
                        }
                      )}
                    >
                      {item.is_completed && <Check size="22" color="green" />}
                    </div>
                    <span>{item.product_name}</span>
                  </label>
                </div>
                <span>{item.product_quantity}</span>
              </div>
            ))}
        </section>
        <button
          onClick={() => setIsAddOpen(true)}
          className="absolute bottom-10 right-10 p-3 bg-primary rounded-full"
        >
          <Plus size="26" color="white" />
        </button>
      </AnimatedPage>
    </>
  );
};

export default GroceryItem;
