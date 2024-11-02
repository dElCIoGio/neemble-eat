import {TableSessionJson} from "@/schema.ts";
import {API, handleError} from "@/api/utils.ts";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";


interface Props {
	sessionID: string
	status: string
}


export async function closeSession({sessionID, status}: Props): Promise<TableSessionJson> {
	try {
		const response = await API.post(`/table-sessions/${sessionID}/${status}/orders`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}

export function useCloseOrder(attr: Props) {
	const {
		data,
		isPending,
		mutateAsync,
		error,
		isSuccess
	} = useMutation({
		mutationFn: () => closeSession(attr),
		onSuccess: () => {
			console.log(`Session ${attr.sessionID} closed: `);
		},
		onError: error => {
			console.error(error)
		}
	})

	return {
		newItem: data || null,
		error,
		isLoading: isPending,
		createItem: mutateAsync,
		isSuccess

	}

}