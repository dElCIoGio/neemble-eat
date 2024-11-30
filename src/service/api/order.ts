import {UpdateOrderProps} from "@/api/order/types.ts";
import {useMutation} from "@tanstack/react-query";
import {updateOrder} from "@/api/order/managers.ts";


export function useUpdateOrder(attr: UpdateOrderProps){
    return useMutation({
        mutationFn: () => updateOrder(attr),
        onSuccess: () => {
            console.log(`Order ${attr.orderID} updated to ${attr.newStatus}`);
        },
        onError: error => {
            console.error(error)
        }
    })
}