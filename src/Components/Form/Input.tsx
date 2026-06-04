export default function Input({ name, type, placeholder, value, onChangeEventHandler, readOnly }: { name: string, type: string, placeholder?: string, value?: string, onChangeEventHandler?: (e: any) => void, readOnly?: boolean }) {
    return (
        <input type={type}
            onChange={onChangeEventHandler}
            id={name}
            name={name}
            placeholder={placeholder}
            title={placeholder}
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"}
            value={value}
            readOnly={readOnly} />
    )
}


