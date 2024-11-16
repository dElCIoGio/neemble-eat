import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    GET_TABLE_SESSION: (): AxiosRequestConfig => ({
        ...baseConfig
    })
}