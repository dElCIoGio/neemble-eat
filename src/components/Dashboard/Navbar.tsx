import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisVertical} from "lucide-react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import Time from "@/components/Dashboard/Time.tsx";
import {logout} from "@/service/firebase/signOut.ts";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {useNavigate} from "react-router-dom";
import {MemberRoleTranslation} from "@/schema.ts";


export function Navbar() {

	const {user} = useDashboardContext()
	const navigate = useNavigate();

	return (
		<div
			className={`flex justify-between items-center sticky top-0 w-full px-4 h-16 z-10 bg-zinc-50`}>
			<div className="flex items-center space-x-4">
				<SidebarTrigger/>
				<div className="text-xs">
					<h1 className="font-poppins-semibold">
						Ola, {user.firstName}!
					</h1>
					<Time/>
				</div>
			</div>
			<div className="flex space-x-2 items-center">
				<span className="hidden laptop:block prevent-select bg-zinc-200 text-zinc-600 font-poppins-semibold rounded-full px-2 py-0.5 text-xs">
					{MemberRoleTranslation[user.role.name]}
				</span>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"ghost"} className="focus:ring-0">
							<EllipsisVertical/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mx-2">
						<DropdownMenuItem asChild className="bg-red-500 focus:bg-red-600 focus:text-white text-white">
							<Button onClick={() => {
								logout().then()
								navigate(`${URL_PATH_PREFIX}/`, {replace: true})
							}}>
								Terminar Sessão
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
        </div>
	);
}

