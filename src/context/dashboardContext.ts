import {DashboardPage, UserJson, RestaurantJson} from "@/schema.ts";
import {createContext, useContext} from "react";


type DashboardContextProps = {
	currentPage: DashboardPage;
	selectPage: (page: DashboardPage) => void;
	restaurant: RestaurantJson;
	user: UserJson
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function useDashboardContext() {
	const context = useContext(DashboardContext)

	if (!context)
		throw new Error("useDashboardContext must be used within DashboardContext")

	return context
}