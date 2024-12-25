import {Row} from "@tanstack/react-table";
import {UserColumnSchemaProps} from "@/lib/DataTableColumnSchema/UsersColumnsSchema.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "@phosphor-icons/react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {hasPermission} from "@/lib/utils.ts";
import {Permissions, Sections} from "@/schema.ts";

interface UsersColumnActionsProps {
    row: Row<UserColumnSchemaProps>;
    onDelete: (user: UserColumnSchemaProps) => void;

}

export function UsersColumnActions({row, onDelete}: UsersColumnActionsProps) {

    const isLoggedUser: boolean = row.original.loggedUser
    const {user} = useDashboardContext()
    const canDelete: boolean = hasPermission(user, Sections.staff, Permissions.Delete)


    if (isLoggedUser)
        return <div></div>

    return (
        <Button size="icon" disabled={!canDelete} onClick={() => onDelete(row.original)} variant="ghost" className="hover:text-red-400">
            <Trash className="text-zinc-500"/>
        </Button>
    )
}

