import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    ADD_ORDER: (): AxiosRequestConfig => ({
         ...baseConfig
    }),
    CLOSE_SESSION: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    GET_ALL_SESSION_ORDERS: (): AxiosRequestConfig => ({
        ...baseConfig
    })
}