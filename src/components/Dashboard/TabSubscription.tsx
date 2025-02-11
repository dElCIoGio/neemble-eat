import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {CreditCard, Calendar} from "@phosphor-icons/react"
import DocumentUploader from "@/components/Dashboard/FileUpload.tsx";


const billingHistory: {
    isPaid: boolean;
    date: string;
    price: number;
}[] = [
    {
        isPaid: true,
        date: "04/03/2025",
        price: 28000
    },
    {
        isPaid: true,
        date: "04/03/2025",
        price: 35000
    },
    {
        isPaid: false,
        date: "04/03/2025",
        price: 27000
    }
]


export function TabSubscription() {
    return (
        <div>
            <div className="space-y-4">
                <DocumentUploader/>
                <SubscriptionCard title={"Plano Corrente"}>
                    <div className=" space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="">
                                <h3 className="font-poppins-semibold">
                                    Pacote Completo
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Kz 28.000/mês
                                </p>
                            </div>
                            <div className="space-x-3">
                                <Button variant={"outline"}>
                                    Alterar
                                </Button>
                                <Button variant={"destructive"}>
                                    Cancelar Plano
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center px-2 space-x-2 py-2 bg-green-50 rounded-md">
                            <div className={"h-1.5 w-1.5 rounded-full bg-green-700"}/>
                            <h1 className="text-sm  text-green-600">
                                Subscrição ativa
                            </h1>
                        </div>
                    </div>
                </SubscriptionCard>
                <SubscriptionCard title={"Informação de Pagamento"}>
                    <div className="flex justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2.5">
                                <CreditCard className="text-gray-400"/>
                                <div>
                                    <h2 className="font-poppins-semibold">
                                        Cartão de Crédito
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        **** **** **** 1234
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <Calendar className="text-gray-400"/>
                                <div>
                                    <h2 className="font-poppins-semibold">
                                        Vencimento
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        04/03/2025
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant="outline">
                                Atualizar
                            </Button>
                        </div>

                    </div>
                </SubscriptionCard>
                <SubscriptionCard title={"Histórico"}>
                    <div className="divide-y divide-gray-200">
                        {
                            billingHistory.map((value, index) => (
                                <div className="flex justify-between py-2" key={index}>
                                    <div>
                                        <h1 className="font-poppins-semibold">
                                            {value.date}
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            {value.price} Kz
                                        </p>
                                    </div>
                                    <div>
                                        {
                                            value.isPaid ?
                                                <span className="text-green-500 text-sm font-semibold">
                                                    Pago
                                                </span>:
                                                <span className="text-red-500 text-sm font-semibold">
                                                    Não pago
                                                </span>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </SubscriptionCard>
            </div>

        </div>
    );
}


interface SubscriptionCardProps {
    children: React.ReactNode;
    title: string;
}

function SubscriptionCard({children, title}: SubscriptionCardProps) {

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-base">
                    {title}
                </CardTitle>
            </CardHeader>
            <Separator className="w-[96%] mx-auto []"/>
            <div className="p-4">

                {children}
            </div>

        </Card>
    )
}