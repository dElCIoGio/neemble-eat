import {ApiMethods} from "@/api/api-methods.ts";
import {ENDPOINTS} from "@/api/page/endpoints.ts";
import {CONFIG} from "@/api/page/config.ts";
import {GetRestaurantMenuPageProps, GetRestaurantMenuPageResponse} from "@/api/page/types.ts";


const api = new ApiMethods()

export async function getRestaurantMenuPage({tableId}: GetRestaurantMenuPageProps) {
    if (!tableId) {
        throw new Error("Table id is required")
    }
    const url = ENDPOINTS.RESTAURANT_MENU_PAGE(tableId);
    const config = CONFIG.RESTAURANT_MENU_PAGE();
    return await api.get<GetRestaurantMenuPageResponse>(url, config)
}