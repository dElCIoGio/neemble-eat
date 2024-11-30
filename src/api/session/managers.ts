import {ApiMethods} from "@/api/api-methods.ts";
import {CloseSessionProps} from "@/api/session/types.ts";
import {ENDPOINTS} from "@/api/session/endpoints.ts";
import {CONFIG} from "@/api/session/config.ts";
import {TableSessionJson} from "@/schema.ts";


const api = new ApiMethods()

export async function closeSession({sessionID, status}: CloseSessionProps): Promise<TableSessionJson> {
    const url = ENDPOINTS.CLOSE_SESSION(sessionID, status)
    const config = CONFIG.CLOSE_SESSION()
    return await api.post(url, undefined, config)
}