import {API, handleError} from "@/api/utils"
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";
import {RepresentantJson} from "@/schema.ts";


const GET_USER_BY_UUID_STALETIME = 5 * HOUR
const GET_USER_BY_UUID_GCTIME = 10 * HOUR

export async function fetchUserByUUID(uuid: string): Promise<RepresentantJson> {
    try{
        const response = await API.get(`/representants/${uuid}/UUID`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return handleError(error)
        }
        throw error;
    }
}

export function useFetchUserByUUID(uuid: string) {
    return useQuery({
        queryKey: ['fetchUserByUUID', uuid],
        queryFn: () => fetchUserByUUID(uuid)
            .then(data => data)
            .catch(error => {
                console.error('Error fetching user:', error);
                throw error;
            }),
        staleTime: GET_USER_BY_UUID_STALETIME,
        gcTime: GET_USER_BY_UUID_GCTIME,
    });
}