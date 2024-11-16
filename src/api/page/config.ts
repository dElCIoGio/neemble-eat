import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    RESTAURANT_MENU_PAGE: (): AxiosRequestConfig => ({
        ...baseConfig,
    })
}