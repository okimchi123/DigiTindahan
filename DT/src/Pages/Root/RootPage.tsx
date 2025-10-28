import { Outlet } from "react-router-dom";

export function RootPage () {
  return (
    <main className="w-full h-full relative flex flex-col items-center justify-start">
        <Outlet />
    </main>
  );
}
