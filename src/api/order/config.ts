import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    UPDATE_ORDER: (): AxiosRequestConfig => ({
        ...baseConfig
    })
}