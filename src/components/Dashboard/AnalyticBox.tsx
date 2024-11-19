import {Card} from "@/components/ui/card.tsx";
import {Icon} from "@phosphor-icons/react";
import {ReactNode} from "react";


interface AnalyticBoxProps {
    title: string,
    icon: Icon
    description?: string
    children: ReactNode
}

export function AnalyticBox({title, icon, children}: AnalyticBoxProps) {

    const Icon = icon;

    return (
        <Card className="bg-zinc-100 p-1 space-y-2 rounded-2xl">
            <div className="flex items-center gap-3">
                <Icon className="bg-white border border-zinc-200 rounded-lg m-1 p-1.5 h-8 w-8" size={64}/>
                <h1 className="font-poppins-semibold">
                    {title}
                </h1>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl">
                {children}
            </div>
        </Card>
    );
}

