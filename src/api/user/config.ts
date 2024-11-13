import {AxiosRequestConfig} from "axios";


const baseConfig: AxiosRequestConfig = {
    headers: {
        "Accept": "application/json"
    }
};

export const CONFIG = {
    CREATE_USER: (): AxiosRequestConfig => ({
        ...baseConfig,
        headers: {
            ...baseConfig.headers,
            "Content-Type": "application/json"
        }
    }),
    FETCH_USER: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    FETCH_USER_BY_UUID: (): AxiosRequestConfig => ({
        ...baseConfig
    })
};