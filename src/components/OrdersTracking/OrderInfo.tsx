import {OrderJson, OrderStatus} from "@/schema.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {X} from "lucide-react"
import {useOrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {Button} from "@/components/ui/button.tsx";
import {formatCurrency} from "@/lib/utils.ts";
import {Cancelled, InProgress, New, Ready} from "@/components/OrdersTracking/OrderTags.tsx";
import {updateOrder} from "@/api/order/managers.ts";
import {Card} from "@/components/ui/card.tsx";



interface OrderInfoProps {
    order: OrderJson
}

export function OrderInfo({order}: OrderInfoProps) {

    const { handleOrderDeselected, updateOrderStatus } = useOrdersTrackingContext()
    const Time = new Date(order.orderTime)
    const price = formatCurrency(order.total)


    function formatNumberToTwoDigits(number: number): string {
        return number < 10 ? `0${number}` : `${number}`
    }

    function formatTime(time: Date) {
        return `${formatNumberToTwoDigits(time.getHours())}:${formatNumberToTwoDigits(time.getMinutes())}`
    }

    function update(status: OrderStatus) {
        let tag: string;
        switch (status) {
            case "New":
                tag = "new";
                break
            case "In Progress":
                tag = "in-progress";
                break
            case "Cancelled":
                tag = "cancel";
                break
            case "Done":
                tag = "done";
                break
            default:
                tag = "new";
        }
        order.prepStatus = status;
        updateOrderStatus(order.id, status)
        updateOrder({orderID: order.id, newStatus: tag})
            .then()
    }

    return (
        <div className={`p-6 h-full`}>
            <div className="flex justify-end">
                <Button size={"icon"} variant="ghost" className="h-8 w-8" onClick={() => handleOrderDeselected()}>
                    <X className="h-8 w-8 p-0"/>
                </Button>
            </div>
            <div className="mt-3">
                {
                    order.prepStatus === "New" ? <New/> :
                        order.prepStatus === "In Progress" ? <InProgress/> :
                            order.prepStatus === "Cancelled" ? <Cancelled/> :
                                <Ready/>
                }
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
                {order.orderedItemName}
            </h1>
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
                        {formatTime(Time)}
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
            {
                order.additionalNote != undefined && order.additionalNote != "" &&
                <div>
                    <Separator className="my-4"/>
                    <div>
                        <h1 className="font-poppins-regular text-zinc-500">
                            Nota do Cliente:
                        </h1>
                        <Card className="p-4 bg-zinc-100 rounded-2xl my-2 border-amethyst-300">
                            <p className="text-sm font-poppins-regular text-zinc-800">
                                {order.additionalNote}
                            </p>
                        </Card>
                    </div>
                </div>
            }
            <Separator className="my-4"/>
            <div className="mb-12 laptop:mb-0">
                <h1 className="font-poppins-semibold text-zinc-500 my-2">
                    Ações
                </h1>
                {
                    order.prepStatus === "New" ?
                        <div className="flex space-x-2">
                            <Button
                                className="w-1/2"
                                variant={"default"}
                                type={"button"}
                                onClick={() => update("In Progress" as OrderStatus)}>
                                Em Preparo
                            </Button>
                            <Button
                                className="w-1/2"
                                variant={"destructive"}
                                type={"button"}
                                onClick={() => update("Cancelled" as OrderStatus)}>
                                Cancelar Pedido
                            </Button>
                        </div>:
                        order.prepStatus === "In Progress" ?
                            <div className="flex space-x-2">
                                <Button
                                    className="w-1/2"
                                    variant="default"
                                    type="button"
                                    onClick={() => update("Done" as OrderStatus)}>
                                    Prato Pronto
                                </Button>
                                <Button
                                    className="w-1/2"
                                    variant={"destructive"}
                                    type={"button"}
                                    onClick={() => update("Cancelled" as OrderStatus)}>
                                    Cancelar Pedido
                                </Button>
                            </div>:
                            order.prepStatus === "Cancelled" || order.prepStatus === "Done" &&
                                <div className="space-x-2">

                                </div>
                }
            </div>
        </div>
    );
}
