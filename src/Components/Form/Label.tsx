
export default function Label ({labelFor, children}: {labelFor: string, children: string}) {
    return (
        <label className={"block mb-2 text-sm font-medium text-gray-900"} htmlFor={labelFor}>
            {children}
        </label>
    )
}
