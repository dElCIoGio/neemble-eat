import {Menu} from "@/schema.ts";
import {createContext, useContext} from "react";

interface EditMenuProps {
    menu: Menu;
}

export const EditMenuContext = createContext<EditMenuProps |  undefined>(undefined)

export function useEditMenuContext() {

    const context = useContext(EditMenuContext);
    if (!context) {
        throw new Error('useEditMenuContext must be used within a EditMenu.',);
    }
    return context;
}