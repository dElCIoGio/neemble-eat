import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";

export const CONFIG = {
    FETCH_MENU: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),
    ADD_CATEGORY: (): AxiosRequestConfig => ({
        ...baseConfig,
    })
};