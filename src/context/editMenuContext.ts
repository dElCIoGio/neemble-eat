import {MenuItem} from "@/schema.ts";
import {createContext, useContext} from "react";

type EditMenuContext = {
    item: MenuItem;
    isOpened: boolean;
    onOpenChange: (isOpened: boolean) => void;
}

export const EditMenuContext = createContext<EditMenuContext | undefined>(undefined)

export function useEditMenuContext() {
    const context = useContext(EditMenuContext)

    if (!context) {
        throw new Error('useEditMenuContext must be used within a EditMenuProvider')
    }
    return context
}