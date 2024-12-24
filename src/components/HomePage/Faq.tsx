import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const faq: {
    question: string,
    answer: string,
}[] = [
    {
        question: "O que é o Neemble Eat",
        answer: "É uma solução digital que permite aos clientes acessar o menu de um restaurante escaneando um código QR na mesa, fazer pedidos diretamente pelo celular e enviá-los para a cozinha sem precisar esperar por um garçom."
    },
    {
        question: "Como funciona o sistema de QR Code?",
        answer: "Cada mesa no restaurante terá um código QR exclusivo. Quando o cliente escaneia o código com o celular, ele é redirecionado para uma página dedicada ao menu daquele restaurante e pode começar a fazer pedidos."
    },
    {
        question: "É possível adicionar observações aos pedidos?",
        answer: "Sim! Cada item do menu possui um campo de texto para observações adicionais, como remoção de ingredientes ou preferências específicas.\n"
    },
    {
        question: "Posso fazer múltiplos pedidos durante a refeição?",
        answer: "Sim! O cliente pode fazer quantos pedidos desejar antes de solicitar a conta final."
    },
    {
        question: "O aplicativo permite realizar pagamentos?",
        answer: "Não, o aplicativo não processa pagamentos. O cliente solicitará a conta ao final da refeição diretamente com o restaurante."
    },
    {
        question: "Como o restaurante pode atualizar o menu?",
        answer: "O restaurante terá acesso a um painel administrativo onde pode gerenciar o menu, adicionar novos itens, editar descrições e ajustar preços."
    },
    {
        question: "O sistema funciona offline?",
        answer: "Se houver uma interrupção na conexão com a internet, o sistema pode armazenar os pedidos localmente e enviá-los assim que a conexão for restaurada."
    },
    {
        question: "Como o restaurante recebe os pedidos?",
        answer: "Os pedidos são enviados em tempo real para a cozinha ou um dispositivo designado, como um tablet ou computador."
    },
    {
        question: "É necessário baixar algum aplicativo?",
        answer: "Não, o sistema funciona diretamente no navegador do telemóvel ou computador, sem a necessidade de instalar nenhum aplicativo."
    },
    {
        question: "Como o restaurante pode se inscrever?",
        answer: "Basta entrar em contato conosco para criar uma conta, configurar o menu e receber os QR codes para cada mesa."
    },
    {
        question: "Quais são os benefícios para o restaurante?",
        answer: "- Redução do tempo de espera para realizar pedidos.\n- Maior eficiência operacional.\n- Economia com mão de obra.\n- Melhor experiência para os clientes.\n- Controle centralizado do menu e dos pedidos."
    }
]

export function Faq() {
    return (
        <div className="">
            <div className="text-center ">
                <h1 className="font-semibold text-amethyst-400 text-lg">
                    FAQ
                </h1>
                <h2 className="text-3xl font-poppins-semibold my-4 text-zinc-800">
                    Perguntas frequentes
                </h2>
                <p>

                </p>
            </div>
            <div className="flex justify-center mb-8">
                <Accordion type="single" className="w-[80%]" collapsible>
                    {
                        faq.map(({question, answer}, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left">
                                    {index + 1}. {question}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-500">
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </div>
    );
}

