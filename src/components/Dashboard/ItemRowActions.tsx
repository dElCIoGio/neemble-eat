import {Row} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {MenuItemWithCategory, Permissions, Sections} from "@/schema.ts";
import DeleteMenuItemAlert from "@/components/Dashboard/DeleteMenuItemAlert.tsx";
import {useItemsDisplayContext} from "@/context/itemsDisplayContext.ts";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {hasPermission} from "@/lib/utils.ts";


interface ItemRowActionsProps {
    row: Row<MenuItemWithCategory>;
    onEdit: (item: MenuItemWithCategory) => void;
    onDelete: (item: MenuItemWithCategory) => void;

}

function ItemRowActions ({row, onEdit, onDelete}: ItemRowActionsProps) {

    const {setDeleteItemAlert, deleteItemAlert} = useItemsDisplayContext()
    const {user} = useDashboardContext()
    const canDelete: boolean = hasPermission(user, Sections.menu, Permissions.Delete)
    const canEdit: boolean = hasPermission(user, Sections.menu, Permissions.Update)

    return (
        <div>
            <DeleteMenuItemAlert item={row.original} open={deleteItemAlert} onOpenChange={setDeleteItemAlert}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontal/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Ações
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <div className="space-y-1">
                        <DropdownMenuItem disabled={!canEdit} onClick={() => onEdit(row.original)}>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={!canDelete} className="bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white focus:text-white" onClick={() => onDelete(row.original)}>
                            Eliminar
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    );
}

export default ItemRowActions;