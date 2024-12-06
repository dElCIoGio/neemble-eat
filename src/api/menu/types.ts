
export interface getMenuProps {
    menuId: string
}

export interface getMenuHookProps extends getMenuProps {
    getStale?: boolean
}
export interface AddCategoryProps {
    name: string
    description?: string
    menuID: string
    items?: string[]
}