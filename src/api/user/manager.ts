import {RepresentantJson} from "@/schema.ts";
import {ENDPOINTS} from "@/api/user/endpoints.ts";
import {CONFIG} from "@/api/user/config.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {createUserProps} from "@/api/user/types.ts";


const api = new ApiMethods()

export async function createUser({ UUID, firstName, lastName, email, phoneNumber, role}: createUserProps): Promise<RepresentantJson> {
    const url = ENDPOINTS.CREATE_USER()
    const config = CONFIG.CREATE_USER()
    const response = await api.post<RepresentantJson>(url, {
        "UUID": UUID,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "role": role
    }, config)
    return response
}

export async function getUserByUUID(uuid: string): Promise<RepresentantJson> {
    const url = ENDPOINTS.FETCH_USER_BY_UUID(uuid)
    const config = CONFIG.FETCH_USER_BY_UUID()
    const response = await api.get<RepresentantJson>(url, config)
    return response
}

export async function getUser(userId: string): Promise<RepresentantJson> {
    const url = ENDPOINTS.FETCH_USER(userId)
    const config = CONFIG.FETCH_USER()
    const response = await api.get<RepresentantJson>(url, config)
    return response
}