import {DashboardPage, RepresentantJson, RestaurantJson} from "@/schema.ts";
import {createContext, useContext} from "react";


type DashboardContextProps = {
	currentPage: DashboardPage;
	selectPage: (page: DashboardPage) => void;
	restaurant: RestaurantJson;
	user: RepresentantJson
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export function useDashboardContext() {
	const context = useContext(DashboardContext)

	if (!context)
		throw new Error("useDashboardContext must be used within DashboardContext")

	return context
}