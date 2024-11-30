
export const ROUTER = "/table-sessions"

export const ENDPOINTS = {
    ADD_ORDER: (sessionID: string) => `${ROUTER}/${sessionID}/orders`,
    CLOSE_SESSION: (sessionID: string, status: string) => `${ROUTER}/${sessionID}/${status}/orders`,
    GET_ALL_SESSION_ORDERS: (sessionID: string) => `${ROUTER}/${sessionID}/orders`,
}