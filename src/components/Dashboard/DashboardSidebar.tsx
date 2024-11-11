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
import {Home, Menu, Settings, Info} from "lucide-react"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {DashboardPage} from "@/schema.ts";
import {Button} from "@/components/ui/button.tsx";


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

	const {currentPage, selectPage, user} = useDashboardContext()
	const {toggleSidebar, isMobile} = useSidebar()

	function handlePageChange(page: string) {
		selectPage(page as DashboardPage)
		if (isMobile)
			toggleSidebar()
	}


	return (
		<Sidebar className="">
			<SidebarHeader
				className="flex flex-row items-center space-x-2 h-16 p-4 font-poppins-semibold prevent-select">
				<div
					className={"rounded-lg bg-dark_purple w-8 h-8 text-white flex justify-center items-center"}>
					N
				</div>
				<div className="flex flex-col text-xs">
					<span>{user.firstName} {user.lastName}</span>
					<span className="font-poppins-light text-zinc-400">{user.email}</span>
				</div>
			</SidebarHeader>
	      <SidebarContent>
	        <SidebarGroup className="">
		        <SidebarMenu className="rounded-none">
			        {tabs.map((tab) => (
				        <SidebarMenuItem className="cursor-pointer " key={tab.tag}>
					        <SidebarMenuButton
						        className={`transition-all duration-100 ${tab.tag === currentPage ?
							        "hover:bg-amethyst-800 bg-amethyst-900 focus:bg-amethyst-800 text-amethyst-300 hover:text-amethyst-300 font-poppins-semibold  transition-all duration-100" :
							        "text-zinc-400"}`}
						        onClick={() => handlePageChange(tab.tag)}
						        asChild>
						            <div>
							            <tab.icon/>
							            <span>{tab.title}</span>
									</div>
					        </SidebarMenuButton>
			            </SidebarMenuItem>
			        ))}
		        </SidebarMenu>
	        </SidebarGroup>
	      </SidebarContent>
			<SidebarFooter className="">
				<Button variant="ghost"
				        className="flex justify-start items-center text-zinc-400 text-sm font-poppins-regular">
					<Info size={12}/>
					Ajuda e informações
				</Button>
			</SidebarFooter>
    </Sidebar>
	);
}

