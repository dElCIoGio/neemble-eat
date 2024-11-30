import {useQuery} from "@tanstack/react-query";
import {getRestaurantMenuPage} from "@/api/page/managers"
import {GetRestaurantMenuPageProps} from "@/api/page/types.ts";
import {HOUR, MINUTE} from "@/lib/constants.ts";

const GET_MENU_PAGE_STALETIME = 20 * MINUTE
const GET_MENU_PAGE_CACHETIME_TIME = 1 * HOUR


export function useGetRestaurantMenuPage({tableId}:GetRestaurantMenuPageProps){
    const {data, ...props} =  useQuery({
        queryKey: ["getRestaurantMenuPage", tableId],
        queryFn: () => getRestaurantMenuPage({tableId})
            .then(data => data),
        gcTime: GET_MENU_PAGE_CACHETIME_TIME,
        staleTime: GET_MENU_PAGE_STALETIME,
        enabled: tableId !== undefined,
    })

    return {
        data: data == undefined? {
            menu: undefined,
            restaurant: undefined,
        } : data,
        ...props
    }
}