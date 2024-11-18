import {TypographyH2, TypographyMuted} from "@/components/ui/Typography";
import {useGetAllTables} from "@/service/api/table";
import {useDashboardContext} from "@/context/dashboardContext";
import { QRCodeCanvas } from "qrcode.react"
import {Info} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";

export function TabTables() {

    const {restaurant} = useDashboardContext()

    const {data: tables} = useGetAllTables({restaurantId: restaurant.id})

    function downloadCode(id: string) {
        const element: HTMLCanvasElement = document.querySelector(`#${id}`) as HTMLCanvasElement;
        if (element) {
            const url = element.toDataURL('image/png').replace('image/png', 'image/octet-stream')
            const link = document.createElement('a')
            link.download = `${id}.png`
            link.href = url
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

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
            <div className="flex gap-2">
                {
                    tables &&
                    tables.map((table, index) =>
                        <div key={table.id}
                             className="rounded-md p-4 bg-zinc-100 border border-zinc-10 shadow-sm items-center justify-between inline-block space-y-4">
                            <div className="w-full">
                                <h1 className="text-center text-xl font-bold">
                                    Mesa {table.number}
                                </h1>
                            </div>

                            <div className="border border-zinc-200 rounded-md">
                                <QRCodeCanvas
                                    marginSize={1}
                                    size={200}
                                    bgColor={"#ffffff"}
                                    className="rounded-md"
                                    value={table.link}
                                    id={`qrcode-${index + 1}`}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => downloadCode(`qrcode-${index + 1}`)}>
                                Baixar imagem
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

