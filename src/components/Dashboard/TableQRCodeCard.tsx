"use client"

import {TableJson} from "@/schema.ts";
import {QRCodeCanvas} from "qrcode.react";
import {Button} from "@/components/ui/button.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import { useToast } from "@/hooks/use-toast"

interface TableQrCodeCardProps {
    table: TableJson
    index: number
}


function TableQrCodeCard({table, index}: TableQrCodeCardProps) {

    const {restaurant} = useDashboardContext()

    const { toast } = useToast()

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

    function getQrCodeLink(tableNumber: number): string {
        const url = `${window.location.origin}/menu/${tableNumber}/${table.restaurantID}/${restaurant.menus[0]}`
        return url
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text)
    }

    return (
        <div key={table.id}
             className="rounded-md p-2 bg-zinc-100 border border-zinc-150 shadow-sm items-center justify-between inline-block space-y-4 w-full mx-auto">
            <div
                className="border border-zinc-200 rounded-md bg-white"
                style={{height: "auto", margin: "0 auto", maxWidth: 150, width: "100%"}}>
                {
                    table.number &&
                    <QRCodeCanvas
                        marginSize={3}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        size={256}
                        bgColor={"#ffffff"}
                        className="rounded-md"
                        value={getQrCodeLink(table.number)}
                        id={`qrcode-${index + 1}`}/>
                }
            </div>
            <div className="w-full">
                <h1 className="text-center text-lg font-poppins-semibold text-zinc-700">
                    Mesa {table.number}
                </h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Button
                    className="w-full bg-zinc-200 shadow-sm text-dark_purple hover:bg-zinc-300"
                    onClick={() => downloadCode(`qrcode-${index + 1}`)}>
                    Baixar imagem
                </Button>

                <Button
                    className="w-full bg-zinc-200 shadow-sm text-dark_purple hover:bg-zinc-300"
                    onClick={() => {
                        if (table.number) {
                            copyToClipboard(getQrCodeLink(table.number))
                        }
                        toast({
                            title: `Link para a mesa ${table.number} copiado!`,
                        })
                    }}>
                    Copiar link
                </Button>
            </div>



        </div>
    );
}

export default TableQrCodeCard;