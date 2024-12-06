

const ROUTER = "/menu-items"

export const ENDPOINTS = {
    UPDATE_ITEM: (menuItemId: string) => `${ROUTER}/${menuItemId}`,
}