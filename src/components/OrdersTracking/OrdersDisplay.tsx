import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {OrderCard} from "@/components/OrdersTracking/OrderCard.tsx";

export function OrdersDisplay() {

    const {orders} = useOrdersTrackingContext()

    return (
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-3">
            {
                orders.map((order) =>
                    <OrderCard key={order.id} order={order}/>)
            }
        </div>
    );
}

