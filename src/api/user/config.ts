import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


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
    }),
    UPDATE_USER: (): AxiosRequestConfig => ({
        ...baseConfig
    })
};