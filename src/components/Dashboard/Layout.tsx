import {ReactNode} from "react";
import {DashboardSidebar} from "@/components/Dashboard/DashboardSidebar.tsx";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {Navbar} from "@/components/Dashboard/Navbar"

interface Props {
	children: ReactNode
}

export function Layout({children}: Props) {

	return (
		<SidebarProvider>
			<DashboardSidebar/>
			<main className={`w-full bg-zinc-50 flex flex-col`}>
				<Navbar/>
				<div className="p-4 flex-1 flex flex-col">
					<div className={`flex-1 flex-col flex p-4 rounded-xl shadow-sm bg-white border border-gray-200`}>
						{children}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
}

