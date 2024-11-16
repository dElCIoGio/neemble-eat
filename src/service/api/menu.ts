import {useQuery} from "@tanstack/react-query";
import {getMenu} from "@/api/menu/manager";
import {HOUR} from "@/lib/constants.ts";
import {getMenuHookProps} from "@/api/menu/types.ts";


const GET_MENU_STALETIME: number = HOUR * 3
const GET_MENU_CACHETIME: number = HOUR * 6

export function useGetMenu(attr: getMenuHookProps){
    return useQuery({
        queryKey: ["GET menu", attr.menuId],
        queryFn: () => getMenu({menuId: attr.menuId})
            .then(data => data),
        enabled: !!attr.menuId,
        staleTime: GET_MENU_STALETIME,
        gcTime: GET_MENU_CACHETIME,
    });
}