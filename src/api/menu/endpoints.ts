

const ROUTER = "/menus"

export const ENDPOINTS = {
    FETCH_MENU: (menuId: string) => `${ROUTER}/${menuId}/parse`,
    ADD_CATEGORY: (menuId: string) => `${ROUTER}/${menuId}/categories`,
}