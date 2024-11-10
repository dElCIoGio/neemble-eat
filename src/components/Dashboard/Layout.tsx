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
			<main className={`w-full`}>
				<Navbar/>
				<div
					className={`p-4`}>
					{children}
				</div>
			</main>
		</SidebarProvider>
	);
}

