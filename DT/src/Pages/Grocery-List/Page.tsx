import { ShoppingCart } from "lucide-react";
import Lists from "../../Components/Grocery-list/Lists";
import AnimatedPage from "../../Components/UI/Animated-Container";
import { useState } from "react";
import { createPortal } from "react-dom";
import GroceryItem from "../../Components/Grocery-list/GroceryItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Model/AxiosInstance";
import ListHeader from "../../Components/UI/List-Header";

interface promiseType {
  list_id: number;
}

const fetchAddList = async (): Promise<promiseType> => {
  const { data } = await axiosInstance.post("/grocery/add-list");
  return data;
};

export default function GroceryList() {
  const [isAdd, setIsAdd] = useState(false);
  const [newListId, setNewListId] = useState(0);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: fetchAddList,
    onSuccess: (data) => {
      setNewListId(data.list_id);
      setIsAdd(true);
      queryClient.invalidateQueries({queryKey: ['grocery-lists']});
    },
    onError: (error)=>{
      console.error(error);
    }
  });

  const onAdd = () => {
    mutate();
  };

  return (
    <>
      {isAdd &&
        createPortal(
          <GroceryItem onClose={() => setIsAdd(false)} listId={newListId} />,
          document.getElementById("mainPage")!
        )}
      <AnimatedPage className="container">
        <ListHeader title="Grocery List" addFunc={onAdd} Icon={ShoppingCart}/>
        <Lists />
      </AnimatedPage>
    </>
  );
}
