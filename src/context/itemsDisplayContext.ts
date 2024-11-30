import {createContext, useContext} from "react";


interface ItemsDisplayContextProps {
    deleteItemAlert: boolean
    setDeleteItemAlert: (value: boolean) => void
}

export const ItemsDisplayContext = createContext<ItemsDisplayContextProps | undefined>(undefined)

export function useItemsDisplayContext() {
    const context = useContext(ItemsDisplayContext)

    if (context === undefined) {
        throw new Error('useItemsDisplayContext must be used within a ItemsDisplayProvider')
    }

    return context

}