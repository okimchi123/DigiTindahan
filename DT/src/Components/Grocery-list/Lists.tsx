import GroceryItem from "./GroceryItem";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import useGroceryLists from "../../Hooks/GroceryListAPI/FetchGrocery";
import dayjs from "dayjs";
import type { GroceryListType } from "../../Hooks/GroceryListAPI/FetchGrocery";
import clsx from "clsx";
import { Check, Trash2, ChevronRight } from "lucide-react";
import useDeleteLists from "../../Hooks/GroceryListAPI/DeleteLists";
import useFinishedLists from "../../Hooks/GroceryListAPI/CheckFinishedLists";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Lists: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const { data } = useGroceryLists();
  const [deleteItem, setDeleteItem] = useState<number[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  
  const { data: finishedLists = [] } = useFinishedLists();

  const { mutate } = useDeleteLists();

  const onSelect = (i: number) => {
    setSelectedList(i)
    setModal(true)
  }

  const handleClick = (e: number) => {
    setDeleteItem(prev => prev.includes(e) ? prev.filter(id => id !== e) : [...prev, e]);
  }

  const checkStatus = (e: number) => {
    return deleteItem.find(id => id === e);
  }

  const handleDelete = () => {
    if (!deleteItem.length) return;
    try {
      mutate({ ids: deleteItem })
    } catch (error) {
      setIsDelete(false);
      return;
    } finally{
      setIsDelete(false);
    }
  };

  const finishedListIds = new Set(
    finishedLists.map(list => list.list_id)
  );

  useGSAP(() => {
  if (isDelete) {
    gsap.to("#delete-all", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(".checkbox-wrapper", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
}, [isDelete]);

const closeDelete = () => {
  gsap.to("#delete-all", {
      y: -130,
      duration: 0.2,
      ease: "power2.out",
      onComplete:()=>{
        setIsDelete(false);
        setDeleteItem([]);
      }
    });

    gsap.to(".checkbox-wrapper", {
      x: -100,
      duration: 0.2,
      ease: "power2.out",
    });
}

  return (
    <>
      {modal && selectedList !== null && createPortal(<GroceryItem onClose={() => setModal(false)} listId={selectedList} />, document.getElementById('mainPage')!)}
      {data?.length ? createPortal(<button onClick={isDelete ? closeDelete : ()=>setIsDelete(true)} className="fixed z-2 top-4 right-5"> <Trash2 size='28' color="red"/> </button>, document.getElementById('mainPage')!) : <></>}
      {isDelete && createPortal(
        <button
          onClick={handleDelete}
          id="delete-all"
           disabled={!deleteItem.length}
           className={
            clsx("fixed -translate-y-5 z-2 font-bold top-5 right-17 transition-all", {
              "text-red-500 text-xl": deleteItem.length,
              "text-gray text-lg": !deleteItem.length
            })}> Delete all </button>, document.getElementById('mainPage')!)}
      <section className="w-[80%]">
        {data?.length ? (
          <ul className="flex flex-col gap-4">
            {data.map((i: GroceryListType) => (
              <li className="relative" key={i.created_at}>
                {isDelete && (
                  <label className="absolute z-1 -left-9 inset-0 flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="sr-only"
                      onChange={() => handleClick(i.list_id)}
                    />
                    <div
                      className={clsx(
                        "w-7 h-7 checkbox-wrapper -translate-x-5 rounded border-2 border-red-500 flex items-center justify-center transition-all",
                        {
                          "bg-red-500": checkStatus(i.list_id),
                          "": !checkStatus(i.list_id),
                        }
                      )}
                    >
                      {checkStatus(i.list_id) && <Check size="22" color="white" />}
                    </div>
                  </label>
                )}

                <button
                  onClick={() => onSelect(i.list_id)}
                  aria-haspopup="dialog"
                  className={clsx("relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] select-none w-full flex flex-col items-start justify-center h-22 pl-2 rounded-xl",
                    {
                      "bg-input":finishedListIds.has(i.list_id),
                      "bg-white":!finishedListIds.has(i.list_id),
                    }
                  )}
                >
                  <h2 className="font-bold text-lg">{dayjs(i.list_name).format('MMMM D, YYYY hh:mm A')}</h2>
                  {i.latest_item && !finishedListIds.has(i.list_id) && <p className="font-semibold text-gray text-lg">{i.latest_item} - {i.latest_item_quantity}</p>}
                <ChevronRight size='22' className="absolute right-1" />
                </button>
              </li>
            ))}
          </ul>
        ) : <></>}

      </section>
    </>
  );
}

export default Lists;