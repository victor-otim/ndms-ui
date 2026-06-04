import Input from "./Input.tsx";
import Label from "./Label.jsx";
import Error from "./Error.jsx";
import { type ReactNode } from "react";
import Dropdown from "./Dropdown.tsx";

export default function Field({type = 'text', name, label, placeholder, value, error, selectOptions, selectOptionsValueKey, selectOptionsTextKey, handleChange, readOnly = false, required = false} : {type?: string, name: string, label: string, placeholder?: string, value?: string, rows?: number, error?: string, selectOptions?: {}[], selectOptionsValueKey?: string, selectOptionsTextKey?: string, handleChange?: (e: any)=>void, readOnly?: boolean, required?: boolean})
{
    let inputHTML: ReactNode;

    switch (type) {

        case 'dropdown':
            inputHTML = <Dropdown placeholder={placeholder} name={name} options={selectOptions ?? []} valueKey={selectOptionsValueKey || 'value'} textKey={selectOptionsTextKey || 'text'} selectedValue={value} onChangeEventHandler={handleChange || (() => {})}/>
            break;

        default:
            inputHTML = <Input type={type} name={name} value={value} placeholder={placeholder} onChangeEventHandler={handleChange} readOnly={readOnly}/>
    }

    return (
        <div>
            {label !== '' && <Label labelFor={name}>
                {`${label}${required ? ' *' : ''}`}
            </Label>}
            <div>
                {inputHTML}
            </div>
            {error !== null ? <Error message={error || ''}/> : ''}
        </div>
    )
}
