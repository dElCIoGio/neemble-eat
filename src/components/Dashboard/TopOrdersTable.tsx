import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useGetTopOrders} from "@/service/api/restaurant.ts";

export function TopOrdersTable() {

    const {restaurant} = useDashboardContext()

    const {data: orders, isLoading} = useGetTopOrders({restaurantId: restaurant.id})

    if(!orders && isLoading) {
        return <div></div>
    }

    return (
        <div className="w-full rounded-lg">
            {
                orders &&
                    <Table className={"w-full"}>
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

