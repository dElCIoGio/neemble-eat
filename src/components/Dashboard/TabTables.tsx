import {TypographyH2} from "@/components/ui/Typography.tsx";
import {useGetAllTables} from "@/service/api/table.ts";
import {useDashboardContext} from "@/context/dashboardContext.ts";

export function TabTables() {

    const {restaurant} = useDashboardContext()

    const {data: tables} = useGetAllTables({restaurantId: restaurant.id})

    return (
        <div>
            <div className="mb-12">
                <TypographyH2>
                    Mesas e QR Codes
                </TypographyH2>
            </div>
            <div className="flex gap-2">
                {
                    tables &&
                    tables.map(table =>
                        <div key={table.id}
                             className="rounded-md p-4 bg-zinc-200 border border-zinc-10 shadow-sm flex items-center justify-between">
                            {table.number}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

