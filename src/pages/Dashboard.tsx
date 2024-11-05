import {Layout} from "@/components/Dashboard/Layout"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {TabDashboard} from "@/components/Dashboard/TabDashboard.tsx";
import {TabMenu} from "@/components/Dashboard/TabMenu.tsx";
import {TabSettings} from "@/components/Dashboard/TabSettings.tsx";
import {useState} from "react";
import {DashboardPage} from "@/schema.ts";
import {DashboardContext} from "@/context/dashboardContext.ts";


export function Dashboard() {

	const [currentPage, setCurrentPage] = useState<DashboardPage>("dashboard")

	function selectPage(page: DashboardPage) {
		setCurrentPage(page)
	}

	return (
		<DashboardContext.Provider value={{
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
			</Tabs>
			</Layout>
		</DashboardContext.Provider>

	);
}

