import CustomSearch from "../UI/Search";
import GroceryItem from "./GroceryItem";
import { useState } from "react";
import { createPortal } from "react-dom";

interface props {
  Date: string;
  Preview: string;
}
const List: props[] = [
    {
      Date: "Sunday, October 26, 2025",
      Preview: "Piatos blue - 10",
    },
    {
      Date: "Wed, October 15, 2025",
      Preview: "555 green - 8",
    },
  ];

export default function Lists() {
  const [modal, setModal] = useState(false);

  return (
    <>
    { modal && createPortal(<GroceryItem onClose={()=>setModal(false)} />, document.getElementById('mainPage')!)}
      <section className="flex flex-col gap-2 w-[80%]">
        <CustomSearch />
        <ul className="flex flex-col gap-4">
          {List.map((i) => (
            <li key={i.Date}>
              <button
              onClick={()=>setModal(true)}
                aria-haspopup="dialog"
                className="bg-input w-full flex flex-col items-start py-4 pl-2 rounded-xl"
              >
                <h2 className="font-bold text-xl">{i.Date}</h2>
                <p className="font-semibold text-gray text-lg">{i.Preview}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
