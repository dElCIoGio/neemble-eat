import {OrderJson} from "@/schema.ts";
import {Card, CardHeader, CardContent, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

interface OrderCardProps {
    order: OrderJson
}


export function OrderCard({order}: OrderCardProps) {
    return (
        <Card className={`p-4 w-full`}>
            <CardHeader className="p-0">
                <CardTitle className="text-lg font-poppins-semibold">
                    {order.orderedItemName} - {order.quantity}
                </CardTitle>
                <CardDescription>
                    Mesa {order.tableNumber}
                    <p>
                        {order.orderTime}
                    </p>
                </CardDescription>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="p-0">

            </CardContent>
        </Card>
    );
}

