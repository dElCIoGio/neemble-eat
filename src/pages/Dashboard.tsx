import {Layout} from "@/components/Dashboard/Layout"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {TabDashboard} from "@/components/Dashboard/TabDashboard.tsx";
import {TabMenu} from "@/components/Dashboard/TabMenu.tsx";
import {TabSettings} from "@/components/Dashboard/TabSettings.tsx";
import {useState} from "react";
import {DashboardPage} from "@/schema.ts";
import {DashboardContext} from "@/context/dashboardContext.ts";
import {useParams} from "react-router-dom";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {useFetchUserByUUID} from "@/api/user/fetchUserByUUID.ts";
import {useGetRestaurant} from "@/service/api/restaurant.ts";
import {TabTables} from "@/components/Dashboard/TabTables.tsx";


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
							<TabsContent value="dashboard">
								<TabDashboard/>
							</TabsContent>
							<TabsContent value="menu">
								<TabMenu/>
							</TabsContent>
							<TabsContent value="settings">
								<TabSettings/>
							</TabsContent>
							<TabsContent value="tables">
								<TabTables/>
							</TabsContent>
						</Tabs>
					</Layout>
				</DashboardContext.Provider>
			}
		</Loading>


	);
}

