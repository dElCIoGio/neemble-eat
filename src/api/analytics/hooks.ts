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
    GetRestaurantOrderCountByDayProps
} from "@/api/analytics/types.ts";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";

export function useGetRestaurantOrderCountByDay(attr: GetRestaurantOrderCountByDayProps){
    const queryKey = ["getRestaurantOrderCountByDay", attr.restaurantId]
    return useQuery({
        queryKey,
        queryFn: () => getRestaurantOrderCountByDay(attr)
            .then(data => data),
        staleTime: HOUR,
        gcTime: HOUR,
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
    })
}