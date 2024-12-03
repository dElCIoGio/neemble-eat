import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";

export const CONFIG = {
    GET_RESTAURANTS_TOP_ORDERS: (): AxiosRequestConfig => ({
        ...baseConfig,
    }),
    GET_RESTAURANT: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    GET_ALL_TABLES: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    GET_ALL_ORDERS: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    GET_OPEN_SESSION: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    ADD_TABLE: (): AxiosRequestConfig => ({
        ...baseConfig
    }),
    REMOVE_TABLE: (): AxiosRequestConfig => ({
        ...baseConfig
    })
};