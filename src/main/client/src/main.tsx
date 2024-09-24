import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from "./routes/root.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [

        ]
    },

])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
