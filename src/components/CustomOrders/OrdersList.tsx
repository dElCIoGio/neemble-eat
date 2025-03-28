
import { Clock, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Order} from "@/components/CustomOrders/CounterOrders.tsx";

type ListaPedidosProps = {
    pedidos: Order[]
    onSelectPedido: (pedido: Order) => void
    pedidoSelecionadoId?: string
}

export function OrdersList({ pedidos, onSelectPedido, pedidoSelecionadoId }: ListaPedidosProps) {
    if (pedidos.length === 0) {
        return <div className="text-center py-8 text-gray-500">Nenhum pedido encontrado</div>
    }

    const formatarHora = (data: Date) => {
        return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "Novo":
                return "bg-[#9370DB]"
            case "Em Preparo":
                return "bg-amber-500"
            case "Pronto":
                return "bg-green-500"
            case "Cancelado":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="space-y-4">
            {pedidos.map((pedido) => (
                <Card
                    key={pedido.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${pedidoSelecionadoId === pedido.id ? "border-[#9370DB] border-2" : ""}`}
                    onClick={() => onSelectPedido(pedido)}
                >
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {pedido.itens[0]?.nome}
                                    {pedido.itens.length > 1 ? ` + ${pedido.itens.length - 1} item(s)` : ""}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Badge variant="outline" className="flex gap-1 font-normal">
                      <Utensils className="h-3 w-3" />
                        {pedido.mesa ? `Mesa ${pedido.mesa}` : "Balcão"}
                    </Badge>
                  </span>
                                    <span className="flex items-center gap-1">
                    <Badge variant="outline" className="flex gap-1 font-normal">
                      <Clock className="h-3 w-3" />
                        {formatarHora(pedido.horaPedido)}
                    </Badge>
                  </span>
                                    <span className="flex items-center gap-1">
                    <Badge variant="outline" className="font-normal">
                      Kz {pedido.valorTotal.toLocaleString()}
                    </Badge>
                  </span>
                                </div>
                            </div>
                            <Badge className={`${getEstadoColor(pedido.estado)} text-white`}>{pedido.estado}</Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

