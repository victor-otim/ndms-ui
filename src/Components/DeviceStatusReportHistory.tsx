import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { HashLoader } from "react-spinners"
import { formatDateTime, type Device } from "../Utils/Common.tsx"
import { endpoints, useApi } from "../Utils/Api.tsx"

type StatusReport = {
  id: number | null
  dateadded: string
  status: string
  message: string
}

const emptyDevice: Device = {
  id: null,
  name: '',
  serialNo: '',
  deviceType: '',
  typeId: '',
  hostname: '',
  ipAddress: '',
  isStale: null,
  status: null,
  dateadded: null,
  statusReports: null,
}

export default function DeviceStatusReportHistory() {
  const { id } = useParams()
  const { getDBItem} = useApi()
  const [device, setDevice] = useState<Device>(emptyDevice)
  const [reports, setReports] = useState<StatusReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDeviceAndReports() {
      if (!id) {
        setError('Device ID is required.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const deviceResponse = await getDBItem({ endPoint: endpoints.getDevice, id })
        const fetchedDevice = (deviceResponse?.data ?? null) as Device | null
        if (fetchedDevice) {
          setDevice(fetchedDevice)
        }

        const reportData = fetchedDevice?.statusReports ?? []

        const normalized = Array.isArray(reportData) ? reportData.slice(0, 20).map((report: any) => ({
          id: report.id ?? null,
          dateadded: report.dateadded ?? report.date ?? report.createdAt ?? report.timestamp ?? '',
          status: report.status ?? '',
          message: report.message ?? report.note ?? '',
        })) : []

        setReports(normalized)
      } catch (err) {
        console.error(err)
        setError('Failed to load device or status report history. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadDeviceAndReports()
  }, [])

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Device page</p>
          <h1 className="text-2xl font-semibold text-slate-900">{device?.name || 'Device details'}</h1>
          <p className="text-sm text-slate-600">Last 20 status reports for this device.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/device/${id}/submit-status`} className="inline-flex items-center rounded-lg bg-[#050708] px-4 py-2 text-sm font-medium text-white hover:bg-[#050708]/90">
            Report status
          </Link>
          <Link to="/" className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm text-slate-500">Device name</div>
            <div className="font-medium text-slate-900">{device.name || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">Hostname</div>
            <div className="font-medium text-slate-900">{device.hostname || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">IP address</div>
            <div className="font-medium text-slate-900">{device.ipAddress || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">Serial number</div>
            <div className="font-medium text-slate-900">{device.serialNo || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-slate-500">Registered</div>
            <div className="font-medium text-slate-900">{device.dateadded ? formatDateTime({ dateTime: device.dateadded }) : 'N/A'}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Status report history</h2>
            <p className="text-sm text-slate-600">Showing the most recent 20 records.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <HashLoader color="#0f9d59" />
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-100 p-4 text-sm text-red-900">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Report date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">
                      No status reports found for this device.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={`${report.id}-${report.dateadded}`}>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        {report.dateadded ? formatDateTime({ dateTime: report.dateadded }) : 'Unknown'}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        {report.status == 'ONLINE' && <span className="text-green-500 font-medium">Online</span>}
                        {report.status == 'OFFLINE' && <span className="text-red-500 font-medium">Offline</span>}
                        {report.status == 'DEGRADED' && <span className="text-yellow-500 font-medium">Degraded</span>}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-700 break-words">{report.message || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
