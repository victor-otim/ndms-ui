export function formatDateTime({dateTime, includeTime = true} : {dateTime: string, includeTime?: boolean}): string {
    const date = new Date(dateTime)
    const currentDate = new Date()
    
    const timeDifference = currentDate.getTime() - date.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    const formattedDate = date.getUTCDate() + ' ' + date.toLocaleString('default', { month: 'short' }) + ', ' + date.getFullYear()
    const formattedTime = includeTime? ` at ` + date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }) : ''
    const actualDayDifference: number =  currentDate.getDay() - date.getDay()

    if (dayDifference < 1 && dayDifference > 0 && actualDayDifference < 1) {
        return `Today${formattedTime}`
     } else if (dayDifference < 2 && dayDifference > 0) {
        return `Yesterday${formattedTime}`
     } else if (dayDifference > 1 &&  dayDifference <= 2) {
        return `Two days ago${formattedTime}`
    }else if (dayDifference < 7) {
        return `${formattedDate}${formattedTime}`;
    } else {
        return formattedDate;
    }
}


export function Notice({type, text}: {type: 'success' | 'error', text: string}) {
    switch (type) {
        case 'error':
            return <div className="bg-red-100 text-red-950 px-3 py-2 border-l-4 border-red-700">
                <div className="p-2">{text}</div>
            </div>

        case 'success':
        default:
            return <div className="bg-green-100 text-green-950 px-3 py-2 border-l-4 border-green-700">
                <div className="p-2">{text}</div>
            </div>
    }
}

export type Device = {
    id: number | null;
    name: string;
    serialNo: string;
    deviceType: string;
    typeId: string;
    hostname: string;
    ipAddress: string;
    isStale: string | null;
    status: string | null;
    dateadded: string | null;
    statusReports: {}[] | null
}

export type DeviceType = {
    id: number | null;
    type: string;
}