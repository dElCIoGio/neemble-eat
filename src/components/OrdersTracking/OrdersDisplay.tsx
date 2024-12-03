import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {OrderListing} from "@/components/OrdersTracking/OrderListing.tsx";


export function OrdersDisplay() {

    const {orders, filterMode, tableFilter, sorting} = useOrdersTrackingContext()

    const filteredOrders = orders.filter((order) => {
        const matchesFilterMode = filterMode.tag === 'All' || filterMode.tag === order.prepStatus;
        const matchesTableFilter = tableFilter === "All" || tableFilter === null || tableFilter === order.tableNumber.toString();
        return matchesFilterMode && matchesTableFilter;
    }).sort((a, b) => {
        const timeA = new Date(a.orderTime).getTime();
        const timeB = new Date(b.orderTime).getTime();

        if (sorting === "asc") {
            return timeA - timeB;
        } else {
            return timeB - timeA;
        }
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

