import CustomSearch from "../UI/Search";
import GroceryItem from "./GroceryItem";
import { useState } from "react";
import { createPortal } from "react-dom";
import useGroceryLists from "../../Hooks/GroceryListAPI/FetchGrocery";
import dayjs from "dayjs";

export default function Lists() {
  const [modal, setModal] = useState(false);
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const { data, isLoading, isError } = useGroceryLists();

  const onSelect = (i: number) => {
  setSelectedList(i)
  setModal(true)
  }

  return (
    <>
    { modal && createPortal(<GroceryItem onClose={()=>setModal(false)} listId={selectedList} />, document.getElementById('mainPage')!)}
      <section className="flex flex-col gap-2 w-[80%]">
        <CustomSearch />
        {data?.length && (
          <ul className="flex flex-col gap-4">
          {data.map((i) => (
            <li key={i.created_at}>
              <button
              onClick={()=>onSelect(i.list_id)}
                aria-haspopup="dialog"
                className="bg-input w-full flex flex-col items-start py-4 pl-2 rounded-xl"
              >
                <h2 className="font-bold text-xl">{dayjs(i.list_name).format('MMMM D, YYYY')}</h2>
                <p className="font-semibold text-gray text-lg">{i.latest_item} - {i.latest_item_quantity}</p>
              </button>
            </li>
          ))}
        </ul>
        )}
        
      </section>
    </>
  );
}
