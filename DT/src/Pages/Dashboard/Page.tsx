import { Link } from "react-router-dom";
import DashHeader from "../../Components/Dashboard/Header";
import Actions from "../../Model/Actions";
import { ChevronRight } from "lucide-react";

export default function Dashboard () {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <DashHeader />
      <section className="w-[83%] mt-2">
        <h4 className="font-semibold">Choose your Actions</h4>
        <div className="flex flex-col gap-3">
            {Actions.map((item)=>(
                <Link key={`${item.title}`} to={`${item.route}`}>
                    <div className="relative flex gap-2 rounded-lg items-center bg-greenCard py-4 pl-2">
                        <div className="p-2 bg-white/40 rounded-lg"><item.icon size='32' color="white" /></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-white font-bold text-[18px] leading-5">{item.title}</h3>
                            <p className="text-[#E0FFE7] text-sm font-semibold leading-4">{item.subtitle}</p>
                        </div>
                        <ChevronRight size='32' color='white' className="absolute right-1" />
                    </div>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
