import {useMutation, useQuery} from "@tanstack/react-query";
import {createUserProps} from "@/api/user/types.ts";
import {HOUR} from "@/lib/constants.ts";
import {getUser, getUserByUUID, createUser} from "@/api/user/manager.ts";


const FETCH_USER_STALETIME = 5 * HOUR
const FETCH_USER_GCTIME = 10 * HOUR

const GET_USER_BY_UUID_STALETIME = 5 * HOUR
const GET_USER_BY_UUID_GCTIME = 10 * HOUR

export function useCreateUser(attr: createUserProps) {
    return useMutation({
        mutationFn: () => createUser(attr),
        onSuccess: () => {
            console.log(`Account Created`);
        },
        onError: error => console.log(error)
    });
}

export function useGetUser(userId: string){
    return useQuery({
        queryKey: ['get user', userId],
        queryFn: () => getUser(userId)
            .then(data => data)
            .catch(error => {
                console.error('Error fetching user:', error);
                throw error;
            }),
        staleTime: FETCH_USER_STALETIME,
        gcTime: FETCH_USER_GCTIME,

    });
}

export function useGetUserByUUID(uuid: string){
    return useQuery({
        queryKey: ['get user by uuid', uuid],
        queryFn: () => getUserByUUID(uuid)
            .then(data => data)
            .catch(error => {
                console.error('Error fetching user:', error);
                throw error;
            }),
        staleTime: GET_USER_BY_UUID_STALETIME,
        gcTime: GET_USER_BY_UUID_GCTIME,
    })
}