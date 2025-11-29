import type { LucideIcon } from "lucide-react";

interface propType{
    title: string;
    addFunc: () => void;
    Icon: LucideIcon;
    AddIcon: LucideIcon;
}

const ListHeader: React.FC<propType> = ({ title, addFunc, Icon, AddIcon}) => {

    return(
        <div className="header-cont gap-4">
          <h1 className="header-font flex gap-2 items-center"> <Icon size='34' className="text-primary"/> {title}</h1>
          <button onClick={addFunc} className="p-3 bg-primary rounded-full">
            <AddIcon size="26" color="white" />
          </button>
        </div>
    )
}

export default ListHeader;