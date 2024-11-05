import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button.tsx";

export function Navbar() {
	return (
		<div className="flex justify-between items-center sticky top-0 w-full px-4 h-16 border-b bg-white">
            <SidebarTrigger/>
            <DropdownMenu>
	            <DropdownMenuTrigger asChild>
		            <Button variant={"outline"} className="focus:ring-0">
			            Delcio Agostinho
		            </Button>
	            </DropdownMenuTrigger>
                <DropdownMenuContent className="b">
	                <DropdownMenuItem>
		                Terminar Sessão
	                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
	);
}

