import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <main className="w-full h-full relative flex flex-col items-center justify-start">
      <nav className="w-[85%] py-4">
        <h1 className="text-[18px] font-bold">
          <span className="text-primary">D</span>igi
          <span className="text-primary">T</span>indahan
        </h1>
      </nav>
      <Outlet />
    </main>
  );
}
