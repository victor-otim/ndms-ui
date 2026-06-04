import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <section className="flex flex-row text-white text-left">
        <div className="flex flex-col gap-2 p-4">
            <span className="text-2xl font-medium">NDMS</span>
            <span className="text-lg">Network Device Monitoring Service</span>
        </div>
      </section>
      <section className="flex flex-row text-white text-left">
        <Outlet />
      </section>
    </>
  )
}

export default App
