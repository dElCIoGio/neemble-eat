import {OrderJson} from "@/schema.ts";
import formatDateString from "@/lib/utils.ts";

interface Props {
	order: OrderJson
}

export function OrderSingleItem({order}: Props) {
	return (
		<div className='flex justify-between items-center text-sm'>
            <div>
                <div className='flex'>
                    <p className='font-semibold'>Pedido:&nbsp;</p>
                    <p className='truncate hover:overflow-clip w-32'>
                        {order.orderedItemName}
                    </p>
                    <p>
                        x {order.quantity}
                    </p>
                </div>
                <p className='text-sm text-gray-400'>
                    {formatDateString(order.orderTime)}
                </p>
            </div>
            <div className='text-sm'>
                <div className='flex'>

                    <p className={`font-semibold ${order.prepStatus == "Cancelled" && "line-through italic"}`}>
                        {order.unitPrice * order.quantity}.00
                    </p>
                    <p>&nbsp;Kz</p>
                </div>
            </div>
        </div>

	);
}