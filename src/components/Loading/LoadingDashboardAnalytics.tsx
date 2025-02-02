import {Skeleton} from "@/components/ui/skeleton.tsx";

function LoadingDashboardAnalytics() {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
                <Skeleton className="w-full h-32 col-span-1 laptop:col-span-2"/>
                <Skeleton className="w-full h-32 col-span-1 laptop:col-span-2"/>
                <Skeleton className="w-full h-32 col-span-1 laptop:col-span-2"/>
                <Skeleton className="w-full h-32 col-span-1 laptop:col-span-2"/>
            </div>
            <Skeleton className="w-full h-64"/>

        </div>
    );
}

export default LoadingDashboardAnalytics;