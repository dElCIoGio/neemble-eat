import {TypographyH2, TypographyMuted} from "@/components/ui/Typography";
import {useGetAllTables} from "@/service/api/table";
import {useDashboardContext} from "@/context/dashboardContext";
import {Info, Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {DESKTOP} from "@/lib/constants.ts";
import TableQrCodeCard from "@/components/Dashboard/TableQRCodeCard.tsx";

export function TabTables() {

    const isDesktop = useMediaQuery(DESKTOP)

    const {restaurant} = useDashboardContext()

    const {data: tables} = useGetAllTables({restaurantId: restaurant.id})

    return (
        <div>
            <div className="mb-12">
                <TypographyH2>
                    Mesas e QR Codes
                </TypographyH2>
                <div className="flex gap-2 my-2">
                    <Info className="h-4 w-4 text-zinc-500 mt-0.5"/>
                    <TypographyMuted>
                        Cada mesa tem um QR Code que deve ser usado para entrar no menu do restaurante. Coloque cada QR Code na mesa correspondente e estará tudo pronto para funcionamento.
                    </TypographyMuted>
                </div>

            </div>
            <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-1'}`}>
                {
                    tables &&
                    tables.map((table, index) =>
                        <TableQrCodeCard table={table} index={index} key={index}/>
                    )
                }
                <div className="flex text-zinc-600 items-center justify-center w-full h-full bg-zinc-100 border border-zinc-200 rounded-md shadow-sm">
                    <Button variant="ghost" className={`w-full h-full`}>
                        <Plus/>
                        Nova mesa
                    </Button>
                </div>
            </div>
        </div>
    );
}

