import {getTableSession} from "@/api/table/manager.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getTableSessionProps} from "@/api/table/types.ts";
import {MINUTE} from "@/lib/constants.ts";
import {GetAllTablesProps} from "@/api/restaurant/types.ts";
import {getAllTables} from "@/api/restaurant/manager.ts";
import {TableJson} from "@/schema.ts";


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

    const queryClient = useQueryClient();

    function addTable(table: TableJson){
        queryClient.setQueryData(["getAllTables", attr.restaurantId], (oldData: TableJson[]) => [...oldData, table])
    }

    function removeTable(tableId: string){
        queryClient.setQueryData(["getAllTables", attr.restaurantId], (oldData: TableJson[]) => oldData.filter(table => table.id !== tableId))
    }

    const query =  useQuery({
        queryKey: ["getAllTables", attr.restaurantId],
        queryFn: () => getAllTables(attr)
            .then(data => data),
        gcTime: GET_TABLE_SESSION_STALETIME,
    })


    return {
        ...query,
        addTable,
        removeTable,
    }
}