import { TableCell, TableHeaderCell } from "./Tables.tsx";
import { Link } from "react-router-dom";
import { formatDateTime, type Device} from "../Utils/Common.tsx";

export default function DeviceList({ list }: { list: Device[] }) {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <TableHeaderCell children="Name" />
                        <TableHeaderCell children="Type" />
                        <TableHeaderCell children="Hostname" />
                        <TableHeaderCell children="Stale" />
                        <TableHeaderCell children="Status" />
                        <TableHeaderCell children="Date Added" />
                        <TableHeaderCell children="" />
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {list.map((device: Device) => (
                        <tr key={device.id}>
                            <TableCell>
                                <Link to={`/device/${device.id}/reports`} className="text-slate-700 hover:text-indigo-900">
                                    <span className={'size-4 font-medium'}>{device.name}</span>
                                </Link>
                            </TableCell>
                            <TableCell children={device.deviceType} />
                            <TableCell children={device.hostname} />
                            <TableCell>
                                {device.isStale == 'Y' && <span className="text-red-500 font-medium">Stale</span>}
                                {device.status == 'N' && <span className="text-green-500 font-medium">Fresh</span>}
                            </TableCell>
                            <TableCell>
                                {device.status == 'ONLINE' && <span className="text-green-500 font-medium">Online</span>}
                                {device.status == 'OFFLINE' && <span className="text-orange-500 font-medium">Offline</span>}
                                {device.status == 'DEGRADED' && <span className="text-red-500 font-medium">Degraded</span>}
                            </TableCell>

                            <TableCell children={formatDateTime({dateTime: device.dateadded?? ''})} />
                            <TableCell>
                                <div className="w-full text-right text-sm font-medium flex flex-row flex-wrap justify-end gap-2">  
                                    <Link to={`/device/${device.id}/submit-status`} className="text-slate-700 hover:text-indigo-900">
                                        <span className={'size-4'}>Report status</span>
                                    </Link>
                                </div>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
