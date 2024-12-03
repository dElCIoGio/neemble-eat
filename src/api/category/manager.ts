import {ENDPOINTS} from "@/api/category/endpoint.ts";
import {CONFIG} from "@/api/category/config.ts";
import {RemoveCategoryItemProps} from "@/api/category/types.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {CategoryJson} from "@/schema.ts";

const api = new ApiMethods()

export async function removeCategoryItem({ categoryID, itemID }: RemoveCategoryItemProps): Promise<CategoryJson>{
    const url = ENDPOINTS.DELETE_CATEGORY_ITEM(categoryID, itemID)
    const config = CONFIG.DELETE_CATEGORY_ITEM()
    return await api.delete(url, config)
}