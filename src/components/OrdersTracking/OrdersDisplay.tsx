import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {OrderListing} from "@/components/OrdersTracking/OrderListing.tsx";


export function OrdersDisplay() {

    const {orders} = useOrdersTrackingContext()

    return (
        <div className={`space-y-1.5 p-1`}>
            {
                orders.map((order) =>
                    <OrderListing key={order.id} order={order}/>)
            }
        </div>
    );
}

