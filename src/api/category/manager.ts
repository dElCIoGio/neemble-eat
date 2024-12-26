import {ENDPOINTS} from "@/api/category/endpoint.ts";
import {CONFIG} from "@/api/category/config.ts";
import {AddItemProps, RemoveCategoryItemProps} from "@/api/category/types.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {CategoryJson, MenuItem} from "@/schema.ts";
import {getFormData} from "@/api/category/helper.ts";

const api = new ApiMethods()

export async function removeCategoryItem({ categoryID, itemID }: RemoveCategoryItemProps): Promise<CategoryJson>{
    const url = ENDPOINTS.DELETE_CATEGORY_ITEM(categoryID, itemID)
    const config = CONFIG.DELETE_CATEGORY_ITEM()
    return await api.delete(url, config)
}

export async function addMenuItem(attr: AddItemProps){
    const data = getFormData(attr)
    const url = ENDPOINTS.ADD_ITEM()
    const config = CONFIG.ADD_ITEM()
    return await api.post<MenuItem>(url, data, config)
}