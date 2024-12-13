

const ROUTER = "/invitation-tokens";

export const ENDPOINTS = {
    CREATE_TOKEN: (restaurantId: string) => `${ROUTER}/${restaurantId}/create-token`,
    GET_TOKEN: (token_id: string) => `${ROUTER}/${token_id}/`,
    DELETE_TOKEN: (token_id: string) => `${ROUTER}/${token_id}`,
}