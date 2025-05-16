import { useState } from "react";
import {DesktopMenu} from "@/assets";

function Benefits() {
    const [expanded, setExpanded] = useState<number | null>(null);

    const benefits = [
        {
            title: "Pedidos sem erro",
            summary: "Elimine anotações confusas e garanta que tudo chegue certo à cozinha.",
            details:
                "Com pedidos digitais, o risco de falha na comunicação entre salão e cozinha desaparece. Seu time trabalha com mais precisão e os clientes recebem exatamente o que pediram.",
        },
        {
            title: "Agilidade no atendimento",
            summary: "Clientes fazem pedidos em segundos e sua equipe ganha tempo.",
            details:
                "Reduza o tempo de espera e aumente o giro de mesas. Os pedidos vão direto do celular do cliente para o sistema da cozinha — sem intermediários.",
        },
        {
            title: "Gestão simplificada",
            summary: "Visualize tudo em tempo real e tome decisões com confiança.",
            details:
                "Tenha acesso a métricas, histórico de pedidos e controle de desempenho. Tudo em um painel intuitivo que facilita a gestão do seu restaurante.",
        },
    ];

    const toggle = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Benefícios para seu negócio</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Aumente sua eficiência</h3>
                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() => toggle(index)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full flex items-center justify-center text-green-600">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-semibold">{benefit.title}</p>
                                            <p className="text-gray-700">{benefit.summary}</p>
                                            <div
                                                className={`transition-all duration-300 overflow-hidden ${
                                                    expanded === index ? "max-h-40 mt-2" : "max-h-0"
                                                }`}
                                            >
                                                <p className="text-sm text-gray-600">{benefit.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative hidden h-[300px] md:h-auto md:block">
                        <img
                            src={DesktopMenu}
                            alt="Dashboard Neemble Eat"
                            className="object-contain rounded-xl border"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Benefits;
