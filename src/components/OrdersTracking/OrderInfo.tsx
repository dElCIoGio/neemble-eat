import {OrderJson} from "@/schema.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {X} from "lucide-react"
import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {Button} from "@/components/ui/button.tsx";
import {formatCurrency} from "@/lib/utils.ts";
import {Cancelled, InProgress, New, Ready} from "@/components/OrdersTracking/OrderTags.tsx";



interface OrderInfoProps {
    order: OrderJson
}

export function OrderInfo({order}: OrderInfoProps) {

    const { handleOrderDeselected } = useOrdersTrackingContext()
    const Time = new Date(order.orderTime)
    const price = formatCurrency(order.total)

    return (
        <div className={`p-6 h-full`}>
            <div className="flex justify-end">
                <Button size={"icon"} variant="ghost" className="h-8 w-8" onClick={() => handleOrderDeselected()}>
                    <X className="h-8 w-8 p-0"/>
                </Button>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
                {order.orderedItemName}
            </h1>
            <div className="mt-3">
                {
                    order.prepStatus === "New" ? <New/> :
                        order.prepStatus === "In Progress" ? <InProgress/> :
                            order.prepStatus === "Cancelled" ? <Cancelled/> :
                                <Ready/>
                }
            </div>
            <Separator className="my-4"/>
            <div className="w-full space-y-1.5">
                <div className="w-full flex justify-between">
                    <h1 className="font-poppins-regular text-zinc-500">
                        Mesa
                    </h1>
                    <span className="font-poppins-semibold text-amethyst-300">
                        {order.tableNumber}
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <h1 className="font-poppins-regular text-zinc-500">
                        Hora
                    </h1>
                    <span className="font-poppins-semibold text-amethyst-300">
                        {Time.getHours()}:{Time.getMinutes()}
                    </span>
                </div>
                <div className="w-full flex justify-between">
                    <h1 className="font-poppins-regular text-zinc-500">
                        Total
                    </h1>
                    <span className="font-poppins-semibold text-amethyst-300">
                        Kz {price}
                    </span>
                </div>


            </div>
            <Separator className="my-4"/>
            <div>
                <Button type={"button"}>
                    teste
                </Button>
            </div>
        </div>
    );
}
