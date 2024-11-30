import {ApiMethods} from "@/api/api-methods.ts";
import {UpdateOrderProps} from "@/api/order/types.ts";
import {ENDPOINTS} from "@/api/order/endpoints.ts";
import {CONFIG} from "@/api/order/config.ts";
import {OrderJson} from "@/schema.ts";

const api = new ApiMethods()


export async function updateOrder({orderID, newStatus}: UpdateOrderProps): Promise<OrderJson> {
    const url = ENDPOINTS.UPDATE_ORDER(orderID, newStatus)
    const config = CONFIG.UPDATE_ORDER()
    return await api.put(url, undefined, config)
}
