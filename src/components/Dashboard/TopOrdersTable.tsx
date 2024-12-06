import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useGetTopOrders} from "@/service/api/restaurant.ts";
import {Ranking} from "@phosphor-icons/react";
import {AnalyticBox} from "@/components/Dashboard/AnalyticBox.tsx";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";



interface TopOrdersTableProps {
    maxNumber?: number;
}

export function TopOrdersTable({maxNumber}: TopOrdersTableProps = {maxNumber: 10}) {

    const {restaurant} = useDashboardContext()

    const {data: orders, isLoading, isFetching} = useGetTopOrders({restaurantId: restaurant.id})


    if (!isLoading && orders == undefined){
        return null
    }

    return (
        <Loading Fallback={() => <TableLoading/>} loadingParams={[isLoading, isFetching]}>
            <AnalyticBox title={"Pedidos mais populares"} icon={Ranking}>
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
                                        maxNumber && index >= maxNumber ? <></>:
                                        <TableRow key={name} className="">
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
        </AnalyticBox>

        </Loading>
    );
}


function TableLoading() {

    return <Skeleton className={"w-full h-[480px]"}/>
}

