
import {
	useGetRestaurantOrderCountByDay,
	useGetRestaurantOrderCountByMonth,
	useGetRestaurantRevenueByDay,
	useGetRestaurantRevenueByMonth
} from "@/api/analytics/hooks.ts"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CircleDollarSignIcon as CurrencyCircleDollar, Loader2, ShoppingBag} from "lucide-react"
import {TopOrdersTable} from "@/components/Dashboard/TopOrdersTable.tsx";
import {Loading} from "@/components/wrappers/Loading.tsx";
import LoadingDashboardAnalytics from "@/components/Loading/LoadingDashboardAnalytics.tsx";


export function Analytics() {

	const {restaurant} = useDashboardContext()

	const {isLoading: isDayOrdersLoading, data: dayOrders} = useGetRestaurantOrderCountByDay({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	const {isLoading: isMonthOrdersLoading, data: monthOrders} = useGetRestaurantOrderCountByMonth({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	const {isLoading: isDayRevenueLoading, data: dayRevenue} = useGetRestaurantRevenueByDay({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	const {isLoading: isMonthRevenueLoading, data: monthRevenue} = useGetRestaurantRevenueByMonth({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})



	if (isDayOrdersLoading || isMonthOrdersLoading || isDayRevenueLoading || isMonthRevenueLoading){
		return <div className="flex justify-center items-center h-full">
			<Loader2 className="animate-spin"/>
		</div>
	}

	if (restaurant.orders?.length == 0) {
		return <div className="flex flex-col items-center justify-center h-full">
			<h1>
				O seu restaurante não possui pedidos ainda
			</h1>
		</div>;
	};

	return (
		<div>
			{
				restaurant.orders?.length == 0 ?
					<div className="flex flex-col items-center justify-center h-full">
						<h1>
						O seu restaurante não possui pedidos ainda
						</h1>
					</div>:
					<Loading Fallback={LoadingDashboardAnalytics} loadingParams={[isDayOrdersLoading, isMonthOrdersLoading, isDayRevenueLoading, isMonthRevenueLoading]}>
						{
							dayOrders && monthOrders && dayRevenue && monthRevenue &&
							<div className="w-full space-y-4">

								<div className="grid grid-cols-4 gap-2">
									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Ganhos diários</CardTitle>
											<CurrencyCircleDollar className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">Kz {monthRevenue.currentMonth}</div>
											<p className="text-xs text-muted-foreground">{monthRevenue.currentMonth == 0 ? "-100" : (monthRevenue.currentMonth / (monthRevenue.currentMonth + monthRevenue.previousMonth)) * 100}%
												em relação ao último dia de trabalho</p>
										</CardContent>
									</Card>
									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Pedidos diários</CardTitle>
											<ShoppingBag className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">{monthOrders.currentMonth}</div>
											<p className="text-xs text-muted-foreground">+15% em relação ao último dia de trabalho</p>
										</CardContent>
									</Card>

									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Ganhos mensais</CardTitle>
											<CurrencyCircleDollar className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">Kz {dayRevenue.today}</div>
											<p className="text-xs text-muted-foreground">{dayRevenue.yesterday == 0 ? "-100" : (dayRevenue.today / (dayRevenue.today + dayRevenue.yesterday)) * 100}%
												em relação ao mês passado</p>
										</CardContent>
									</Card>
									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Pedidos mensais</CardTitle>
											<ShoppingBag className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">{dayOrders.today}</div>
											<p className="text-xs text-muted-foreground">+15% em relação ao mês passado</p>
										</CardContent>
									</Card>
								</div>
								<TopOrdersTable maxNumber={10}/>
							</div>
						}

					</Loading>

			}
		</div>
	);
}

// <div className="w-full space-y-4 grid grid-cols-1 gap-4 laptop:grid-cols-3 laptop:gap-3">
// 	<div className="flex flex-col desktop:flex-row gap-4 col-span-full">
// 		<AnalyticBox
// 			title={"Ganhos"}
// 			icon={Coins}>
// 			<StatCardWithIcon
// 				value={134000}
// 				valueType={"currency"}
// 				pillText={"2.75%"}
// 				period="Novembro 2024 - Hoje"
// 				trend="up"/>
// 		</AnalyticBox>
// 		<AnalyticBox
// 			title="Media de clientes diarios"
// 			icon={Users}>
// 			<StatCardWithIcon
// 				value={130}
// 				pillText={"1.45%"}
// 				period="Novembro 2024 - Hoje"
// 				trend="up"/>
// 		</AnalyticBox>
// 		<AnalyticBox
// 			title="Gasto medio por pedido"
// 			icon={Receipt}>
// 			<StatCardWithIcon
// 				value={25000}
// 				valueType={"currency"}
// 				pillText={"3.14%"}
// 				period="Dezembro 2024 - Outubro 2025"
// 				trend="up"/>
// 		</AnalyticBox>
// 	</div>
// 	<div className="col-span-full laptop:col-span-2">
// 		<TopOrdersTable maxNumber={10}/>
// 	</div>
//
// </div>