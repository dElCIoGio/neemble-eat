import {ApiMethods} from "@/api/api-methods.ts";
import {ENDPOINTS} from "@/api/menu-item/endpoints.ts";
import {CONFIG} from "@/api/menu-item/config.ts";
import {UpdateItemProps} from "@/api/menu-item/types.ts";
import {MenuItemJson} from "@/schema.ts";
import {getUpdateItemFormData} from "@/lib/utils.ts";

const api = new ApiMethods()

export async function updateItem({updates, menuItemId, restaurantId}: UpdateItemProps): Promise<MenuItemJson> {
    const formData = getUpdateItemFormData(updates, restaurantId)
    const url = ENDPOINTS.UPDATE_ITEM(menuItemId)
    const config = CONFIG.UPDATE_ITEM()
    return await api.put<MenuItemJson>(url, formData, config)
}