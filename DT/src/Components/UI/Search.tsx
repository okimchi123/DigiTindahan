import { Search } from "lucide-react";

export default function CustomSearch() {
  return (
    <div className="w-full relative">
        <Search size='18' color="white" className="absolute left-2 top-2.5"/>
        <input className="bg-light-gray text-white text-md rounded-xl pl-8 py-2 font-bold w-full" type="text" placeholder="Search" />
      </div>
  );
}
