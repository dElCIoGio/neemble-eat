import {Row} from "@tanstack/react-table";
import {MemberRoleNames, MemberRoleTranslation, Permissions, Role, Roles, Sections} from "@/schema.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {UserColumnSchemaProps} from "@/lib/DataTableColumnSchema/UsersColumnsSchema.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {hasPermission} from "@/lib/utils.ts";


interface RoleSelectionCellProps {
    row: Row<UserColumnSchemaProps>;
    onRoleChange: (user: UserColumnSchemaProps, newRole: MemberRoleNames) => void;
}

const roles = [
    Roles.Administrator,
    Roles.Manager,
    Roles.Chef,
    Roles.Waitstaff,
    Roles.Bartender,
    Roles.Accountant
]

export function RoleSelectionCell({row, onRoleChange}:RoleSelectionCellProps) {

    const {user} = useDashboardContext()

    const canEdit: boolean = hasPermission(user, Sections.staff, Permissions.Update)

    const isLoggedUser: boolean = row.original.loggedUser
    const [role, setRole] = useState<Role>(row.getValue("role"))

    const [selectedRoleName, setSelectedRoleName] = useState<MemberRoleNames>(role.name)

    return (
        (
            <div className="flex space-x-4">
                <Select defaultValue={role.name} disabled={isLoggedUser || !canEdit} value={selectedRoleName} onValueChange={(name) => setSelectedRoleName(name as MemberRoleNames)}>
                    <SelectTrigger>
                        <SelectValue placeholder={`${role.name}`}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                roles.map((r, index) =>
                                    <SelectItem value={r.name} key={index} className={`${r.name == role.name && "text-french_gray-300 font-poppins-semibold"}`}>
                                        {MemberRoleTranslation[r.name]}
                                    </SelectItem>
                                )
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    role.name != selectedRoleName &&
                        <Button type="button" onClick={() => {
                            onRoleChange(row.original, selectedRoleName)
                            setRole(Roles[selectedRoleName])
                        }}>
                            Confirmar
                        </Button>
                }
            </div>
        )
    );
}

