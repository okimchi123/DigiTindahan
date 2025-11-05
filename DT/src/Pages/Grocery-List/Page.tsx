import { Plus } from "lucide-react";
import Lists from "../../Components/Grocery-list/Lists";
import AnimatedPage from "../../Components/UI/Animated-Container";
import Item from "../../Components/Grocery-list/CreateItem";
import { useState } from "react";

export default function GroceryList() {
  const [modal, setModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  
  const onAdd = () => {
    setModal(true);
    setIsAdd(true);
  }

  return (
    <>
    { modal && <Item isAdd={isAdd} onClose={()=>setModal(false)} />}
    <AnimatedPage className="container">
      <div className="header-cont gap-4">
        <h1 className="header-font">Grocery list</h1>
        <button onClick={onAdd} className="p-3 bg-primary rounded-full">
          <Plus size="26" color="white" />
        </button>
      </div>
      <Lists />
    </AnimatedPage>
    </>
    
  );
}
