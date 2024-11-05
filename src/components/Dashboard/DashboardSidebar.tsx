import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	Sidebar,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton, useSidebar
} from "@/components/ui/sidebar";
import {Home, Menu, Settings} from "lucide-react"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {DashboardPage} from "@/schema.ts";

const tabs = [
	{
		title: "Dashboard",
		tag: "dashboard",
		icon: Home
	},
	{
		title: "Menu",
		tag: "menu",
		icon: Menu
	},
	{
		title: "Definições",
		tag: "settings",
		icon: Settings
	}
]

export function DashboardSidebar() {

	const {currentPage, selectPage} = useDashboardContext()
	const {toggleSidebar, isMobile} = useSidebar()

	function handlePageChange(page: string) {
		selectPage(page as DashboardPage)
		if (isMobile)
			toggleSidebar()
	}


	return (
		<Sidebar className="rounded-xl bg-black">
			<SidebarHeader
				className="flex flex-row items-center space-x-2 p-4 border-b font-poppins-semibold prevent-select">
				<div
					className={"rounded-lg bg-dark_purple w-8 h-8 text-white flex justify-center items-center"}>
					N
				</div>
				<span>
					Bem-vindo
				</span>
			</SidebarHeader>
	      <SidebarContent>
	        <SidebarGroup className="">
		        <SidebarMenu className="rounded-none">
			        {tabs.map((tab) => (
				        <SidebarMenuItem className="cursor-pointer" key={tab.tag}>
					        <SidebarMenuButton className="" onClick={() => handlePageChange(tab.tag)}
					                           asChild>
						        {
							        tab.tag === currentPage ?
								        <div
									        className="bg-amethyst-900 hover:bg-amethyst-800 text-amethyst-300 hover:text-amethyst-300 font-poppins-semibold transition-all duration-100">
							                <tab.icon/>
						                    <span>{tab.title}</span>
						                </div> :
								        <div className="transition-all duration-100 text-zinc-400">
							                <tab.icon/>
						                    <span>{tab.title}</span>
						                </div>
						        }


					        </SidebarMenuButton>
			            </SidebarMenuItem>
			        ))}
		        </SidebarMenu>
	        </SidebarGroup>
	      </SidebarContent>
			<SidebarFooter className="p-2">
				<div
					className="cursor-pointer prevent-select p-2 bg-zinc-100 hover:bg-amethyst-900 text-zinc-400 hover:text-amethyst-500 font-poppins-semibold transition-all durantion-150 rounded-md">
					Powered by Neemble
				</div>
			</SidebarFooter>
    </Sidebar>
	);
}

