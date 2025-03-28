
import { useState } from "react"
import { ArrowLeftRight, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {OrderForm} from "@/components/CustomOrders/OrderForm.tsx";
import {OrdersList} from "@/components/CustomOrders/OrdersList.tsx";
import {OrdersDetails} from "@/components/CustomOrders/OrderDetails.tsx";

export type OrderItem = {
    id: string
    nome: string
    quantidade: number
    preco: number
}

export type Order = {
    id: string
    mesa?: string
    horaPedido: Date
    descricao?: string
    itens: OrderItem[]
    valorTotal: number
    estado: "Novo" | "Em Preparo" | "Pronto" | "Cancelado"
}

export function CounterOrders() {
    const [pedidos, setPedidos] = useState<Order[]>([
        {
            id: "1",
            mesa: "2",
            horaPedido: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
            itens: [{ id: "1-1", nome: "Gambas ao Alho", quantidade: 2, preco: 8000 }],
            valorTotal: 16000,
            estado: "Novo",
        },
        {
            id: "2",
            mesa: "4",
            horaPedido: new Date(Date.now() - 1000 * 60 * 45), // 45 minutos atrás
            itens: [
                { id: "2-1", nome: "Coquetel de Saké com Frutas", quantidade: 1, preco: 7500 },
                { id: "2-2", nome: "Sushi Variado", quantidade: 1, preco: 9500 },
            ],
            valorTotal: 17000,
            estado: "Em Preparo",
        },
        {
            id: "3",
            horaPedido: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
            descricao: "Cliente pediu para entregar rápido",
            itens: [
                { id: "3-1", nome: "Filé Mignon", quantidade: 1, preco: 12000 },
                { id: "3-2", nome: "Salada Mista", quantidade: 1, preco: 4500 },
            ],
            valorTotal: 16500,
            estado: "Pronto",
        },
    ])
    const [pedidoSelecionado, setPedidoSelecionado] = useState<Order | null>(null)
    const [filtro, setFiltro] = useState("Todos")
    const [ordenacao, setOrdenacao] = useState("Recente")

    const adicionarPedido = (novoPedido: Order) => {
        setPedidos([novoPedido, ...pedidos])
    }

    const atualizarEstadoPedido = (id: string, novoEstado: "Novo" | "Em Preparo" | "Pronto" | "Cancelado") => {
        setPedidos(
            pedidos.map((pedido) => {
                if (pedido.id === id) {
                    return { ...pedido, estado: novoEstado }
                }
                return pedido
            }),
        )

        if (pedidoSelecionado?.id === id) {
            setPedidoSelecionado({ ...pedidoSelecionado, estado: novoEstado })
        }
    }

    const [termoPesquisa, setTermoPesquisa] = useState("")

    const pesquisarPedidos = (pedidos: Order[]) => {
        if (!termoPesquisa.trim()) return pedidos

        const termo = termoPesquisa.toLowerCase()
        return pedidos.filter(
            (pedido) =>
                pedido.mesa?.toLowerCase().includes(termo) ||
                pedido.descricao?.toLowerCase().includes(termo) ||
                pedido.itens.some((item) => item.nome.toLowerCase().includes(termo)),
        )
    }

    const pedidosFiltrados = pesquisarPedidos(
        pedidos.filter((pedido) => {
            if (filtro === "Todos") return true
            return pedido.estado === filtro
        }),
    )

    const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => {
        if (ordenacao === "Recente") {
            return b.horaPedido.getTime() - a.horaPedido.getTime()
        } else {
            return a.horaPedido.getTime() - b.horaPedido.getTime()
        }
    })

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-2 mb-6">
                <Utensils className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Pedidos</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="novo" className="w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <TabsList className="bg-gray-100">
                                <TabsTrigger value="todos">Todos</TabsTrigger>
                                <TabsTrigger value="novo" className="data-[state=active]:bg-[#9370DB] data-[state=active]:text-white">
                                    Novos
                                </TabsTrigger>
                                <TabsTrigger value="preparo">Em preparo</TabsTrigger>
                                <TabsTrigger value="pronto">Prontos</TabsTrigger>
                                <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
                            </TabsList>

                            <div className="flex items-center gap-2">
                                <div className="relative hidden">
                                    <Input
                                        type="search"
                                        placeholder="Pesquisar pedidos..."
                                        value={termoPesquisa}
                                        onChange={(e) => setTermoPesquisa(e.target.value)}
                                        className="w-full sm:w-[200px]"
                                    />
                                </div>

                                <Select defaultValue="Todos" onValueChange={setFiltro}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filtrar por" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Todos">Todas</SelectItem>
                                        <SelectItem value="Novo">Novos</SelectItem>
                                        <SelectItem value="Em Preparo">Em Preparo</SelectItem>
                                        <SelectItem value="Pronto">Prontos</SelectItem>
                                        <SelectItem value="Cancelado">Cancelados</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setOrdenacao(ordenacao === "Recente" ? "Antigo" : "Recente")}
                                        className="flex items-center gap-1"
                                    >
                                        <span className="text-sm text-gray-500">Antigo</span>
                                        <ArrowLeftRight className="h-4 w-4" />
                                        <span className="text-sm text-gray-500">Recente</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <TabsContent value="todos">
                            <OrdersList
                                pedidos={pedidosOrdenados}
                                onSelectPedido={setPedidoSelecionado}
                                pedidoSelecionadoId={pedidoSelecionado?.id}
                            />
                        </TabsContent>

                        <TabsContent value="novo">
                            <OrdersList
                                pedidos={pedidosOrdenados.filter((p) => p.estado === "Novo")}
                                onSelectPedido={setPedidoSelecionado}
                                pedidoSelecionadoId={pedidoSelecionado?.id}
                            />
                        </TabsContent>

                        <TabsContent value="preparo">
                            <OrdersList
                                pedidos={pedidosOrdenados.filter((p) => p.estado === "Em Preparo")}
                                onSelectPedido={setPedidoSelecionado}
                                pedidoSelecionadoId={pedidoSelecionado?.id}
                            />
                        </TabsContent>

                        <TabsContent value="pronto">
                            <OrdersList
                                pedidos={pedidosOrdenados.filter((p) => p.estado === "Pronto")}
                                onSelectPedido={setPedidoSelecionado}
                                pedidoSelecionadoId={pedidoSelecionado?.id}
                            />
                        </TabsContent>

                        <TabsContent value="cancelado">
                            <OrdersList
                                pedidos={pedidosOrdenados.filter((p) => p.estado === "Cancelado")}
                                onSelectPedido={setPedidoSelecionado}
                                pedidoSelecionadoId={pedidoSelecionado?.id}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                <div>
                    {pedidoSelecionado ? (
                        <OrdersDetails
                            pedido={pedidoSelecionado}
                            onUpdateEstado={atualizarEstadoPedido}
                            onClose={() => setPedidoSelecionado(null)}
                        />
                    ) : (
                        <OrderForm onSubmit={adicionarPedido} />
                    )}
                </div>
            </div>
        </div>
    )
}

