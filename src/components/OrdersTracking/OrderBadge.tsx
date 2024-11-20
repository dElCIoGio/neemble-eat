import {Icon} from "@phosphor-icons/react";
import {ReactNode} from "react";
import {Card} from "@/components/ui/card.tsx";

interface OrderBadgeProps {
    icon: Icon
    children: ReactNode
}

export function OrderBadge({children, icon}: OrderBadgeProps) {

    const Icon = icon

    return (
        <Card className={`flex text-zinc-600 shadow-none bg-zinc-100 items-center space-x-1 rounded-md px-2 py-0`}>
            <Icon fill={"#52525b"} /> <p className="font-poppins-regular">{children}</p>
        </Card>
    );
}

