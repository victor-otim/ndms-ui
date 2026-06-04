import { useEffect, useState } from 'react'
import { useApi } from './Utils/Api'
import DeviceList from "./Components/DeviceList";
import SearchBar from "./Components/SearchBar";
import type { Device } from './Utils/Common';

export default function Dashboard() {
    const {getDBList} = useApi()
    const [deviceList, setDeviceList] = useState<Device[]>([])

    
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDBList({endPoint: {url: 'devices', method: 'GET'}})
      setDeviceList(data)
    }
    fetchData()
  }, [])

    return (
        <div className={"p-4"}>
            <h1 className={"text-2xl font-medium mb-4"}>Dashboard</h1>
            <section className="text-left">
                <div className="flex flex-col gap-4 p-4">
                <SearchBar btnAddText={'Add Device'} btnAddLink={'add-device'}/>
                </div>
            </section>

            <section className="text-left">
                <div className="flex flex-col gap-4 p-4">
                <DeviceList list={deviceList} />
                </div>
            </section>
        </div>
    )
}