import {MenuItemCreate} from "@/schema.ts";
import {createContext, useContext} from "react";

interface AddCategoryContextProps {
    categoryName: string;
    setCategoryName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    items: MenuItemCreate[]
    setItems: (items: MenuItemCreate[]) => void;
    addItem: (item: MenuItemCreate) => void;
}

export const AddCategoryContext = createContext<AddCategoryContextProps | undefined>(undefined)

export function useAddCategoryContext() {
    const context = useContext(AddCategoryContext);

    if (!context)
        throw new Error("useAddCategoryContext must be used within the AddCategoryContext");

    return context
}