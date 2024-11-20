import {OrderJson} from "@/schema.ts";
import {Card} from "@/components/ui/card.tsx";
import timeAgo from "@/lib/timeCalculator.ts";
import {New, Ready, Cancelled, InProgress} from "@/components/OrdersTracking/OrderTags.tsx";
import {OrderBadge} from "@/components/OrdersTracking/OrderBadge.tsx";
import {Tag, QrCode, Clock} from "@phosphor-icons/react"
import {formatCurrency} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";


interface OrderCardProps {
    order: OrderJson
}


export function OrderListing({order}: OrderCardProps) {

    const time = timeAgo(order.orderTime)
    const price = formatCurrency(order.total)
    const {orderSelected, handleOrderSelected} = useOrdersTrackingContext()

    return (
        <Card onClick={() => handleOrderSelected(order)}
              className={`p-4 w-full rounded-xl space-y-1.5 transition-all duration-150 ${orderSelected?.id === order.id ? 'border-amethyst-400 outline outline-amethyst-800 bg-zinc-50' : "hover:bg-zinc-50"}`}>
            <div className="flex justify-between w-full">
                <div className={"w-full"}>
                    <div className="flex space-x-1.5 font-semibold tracking-tight text-lg">
                        <h1>{order.orderedItemName}</h1> <span className="hidden laptop:block">x{order.quantity}</span>
                    </div>
                    <div className="flex laptop:hidden space-x-1.5 items-center text-zinc-600 font-poppins-regular w-full">
                        <h3>Quantidade: </h3>
                        <span className="text-zinc-800 font-poppins-medium">
                            {order.quantity}
                        </span>
                    </div>

                </div>

                <div className="p-2">
                    {order.prepStatus === "New" ? <New/> :
                        order.prepStatus === "In Progress" ? <InProgress/> :
                            order.prepStatus === "Cancelled" ? <Cancelled/> :
                                <Ready/>}
                </div>
            </div>
            <Separator className="block laptop:hidden"/>
            <div>
                <div className='hidden laptop:flex items-center space-x-2'>
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
                <div className={"laptop:hidden"}>
                    <div className="flex space-x-1.5 items-center text-zinc-600 font-poppins-regular">
                        <QrCode/>
                        <h3>Mesa: <span className="text-zinc-800 font-poppins-medium">{order.tableNumber}</span></h3>
                    </div>
                    <div className="flex space-x-1.5 items-center text-zinc-600 font-poppins-regular">
                        <Clock/>
                        <h3>Tempo: <span className="text-zinc-800 font-poppins-medium">{time}</span></h3>
                    </div>
                    <div className="flex space-x-1.5 items-center text-zinc-600 font-poppins-regular">
                        <Tag/>
                        <h3>Preço: <span className="text-zinc-800 font-poppins-medium">Kz {price}</span></h3>
                    </div>

                </div>
            </div>


        </Card>
    );
}

