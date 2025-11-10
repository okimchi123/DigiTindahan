import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../Auth/AuthStore";
import { Outlet } from "react-router-dom";

export default function OutsideRoot() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated || user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="w-full h-full relative flex justify-center items-center">
        <Outlet/>
    </main>
  );
}