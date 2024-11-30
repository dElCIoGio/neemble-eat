import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	Sidebar,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	useSidebar,
} from "@/components/ui/sidebar";
import {Home, Menu, Settings, Info, QrCode} from "lucide-react"
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
		title: "Edite o Menu",
		tag: "menu",
		icon: Menu
	},
	{
		title: "Mesas e QR Code",
		tag: "tables",
		icon: QrCode
	},
	{
		title: "Definições",
		tag: "settings",
		icon: Settings
	},

]

export function DashboardSidebar() {

	const {currentPage, selectPage, user} = useDashboardContext()
	const {toggleSidebar, isMobile, state} = useSidebar()

	function handlePageChange(page: string) {
		selectPage(page as DashboardPage)
		if (isMobile)
			toggleSidebar()
	}


	return (
		<Sidebar className="" collapsible={"icon"}>
			<SidebarHeader className={`flex flex-row items-center space-x-2 h-16 p-4 font-poppins-semibold prevent-select`}>
				<div
					className={`rounded-lg ${state === "collapsed" ? "bg-none text-zinc-50 font-poppins-semibold" : "bg-dark_purple"} transition-all duration-150 w-8 h-8 text-white flex justify-center items-center`}>
					N
				</div>
				<div className={`flex flex-col text-xs ${state === "collapsed" && "hidden"}`}>
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
							        "hover:bg-amethyst-800 bg-amethyst-900 focus:bg-amethyst-800 text-amethyst-300 hover:text-amethyst-300 font-poppins-semibold border border-amethyst-700 transition-all duration-100" :
							        "text-zinc-400"}`}
						        onClick={() => handlePageChange(tab.tag)}
						        asChild>
						            <div>
							            <tab.icon fill={tab.tag === currentPage?"#d3c2e8": "#ffffff"}/>
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
					<p className="transition-all duration-150">
						{state === "collapsed" ? "" : "Ajuda e informações"}
					</p>

				</Button>
			</SidebarFooter>
    </Sidebar>
	);
}

