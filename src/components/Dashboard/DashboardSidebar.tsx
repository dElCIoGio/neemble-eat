import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {Info} from "@phosphor-icons/react"
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {DashboardPage, Permissions, Sections} from "@/schema.ts";
import {Button} from "@/components/ui/button.tsx";
import {DashboardSidebarTabs} from "@/lib/DashboardSidebarTabs.ts";
import {hasPermission} from "@/lib/utils.ts";


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
	        <SidebarGroup>
		        <SidebarMenu className="rounded-none">
			        {DashboardSidebarTabs.map(({icon, tag, title}) => {
						const TabIcon = icon

						const isPermitted: boolean = hasPermission(user, tag as Sections, Permissions.View);

						if (!isPermitted)
							return null;

						return (
							<SidebarMenuItem className="cursor-pointer " key={tag}>
								<SidebarMenuButton
									className={`transition-all duration-100 ${tag === currentPage ?
										`hover:bg-amethyst-800 bg-amethyst-900 focus:bg-amethyst-800 text-amethyst-300 hover:text-amethyst-300 font-poppins-semibold transition-all duration-200` :
										"text-zinc-400"} ${!isPermitted ? "cursor-not-allowed" : ""}`}
									onClick={isPermitted? () => handlePageChange(tag): () => {}}
									asChild>
									<div>
										<TabIcon/>
										<span>{title}</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)
					}
			        )}
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

