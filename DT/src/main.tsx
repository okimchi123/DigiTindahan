import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Style/App.css'
import LandingPage from './Pages/Landing/Page.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/", element:<LandingPage/>},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
