import {Button} from "@/components/ui/button.tsx";

export function Cta() {
    return (
        <div className="my-28 flex flex-col items-center space-y-8">
            <h1 className="text-center text-3xl font-poppins-semibold  w-[80%] laptop:w-[60%]">
                Leve seu atendimento ao próximo nível com nosso sistema de pedidos via QR Code.
            </h1>
            <p className="text-zinc-500 text-center w-[50%]">
                Ofereça aos seus clientes um serviço moderno, rápido e eficiente, enquanto otimiza as operações do seu restaurante.
            </p>
            <Button className="bg-amethyst-500 hover:bg-amethyst-400">
                Começe agora
            </Button>
        </div>
    );
}

