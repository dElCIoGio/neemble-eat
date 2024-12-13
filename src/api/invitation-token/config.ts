import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    CREATE_TOKEN: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    GET_TOKEN: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    DELETE_TOKEN: (): AxiosRequestConfig => ({
        ...baseConfig
    })
}