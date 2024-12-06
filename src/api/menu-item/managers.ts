import {ApiMethods} from "@/api/api-methods.ts";
import {ENDPOINTS} from "@/api/menu-item/endpoints.ts";
import {CONFIG} from "@/api/menu-item/config.ts";
import {UpdateItemProps} from "@/api/menu-item/types.ts";
import {MenuItemJson} from "@/schema.ts";

const api = new ApiMethods()

export async function updateItem({updates, id}: UpdateItemProps): Promise<MenuItemJson> {
    const url = ENDPOINTS.UPDATE_ITEM(id)
    const config = CONFIG.UPDATE_ITEM()
    return await api.put<MenuItemJson>(url, updates, config)
}