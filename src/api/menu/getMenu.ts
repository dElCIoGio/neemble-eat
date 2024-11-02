import {Menu} from "@/schema";
import {API, handleError} from "@/api/utils";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";

const GET_MENU_STALETIME: number = HOUR * 3
const GET_MENU_CACHETIME: number = HOUR * 6


interface props {
	menuID: string
}

interface hookProps extends props {
	getStale?: boolean
}


export async function getMenu({menuID}: props): Promise<Menu> {
	try {
		const response = await API.get(`/menus/${menuID}/parse`)
		return response.data

	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}


export function useGetMenu(attr: hookProps) {

	const {
		data, error, isLoading,
	} = useQuery({
		queryKey: ["GET menu", attr.menuID],
		queryFn: () => getMenu({menuID: attr.menuID})
			.then(data => data),
		enabled: !!attr.menuID,
		staleTime: GET_MENU_STALETIME,
		gcTime: GET_MENU_CACHETIME,
	});

	return {
		menu: data,
		isMenuLoading: isLoading,
		menuError: error,
		isMenuAvailable: !!data
	}
}

