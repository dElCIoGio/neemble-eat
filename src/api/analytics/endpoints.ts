

const ROUTE = "/analytics"

export const ENDPOINTS = {
    GET_RESTAURANTS_TOP_ORDERS: (restaurantId: string) => `${ROUTE}/top-orders/${restaurantId}`,
    GET_RESTAURANT_REVENUE_BY_MONTH: (restaurantId: string) => `${ROUTE}/get-revenue-month/${restaurantId}`,
    GET_RESTAURANT_REVENUE_BY_DAY: (restaurantId: string) => `${ROUTE}/get-revenue-day/${restaurantId}`,
    GET_RESTAURANT_ORDER_COUNT_BY_MONTH: (restaurantId: string) => `${ROUTE}/get-order-count-month/${restaurantId}`,
    GET_RESTAURANT_ORDER_COUNT_BY_DAY: (restaurantId: string) => `${ROUTE}/get-order-count-day/${restaurantId}`,
}