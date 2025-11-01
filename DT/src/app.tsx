import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/Landing/Page';
import RootPage from './Pages/Root/RootPage';
import NotFoundPage  from './Pages/NotFound/Page';
import Dashboard from './Pages/Dashboard/Page';
import CalculateProfit from './Pages/CalculateProfit/Page';
import GroceryList from './Pages/Grocery-List/Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
    return <RouterProvider router={router} />;
}
export default App;