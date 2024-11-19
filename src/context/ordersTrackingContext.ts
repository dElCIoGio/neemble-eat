import {OrderJson} from "@/schema.ts";
import {createContext, useContext} from "react";
import {Filter} from "@/lib/constants.ts";


interface OrdersTrackingContextProps {
    orders: OrderJson[]
    filterMode: Filter,
    handleFilterModeChange: (filterMode: Filter) => void
}

export const OrdersTrackingContext = createContext<OrdersTrackingContextProps | undefined>(undefined)

export function useOrdersTrackingContext() {

    const context = useContext(OrdersTrackingContext)

    if (!context)
        throw new Error('useOrdersTrackingContext must be used within a OrdersTrackingProvider')

    return context
}