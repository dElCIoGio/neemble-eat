import {getTableSessionProps} from "@/api/table/types.ts";
import {ENDPOINTS} from "@/api/table/endpoints.ts";
import {CONFIG} from "@/api/table/config.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {TableSessionJson} from "@/schema.ts";


const api = new ApiMethods()

export async function getTableSession({tableId}: getTableSessionProps): Promise<TableSessionJson> {
    const url = ENDPOINTS.GET_TABLE_SESSION(tableId);
    const config = CONFIG.GET_TABLE_SESSION();
    return await api.get(url, config)
}
