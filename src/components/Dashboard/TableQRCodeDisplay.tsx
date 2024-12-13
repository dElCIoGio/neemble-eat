"use client"

import {TableJson} from "@/schema.ts";
import {QRCodeCanvas} from "qrcode.react";
import {Button} from "@/components/ui/button.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {useToast} from "@/hooks/use-toast"
import {DownloadSimple, Copy} from "@phosphor-icons/react"
import {copyToClipboard, openUrlInNewTab} from "@/lib/utils.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";


interface TableQrCodeCardProps {
    table: TableJson
    index: number
}


function TableQRCodeDisplay({table, index}: TableQrCodeCardProps) {


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
            activateToast(`Imagem da mesa ${table.number} baixada!`)
        }
    }

    function getQrCodeLink(tableNumber: number): string {
        return `${window.location.origin}/menu/${tableNumber}/${table.restaurantID}/${restaurant.menus[0]}`
    }


    function activateToast(text: string) {
        toast({
            title: text,
        })
    }


    return (
        <div key={table.id}>
            <div
                className="border border-zinc-200 rounded-md bg-white "
                style={{height: "auto", margin: "0 auto", maxWidth: 150, width: "100%"}}
                onClick={() => {
                    const num = table.number
                    if (num != undefined)
                        return openUrlInNewTab(getQrCodeLink(num))
                }}>
                {
                    table.number &&
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                        <QRCodeCanvas
                                            marginSize={3}
                                            style={{height: "auto", maxWidth: "100%", width: "100%"}}
                                            size={256}
                                            bgColor={"#ffffff"}
                                            className="rounded-md opacity-100 hover:opacity-60 transition-all duration-300 cursor-pointer"
                                            value={getQrCodeLink(table.number)}
                                            id={`qrcode-${index + 1}`}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Abrir pagina da mesa {table.number}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                }
            </div>
            <div className="w-full my-2.5">
                <h1 className="text-center text-base  text-zinc-700">
                     Mesa {table.number}
                </h1>
            </div>
            <div className="flex flex-col space-y-2">
                <Button
                    className="w-full bg-zinc-200 shadow-sm text-dark_purple hover:bg-zinc-300"
                    onClick={() => downloadCode(`qrcode-${index + 1}`)}>
                    <DownloadSimple/>Baixar QR Code
                </Button>
                <Button
                    className="w-full bg-zinc-200 shadow-sm text-dark_purple hover:bg-zinc-300"
                    onClick={() => {
                        if (table.number) {
                            copyToClipboard(getQrCodeLink(table.number))
                        }
                        activateToast(`Link para a Mesa: ${table.number} copiado!`)
                    }}>
                    <Copy/>Copiar link
                </Button>
            </div>
        </div>
    );
}

export default TableQRCodeDisplay;