import { LogOut } from "lucide-react";
import { useRef, useEffect } from "react";
import { useLogout } from "../../Hooks/AuthAPI/LogoutUser";

interface props{
  onClose: ()=>void;
}

const SettingsModal: React.FC<props> = ({onClose}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const mutation = useLogout();

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div ref={modalRef} className="absolute py-3 w-30 -left-20 rounded-lg bg-white shadow-button flex justify-center">
      <button onClick={()=>mutation.mutate()} className="font-bold flex items-center gap-2 z-20">Log out <LogOut size='22'/></button>
    </div>
  );
}

export default SettingsModal;