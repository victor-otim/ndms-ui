import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "./Form/Button.tsx"
import Field from "./Form/Field.tsx"
import { useDevices } from "../Hooks/useDevices.tsx"
import { formatDateTime, Notice, type Device } from "../Utils/Common.tsx"
import { HashLoader } from "react-spinners"

const statusOptions = [
  { value: "ONLINE", text: "Online" },
  { value: "OFFLINE", text: "Offline" },
  { value: "DEGRADED", text: "Degraded" },
]

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

export default function DeviceStatusReportForm() {
  const { id } = useParams()
  const [device, setDevice] = useState<Device>(emptyDevice)
  const navigator = useNavigate()
  const [status, setStatus] = useState("Online")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{type: 'success' | 'error' | null; text: ReactNode | null}>({type: null, text: null})
  const { fetchDevice, reportStatus } = useDevices()

  useEffect(() => {
    async function loadDevice() {
      if (!id) {
        return
      }
      setLoading(true)
      const fetched = await fetchDevice(id)
      if (fetched) {
        setDevice(fetched)
      }
      setLoading(false)
    }

    loadDevice()
  }, [])

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    if (e.target.name === 'status') {
      setStatus(e.target.value)
    } else if (e.target.name === 'message') {
      setMessage(e.target.value)
    }
  }

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMsg({type: null, text: null})

    reportStatus({
        deviceId: id,
        status,
        message: message.trim(),
      }).then((result) => {
            if (result?.status == 201 && result?.data?.id) {
                setMsg({
                    type: 'success',
                    text: <Notice type={'success'} text={'Device status report has been submitted.'}/>
                })

                navigator('/')

            } else {
                setMsg({
                    type: 'error',
                    text: <Notice type={'error'} text={'An error occured when processing the form'}/>
                })

            }
            console.log(result)
        }).catch((err) => {
                setMsg({
                    type: 'error',
                    text: <Notice type={"error"} text={err?.status == 403? `You are not authorized to add this report` : 'An error occurred while processing the request'}/>
                })

                console.log(err)
        }).finally(() => setLoading(false))

  }

  return (
    <form
      id="frm-device-status"
      autoComplete="off"
      onSubmit={handleSubmitForm}
      className="flex flex-col space-y-6 form-container mt-8 bg-white border-[0.12em] border-slate-200 rounded-md shadow-md py-5 px-8"
    >
      {msg?.text ?? ''}

      <div className="w-full py-4">
        <span className="font-medium text-lg">Report device status</span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm uppercase tracking-wide text-slate-500">Reporting on</div>
            <div className="font-semibold text-xl">{device?.name || 'Unknown device'}</div>
            <div className="text-sm text-slate-600">{device?.deviceType || device?.hostname || 'Device details'}</div>
          </div>
          <div className="text-sm text-slate-600 text-right">
            <div className="font-medium">Device ID</div>
            <div>{device?.id ?? id ?? 'N/A'}</div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="text-sm text-slate-700">
            <span className="font-medium">Hostname:</span> {device?.hostname || '–'}
          </div>
          <div className="text-sm text-slate-700">
            <span className="font-medium">IP Address:</span> {device?.ipAddress || '–'}
          </div>
          <div className="text-sm text-slate-700">
            <span className="font-medium">Serial no:</span> {device?.serialNo || '–'}
          </div>
          <div className="text-sm text-slate-700">
            <span className="font-medium">Added:</span>{' '}
            {device?.dateadded ? formatDateTime({dateTime: device.dateadded}) : 'N/A'}
          </div>
        </div>

        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <HashLoader color="#0f9d59" size={22} />
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="col">
          <Field
            type="dropdown"
            label="Status"
            name="status"
            selectOptions={statusOptions}
            selectOptionsTextKey="text"
            selectOptionsValueKey="value"
            placeholder="Select status"
            value={status}
            handleChange={handleInputChange}
            required={true}
          />
        </div>

        <div className="col md:col-span-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-700">
            Message <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={handleInputChange}
            className="w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            placeholder="Optional details about the device state"
          />
        </div>
      </div>

      <div className="text-center py-6">
        {saving ? <HashLoader color="#0f9d59" /> : <Button name="submit" type="submit" text="SEND REPORT" />}
      </div>
    </form>
  )
}
