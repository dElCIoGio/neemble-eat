import {AxiosRequestConfig} from "axios";


export const CONFIG = {
    UPDATE_ITEM: (): AxiosRequestConfig => ({
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}