import {CategoryCreate} from "@/schema.ts";
import {createContext, useContext} from "react";


type MenuConfigContextProps = {
	categories: CategoryCreate[];
	deleteCategory: (index: number) => void;
	sortCategories: () => void;
	search: string;
}


export const MenuConfigContext = createContext<MenuConfigContextProps | undefined>(undefined)


export function useMenuConfigContext() {
	const context = useContext(MenuConfigContext)

	if (!context)
		throw new Error("useMenuConfigContext must be used within MenuConfigContextProps")

	return context
}