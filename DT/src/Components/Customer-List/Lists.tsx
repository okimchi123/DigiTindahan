import { ChevronRight} from "lucide-react";
import CustomSearch from "../../Components/UI/Search";

const Lists: React.FC = () => {
    return(
        <section className="w-[80%] flex flex-col gap-2">
        <CustomSearch />
        <ul className="flex flex-col gap-4">
          <li className="relative">
            <button
              aria-haspopup="dialog"
              className="relative bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] select-none w-full flex flex-col items-start justify-center h-22 pl-4 rounded-xl"
            >
              <h2 className="font-bold text-2xl">
                    Miko
              </h2>
              <ChevronRight size="22" className="absolute right-1" />
            </button>
          </li>
        </ul>
      </section>
    )
}

export default Lists;