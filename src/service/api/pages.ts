import {useQuery} from "@tanstack/react-query";
import {getRestaurantMenuPage} from "@/api/page/managers"
import {GetRestaurantMenuPageProps} from "@/api/page/types.ts";


export function useGetRestaurantMenuPage({tableId}:GetRestaurantMenuPageProps){
    return useQuery({
        queryKey: ["getRestaurantMenuPage", tableId],
        queryFn: () => getRestaurantMenuPage({tableId})
            .then(data => data),
        gcTime: Infinity,
        staleTime: Infinity,
        enabled: tableId !== undefined,
    })
}