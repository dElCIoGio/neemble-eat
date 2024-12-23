import {HeroSectionBadge} from "@/components/HomePage/HeroSectionBadge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScreenDisplay} from "@/components/HomePage/ScreenDisplay.tsx";

export function Hero() {
    return (
        <section className="flex flex-col items-center my-10">
            <HeroSectionBadge/>
            <div className="text-center max-w-[650px] my-6">
                <h1 className="text-2xl laptop:text-5xl font-bold">
                    Aumente o seu rendimento e performance com <span
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent inline-block bg-clip-text">pedidos
							online</span>
                </h1>
                <h2 className={"text-sm laptop:text-lg mt-8 text-gray-500"}>
                    Automatize as operações do seu restaurante e promova uma experiência super dinâmica para os seus clientes.
                </h2>
            </div>
            <div className="space-x-3">
                <Button variant="ghost" type="button">
                    Saiba mais
                </Button>
                <Button type="button">
                    Começe agora
                </Button>
            </div>
            <ScreenDisplay/>
        </section>
    );
}

