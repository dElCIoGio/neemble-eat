import {AxiosRequestConfig} from "axios";
import {baseConfig} from "@/api/utils.ts";


export const CONFIG = {
    DELETE_CATEGORY_ITEM: (): AxiosRequestConfig => ({
        ...baseConfig,
    })
};