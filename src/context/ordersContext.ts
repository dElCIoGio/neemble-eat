import {createContext, useContext} from "react";
import {OrderJson} from "@/schema.ts";
import {QueryObserverResult, RefetchOptions, UseMutateAsyncFunction} from "@tanstack/react-query";

interface ContextProps {
	orders: OrderJson[] | undefined;
	refreshOrders: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<OrderJson[], Error>>;
	isFetchingOrders: boolean;
	closeSessionMutation: UseMutateAsyncFunction<void, Error, void, unknown> | undefined;
	customerName: string
}

export const OrdersContext = createContext<ContextProps | undefined>(undefined)


export function useOrdersContext() {
	const context = useContext(OrdersContext)

	if (!context)
		throw new Error("useOrdersContext() must be used within the Context");

	return context

}