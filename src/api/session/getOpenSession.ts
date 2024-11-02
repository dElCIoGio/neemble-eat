import {TableSessionJson} from "@/schema";
import axios from "axios";
import {API, handleError} from "@/api/utils";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {MINUTE} from "@/lib/constants.ts";


const GET_OPEN_SESSION_STALETIME: number = 2 * MINUTE;


interface Props {
	restaurantID: string
	tableNumber: number
}


interface hookProps extends Props {
	closeSession?: () => Promise<void>
}


export async function getOpenSession({tableNumber, restaurantID}: Props): Promise<TableSessionJson> {
	try {
		const response = await API.get(`/restaurants/${restaurantID}/${tableNumber}/open-session`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}

export function getQueryKey(restaurantID: string, tableNumber: number) {
	return ["GET Open-Session", restaurantID, tableNumber]
}

export function useGetOpenSession({closeSession, restaurantID, tableNumber}: hookProps) {

	const queryClient = useQueryClient()

	const queryK = getQueryKey(restaurantID, tableNumber)

	const {
		data,
		isLoading,
		error,
		refetch,
		isStale,
		isFetching
	} = useQuery({
		queryKey: queryK,
		queryFn: () => getOpenSession({
			tableNumber: tableNumber,
			restaurantID: restaurantID
		}).then(data => data),
		staleTime: GET_OPEN_SESSION_STALETIME,
	})

	useEffect(() => {
		if (isStale)
			refetch()
	}, [isStale]);

	const {mutateAsync: closeSessionMutation} = useMutation({
		mutationFn: closeSession,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: queryK
			}).catch((error) => console.error(error))
		}
	})

	return {
		session: data,
		iSFetchingSession: isFetching,
		isSessionLoading: isLoading,
		sessionError: error,
		...closeSession ? {closeSessionMutation: closeSessionMutation} : {}
	}
}
