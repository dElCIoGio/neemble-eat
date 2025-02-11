import {
    getRestaurantOrderCountByDay,
    getRestaurantOrderCountByMonth,
    getRestaurantRevenueByDay,
    getRestaurantRevenueByMonth
} from "@/api/analytics/manager.ts"
import {
    GetRestaurantOrderCountByMonthProps,
    GetRestaurantRevenueByDayProps,
    GetRestaurantRevenueByMonthProps,
    GetRestaurantOrderCountByDayProps,
    GetTopOrdersProps
} from "@/api/analytics/types.ts";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";
import {getTopOrders} from "@/api/analytics/manager.ts";


const GET_TOP_ORDERS_GCTime: number  = 1000 * 60 * 60 * 24;
const GET_TOP_ORDERS_STALETIME: number = HOUR * 2;



export function useGetRestaurantOrderCountByDay(attr: GetRestaurantOrderCountByDayProps){
    const queryKey = ["getRestaurantOrderCountByDay", attr.restaurantId]
    return useQuery({
        queryKey,
        queryFn: () => getRestaurantOrderCountByDay(attr)
            .then(data => data),
        staleTime: HOUR,
        gcTime: HOUR,
        enabled: attr.restaurantId !== undefined,
    })
}

export function useGetRestaurantOrderCountByMonth(attr: GetRestaurantOrderCountByMonthProps){
    const queryKey = ["getRestaurantOrderCountByMonth", attr.restaurantId]
    return useQuery({
        queryKey,
        queryFn: () => getRestaurantOrderCountByMonth(attr)
            .then(data => data),
        staleTime: HOUR,
        gcTime: HOUR,
        enabled: attr.restaurantId !== undefined,
    })
}


export function useGetRestaurantRevenueByDay(attr: GetRestaurantRevenueByDayProps){
    const queryKey = ["getRestaurantRevenueByDay", attr.restaurantId]
    return useQuery({
        queryKey,
        queryFn: () => getRestaurantRevenueByDay(attr)
            .then(data => data),
        staleTime: HOUR,
        gcTime: HOUR,
        enabled: attr.restaurantId !== undefined,
    })
}

export function useGetRestaurantRevenueByMonth(attr: GetRestaurantRevenueByMonthProps){
    const queryKey = ["getRestaurantRevenueByMonth", attr.restaurantId]
    return useQuery({
        queryKey,
        queryFn: () => getRestaurantRevenueByMonth(attr)
            .then(data => data),
        staleTime: HOUR,
        gcTime: HOUR,
        enabled: attr.restaurantId !== undefined,
    })
}

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
