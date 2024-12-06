import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMenu} from "@/api/menu/manager";
import {HOUR} from "@/lib/constants.ts";
import {getMenuHookProps} from "@/api/menu/types.ts";
import {CategoryJson, Menu} from "@/schema.ts";


const GET_MENU_STALETIME: number = HOUR * 3
const GET_MENU_CACHETIME: number = HOUR * 6

export function useGetMenu(attr: getMenuHookProps){

    const queryClient = useQueryClient();

    function addCategory(newCategory: CategoryJson){
        queryClient.setQueryData(["GET menu", attr.menuId],
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

    const query =  useQuery({
        queryKey: ["GET menu", attr.menuId],
        queryFn: () => getMenu({menuId: attr.menuId})
            .then(data => data),
        enabled: !!attr.menuId,
        staleTime: GET_MENU_STALETIME,
        gcTime: GET_MENU_CACHETIME,
    });


    return {
        ...query,
        addCategory
    }
}