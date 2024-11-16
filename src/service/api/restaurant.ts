import {GetRestaurantProps, GetTopOrdersProps} from "@/api/restaurant/types.ts";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";
import {getRestaurant, getTopOrders} from "@/api/restaurant/manager"

const GET_TOP_ORDERS_GCTime: number  = HOUR * 5;
const GET_TOP_ORDERS_STALETIME: number = HOUR * 2;

const GET_RESTAURANT_STALETIME: number = HOUR * 24
const GET_RESTAURANT_CACHETIME: number = HOUR * 36


export function useGetTopOrders(attr: GetTopOrdersProps) {

    return useQuery({
        queryKey: ["GET top orders", attr.restaurantId],
        queryFn: () => getTopOrders(attr)
            .then(data => data),
        enabled: attr.restaurantId !== undefined,
        gcTime: GET_TOP_ORDERS_GCTime,
        staleTime: GET_TOP_ORDERS_STALETIME,
    })
}


export function useGetRestaurant({restaurantId}: GetRestaurantProps) {

    return useQuery({
        queryKey: ["GET Restaurant", restaurantId],
        queryFn: () => getRestaurant({restaurantId})
            .then(data => data),
        enabled: restaurantId != undefined,
        staleTime: GET_RESTAURANT_STALETIME,
        gcTime: GET_RESTAURANT_CACHETIME,
    })
}