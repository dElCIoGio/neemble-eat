import {API} from "@/api/utils"
import {AxiosRequestConfig, AxiosResponse} from "axios";

export class ApiMethods {

    private handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.get<T>(url, config);
            return this.handleResponse(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.post<T>(url, data, config);
            return this.handleResponse(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.put<T>(url, data, config);
            return this.handleResponse(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.delete<T>(url, config);
            return this.handleResponse(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}