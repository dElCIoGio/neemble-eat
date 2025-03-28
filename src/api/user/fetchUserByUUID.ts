import {API, handleError} from "@/api/utils"
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import { MINUTE} from "@/lib/constants.ts";
import {UserJson} from "@/schema.ts";


// const GET_USER_BY_UUID_STALETIME = 5 * HOUR
// const GET_USER_BY_UUID_GCTIME = 10 * HOUR
const GET_USER_BY_UUID_STALETIME = 2 * MINUTE
const GET_USER_BY_UUID_GCTIME = 4 * MINUTE

export async function fetchUserByUUID(uuid: string): Promise<UserJson> {
    try{
        const response = await API.get(`/users/${uuid}/UUID`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleError(error)
        }
        throw error;
    }
}

export function useFetchUserByUUID(uuid: string) {

    const {data, isLoading, isFetching} = useQuery({
        queryKey: ['fetchUserByUUID', uuid],
        queryFn: () => fetchUserByUUID(uuid)
            .then(data => data),
        staleTime: GET_USER_BY_UUID_STALETIME,
        gcTime: GET_USER_BY_UUID_GCTIME,
    });

    return {
        data,
        isLoading,
        isFetching,
    }
}