import {
    CreateInvitationTokenProps,
    DeleteInvitationTokenProps,
    GetInvitationTokenProps
} from "@/api/invitation-token/type.ts";
import {ENDPOINTS} from "@/api/invitation-token/endpoints.ts";
import {CONFIG} from "@/api/invitation-token/config.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {InvitationToken} from "@/schema.ts";

const api = new ApiMethods()

export async function createInvitationToken(attr: CreateInvitationTokenProps){
    const url = ENDPOINTS.CREATE_TOKEN(attr.restaurantId)
    const config = CONFIG.CREATE_TOKEN()
    return await api.post<InvitationToken>(url, undefined, config)
}

export async function getInvitationToken(attr: GetInvitationTokenProps){
    const url = ENDPOINTS.GET_TOKEN(attr.tokenId)
    const config = CONFIG.GET_TOKEN()
    return await api.get<InvitationToken>(url, config)
}


export async function deleteInvitationToken({tokenId}: DeleteInvitationTokenProps){
    const url = ENDPOINTS.DELETE_TOKEN(tokenId)
    const config = CONFIG.DELETE_TOKEN()
    return await api.delete<boolean>(url, config)
}