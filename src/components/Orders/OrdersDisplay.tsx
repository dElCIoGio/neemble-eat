import {useOrdersContext} from "@/context/ordersContext.ts";
import {OrderSingleItem} from "@/components/Orders/OrderItem.tsx";
import {Cancelled, InProgress, Ready} from "@/components/Orders/OrderStatus.tsx";

export function OrdersDisplay() {

	const {orders,} = useOrdersContext()

	console.log(orders)



	return (
		<div className='bg-white shadow-sm p-2 rounded-3xl mt-3 border border-gray-200'>
            {
	            orders &&
	            orders.map((order, index) => (
		            <div key={index}
		                 className='item m-2'>
                        <OrderSingleItem order={order}/>
                        <div className='my-2'>
                            {
	                            order.prepStatus == "Done" ?
		                            <Ready/> :
		                            order.prepStatus == "Cancelled" ?
			                            <Cancelled/> :
			                            <InProgress/>
                            }
                        </div>
                    </div>
	            ))
            }
        </div>

	);
}

