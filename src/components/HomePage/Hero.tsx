import {HeroSectionBadge} from "@/components/HomePage/HeroSectionBadge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ScreenDisplay} from "@/components/HomePage/ScreenDisplay.tsx";
import {Link} from "react-router-dom";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";

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
            <div className="space-x-3 flex flex-col-reverse laptop:flex-row items-center gap-3">
                <Button variant="ghost" className="rounded-full w-fit" type="button">
                    Saiba mais
                </Button>
                <Button asChild className="rounded-full px-6 shadow-lg bg-gradient-to-br hover:shadow-xl hover:-translate-y-1 from-black to-black hover:from-black hover:to-amethyst-300 transition-all duration-300">
                    <Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
                        Comece agora e ganhe 2 meses gratuitos
                    </Link>
                </Button>
            </div>
            <ScreenDisplay/>
        </section>
    );
}

