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
import { Trash2, Trash } from "lucide-react";
import useDeleteItems from "../../Hooks/GroceryListAPI/DeleteItems";

interface props {
  onClose: () => void;
  listId: number | null;
}

const GroceryItem: React.FC<props> = ({ onClose, listId }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [data, setData] = useState<todoItem[] | null>(null);
  const getItemMutation = useItems();
  const clickItemMutation = useClickItem();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState<number[]>([])
  const [toggleFetch, setToggleFetch] = useState(false);

  const {mutate} = useDeleteItems();

  const handleChoose = (e: number) => {
    setDeleteItem(prev => prev.includes(e) ? prev.filter(id => id !== e) : [...prev, e]);
  }

  const checkStatus = (e: number) => {
    return deleteItem.find(id => id === e);
  }

  const toggleDelete = () => {
    setIsDelete(prev => !prev);
    setDeleteItem([]);
  }

  const handleDelete = () => {
    if (!deleteItem.length) return;

      mutate({ ids: deleteItem }, {
        onSuccess: ()=> {
        setIsDelete(false);
        setToggleFetch(prev => !prev);
      },onError: () => {
        setIsDelete(false);
      }})
  };

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
  }, [listId, isAddOpen, toggleFetch]);

  const onClick = (e: todoItem) => {
    clickItemMutation.mutate({ value: e.is_completed ? false : true, item_id: e.item_id, list_id: e.list_id }, {
      onSuccess: () => {
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
          className="w-full relative flex justify-between pr-4 py-4"
        >
          <div onClick={closeModal} className="flex items-center select-none">
            <button>
              <ChevronLeft size="31" />
            </button>
            <h1 className="text-[18px] font-bold">Grocery To-Do List</h1>
          </div>
          <div>
            {isDelete && <button
              onClick={handleDelete}
              className={
                clsx("fixed font-bold top-5 right-16 transition-all", {
                  "text-red-500 text-xl": deleteItem.length,
                  "text-gray text-lg": !deleteItem.length
                })}> Delete all </button>}

            <button onClick={toggleDelete} type="button">
              <Trash2 size='28' color="red" />
            </button>
          </div>

        </nav>
        <section className="w-[88%] px-2 max-h-[90%] overflow-y-auto flex flex-col gap-2 py-2">
          {data &&
            data.map((item) => (
              <div
                onClick={() => isDelete ? handleChoose(item.item_id) : onClick(item)}
                className={clsx("list-card", {
                  "border-input bg-input": item.is_completed,
                  "shadow-[0_3px_10px_rgb(0,0,0,0.2)]": !item.is_completed,
                  "border-red-400 bg-red-400":checkStatus(item.item_id)
                })}
                key={item.item_id}
              >
                <div>
                  <label className="flex items-center gap-2">
                    {isDelete ? (
                      <div
                        className={clsx(
                          "w-9 h-9 rounded bg-white border-2 border-red-500 flex items-center justify-center",
                          {
                            " border-white": checkStatus(item.item_id),
                            "": !checkStatus(item.item_id),
                          }
                        )}
                      >
                        {checkStatus(item.item_id) && <Trash size="22" color="red" />}
                      </div>) : (
                      <div
                        className={clsx(
                          "w-9 h-9 rounded border-2 border-primary flex items-center justify-center",
                          {
                            "bg-white border-white": item.is_completed,
                            "": !item.is_completed,
                          }
                        )}
                      >
                        {item.is_completed && <Check size="22" color="green" />}
                      </div>)}

                    <span className={`${checkStatus(item.item_id) && 'text-white'}`}>{item.product_name}</span>
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