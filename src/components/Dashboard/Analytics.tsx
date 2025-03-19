
// import {
// 	useGetRestaurantOrderCountByDay,
// 	useGetRestaurantOrderCountByMonth,
// 	useGetRestaurantRevenueByDay,
// 	useGetRestaurantRevenueByMonth
// } from "@/api/analytics/hooks.ts"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CircleDollarSignIcon as CurrencyCircleDollar, Loader2, ShoppingBag} from "lucide-react"
import {TopOrdersTable} from "@/components/Dashboard/TopOrdersTable.tsx";
import {Loading} from "@/components/wrappers/Loading.tsx";
import LoadingDashboardAnalytics from "@/components/Loading/LoadingDashboardAnalytics.tsx";


export function Analytics() {

	const {restaurant} = useDashboardContext()
	//
	// const {isLoading: isDayOrdersLoading, data: dayOrders} = useGetRestaurantOrderCountByDay({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	// const {isLoading: isMonthOrdersLoading, data: monthOrders} = useGetRestaurantOrderCountByMonth({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	// const {isLoading: isDayRevenueLoading, data: dayRevenue} = useGetRestaurantRevenueByDay({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})
	// const {isLoading: isMonthRevenueLoading, data: monthRevenue} = useGetRestaurantRevenueByMonth({restaurantId: restaurant.orders?.length == 0? undefined: restaurant.id})

	const dayOrders = {
		today: 120,
		yesterday: 95,
	};

	const monthOrders = {
		currentMonth: 3200,
		previousMonth: 2850,
	};

	const dayRevenue = {
		today: 15000, // in currency units, e.g., Kwanza or USD
		yesterday: 12500,
	};

	const monthRevenue = {
		currentMonth: 400000,
		previousMonth: 370000,
	};

	const isMonthRevenueLoading = false;
	const isDayRevenueLoading = false;
	const isMonthOrdersLoading = false;
	const isDayOrdersLoading = false;

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
											<CardTitle className="text-sm font-medium">Ganhos</CardTitle>
											<CurrencyCircleDollar className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">Kz {monthRevenue.currentMonth}</div>
											<p className="text-xs text-muted-foreground">6.2%
												em relação ao mês passado</p>
										</CardContent>
									</Card>
									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Pedidos</CardTitle>
											<ShoppingBag className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">{monthOrders.currentMonth}</div>
											<p className="text-xs text-muted-foreground">+15% em relação ao mês passado</p>
										</CardContent>
									</Card>

									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Ganhos</CardTitle>
											<CurrencyCircleDollar className="h-4 w-4 text-muted-foreground"/>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">Kz {dayRevenue.today}</div>
											<p className="text-xs text-muted-foreground">
												12%
												em relação ao mês passado</p>
										</CardContent>
									</Card>
									<Card className="col-span-2 laptop:col-span-1">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Pedidos</CardTitle>
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

