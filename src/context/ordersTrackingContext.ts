import {OrderJson} from "@/schema.ts";
import {createContext, useContext} from "react";
import {Filter} from "@/lib/constants.ts";


interface OrdersTrackingContextProps {
    orderSelected: OrderJson | null;
    handleOrderSelected: (order: OrderJson) => void;
    handleOrderDeselected: () => void;
    orders: OrderJson[]
    filterMode: Filter,
    handleFilterModeChange: (filterMode: Filter) => void
    tableFilter: string | null,
    handleTableFilterChange: (tableFilter: string | null) => void,
    updateOrderStatus: (orderId: string, newStatus: string) => void
    sorting: "asc" | "desc"
    handleSortingChange: (order: "asc" | "desc") => void
}

export const OrdersTrackingContext = createContext<OrdersTrackingContextProps | undefined>(undefined)

export function useOrdersTrackingContext() {

    const context = useContext(OrdersTrackingContext)

    if (!context)
        throw new Error('useOrdersTrackingContext must be used within a OrdersTrackingProvider')

    return context
}