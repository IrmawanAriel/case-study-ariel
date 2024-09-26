import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "./styles/output.css";

import RouterWithChildren from './router'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={RouterWithChildren} />
)
