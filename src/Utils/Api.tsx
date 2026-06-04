
import axios from "axios";
export const serverURL = (import.meta.env as any).VITE_API;

export interface IEndPoint {
    'url': string,
    'method': string
}


export const endpoints = {
    'allDevices' : {
      'url': 'devices',
      'method': 'GET'
    },

    'types' : {
        'url': 'device-types',
        'method': 'GET'
    },

    'registerDevice' : {
      'url': 'devices',
      'method': 'POST'
    },

    'getDevice' : {
      'url': 'devices',
      'method': 'GET'
    },

    'statusReport' : {
        'url': 'status-report',
        'method': 'GET'
    },

    'reportStatus': {
        'url': 'status-report',
        'method': 'POST'
    }
}

export function useApi() {
    const serverRequest = async (url: string, config: any = {}) => {
        console.log("Making server request to:", url, "with config:", config)
        return await axios.request({
            ...config,
            baseURL: serverURL,
            headers: {            
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
            withCredentials: false,
        })
    }

    const postServerRequest = async ({url, formdata} : {url: string, formdata : FormData}) => {
        return await axios.post(serverURL + url, formdata, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: false,
        })
    }


    const getDBList = async ({endPoint, searchString} : {endPoint: {'url': string, 'method': string}, searchString?: string}) => {
        let requestParams = endPoint
        if (searchString) {
           requestParams = {
                ...requestParams,
                'url': `${requestParams.url}?${searchString}`
           }
        }
        const response = await serverRequest(requestParams.url, requestParams)
        return response.data
    }

    const getDBItem = async ({endPoint, id} : {endPoint: {'url': string, 'method': string}, id: string}) => {
        let requestParams = {
            ...endPoint,
            'url': `${endPoint.url}/${id}`
        }
        
        const response = await serverRequest(requestParams.url, requestParams)
        return response
    }

    return {
        serverRequest,
        postServerRequest,
        getDBList,
        getDBItem,
    }
}

// Utility for direct GET requests with auth and standard headers
export async function getServerRequest(url: string, token: string, config: any = {}) {
    return axios.get(url, {
        ...config,
        headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            ...(config.headers || {})
        }
    });
}

// Utility for direct POST requests with auth and standard headers
export async function postServerRequest(url: string, token: string, data: any = {}, config: any = {}) {
    return axios.post(url, data, {
        ...config,
        headers: {
            // Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            ...(config.headers || {})
        },
        withCredentials: false,
    });
}
