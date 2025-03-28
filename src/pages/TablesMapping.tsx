
import { useState, useEffect } from "react"
import { Clock, Minus, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Tipos de status da mesa
type StatusMesa = "disponivel" | "ocupada" | "reservada" | "limpeza"

// Interface para a mesa
interface Mesa {
    id: number
    numero: number
    lugares: number
    status: StatusMesa
    horaInicio?: string
    horaReserva?: string
    pessoas?: number
}

// Interface para estatísticas
interface Estatisticas {
    mesasOcupadas: number
    mesasReservadas: number
    clientesAtendidos: number
    tempoMedio: string
}

export default function TablesMapping() {
    // Estado para as mesas
    const [mesas, setMesas] = useState<Mesa[]>([])

    // Estado para estatísticas
    const [estatisticas, setEstatisticas] = useState<Estatisticas>({
        mesasOcupadas: 0,
        mesasReservadas: 0,
        clientesAtendidos: 42,
        tempoMedio: "1h 15m",
    })

    // Estados para diálogos
    const [dialogoAdicionarAberto, setDialogoAdicionarAberto] = useState(false)
    const [dialogoEditarAberto, setDialogoEditarAberto] = useState(false)
    const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null)
    const [dialogoReservaAberto, setDialogoReservaAberto] = useState(false)
    const [dialogoOcuparAberto, setDialogoOcuparAberto] = useState(false)

    // Dados para nova mesa
    const [novaMesa, setNovaMesa] = useState({
        lugares: 2,
    })

    // Dados para reserva
    const [dadosReserva, setDadosReserva] = useState({
        pessoas: 2,
        hora: "19:00",
    })

    // Dados para ocupação
    const [dadosOcupacao, setDadosOcupacao] = useState({
        pessoas: 2,
    })

    // Inicializar mesas
    useEffect(() => {
        const mesasIniciais: Mesa[] = [
            { id: 1, numero: 1, lugares: 2, status: "disponivel" },
            { id: 2, numero: 2, lugares: 4, status: "ocupada", horaInicio: "21:30", pessoas: 3 },
            { id: 3, numero: 3, lugares: 4, status: "ocupada", horaInicio: "22:00", pessoas: 4 },
            { id: 4, numero: 4, lugares: 6, status: "reservada", horaReserva: "22:30", pessoas: 5 },
            { id: 5, numero: 5, lugares: 2, status: "limpeza" },
            { id: 6, numero: 6, lugares: 2, status: "disponivel" },
            { id: 7, numero: 7, lugares: 4, status: "disponivel" },
            { id: 8, numero: 8, lugares: 8, status: "reservada", horaReserva: "22:45", pessoas: 7 },
            { id: 9, numero: 9, lugares: 2, status: "disponivel" },
            { id: 10, numero: 10, lugares: 4, status: "disponivel" },
            { id: 11, numero: 11, lugares: 6, status: "ocupada", horaInicio: "20:15", pessoas: 5 },
            { id: 12, numero: 12, lugares: 2, status: "disponivel" },
        ]

        setMesas(mesasIniciais)
        atualizarEstatisticas(mesasIniciais)
    }, [])

    // Atualizar estatísticas
    const atualizarEstatisticas = (mesasAtuais: Mesa[]) => {
        const ocupadas = mesasAtuais.filter((mesa) => mesa.status === "ocupada").length
        const reservadas = mesasAtuais.filter((mesa) => mesa.status === "reservada").length

        setEstatisticas({
            ...estatisticas,
            mesasOcupadas: ocupadas,
            mesasReservadas: reservadas,
        })
    }

    // Adicionar mesa
    const adicionarMesa = () => {
        const novoNumero = mesas.length > 0 ? Math.max(...mesas.map((m) => m.numero)) + 1 : 1
        const novaMesaObj: Mesa = {
            id: Date.now(),
            numero: novoNumero,
            lugares: novaMesa.lugares,
            status: "disponivel",
        }

        const mesasAtualizadas = [...mesas, novaMesaObj]
        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
        setDialogoAdicionarAberto(false)
    }

    // Remover mesa
    const removerMesa = () => {
        if (!mesaSelecionada) return

        const mesasAtualizadas = mesas.filter((mesa) => mesa.id !== mesaSelecionada.id)
        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
        setDialogoEditarAberto(false)
    }

    // Reservar mesa
    const reservarMesa = () => {
        if (!mesaSelecionada) return

        const mesasAtualizadas = mesas.map((mesa) => {
            if (mesa.id === mesaSelecionada.id) {
                return {
                    ...mesa,
                    status: "reservada" as StatusMesa,
                    horaReserva: dadosReserva.hora,
                    pessoas: dadosReserva.pessoas,
                }
            }
            return mesa
        })

        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
        setDialogoReservaAberto(false)
    }

    // Ocupar mesa
    const ocuparMesa = () => {
        if (!mesaSelecionada) return

        const agora = new Date()
        const horaAtual = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, "0")}`

        const mesasAtualizadas = mesas.map((mesa) => {
            if (mesa.id === mesaSelecionada.id) {
                return {
                    ...mesa,
                    status: "ocupada" as StatusMesa,
                    horaInicio: horaAtual,
                    pessoas: dadosOcupacao.pessoas,
                }
            }
            return mesa
        })

        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
        setDialogoOcuparAberto(false)

        // Incrementar clientes atendidos
        setEstatisticas((prev) => ({
            ...prev,
            clientesAtendidos: prev.clientesAtendidos + dadosOcupacao.pessoas,
        }))
    }

    // Liberar mesa
    const liberarMesa = (id: number) => {
        const mesasAtualizadas = mesas.map((mesa) => {
            if (mesa.id === id) {
                return {
                    ...mesa,
                    status: "limpeza" as StatusMesa,
                    horaInicio: undefined,
                    horaReserva: undefined,
                }
            }
            return mesa
        })

        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
    }

    // Finalizar limpeza
    const finalizarLimpeza = (id: number) => {
        const mesasAtualizadas = mesas.map((mesa) => {
            if (mesa.id === id) {
                return {
                    ...mesa,
                    status: "disponivel" as StatusMesa,
                    pessoas: undefined,
                }
            }
            return mesa
        })

        setMesas(mesasAtualizadas)
        atualizarEstatisticas(mesasAtualizadas)
    }

    // Abrir diálogo de edição
    const abrirDialogoEditar = (mesa: Mesa) => {
        setMesaSelecionada(mesa)
        setDialogoEditarAberto(true)
    }

    // Abrir diálogo de reserva
    const abrirDialogoReserva = (mesa: Mesa) => {
        setMesaSelecionada(mesa)
        setDadosReserva({
            pessoas: mesa.lugares > 2 ? Math.floor(mesa.lugares / 2) : 1,
            hora: "19:00",
        })
        setDialogoReservaAberto(true)
    }

    // Abrir diálogo de ocupação
    const abrirDialogoOcupar = (mesa: Mesa) => {
        setMesaSelecionada(mesa)
        setDadosOcupacao({
            pessoas: mesa.lugares > 2 ? Math.floor(mesa.lugares / 2) : 1,
        })
        setDialogoOcuparAberto(true)
    }

    // Obter cor de fundo baseada no status
    const getCorFundo = (status: StatusMesa) => {
        switch (status) {
            case "disponivel":
                return "bg-green-100"
            case "ocupada":
                return "bg-red-100"
            case "reservada":
                return "bg-amber-100"
            case "limpeza":
                return "bg-blue-100"
            default:
                return "bg-gray-100"
        }
    }

    // Obter cor de texto baseada no status
    const getCorTexto = (status: StatusMesa) => {
        switch (status) {
            case "disponivel":
                return "text-green-600"
            case "ocupada":
                return "text-red-600"
            case "reservada":
                return "text-amber-600"
            case "limpeza":
                return "text-blue-600"
            default:
                return "text-gray-600"
        }
    }

    return (
        <div className="m-4">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Gestão de Mesas</h1>

                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-500 mt-0.5"/>
                    <p className="text-gray-700">
                        A plataforma mostra a ocupação das mesas em tempo real. Permite aos funcionários gerir reservas
                        e prever a
                        rotatividade das mesas. Reduz esperas desnecessárias e maximiza a utilização do espaço do
                        restaurante.
                    </p>
                </div>

                <div>
                    <div className="flex-col space-y-4 md:space-y-0 flex md:flex-row md:justify-between md:items-center mb-4">
                        <h2 className="text-xl font-semibold">Mapa de Mesas</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                <span className="text-sm">Disponível</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                                <span className="text-sm">Ocupada</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                                <span className="text-sm">Reservada</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                                <span className="text-sm">Limpeza</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex hidden gap-4 mb-4">
                        <Button variant="outline" onClick={() => setDialogoAdicionarAberto(true)}>
                            <Plus className="h-4 w-4 mr-2"/> Adicionar uma mesa
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (mesas.length > 0) {
                                    setMesaSelecionada(mesas[mesas.length - 1])
                                    setDialogoEditarAberto(true)
                                }
                            }}
                            disabled={mesas.length === 0}
                        >
                            <Minus className="h-4 w-4 mr-2"/> Remover uma mesa
                        </Button>
                        <div className="ml-auto text-sm text-gray-500">Mesas: {mesas.length}/20</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mesas.map((mesa) => (
                            <Card
                                key={mesa.id}
                                className={cn("cursor-pointer transition-all hover:shadow-md", getCorFundo(mesa.status))}
                                onClick={() => abrirDialogoEditar(mesa)}
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className={cn("text-xl font-medium", getCorTexto(mesa.status))}>Mesa {mesa.numero}</h3>
                                        <span className="text-gray-600">{mesa.lugares} lugares</span>
                                    </div>

                                    {mesa.status === "ocupada" && (
                                        <>
                                            <div className="flex items-center text-sm text-red-600 mb-1">
                                                <Clock className="h-4 w-4 mr-1"/> Desde {mesa.horaInicio}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Users className="h-4 w-4 mr-1"/> {mesa.pessoas} pessoas
                                            </div>
                                        </>
                                    )}

                                    {mesa.status === "reservada" && (
                                        <>
                                            <div className="flex items-center text-sm text-amber-600 mb-1">
                                                <Clock className="h-4 w-4 mr-1"/> Reserva: {mesa.horaReserva}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Users className="h-4 w-4 mr-1"/> {mesa.pessoas} pessoas
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-4">
                            <div className="text-gray-600 mb-1">Mesas ocupadas</div>
                            <div className="text-3xl font-bold">
                                {estatisticas.mesasOcupadas}/{mesas.length}
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-gray-600 mb-1">Mesas reservadas</div>
                            <div className="text-3xl font-bold">
                                {estatisticas.mesasReservadas}/{mesas.length}
                            </div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-gray-600 mb-1">Clientes atendidos</div>
                            <div className="text-3xl font-bold">{estatisticas.clientesAtendidos}</div>
                        </Card>
                        <Card className="p-4">
                            <div className="text-gray-600 mb-1">Tempo médio</div>
                            <div className="text-3xl font-bold">{estatisticas.tempoMedio}</div>
                        </Card>
                    </div>
                </div>

                {/* Diálogo para adicionar mesa */}
                <Dialog open={dialogoAdicionarAberto} onOpenChange={setDialogoAdicionarAberto}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar Mesa</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="lugares">Número de lugares</Label>
                                <Select
                                    value={novaMesa.lugares.toString()}
                                    onValueChange={(value) => setNovaMesa({
                                        ...novaMesa,
                                        lugares: Number.parseInt(value)
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o número de lugares"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">2 lugares</SelectItem>
                                        <SelectItem value="4">4 lugares</SelectItem>
                                        <SelectItem value="6">6 lugares</SelectItem>
                                        <SelectItem value="8">8 lugares</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogoAdicionarAberto(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={adicionarMesa}>Adicionar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Diálogo para editar mesa */}
                <Dialog open={dialogoEditarAberto} onOpenChange={setDialogoEditarAberto}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Mesa {mesaSelecionada?.numero}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <div className="text-lg font-medium">
                                        {mesaSelecionada?.status === "disponivel" && "Disponível"}
                                        {mesaSelecionada?.status === "ocupada" && "Ocupada"}
                                        {mesaSelecionada?.status === "reservada" && "Reservada"}
                                        {mesaSelecionada?.status === "limpeza" && "Em limpeza"}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Lugares</Label>
                                    <div className="text-lg font-medium">{mesaSelecionada?.lugares}</div>
                                </div>
                            </div>

                            {mesaSelecionada?.status === "ocupada" && (
                                <div className="space-y-2">
                                    <Label>Ocupada desde</Label>
                                    <div className="text-lg font-medium">{mesaSelecionada.horaInicio}</div>
                                    <div className="text-sm text-gray-500">{mesaSelecionada.pessoas} pessoas</div>
                                </div>
                            )}

                            {mesaSelecionada?.status === "reservada" && (
                                <div className="space-y-2">
                                    <Label>Reservada para</Label>
                                    <div className="text-lg font-medium">{mesaSelecionada.horaReserva}</div>
                                    <div className="text-sm text-gray-500">{mesaSelecionada.pessoas} pessoas</div>
                                </div>
                            )}

                            <div className="pt-4">
                                <Label>Ações</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    {mesaSelecionada?.status === "disponivel" && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setDialogoEditarAberto(false)
                                                    abrirDialogoOcupar(mesaSelecionada)
                                                }}
                                            >
                                                Ocupar
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setDialogoEditarAberto(false)
                                                    abrirDialogoReserva(mesaSelecionada)
                                                }}
                                            >
                                                Reservar
                                            </Button>
                                        </>
                                    )}

                                    {mesaSelecionada?.status === "ocupada" && (
                                        <Button
                                            onClick={() => {
                                                liberarMesa(mesaSelecionada.id)
                                                setDialogoEditarAberto(false)
                                            }}
                                            className="col-span-2"
                                        >
                                            Liberar Mesa
                                        </Button>
                                    )}

                                    {mesaSelecionada?.status === "reservada" && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    setDialogoEditarAberto(false)
                                                    abrirDialogoOcupar(mesaSelecionada)
                                                }}
                                            >
                                                Ocupar
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const mesasAtualizadas = mesas.map((mesa) => {
                                                        if (mesa.id === mesaSelecionada.id) {
                                                            return {
                                                                ...mesa,
                                                                status: "disponivel" as StatusMesa,
                                                                horaReserva: undefined,
                                                                pessoas: undefined,
                                                            }
                                                        }
                                                        return mesa
                                                    })

                                                    setMesas(mesasAtualizadas)
                                                    atualizarEstatisticas(mesasAtualizadas)
                                                    setDialogoEditarAberto(false)
                                                }}
                                            >
                                                Cancelar Reserva
                                            </Button>
                                        </>
                                    )}

                                    {mesaSelecionada?.status === "limpeza" && (
                                        <Button
                                            onClick={() => {
                                                finalizarLimpeza(mesaSelecionada.id)
                                                setDialogoEditarAberto(false)
                                            }}
                                            className="col-span-2"
                                        >
                                            Finalizar Limpeza
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="destructive" onClick={removerMesa}>
                                Remover Mesa
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Diálogo para reservar mesa */}
                <Dialog open={dialogoReservaAberto} onOpenChange={setDialogoReservaAberto}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Reservar Mesa {mesaSelecionada?.numero}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="pessoas">Número de pessoas</Label>
                                <Select
                                    value={dadosReserva.pessoas.toString()}
                                    onValueChange={(value) => setDadosReserva({
                                        ...dadosReserva,
                                        pessoas: Number.parseInt(value)
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o número de pessoas"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({length: mesaSelecionada?.lugares || 0}, (_, i) => i + 1).map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? "pessoa" : "pessoas"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hora">Horário da reserva</Label>
                                <Input
                                    id="hora"
                                    type="time"
                                    value={dadosReserva.hora}
                                    onChange={(e) => setDadosReserva({...dadosReserva, hora: e.target.value})}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogoReservaAberto(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={reservarMesa}>Confirmar Reserva</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Diálogo para ocupar mesa */}
                <Dialog open={dialogoOcuparAberto} onOpenChange={setDialogoOcuparAberto}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ocupar Mesa {mesaSelecionada?.numero}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="pessoas">Número de pessoas</Label>
                                <Select
                                    value={dadosOcupacao.pessoas.toString()}
                                    onValueChange={(value) => setDadosOcupacao({
                                        ...dadosOcupacao,
                                        pessoas: Number.parseInt(value)
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o número de pessoas"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({length: mesaSelecionada?.lugares || 0}, (_, i) => i + 1).map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? "pessoa" : "pessoas"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogoOcuparAberto(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={ocuparMesa}>Confirmar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

