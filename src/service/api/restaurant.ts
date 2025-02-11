import {
    AddTableProps, AddUserProps,
    GetAllOrdersProps, GetAllUsers,
    GetRestaurantProps,
    GetTopOrdersProps,
    RemoveTableProps
} from "@/api/restaurant/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {HOUR, MINUTE} from "@/lib/constants.ts";
import {
    addTable,
    addUser,
    getAllOrders,
    getAllUsers,
    getRestaurant,
    getTopOrders,
    removeTable
} from "@/api/restaurant/manager"
import {OrderJson, UserJson} from "@/schema.ts";
import filterLastXhOrders from "@/lib/filterLastXhOrders.ts";

const GET_TOP_ORDERS_GCTime: number  = 1000 * 60 * 60 * 24;
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
        refetchInterval: 10 * MINUTE
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


export function useAddTable(attr: AddTableProps) {
    return useMutation({
        mutationFn: () => addTable(attr),
        onSuccess: () => {
            console.log("Table added")
        },
        onError: () => {
            console.log("Error adding table")
        },
    })
}


export function useRemoveTable(attr: RemoveTableProps) {
    return useMutation({
        mutationFn: () => removeTable(attr),
        onSuccess: () => {
            console.log("Table removed")
        },
        onError: () => {
            console.log("Error removing table")
        },
    })
}


export function useAddUser(attr: AddUserProps){
    return useMutation({
        mutationFn: () => addUser(attr),
        onSuccess: () => {
            console.log("User added")
        },
        onError: () => {
            console.log("Error adding user")
        }
    })
}


export function useGetAllUsers(attr: GetAllUsers){

    const queryKey = ["useGetAllUsers", attr.restaurantId]

    const queryClient = useQueryClient();

    function updateUser(user: UserJson){
        queryClient.setQueryData(
            queryKey,
            (users: UserJson[]) => {
                return users.map(u => {
                    const isUserFound: boolean = u.id === user.id
                    if (isUserFound)
                        return user

                    return u
                })
            }
        )
    }

    const query = useQuery({
        queryKey,
        queryFn: () => getAllUsers(attr)
            .then(users => users)
    })

    return {
        ...query,
        updateUser
    }
}