import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMenu} from "@/api/menu/manager";
import {HOUR} from "@/lib/constants.ts";
import {getMenuHookProps} from "@/api/menu/types.ts";
import {CategoryJson, Menu, MenuItemJson} from "@/schema.ts";
import {findCategoryIndex, findMenuItemIndex} from "@/lib/utils.ts";


const GET_MENU_STALETIME: number = HOUR * 3
const GET_MENU_CACHETIME: number = HOUR * 6

export function useGetMenu(attr: getMenuHookProps){

    const queryKey = ["GET menu", attr.menuId]

    const { refetch, ...query } = useQuery({
        queryKey,
        queryFn: () => getMenu({menuId: attr.menuId})
            .then(data => data),
        enabled: !!attr.menuId,
        staleTime: GET_MENU_STALETIME,
        gcTime: GET_MENU_CACHETIME,
    });

    const queryClient = useQueryClient();

    function addCategory(newCategory: CategoryJson){
        queryClient.setQueryData(queryKey,
            (oldMenu: Menu) => {
            const categories = oldMenu.categories
            if (categories != undefined){
                oldMenu.categories = [...categories, {
                    menuID: newCategory.menuID,
                    name: newCategory.name,
                    id: newCategory.id,
                    created_time: newCategory.created_time,
                    description: newCategory.description,
                    items: []
                }]
            }
            return oldMenu;
            })
    }

    function updateItem(categoryId: string, itemId: string, newMenuItem: MenuItemJson){
        queryClient.setQueryData(queryKey,
            (oldMenu: Menu) => {
                const categoryIndex = findCategoryIndex(oldMenu, categoryId);
                if (oldMenu.categories != undefined && categoryIndex != -1){
                    const itemIndex = findMenuItemIndex(oldMenu.categories[categoryIndex], itemId);
                    if (itemIndex != -1){
                        oldMenu.categories[categoryIndex].items[itemIndex] = newMenuItem;
                        refetch()
                    }
                }
                return oldMenu;
            })
    }

    function addItem(categoryId: string, newMenuItem: MenuItemJson){
        queryClient.setQueryData(queryKey,
            (oldMenu: Menu) => {
                const categoryIndex = findCategoryIndex(oldMenu, categoryId);
                if (oldMenu.categories != undefined && categoryIndex != -1){
                    const items = oldMenu.categories[categoryIndex].items;
                    oldMenu.categories[categoryIndex].items = [...items, newMenuItem];
                }
                return oldMenu;
            });
    }

    return {
        ...query,
        addCategory,
        updateItem,
        addItem
    }
}