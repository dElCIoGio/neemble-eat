import {UserJson} from "@/schema.ts";
import {ENDPOINTS} from "@/api/user/endpoints.ts";
import {CONFIG} from "@/api/user/config.ts";
import {ApiMethods} from "@/api/api-methods.ts";
import {createUserProps} from "@/api/user/types.ts";


const api = new ApiMethods()

export async function createUser({ UUID, firstName, lastName, email, phoneNumber, role}: createUserProps): Promise<UserJson> {
    const url = ENDPOINTS.CREATE_USER()
    const config = CONFIG.CREATE_USER()
    return await api.post<UserJson>(url, {
        "UUID": UUID,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phoneNumber": phoneNumber,
        "role": role
    }, config)
}

export async function getUserByUUID(uuid: string): Promise<UserJson> {
    const url = ENDPOINTS.FETCH_USER_BY_UUID(uuid)
    const config = CONFIG.FETCH_USER_BY_UUID()
    return await api.get<UserJson>(url, config)
}

export async function getUser(userId: string): Promise<UserJson> {
    const url = ENDPOINTS.FETCH_USER(userId)
    const config = CONFIG.FETCH_USER()
    return await api.get<UserJson>(url, config)
}