import {Icon, Layout, BookOpenText} from "@phosphor-icons/react";
import {FeatureCard} from "@/components/HomePage/Feature.tsx";

export interface Feature {
    name: string
    description: string
    icon: Icon
}

const features: Feature[] = [
    {
        name: "Interface Gráfica do Utilizador (GUI) Intuitíva",
        description: "Uma interface de utilizador simples e atrativa que permite aos clientes navegar facilmente pelo menu e colocar pedidos diretamente das suas mesas através de códigos QR.",
        icon: Layout
    },
    {
        name: "Integração do Menu Digital",
        description: "Menus digitais acessíveis através de códigos QR, que podem ser personalizados por cada restaurante para exibir informações detalhadas dos pratos, incluindo imagens e opções de personalização.",
        icon: BookOpenText
    },
]


export function Features() {
    return (
        <div className="my-16">
            <div className="text-center">
                <h1 className="font-semibold text-amethyst-400 text-lg">
                    Funcionalidades
                </h1>
                <h2 className="text-3xl font-poppins-semibold my-4 text-zinc-800">
                    Aumente a produtividade e se mantenha flexível
                </h2>
                <p>

                </p>
            </div>

            <div
                className={`grid grid-cols-1 laptop:grid-cols-2 divide-x divide-zinc-150 my-8 ${features.length > 4 && "laptop:divide-y"}`}>
                {features.map((feature: Feature, index: number) => (
                    <FeatureCard key={index} feature={feature}/>
                ))}
            </div>
        </div>

    );
}

