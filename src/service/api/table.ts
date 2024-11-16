import {getTableSession} from "@/api/table/manager.ts";
import {useQuery} from "@tanstack/react-query";
import {getTableSessionProps} from "@/api/table/types.ts";
import {MINUTE} from "@/lib/constants.ts";
import {GetAllTablesProps} from "@/api/restaurant/types.ts";
import {getAllTables} from "@/api/restaurant/manager.ts";


const GET_TABLE_SESSION_STALETIME = 20 * MINUTE
const GET_TABLE_SESSION_CACHETIME = 20 * MINUTE

export function useGetTableSession({tableId}: getTableSessionProps){
    return useQuery({
        queryKey: ["getTableSession", tableId],
        queryFn: () => getTableSession({tableId})
            .then(data => data),
        gcTime: GET_TABLE_SESSION_STALETIME,
        staleTime: GET_TABLE_SESSION_CACHETIME,
    });
}


export function useGetAllTables(attr: GetAllTablesProps){
    return useQuery({
        queryKey: ["getAllTables", attr.restaurantId],
        queryFn: () => getAllTables(attr)
            .then(data => data),
        gcTime: GET_TABLE_SESSION_STALETIME,
    })
}