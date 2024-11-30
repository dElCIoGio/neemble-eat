import {GetAllOrdersProps, GetRestaurantProps, GetTopOrdersProps} from "@/api/restaurant/types.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";
import {getAllOrders, getRestaurant, getTopOrders} from "@/api/restaurant/manager"
import {OrderJson} from "@/schema.ts";
import filterLastXhOrders from "@/lib/filterLastXhOrders.ts";

const GET_TOP_ORDERS_GCTime: number  = HOUR * 5;
const GET_TOP_ORDERS_STALETIME: number = HOUR * 2;

const GET_RESTAURANT_STALETIME: number = HOUR * 24
const GET_RESTAURANT_CACHETIME: number = HOUR * 36

const GET_ALL_ORDERS_STALETIME: number = HOUR
const GET_ALL_ORDERS_CACHETIME: number = HOUR




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

export function useGetAllOrders(attr: GetAllOrdersProps){


    const queryClient = useQueryClient();

    function removeOrders(ids: string[]) {
        queryClient.setQueryData(["getAllOrders", attr.restaurantID], (oldOrders: OrderJson[] = []) => {
            return oldOrders.filter(order => !ids.includes(order.id))
        })
    }


    function updateOrderStatus(orderId: string, newStatus: string) {
        queryClient.setQueryData(['getAllOrders', attr.restaurantID], (oldOrders: OrderJson[] = []) => {
            return oldOrders.map(order =>
                order.id === orderId ? {...order, prepStatus: newStatus} : order
            );
        });
    }

    function addOrder(order: OrderJson) {
        queryClient.setQueryData(['getAllOrders', attr.restaurantID], (oldOrders: OrderJson[] = []) => {

            return oldOrders.some(o => o.id === order.id) ? oldOrders : [...oldOrders, order];
        });
    }

    const {data, ...query} = useQuery({
        queryKey: ["getAllOrders", attr.restaurantID],
        queryFn: () => getAllOrders(attr)
            .then(data => data),
        staleTime: GET_ALL_ORDERS_STALETIME,
        gcTime: GET_ALL_ORDERS_CACHETIME,
        enabled: attr.restaurantID !== undefined,
    })


    return {
        orders: data? data.filter((order) => {
            return filterLastXhOrders(order) && order.sessionStatus !== "Billed";
        }): undefined,
        ...query,
        updateOrderStatus,
        addOrder,
        removeOrders,
    }
}