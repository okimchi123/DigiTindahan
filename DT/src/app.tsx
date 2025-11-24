import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./Pages/Landing/Page";
import RootPage from "./Pages/Root/RootPage";
import NotFoundPage from "./Pages/NotFound/Page";
import Dashboard from "./Pages/Dashboard/Page";
import CalculateProfit from "./Pages/CalculateProfit/Page";
import GroceryList from "./Pages/Grocery-List/Page";
import CustomerList from "./Pages/Customer-List/Page";
import LoginPage from "./Pages/Lock/Login";
import SignupPage from "./Pages/Lock/Signup";
import { useAutoRefresh } from "./Hooks/useAutoRefresh";
import OutsideRoot from "./Pages/Landing/OutsideRoot";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <OutsideRoot />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <RootPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/calculate-profit",
        element: <CalculateProfit />,
      },
      {
        path: "/grocery-list",
        element: <GroceryList />,
      },
      {
        path: "/customer-credit",
        element: <CustomerList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function AppContent() {
  const { isLoading } = useAutoRefresh();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
export default App;
