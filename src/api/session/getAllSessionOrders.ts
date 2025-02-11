import {API, handleError} from "@/api/utils";
import axios from "axios";
import {OrderJson} from "@/schema"
import {useQuery} from "@tanstack/react-query";

interface Props {
	sessionID: string | null
}


export async function getAllSessionOrders({sessionID}: Props): Promise<OrderJson[]> {
	try {
		const response = await API.get(`/table-sessions/${sessionID}/orders`)
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}

export function getQueryKey(sessionID: string): string[] {
	return ["GET Session Orders", sessionID]
}

export function useGetSessionOders(attr: Props) {

	const key = getQueryKey(attr.sessionID ? attr.sessionID : "")

	const {data, isLoading, error, isFetching, refetch} = useQuery({
		queryKey: key,
		queryFn: () => getAllSessionOrders(attr).then(data => data),
		enabled: attr.sessionID != null,
	})

	return {
		orders: data,
		isOrdersLoading: isLoading,
		ordersError: error,
		isFetchingOrders: isFetching,
		refreshOrders: refetch
	}
}
