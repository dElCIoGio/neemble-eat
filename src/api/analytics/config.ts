import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    GET_RESTAURANT_REVENUE_BY_MONTH: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),
    GET_RESTAURANT_REVENUE_BY_DAY: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),
    GET_RESTAURANT_ORDER_COUNT_BY_MONTH: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),
    GET_RESTAURANT_ORDER_COUNT_BY_DAY: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),

}