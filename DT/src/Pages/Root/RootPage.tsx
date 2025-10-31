import { Outlet, useLocation, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import clsx from "clsx";

export default function RootPage() {
  const location = useLocation();
  const {pathname} = location;

  return (
    <main className="w-full h-full relative flex flex-col items-center justify-start">
      <nav className={clsx("py-4",{
        "w-full":pathname !== '/dashboard',
        "w-[83%]":pathname === '/dashboard',
      })}>
        <div className="flex items-center">
          {pathname !== '/dashboard' && <Link to='/dashboard'><ChevronLeft size='31'/></Link>}
        <h1 className={`text-[18px] font-bold ${pathname !== '/dashboard' ? "mb-0.5":"mt-px"}`}>
          <span className="text-primary">D</span>igi
          <span className="text-primary">T</span>indahan
        </h1>
        </div>
      
      </nav>
      <Outlet />
    </main>
  );
}
