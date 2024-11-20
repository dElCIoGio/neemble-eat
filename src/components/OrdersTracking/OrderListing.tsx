import {OrderJson} from "@/schema.ts";
import {Card} from "@/components/ui/card.tsx";
import timeAgo from "@/lib/timeCalculator.ts";
import {New, Ready, Cancelled, InProgress} from "@/components/OrdersTracking/OrderTags.tsx";
import {OrderBadge} from "@/components/OrdersTracking/OrderBadge.tsx";
import {Tag, QrCode, Clock} from "@phosphor-icons/react"
import {formatCurrency} from "@/lib/utils.ts";
import {useOrdersDisplayContext} from "@/context/ordersDisplayContext.ts";


interface OrderCardProps {
    order: OrderJson
}


export function OrderListing({order}: OrderCardProps) {

    const time = timeAgo(order.orderTime)
    const price = formatCurrency(order.total)
    const {orderSelected, handleOrderSelected} = useOrdersDisplayContext()

    return (
        <Card onClick={() => handleOrderSelected(order)} className={`p-4 w-full rounded-xl flex justify-between items-center transition-all duration-150 ${orderSelected?.id === order.id ? 'border-amethyst-400 outline outline-amethyst-800 bg-zinc-50': "hover:bg-zinc-50"}`}>
            <div className="space-y-1.5">
                <h1 className="font-semibold tracking-tight text-lg">
                    {order.orderedItemName} <span>x{order.quantity}</span>
                </h1>
                <div className='flex items-center space-x-2'>
                    <OrderBadge icon={QrCode}>
                        Mesa {order.tableNumber}
                    </OrderBadge>
                    <OrderBadge icon={Clock}>
                        {time} atrás
                    </OrderBadge>
                    <OrderBadge icon={Tag}>
                        Kz {price}
                    </OrderBadge>
                </div>
            </div>
            <div>
                {order.prepStatus === "New"? <New/>:
                    order.prepStatus === "In Progress"? <InProgress/>:
                        order.prepStatus === "Cancelled"? <Cancelled/>:
                            <Ready/>}
            </div>
        </Card>
    );
}

