import {ApiMethods} from "@/api/api-methods.ts";
import {
    GetRestaurantOrderCountByMonthProps,
    GetRestaurantRevenueByDayProps,
    GetRestaurantRevenueByMonthProps,
    GetRestaurantOrderCountByDayProps
} from "@/api/analytics/types.ts";
import {ENDPOINTS} from "@/api/analytics/endpoints.ts";
import {CONFIG} from "@/api/analytics/config.ts";
import {GetTopOrdersProps} from "@/api/restaurant/types.ts";


const api = new ApiMethods()

export async function getRestaurantRevenueByMonth(attr: GetRestaurantRevenueByMonthProps) {
    if (attr.restaurantId) {
        const url = ENDPOINTS.GET_RESTAURANT_REVENUE_BY_MONTH(attr.restaurantId)
        const config = CONFIG.GET_RESTAURANT_REVENUE_BY_MONTH()
        return await api.get<{
            currentMonth: number,
            previousMonth: number,
        }>(url, config)
    }

}

export async function getRestaurantRevenueByDay(attr: GetRestaurantRevenueByDayProps) {
    if (attr.restaurantId) {
        const url = ENDPOINTS.GET_RESTAURANT_REVENUE_BY_DAY(attr.restaurantId)
        const config = CONFIG.GET_RESTAURANT_REVENUE_BY_DAY()
        return await api.get<{
            today: number,
            yesterday: number,
        }>(url, config)
    }

}

export async function getRestaurantOrderCountByMonth(attr: GetRestaurantOrderCountByMonthProps) {
    if (attr.restaurantId){
        const url = ENDPOINTS.GET_RESTAURANT_ORDER_COUNT_BY_MONTH(attr.restaurantId)
        const config = CONFIG.GET_RESTAURANT_ORDER_COUNT_BY_MONTH()
        return await api.get<{
            currentMonth: number,
            previousMonth: number,
        }>(url, config)
    }

}


export async function getRestaurantOrderCountByDay(attr: GetRestaurantOrderCountByDayProps) {
    if (attr.restaurantId){
        const url = ENDPOINTS.GET_RESTAURANT_ORDER_COUNT_BY_DAY(attr.restaurantId)
        const config = CONFIG.GET_RESTAURANT_ORDER_COUNT_BY_DAY()
        return await api.get<{
            today: number,
            yesterday: number,
        }>(url, config)
    }
}

export async function getTopOrders({restaurantId}: GetTopOrdersProps): Promise<[string, number][] | undefined> {
    const url = ENDPOINTS.GET_RESTAURANTS_TOP_ORDERS(restaurantId)
    const config = CONFIG.GET_RESTAURANTS_TOP_ORDERS()
    return await api.get(url, config)
}