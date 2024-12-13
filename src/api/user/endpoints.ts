const ROUTER = "/users"

export const ENDPOINTS = {
    CREATE_USER: () => `${ROUTER}/`,
    FETCH_USER: (userId: string) => `${ROUTER}/${userId}`,
    FETCH_USER_BY_UUID: (uuid: string) => `${ROUTER}/${uuid}/UUID`,
}