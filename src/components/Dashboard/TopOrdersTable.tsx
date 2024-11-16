import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useGetTopOrders} from "@/service/api/restaurant.ts";
import {TypographyH3} from "@/components/ui/Typography.tsx";


export function TopOrdersTable() {

    const {restaurant} = useDashboardContext()

    const {data: orders, isLoading} = useGetTopOrders({restaurantId: restaurant.id})

    if(!orders && isLoading) {
        return <div></div>
    }

    return (
        <div className="w-full rounded-lg p-2">
            <div className="mb-4">
                <TypographyH3>
                <span className="p-3p">
                    Pratos mais vendidos
                </span>
                </TypographyH3>
            </div>

            {
                orders &&
                    <Table className={ "w-full"}>
                        <TableCaption>
                            Pratos mais vendidos nos ultimos 7 dias
                        </TableCaption>
                        <TableHeader className="bg-zinc-100">

                            <TableRow>
                                <TableHead className="rounded-tl-xl">Rank</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead className="text-center rounded-tr-xl">Quantidade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders.map(([name, quantity], index) =>(
                                    <TableRow key={index} className="">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="truncate">{name}</TableCell>
                                        <TableCell className="text-center">{quantity}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

            }
        </div>
    );
}

