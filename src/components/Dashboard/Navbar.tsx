import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import Time from "@/components/Dashboard/Time.tsx";


export function Navbar() {

	const {user} = useDashboardContext()

	return (
		<div
			className={`flex justify-between items-center sticky top-0 w-full px-4 h-16 z-10 bg-zinc-50`}>
			<div className="flex items-center space-x-4">
				<SidebarTrigger/>
				<div className="text-xs">
					<h1 className="font-poppins-semibold">Ola, {user.firstName}!</h1>
					<Time/>
				</div>
			</div>

            <DropdownMenu>
	            <DropdownMenuTrigger asChild>
		            <Button variant={"ghost"} className="focus:ring-0">
			            <Ellipsis/>
		            </Button>
	            </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-2">
	                <DropdownMenuItem className="bg-red-400 focus:bg-red-500 focus:text-white text-white">
		                Terminar Sessão
	                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
	);
}

