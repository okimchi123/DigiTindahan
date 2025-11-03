import { Plus } from "lucide-react";
import Lists from "../../Components/Grocery-list/Lists";

export default function GroceryList() {
  return (
    <>
      <div className="header-cont gap-4">
        <h1 className="header-font">Grocery list</h1>
        <button className="p-3 bg-primary rounded-full">
          <Plus size="26" color="white" />
        </button>
      </div>
      <Lists />
    </>
  );
}
