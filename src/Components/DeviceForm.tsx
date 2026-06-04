import {useEffect, useState} from "react"
import {useNavigate, useLoaderData} from "react-router-dom"
import Button from "./Form/Button.tsx"
import Field from "./Form/Field.tsx"
import {Notice} from "../../src/Utils/Common.tsx"
import {HashLoader} from "react-spinners"
import { useDevices } from "../Hooks/useDevices.tsx"
import type { Device } from "../Utils/Common.tsx"
import { useDeviceTypes } from "../Hooks/useDeviceTypes.tsx"

// eslint-disable-next-line react/prop-types
const Form = () => {

    let emptyDevice : Device = {
        id: null,
        name: '',
        typeId: '',
        hostname: '',
        ipAddress: '',  
        serialNo: '',
        dateadded: null,
        isStale: null,
        deviceType: '',
        status: null      
    }

    const [errors, setErrors] = useState(emptyDevice)
    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()
    const currentDevice = useLoaderData() as Device || emptyDevice
    const [msg, setMsg] = useState<{type: string | null, text: React.ReactNode | null}>({type: null, text: null})
    const [deviceForm, setDeviceForm] = useState<Device>(currentDevice || emptyDevice)
    const {storeDevice} = useDevices()
    const {deviceTypes, fetchDeviceTypes} = useDeviceTypes()

    useEffect(() => {
        fetchDeviceTypes()
    }, [])
    
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setDeviceForm({
            ...deviceForm, 
            [e.target.name]: e.target.value,
        });
    }


    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true)
        setErrors(emptyDevice)
        setMsg({'type': null, 'text': null})

        storeDevice(deviceForm).then((result) => {
            console.log(result)
            if (result?.status == 201 && result?.data?.id) {
                setMsg({
                    type: 'success',
                    text: <Notice type={'success'} text={'The device data has been saved'}/>
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
                    text: <Notice type={"error"} text={err?.status == 403? `You are not authorized to add this device` : 'An error occurred while processing the request'}/>
                })

                console.log(err)
        }).finally(() => setLoading(false))
    }
    
    return (
        <form id="frm-device" autoComplete="off" onSubmit={handleSubmitForm}
              className={'flex flex-col space-y-4 form-container mt-8 bg-white border-[0.12em] border-slate-200 rounded-md shadow-md py-5 px-8'}>
            {msg?.text ?? ""}
            <div className="w-full py-4">
                <span className="font-medium text-lg">
                    Device details
                </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-10">

                <div className="col">
                    <Field label={"Name"} name={"name"} placeholder={"Device name e.g HQ Server, Boardroom Projector"}
                           value={`${deviceForm?.name}`} handleChange={handleInputChange} error={errors?.name} 
                           required={true}/>
                </div>

                <div className="col">
                    <Field label={"Serial no"} name={"serialNo"} placeholder={"Enter the device's serial no"}
                           value={`${deviceForm?.serialNo}`} handleChange={handleInputChange} error={errors?.serialNo} 
                           required={true}/>
                </div>

                <div className="col">
                    <Field 
                        type="dropdown"
                        label={"Device type"} 
                        name={"typeId"}
                        selectOptions={deviceTypes ?? []}
                        selectOptionsTextKey="type"
                        selectOptionsValueKey="id"
                        placeholder={"Select type"} 
                        value={deviceForm?.typeId}
                        handleChange={handleInputChange}
                        error={errors?.typeId}
                        required={true}
                    />
                </div>
                
                <div className="col">
                    <Field label={"Host name"} name={"hostname"} type="host name" placeholder={"Enter device's host name"}
                           value={deviceForm?.hostname} handleChange={handleInputChange} error={errors?.hostname} 
                           required={true}/>
                </div>  
                
                <div className="col">
                    <Field label={"IP Address"} name={"ipAddress"} placeholder={"Enter device's IP Address"}
                            value={deviceForm?.ipAddress} handleChange={handleInputChange} error={errors?.ipAddress}/>
                </div>

            </div>
            
            <div className="text-center py-6">
                {loading ? <HashLoader color={"#0f9d59"}/> : <Button name={"save"} type={"submit"} text={"SAVE"}/>}
            </div>

        </form>)
}

export default Form
