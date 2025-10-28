import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/Landing/Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
]);

function App(){
    return <RouterProvider router={router} />;
}
export default App;