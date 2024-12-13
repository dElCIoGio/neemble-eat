import {
    AddTableProps, AddUserProps,
    GetAllOrdersProps,
    GetAllTablesProps, GetAllUsers,
    GetRestaurantProps,
    GetTopOrdersProps, RemoveTableProps
} from "@/api/restaurant/types.ts";
import {ENDPOINTS} from "@/api/restaurant/endpoints"
import {CONFIG} from "@/api/restaurant/config.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {OrderJson, RestaurantJson, TableJson, UserJson} from "@/schema.ts";


const api = new ApiMethods()

export async function getRestaurant({restaurantId}: GetRestaurantProps): Promise<RestaurantJson> {
    if(restaurantId){
        const url = ENDPOINTS.GET_RESTAURANT(restaurantId)
        const config = CONFIG.GET_RESTAURANT()
        return await api.get(url, config)
    }
    throw new Error("Restaurant ID is required")

}

export async function getTopOrders({restaurantId}: GetTopOrdersProps): Promise<[string, number][] | undefined> {
    const url = ENDPOINTS.GET_RESTAURANTS_TOP_ORDERS(restaurantId)
    const config = CONFIG.GET_RESTAURANTS_TOP_ORDERS()
    return await api.get(url, config)
}


export async function getAllTables({restaurantId}: GetAllTablesProps): Promise<TableJson[]>{
    const url = ENDPOINTS.GET_ALL_TABLES(restaurantId)
    const config = CONFIG.GET_ALL_TABLES()
    return await api.get<TableJson[]>(url, config)
}

export async function getAllOrders({restaurantID}: GetAllOrdersProps): Promise<OrderJson[]>{
    const url = ENDPOINTS.GET_ALL_ORDERS(restaurantID)
    const config = CONFIG.GET_ALL_ORDERS()
    return await api.get<OrderJson[]>(url, config)
}

export async function addTable({restaurantID}: AddTableProps): Promise<TableJson>{
    const url = ENDPOINTS.ADD_TABLE(restaurantID)
    const config = CONFIG.ADD_TABLE()
    return await api.put<TableJson>(url, undefined, config)
}

export async function removeTable({restaurantID, tableId}: RemoveTableProps): Promise<boolean>{
    const url = ENDPOINTS.REMOVE_TABLE(restaurantID, tableId)
    const config = CONFIG.REMOVE_TABLE()
    return await api.put<boolean>(url, undefined, config)
}

export async function addUser({userID, restaurantID}: AddUserProps){
    const url = ENDPOINTS.ADD_USER(restaurantID, userID)
    const config = CONFIG.ADD_USER()
    return await api.put<RestaurantJson>(url, undefined, config)
}

export async function getAllUsers({restaurantId}: GetAllUsers){
    const url = ENDPOINTS.GET_ALL_USERS(restaurantId)
    const config = CONFIG.GET_ALL_USERS()
    return await api.get<UserJson[]>(url, config)
}