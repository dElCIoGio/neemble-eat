
const ROUTER = "/categories"

export const ENDPOINTS = {
    DELETE_CATEGORY_ITEM: (categoryId: string, itemId: string) => (
        `${ROUTER}/${categoryId}/${itemId}/menuItem`
    ),
    ADD_ITEM: () => `${ROUTER}/add-menu-item`
}