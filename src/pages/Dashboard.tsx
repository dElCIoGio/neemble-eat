import {Layout} from "@/components/Dashboard/Layout"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {useState} from "react";
import {DashboardPage} from "@/schema.ts";
import {DashboardContext} from "@/context/dashboardContext.ts";
import {useParams} from "react-router-dom";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {useFetchUserByUUID} from "@/api/user/fetchUserByUUID.ts";
import {useGetRestaurant} from "@/service/api/restaurant.ts";
import {DashboardSidebarTabs} from "@/lib/DashboardSidebarTabs.ts";


export function Dashboard() {

	const [currentPage, setCurrentPage] = useState<DashboardPage>("dashboard")

	const {userID} = useParams() as unknown as {userID: string};

	const {data: user, isFetching: isUserFetching} = useFetchUserByUUID(userID);
	const {isLoading: isRestaurantLoading, data: restaurant} = useGetRestaurant({restaurantId: user? user.restaurantID: undefined})


	function selectPage(page: DashboardPage) {
		setCurrentPage(page)
	}

	return (
		<Loading Fallback={() => <div></div>} loadingParams={[isUserFetching, isRestaurantLoading]}>
			{
				user && restaurant &&
				<DashboardContext.Provider value={{
					restaurant,
					user,
					currentPage,
					selectPage,

				}}>
					<Layout>
						<Tabs defaultValue="dashboard" value={currentPage}>
							{
								DashboardSidebarTabs.map(({tab, tag}) => {
									const Tab = tab
									return(
										<TabsContent key={tag} value={tag}>
											{<Tab/>}
										</TabsContent>
									)}
								)
							}
						</Tabs>
					</Layout>
				</DashboardContext.Provider>
			}
		</Loading>


	);
}

