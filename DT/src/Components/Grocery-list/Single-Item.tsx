import { Check } from "lucide-react";
import clsx from "clsx";

interface props {
  item: {
    id: number;
    product: string;
    productQTY: number;
    checked: boolean;
  };
}

const SingleItem: React.FC<props> = ({ item }) => {

  return (
    <>
      <div>
        <label className="flex items-center gap-2 active:bg-gray-50">
          <input
            type="checkbox"
            className="sr-only"
            checked={item.checked}
            readOnly
          />
          <div className={clsx("w-9 h-9 rounded border-2 flex items-center justify-center",{
            "bg-white border-white":item.checked,
            "":!item.checked
          })}>
            {item.checked && <Check size='22' color="green" />}
          </div>
          <span>
            {item.product}
          </span>
        </label>
      </div>
      <span>{item.productQTY}</span>
    </>
  );
};

export default SingleItem;
