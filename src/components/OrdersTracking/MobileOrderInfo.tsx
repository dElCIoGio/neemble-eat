import {OrderJson} from "@/schema.ts";
import {Sheet, SheetContent, SheetDescription, SheetTitle} from "@/components/ui/sheet.tsx";
import {OrderInfo} from "@/components/OrdersTracking/OrderInfo.tsx";


interface MobileOrderInfoProps {
    order: OrderJson | null;
    setOrder: (order: OrderJson | null) => void;
}

export function MobileOrderInfo({order, setOrder}: MobileOrderInfoProps) {
    return (
        <Sheet open={order !== null} onOpenChange={(open) => setOrder(open ? order : null)}>
            <SheetContent className="max-h-[90%] py-0 px-0 flex flex-col rounded-t-2xl overflow-y-auto styled-scrollbar " side={"bottom"}>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                {
                    order &&
                    <OrderInfo order={order}/>
                }
            </SheetContent>
        </Sheet>
    );
}

