import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    SET_UP_RESTAURANT: (): AxiosRequestConfig => ({
            ...baseConfig,
        })
}