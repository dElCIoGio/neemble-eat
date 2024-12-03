import {TableJson} from "@/schema.ts";
import {Card} from "@/components/ui/card.tsx";
import TableQRCodeDisplay from "@/components/Dashboard/TableQRCodeDisplay.tsx";

interface TableQrCodeCardProps {
    table: TableJson
    index: number
}

export function TableCard({table, index}: TableQrCodeCardProps) {

    return (
        <Card className="p-2 bg-zinc-100 items-center justify-between inline-block space-y-4 w-full mx-auto">
            <TableQRCodeDisplay table={table} index={index}/>
        </Card>
    );
}

