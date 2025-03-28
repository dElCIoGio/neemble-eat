
import type React from "react"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {Order, OrderItem} from "@/components/CustomOrders/CounterOrders.tsx";

// Produtos disponíveis no sistema
const PRODUTOS = [
    { id: "1", nome: "Gambas ao Alho", preco: 8000 },
    { id: "2", nome: "Coquetel de Saké com Frutas", preco: 7500 },
    { id: "3", nome: "Filé Mignon", preco: 12000 },
    { id: "4", nome: "Salada Mista", preco: 4500 },
    { id: "5", nome: "Sushi Variado", preco: 9500 },
    { id: "6", nome: "Sobremesa do Dia", preco: 3500 },
]

// Pedidos frequentes pré-definidos
const PEDIDOS_FREQUENTES = [
    {
        nome: "Combo Executivo",
        itens: [
            { id: "1", nome: "Filé Mignon", quantidade: 1, preco: 12000 },
            { id: "4", nome: "Salada Mista", quantidade: 1, preco: 4500 },
        ],
    },
    {
        nome: "Combo Casal",
        itens: [
            { id: "1", nome: "Gambas ao Alho", quantidade: 1, preco: 8000 },
            { id: "5", nome: "Sushi Variado", quantidade: 1, preco: 9500 },
            { id: "6", nome: "Sobremesa do Dia", quantidade: 2, preco: 3500 },
        ],
    },
]

type FormularioPedidoProps = {
    onSubmit: (pedido: Order) => void
}

export function OrderForm({ onSubmit }: FormularioPedidoProps) {
    const [mesa, setMesa] = useState("")
    const [descricao, setDescricao] = useState("")
    const [itens, setItens] = useState<OrderItem[]>([])
    const [produtoSelecionado, setProdutoSelecionado] = useState("")
    const [quantidade, setQuantidade] = useState(1)

    const adicionarItem = () => {
        if (!produtoSelecionado) return

        const produto = PRODUTOS.find((p) => p.id === produtoSelecionado)
        if (!produto) return

        const novoItem: OrderItem = {
            id: uuidv4(),
            nome: produto.nome,
            quantidade: quantidade,
            preco: produto.preco,
        }

        setItens([...itens, novoItem])
        setProdutoSelecionado("")
        setQuantidade(1)
    }

    const removerItem = (id: string) => {
        setItens(itens.filter((item) => item.id !== id))
    }

    const calcularTotal = () => {
        return itens.reduce((total, item) => total + item.preco * item.quantidade, 0)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (itens.length === 0) return

        const novoPedido: Order = {
            id: uuidv4(),
            mesa: mesa || undefined,
            horaPedido: new Date(),
            descricao: descricao || undefined,
            itens: itens,
            valorTotal: calcularTotal(),
            estado: "Novo",
        }

        onSubmit(novoPedido)

        // Limpar formulário
        setMesa("")
        setDescricao("")
        setItens([])
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Novo Pedido de Balcão</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="mesa" className="flex items-center gap-2">
                            Mesa{" "}
                            <span className="text-xs text-gray-500 font-normal">
                (Opcional - deixe em branco para pedido de balcão)
              </span>
                        </Label>
                        <Input id="mesa" placeholder="Número da mesa" value={mesa} onChange={(e) => setMesa(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição do Pedido (Opcional)</Label>
                        <Textarea
                            id="descricao"
                            placeholder="Observações ou detalhes adicionais"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Itens do Pedido</Label>

                        <div className="flex gap-2 items-center">
                            <Select value={produtoSelecionado} onValueChange={setProdutoSelecionado}>
                                <SelectTrigger className="flex-1 max-w-[60%]">
                                    <SelectValue placeholder="Selecione um item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PRODUTOS.map((produto) => (
                                        <SelectItem className="truncate" key={produto.id} value={produto.id}>
                                            {produto.nome} - Kz {produto.preco.toLocaleString()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                type="number"
                                min="1"
                                value={quantidade}
                                onChange={(e) => setQuantidade(Number.parseInt(e.target.value) || 1)}
                                className="w-20"
                            />

                            <Button type="button" className="w-full" onClick={adicionarItem} size="icon">
                                <Plus className="h-4 w-full" />
                            </Button>
                        </div>

                        {itens.length > 0 ? (
                            <div className="space-y-2 mt-2">
                                {itens.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 border rounded-md">
                                        <div>
                                            <div className="font-medium">{item.nome}</div>
                                            <div className="text-sm text-gray-500">
                                                {item.quantidade} x Kz {item.preco.toLocaleString()} = Kz{" "}
                                                {(item.quantidade * item.preco).toLocaleString()}
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removerItem(item.id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}

                                <div className="flex justify-between pt-2 border-t">
                                    <div className="font-medium">Valor Total:</div>
                                    <div className="font-bold">Kz {calcularTotal().toLocaleString()}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">Nenhum item adicionado</div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Pedidos Frequentes</Label>
                        <div className="flex flex-wrap gap-2">
                            {PEDIDOS_FREQUENTES.map((pedidoFrequente, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        const novosItens = pedidoFrequente.itens.map((item) => ({
                                            ...item,
                                            id: uuidv4(),
                                        }))
                                        setItens([...itens, ...novosItens])
                                    }}
                                    className="text-sm"
                                >
                                    {pedidoFrequente.nome}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#9370DB] hover:bg-[#8A5DC7]" disabled={itens.length === 0}>
                        Registrar Pedido
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

