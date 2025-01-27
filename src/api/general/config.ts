import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    REGISTER_NEW_LEAD: (): AxiosRequestConfig => ({
        ...baseConfig,
    })
}