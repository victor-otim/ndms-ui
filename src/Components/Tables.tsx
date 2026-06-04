import type { ReactNode } from "react"

export function TableHeaderCell ({children, classes} : {children: ReactNode, classes?: string}) {
    return (
        <th scope={"col"}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${classes}`}>
            {children}
        </th>
    )
}

export function TableCell ({children, classes} : {children: ReactNode, classes?: string}) {
    return (
        <td className={`px-6 py-3 whitespace-nowrap align-top ${classes}`}>
            <div className={"flex items-center grow"}>
                <div className={"text-sm xl:text-sm font-normal text-gray-500 w-full"}>
                    {children}
                </div>
            </div>
        </td>
    )
}
