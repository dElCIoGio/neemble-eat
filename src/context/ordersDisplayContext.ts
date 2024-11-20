import {OrderJson} from "@/schema.ts";
import {createContext, useContext} from "react";


interface OrdersDisplayContextValues {
    orderSelected: OrderJson | null;
    handleOrderSelected: (order: OrderJson) => void;
    handleOrderDeselected: () => void;
}

export const OrdersDisplayContext = createContext<OrdersDisplayContextValues | undefined>(undefined)

export function useOrdersDisplayContext() {
    const context = useContext(OrdersDisplayContext)
    if (context === undefined) {
        throw new Error('useOrdersDisplayContext must be used within a OrdersDisplayProvider')
    }
    return context
}