import {Skeleton} from "@/components/ui/skeleton.tsx";
import {BowlFood} from "@phosphor-icons/react";
import {TypographyH2} from "@/components/ui/Typography.tsx";

export function LoadingOrdersTracking() {
    return (
        <div className="p-4 bg-zinc-50 h-dvh">
            <div className="mt-4 mb-8 flex space-x-1.5 items-center">
                <div
                    className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-300 flex justify-center items-center">
                    <BowlFood className="w-6 h-6 text-zinc-800"/>
                </div>
                <TypographyH2>
                    Pedidos
                </TypographyH2>
            </div>
            <div className="space-y-4 flex flex-col">
                <div className="laptop:flex items-center gap-2 hidden">
                    <Skeleton className="h-10 w-16"/>
                    <Skeleton className="h-10 w-16"/>
                    <Skeleton className="h-10 w-16"/>
                    <Skeleton className="h-10 w-16"/>
                    <Skeleton className="h-10 w-16"/>
                </div>
                <div className="flex flex-col space-y-2 laptop:items-center laptop:justify-between laptop:flex-row laptop:space-x-4">
                    <Skeleton className="h-10 w-32"/>
                    <Skeleton className="h-8 w-36"/>
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <Skeleton className="w-full h-20"/>
                <Skeleton className="w-full h-20"/>
                <Skeleton className="w-full h-20"/>
                <Skeleton className="w-full h-20"/>
                <Skeleton className="w-full h-20"/>
                <Skeleton className="w-full h-20"/>
            </div>
        </div>
    );
}

