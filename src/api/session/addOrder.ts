import {TableSessionJson, Order} from "@/schema.ts";
import {API, handleError} from "../utils.ts";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";


interface props extends Order {
	sessionID: string,
	itemID: string,
	quantity: number,
	additionalNote: string
}


export async function addOrder({sessionID, itemID, quantity, additionalNote}: Order): Promise<TableSessionJson> {

	try {
		const response = await API.put(`/table-sessions/${sessionID}/orders`, {
			quantity: quantity,
			itemID: itemID,
			sessionID: sessionID,
			additionalNote: additionalNote ? additionalNote : ""
		});
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}


export function useAddOrder(attr: props) {

	const {data, isPending, mutateAsync, error, isSuccess} = useMutation({
		mutationFn: () => addOrder(attr),
		onSuccess: data => {
			console.log(`Order added: `, data);
		},
		onError: error => {
			console.error(error)
		}
	})

	return {
		session: data,
		error,
		isLoading: isPending,
		isSuccess,
		createOrder: mutateAsync,
	}
}
