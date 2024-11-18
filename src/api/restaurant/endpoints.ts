

const ROUTER = "/restaurants"

export const ENDPOINTS = {
    GET_RESTAURANTS_TOP_ORDERS: (restaurantId: string) => `${ROUTER}/${restaurantId}/last-orders`,
    GET_RESTAURANT: (restaurantId: string) => `${ROUTER}/${restaurantId}`,
    GET_ALL_TABLES: (restaurantId: string) => `${ROUTER}/${restaurantId}/all-tables`,
}