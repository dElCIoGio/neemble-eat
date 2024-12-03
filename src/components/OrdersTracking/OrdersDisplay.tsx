import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {OrderListing} from "@/components/OrdersTracking/OrderListing.tsx";


export function OrdersDisplay() {

    const {orders, filterMode, tableFilter} = useOrdersTrackingContext()

    const filteredOrders = orders.filter((order) => {
        const matchesFilterMode = filterMode.tag === 'All' || filterMode.tag === order.prepStatus;
        console.log(matchesFilterMode)
        const matchesTableFilter = tableFilter === "All" || tableFilter === order.tableNumber.toString();
        console.log(matchesTableFilter)
        return matchesFilterMode && matchesTableFilter;
    });

    return (
        <div className={`space-y-1.5 p-1`}>
            {
                filteredOrders.map(order => (
                    <OrderListing key={order.id} order={order}/>
                ))
            }
        </div>
    );
}

