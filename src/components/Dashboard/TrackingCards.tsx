import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {openUrlInNewTab} from "@/lib/utils.ts";

interface TrackingCardsProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export function TrackingCards({title, description, buttonText, buttonLink}: TrackingCardsProps) {
    return (
        <Card className="p-4 col-span-12 laptop:col-span-6 bg-zinc-50 space-y-3 flex flex-col justify-between">
            <h1 className="font-poppins-semibold">{title}</h1>
            <div className="w-full h-full bg-zinc-100 border rounded-md p-2.5 text-sm  space-y-3 flex flex-col justify-between">
                <p>
                    {description}
                </p>
                <Button disabled className="bg-amethyst-300 w-fit hover:bg-amethyst-200 border border-amethyst-400 hover:border-amethyst-300 text-white"
                    onClick={() => openUrlInNewTab(buttonLink)}>
                    {buttonText}
                </Button>
            </div>
        </Card>
    );
}

