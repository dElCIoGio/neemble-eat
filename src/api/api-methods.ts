import {API} from "@/api/utils"
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export class ApiMethods {

    private handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    private handleError(error: AxiosError) {
        switch (error.message) {
            case "Request failed with status code 404":
                return Promise.reject("endpoint not found");
            default:
                return Promise.reject("There was an error. Please try again later.");
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.get<T>(url, config);
            return this.handleResponse(response);
        } catch (error) {
            if (error instanceof AxiosError)
                throw await this.handleError(error);
            else {
                console.error(error);
                throw error;
            }
        }
    }

    public async post<T>(url: string, data?: Record<string, unknown> | FormData, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await API.post<T>(url, data, config);
            return this.handleResponse(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async put<T>(url: string, data?: Record<string, unknown> | FormData, config?: AxiosRequestConfig): Promise<T> {
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