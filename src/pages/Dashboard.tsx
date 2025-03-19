import {Layout} from "@/components/Dashboard/Layout"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {useState} from "react";
import {DashboardPage, MemberRoleNames, Permissions, RestaurantJson, Sections, UserJson} from "@/schema.ts";
import {DashboardContext} from "@/context/dashboardContext.ts";
import {Loading} from "@/components/wrappers/Loading.tsx";

import {DashboardSidebarTabs} from "@/lib/DashboardSidebarTabs.ts";
import {LoadingDashboard} from "@/components/Loading/LoadingDashboard.tsx";


const exampleUser: UserJson = {
	id: "12345",
	created_time: "2025-03-19T12:00:00Z",
	UUID: "550e8400-e29b-41d4-a716-446655440000",
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	role: {
		name: MemberRoleNames.Manager,
		description: "Responsible for overseeing restaurant operations and staff.",
		permissions: [
			{
				section: Sections.ordersTracking,
				permissions: [Permissions.View, Permissions.Update],
			},
			{
				section: Sections.tablesTracking,
				permissions: [Permissions.View],
			},
			{
				section: Sections.menu,
				permissions: [Permissions.View, Permissions.Update],
			},
			{
				section: Sections.staff,
				permissions: [Permissions.View],
			},
			{
				section: Sections.All,
				permissions: [Permissions.View, Permissions.Delete, Permissions.Update, Permissions.Create],
			},
		],
	},
	phoneNumber: "+1234567890",
	restaurantID: "resto-98765",
};


const exampleRestaurant: RestaurantJson = {
	id: "resto-98765",
	created_time: "2025-03-19T12:00:00Z",
	name: "The Gourmet Spot",
	address: "123 Main Street, Luanda, Angola",
	phoneNumber: "+244912345678",
	users: ["12345", "67890"], // Array of user IDs associated with the restaurant
	bannerURL: "https://example.com/banner.jpg",
	description: "A fine dining restaurant specializing in Angolan and international cuisine.",
	orders: ["order-001", "order-002", "order-003"], // Order IDs
	sessions: ["session-001", "session-002"], // Session IDs
	menus: ["menu-001", "menu-002"], // Menu IDs
	tables: ["table-001", "table-002", "table-003"], // Table IDs
};


export function Dashboard() {

	const [currentPage, setCurrentPage] = useState<DashboardPage>("dashboard")

	// const {userID} = useParams() as unknown as {userID: string};

	// const {data: user, isLoading: isUserLoading} = useFetchUserByUUID(userID);
	// const {isLoading: isRestaurantLoading, data: restaurant} = useGetRestaurant({restaurantId: user? user.restaurantID: undefined})

	const user = exampleUser;
	const restaurant = exampleRestaurant;
	const isUserLoading= false;
	const isRestaurantLoading = false;

	function selectPage(page: DashboardPage) {
		setCurrentPage(page)
	}

	return (
		<Loading Fallback={LoadingDashboard} loadingParams={[isUserLoading, isRestaurantLoading]}>
			{
				user && restaurant &&
				<DashboardContext.Provider value={{
					restaurant,
					user,
					currentPage,
					selectPage,
				}}>
					<Layout>
						<Tabs className="h-full" defaultValue="dashboard" value={currentPage}>
							{
								DashboardSidebarTabs.map(({tab, tag}) => {
									const Tab = tab
									return(
										<TabsContent className="h-full" key={tag} value={tag}>
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

