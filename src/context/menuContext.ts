import {createContext, useContext} from "react";
import {Menu, MenuItem, RestaurantJson} from "@/schema.ts";


interface MenuContextProps {
	restaurant: RestaurantJson;
	menu: Menu;
	open: boolean;
	tableNumber: number;
	setSelectedItem: (item: MenuItem) => void;
	selectedItem: MenuItem | undefined;
	unselectItem: () => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export function useMenuContext() {
	const context = useContext(MenuContext)
	if (!context)
		throw new Error("useMenuContext() must be used within the MenuContext");
	return context
}