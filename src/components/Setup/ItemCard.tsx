import {Card} from "@/components/ui/card.tsx";
import {MenuItemCreate} from "@/schema.ts";

interface ItemCardProps {
    item: MenuItemCreate
}

export function ItemCard({item}: ItemCardProps) {


    return (
        <Card className="px-2 py-0.5">
            <h1>{item.name}</h1>
        </Card>
    );
}

