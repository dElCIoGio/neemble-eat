import {CategoryJson, Menu, MenuItemJson} from "@/schema.ts";
import {createContext, useContext} from "react";

interface EditMenuProps {
    menu: Menu;
    addCategory: (category: CategoryJson) => void;
    updateItem: (categoryId: string, itemId: string, newMenuItem: MenuItemJson) => void;
    addItem: (categoryId: string, newMenuItem: MenuItemJson) => void;
}

export const EditMenuContext = createContext<EditMenuProps |  undefined>(undefined)

export function useEditMenuContext() {

    const context = useContext(EditMenuContext);

    if (!context) {
        throw new Error('useEditMenuContext must be used within a EditMenu.');
    }

    return context;
}