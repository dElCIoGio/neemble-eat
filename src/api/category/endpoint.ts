
const ROUTER = "/categories"

export const ENDPOINTS = {
    DELETE_CATEGORY_ITEM: (categoryId: string, itemId: string) => (
        `${ROUTER}/${categoryId}/${itemId}/menuItem`
    )
}