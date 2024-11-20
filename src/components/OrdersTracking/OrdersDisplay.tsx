import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {OrderListing} from "@/components/OrdersTracking/OrderListing.tsx";
import {useCallback, useState} from "react";
import {OrderJson} from "@/schema.ts";
import {OrdersDisplayContext} from "@/context/ordersDisplayContext.ts";

export function OrdersDisplay() {

    const {orders} = useOrdersTrackingContext()

    const [orderSelected, setOrderSelected] = useState<OrderJson | null>(null)

    const handleOrderSelected = useCallback((order: OrderJson) => {
        setOrderSelected(order);
    }, []);

    const handleOrderDeselected = useCallback(() => {
        setOrderSelected(null);
    }, []);

    return (
        <OrdersDisplayContext.Provider value={{
            orderSelected,
            handleOrderSelected,
            handleOrderDeselected
        }}>
            <div className="space-y-1.5">
                {
                    orders.map((order) =>
                        <OrderListing key={order.id} order={order}/>)
                }
            </div>
        </OrdersDisplayContext.Provider>

    );
}

