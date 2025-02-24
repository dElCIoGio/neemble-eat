
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";



export function HomePage() {

    window.document.title = "Neemble Eat"

    return (
        <div className="min-h-screen bg-white">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-200 to-purple-500 bg-clip-text text-transparent">
                Modernize seu restaurante
              </span>{" "}
                            com pedidos digitais
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl max-w-lg">
                            Sistema completo de menu digital via QR code, gestão de pedidos e análises para seu
                            restaurante em Angola.
                            Aumente suas vendas e eficiência.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-6 text-lg rounded-md">
                                Começar Gratuitamente
                            </Button>
                            <Button variant="outline" className="px-8 py-6 text-lg">
                                Ver Demonstração
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative w-full h-[500px]">
                            <img
                                src="/placeholder.svg?height=500&width=500"
                                alt="Sistema Neemble Eat em ação"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <div className="border-t border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-center text-gray-600 mb-8">Utilizado por restaurantes em toda Angola</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
                        {Array.from({length: 4}).map((_, i) => (
                            <div key={i} className="h-12 w-32 bg-gray-200 rounded"/>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Como funciona</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-6">
                            <div
                                className="mb-4 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-4">Menu Digital via QR Code</h3>
                            <p className="text-gray-600">
                                Clientes escaneiam o QR code na mesa e acessam seu cardápio digital completo, com fotos
                                e descrições
                                detalhadas.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <div
                                className="mb-4 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-4">Gestão de Pedidos</h3>
                            <p className="text-gray-600">
                                Pedidos são enviados diretamente para a cozinha, com sistema de acompanhamento em tempo
                                real.
                            </p>
                        </Card>
                        <Card className="p-6">
                            <div
                                className="mb-4 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-4">Análise de Dados</h3>
                            <p className="text-gray-600">
                                Acesse relatórios detalhados sobre vendas, pratos mais populares e horários de pico.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Benefícios para seu negócio</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">Aumente sua eficiência</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div
                                        className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Redução de erros nos pedidos</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div
                                        className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Atendimento mais rápido</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div
                                        className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Gestão simplificada da cozinha</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative h-[300px] md:h-auto">
                            <img
                                src="/placeholder.svg?height=400&width=600"
                                alt="Dashboard Neemble Eat"
                                className="object-contain rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="precos" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Planos que cabem no seu
                        orçamento</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-6">
                            <h3 className="text-xl font-bold mb-2">Básico</h3>
                            <p className="text-gray-600 mb-4">Para restaurantes pequenos</p>
                            <div className="text-3xl font-bold mb-6">20.000 Kz/mês</div>
                            <Button className="w-full mb-6">Começar Agora</Button>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Menu Digital QR Code</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Gestão de Pedidos Básica</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6 border-purple-600 outline-amethyst outline-2">
                            <h3 className="text-xl font-bold mb-2">Profissional</h3>
                            <p className="text-gray-600 mb-4">Mais popular</p>
                            <div className="text-3xl font-bold mb-6">35.000 Kz/mês</div>
                            <Button className="w-full mb-6 bg-purple-600 hover:bg-purple-500">Começar Agora</Button>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Tudo do Plano Básico</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Analytics Avançado</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Suporte Prioritário</span>
                                </li>
                            </ul>
                        </Card>
                        <Card className="p-6">
                            <h3 className="text-xl font-bold mb-2">Empresarial</h3>
                            <p className="text-gray-600 mb-4">Para redes de restaurantes</p>
                            <div className="text-3xl font-bold mb-6">Personalizado</div>
                            <Button variant="outline" className="w-full mb-6">
                                Falar com Vendas
                            </Button>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Tudo do Plano Profissional</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>API Personalizada</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        ✓
                                    </div>
                                    <span>Gerente de Conta Dedicado</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                    <Accordion type="single" collapsible>
                        {[
                            {
                                question: "Como funciona o sistema de QR code?",
                                answer:
                                    "Cada mesa recebe um QR code único. Quando o cliente escaneia, é direcionado para o menu digital do seu restaurante, onde pode fazer pedidos diretamente.",
                            },
                            {
                                question: "Preciso de internet no restaurante?",
                                answer: "Sim, é necessária uma conexão à internet estável para o funcionamento do sistema.",
                            },
                            {
                                question: "Quanto tempo leva para implementar?",
                                answer:
                                    "A implementação básica pode ser feita em 24 horas. Nosso time oferece suporte completo durante todo o processo.",
                            },
                            {
                                question: "O sistema funciona offline?",
                                answer: "No momento, o sistema requer conexão à internet para funcionar corretamente.",
                            },
                        ].map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para modernizar seu restaurante?</h2>
                    <p className="text-gray-600 mb-8">
                        Junte-se a dezenas de restaurantes em Angola que já estão usando o Neemble Eat
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-6 text-lg">
                            Começar Gratuitamente
                        </Button>
                        <Button variant="outline" className="px-8 py-6 text-lg">
                            Falar com Consultor
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

