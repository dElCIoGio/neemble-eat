import {RemoveCategoryItemProps} from "@/api/category/types.ts";
import {useMutation} from "@tanstack/react-query";
import {removeCategoryItem} from "@/api/category/manager.ts";


export function useRemoveCategoryItem(attr: RemoveCategoryItemProps){
    return useMutation({
        mutationFn: () => removeCategoryItem(attr),
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
        },
    })
}