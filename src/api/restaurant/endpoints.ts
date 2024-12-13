

const ROUTER = "/restaurants"

export const ENDPOINTS = {
    GET_RESTAURANTS_TOP_ORDERS: (restaurantId: string) => `${ROUTER}/${restaurantId}/last-orders`,
    GET_RESTAURANT: (restaurantId: string) => `${ROUTER}/${restaurantId}`,
    GET_ALL_TABLES: (restaurantId: string) => `${ROUTER}/${restaurantId}/all-tables`,
    GET_ALL_ORDERS: (restaurantId: string) => `${ROUTER}/${restaurantId}/orders`,
    GET_OPEN_SESSION: (restaurantID: string, tableNumber: number) => `${ROUTER}/${restaurantID}/${tableNumber}/open-session`,
    ADD_TABLE: (restaurantID: string) => `${ROUTER}/${restaurantID}/add-table`,
    REMOVE_TABLE: (restaurantID: string, tableID: string) => `${ROUTER}/${restaurantID}/${tableID}/remove-table`,
    ADD_USER: (restaurantID: string, userID: string) => `${ROUTER}/${restaurantID}/${userID}/user`,
    GET_ALL_USERS: (restaurantId: string) => `${ROUTER}/${restaurantId}/all-users/`,
}