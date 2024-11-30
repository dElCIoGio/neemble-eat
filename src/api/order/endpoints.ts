

const ROUTER = "/orders"

export const ENDPOINTS = {
    UPDATE_ORDER: (orderID: string, newStatus: string)=> `${ROUTER}/${orderID}/${newStatus}`,
}