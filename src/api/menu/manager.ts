import {ApiMethods} from "@/api/api-methods.ts";
import {ENDPOINTS} from "@/api/menu/endpoints.ts";
import {CONFIG} from "@/api/menu/config.ts";
import {CategoryJson, Menu} from "@/schema.ts";
import {AddCategoryProps, getMenuProps} from "@/api/menu/types.ts";


const api = new ApiMethods()

export async function getMenu({menuId}:getMenuProps): Promise<Menu> {
    const url = ENDPOINTS.FETCH_MENU(menuId)
    const config = CONFIG.FETCH_MENU()
    return await api.get<Menu>(url, config)
}

export async function addCategory(attr: AddCategoryProps): Promise<CategoryJson>{
    const url = ENDPOINTS.ADD_CATEGORY(attr.menuID)
    const  config = CONFIG.ADD_CATEGORY()
    return await api.post<CategoryJson>(url, {...attr}, config)
}
