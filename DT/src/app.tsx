import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './Pages/Landing/Page';
import RootPage from './Pages/Root/RootPage';
import NotFoundPage  from './Pages/NotFound/Page';
import Dashboard from './Pages/Dashboard/Page';
import CalculateProfit from './Pages/CalculateProfit/Page';
import GroceryList from './Pages/Grocery-List/Page';
import LoginPage from './Pages/Lock/Login';
import SignupPage from './Pages/Lock/Signup';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path:'/signup',
    element: <SignupPage />
  },
  {
    element: <RootPage />,
    //change this element as protectedRoute in the future
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/calculate-profit',
        element: <CalculateProfit />,
      },
      {
        path: '/grocery-list',
        element: <GroceryList />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

function App(){
    return <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
}
export default App;