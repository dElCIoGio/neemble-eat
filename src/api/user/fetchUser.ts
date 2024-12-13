import {UserJson} from "@/schema.ts";
import {API, handleError} from "@/api/utils.ts";
import {useQuery} from '@tanstack/react-query';
import {HOUR} from "@/lib/constants.ts";
import axios from "axios";


const FETCH_USER_STALETIME = 5 * HOUR
const FETCH_USER_GCTIME = 10 * HOUR


export async function fetchUserById(userId: string): Promise<UserJson> {
    try {
        const response = await API.get(`/users/${userId}`);
        return response.data;
    }catch (error) {
        if (axios.isAxiosError(error)) {
            return handleError(error)
        }
        throw error;
    }
}


export function useFetchUserById(userId: string) {
    const {
        data,
        error,
        isLoading
    } = useQuery({
        queryKey: ['get user', userId],
        queryFn: () => fetchUserById(userId)
            .then(data => data)
            .catch(error => {
                console.error('Error fetching user:', error);
                throw error;
            }),
        staleTime: FETCH_USER_STALETIME,
        gcTime: FETCH_USER_GCTIME,

    });

    return {
        data,
        error,
        isFetching: isLoading,
    };
}