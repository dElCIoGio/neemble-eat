
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Order} from "@/components/CustomOrders/CounterOrders.tsx";

type DetalhesPedidoProps = {
    pedido: Order
    onUpdateEstado: (id: string, estado: "Novo" | "Em Preparo" | "Pronto" | "Cancelado") => void
    onClose: () => void
}

export function OrdersDetails({ pedido, onUpdateEstado, onClose }: DetalhesPedidoProps) {
    const formatarData = (data: Date) => {
        return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#9370DB]"></span>
                        Novo
                    </div>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <h2 className="text-2xl font-bold mb-6">
                    {pedido.itens[0]?.nome}
                    {pedido.itens.length > 1 ? ` + ${pedido.itens.length - 1} item(s)` : ""}
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Local</p>
                            <p className="font-medium">{pedido.mesa ? `Mesa ${pedido.mesa}` : "Balcão"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Hora</p>
                            <p className="font-medium">{formatarData(pedido.horaPedido)}</p>
                        </div>
                    </div>

                    {pedido.descricao && (
                        <div>
                            <p className="text-sm text-gray-500">Descrição</p>
                            <p className="font-medium">{pedido.descricao}</p>
                        </div>
                    )}

                    <div>
                        <p className="text-sm text-gray-500 mb-2">Itens</p>
                        <div className="space-y-2">
                            {pedido.itens.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <div>
                                        <span className="font-medium">{item.nome}</span>
                                        <span className="text-gray-500 ml-2">x{item.quantidade}</span>
                                    </div>
                                    <span>Kz {(item.preco * item.quantidade).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                        <p className="font-medium">Total</p>
                        <p className="font-bold">Kz {pedido.valorTotal.toLocaleString()}</p>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-gray-500 mb-2">Ações</p>
                        <div className="grid grid-cols-1 gap-2">
                            <Button
                                className="w-full bg-black hover:bg-gray-800 text-white"
                                onClick={() => onUpdateEstado(pedido.id, "Em Preparo")}
                                disabled={pedido.estado === "Em Preparo" || pedido.estado === "Pronto" || pedido.estado === "Cancelado"}
                            >
                                Em Preparo
                            </Button>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => onUpdateEstado(pedido.id, "Pronto")}
                                disabled={pedido.estado === "Pronto" || pedido.estado === "Cancelado"}
                            >
                                Pronto para Entrega
                            </Button>
                            <Button
                                className="w-full bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => onUpdateEstado(pedido.id, "Cancelado")}
                                disabled={pedido.estado === "Cancelado"}
                            >
                                Cancelar Pedido
                            </Button>
                        </div>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                            onClick={() => {
                                // Em um sistema real, isso enviaria para impressão
                                alert("Enviando pedido para impressão...")
                            }}
                        >
                            Imprimir Pedido
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

