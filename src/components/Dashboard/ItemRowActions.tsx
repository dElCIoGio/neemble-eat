import {Row} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {MenuItemWithCategory} from "@/schema.ts";


interface ItemRowActionsProps {
    row: Row<MenuItemWithCategory>;
    onEdit: (item: MenuItemWithCategory) => void;
    onDelete: (item: MenuItemWithCategory) => void;

}


function ItemRowActions ({row, onEdit, onDelete}: ItemRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <MoreHorizontal/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(row.original)}>
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(row.original)}>
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ItemRowActions;