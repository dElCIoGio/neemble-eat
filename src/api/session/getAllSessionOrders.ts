import {API, handleError} from "@/api/utils";
import axios from "axios";
import {OrderJson} from "@/schema"
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";

interface Props {
	sessionID: string | null
}

const GET_SESSION_ORDERS_STALETIME = 0

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

	const {data, isLoading, error, isFetching, isStale, refetch} = useQuery({
		queryKey: key,
		queryFn: () => getAllSessionOrders(attr).then(data => data),
		enabled: attr.sessionID != null,
		staleTime: GET_SESSION_ORDERS_STALETIME,
	})

	useEffect(() => {
		if (isStale)
			refetch()
	}, [isStale]);


	return {
		orders: data,
		isOrdersLoading: isLoading,
		ordersError: error,
		isFetchingOrders: isFetching,
		refreshOrders: refetch
	}
}
