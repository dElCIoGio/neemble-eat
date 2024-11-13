import {MenuItemWithCategory} from "@/schema.ts";
import {createContext, useContext} from "react";

type EditItemContext = {
    item: MenuItemWithCategory | undefined;
    isOpened: boolean;
    onOpenChange: (isOpened: boolean) => void;
}

export const EditItemContext = createContext<EditItemContext | undefined>(undefined)

export function useEditItemContext() {
    const context = useContext(EditItemContext)

    if (!context) {
        throw new Error('useEditMenuContext must be used within a EditMenuProvider')
    }
    return context
}