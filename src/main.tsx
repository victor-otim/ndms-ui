import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import Dashboard from './Dashboard.tsx'
import DeviceForm from './Components/DeviceForm.tsx'
import DeviceStatusReportForm from './Components/DeviceStatusReportForm.tsx'
import DeviceStatusReportHistory from './Components/DeviceStatusReportHistory.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "add-device",
        element: <DeviceForm />,
      },
      {
        path: "device/:id",
        element: <DeviceForm />,
      },
      {
        path: "device/:id/submit-status",
        element: <DeviceStatusReportForm />,
      },
      {
        path: "device/:id/reports",
        element: <DeviceStatusReportHistory />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

