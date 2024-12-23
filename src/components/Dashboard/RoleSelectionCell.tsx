import {Row} from "@tanstack/react-table";
import {MemberRoleNames, Role, Roles} from "@/schema.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {UserColumnSchemaProps} from "@/lib/DataTableColumnSchema/UsersColumnsSchema.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";


interface RoleSelectionCellProps {
    row: Row<UserColumnSchemaProps>;
    onRoleChange: (user: UserColumnSchemaProps, newRole: MemberRoleNames) => void;
}

export function RoleSelectionCell({row, onRoleChange}:RoleSelectionCellProps) {


    const isLoggedUser: boolean = row.original.loggedUser
    const [role, setRole] = useState<Role>(row.getValue("role"))

    const [selectedRoleName, setSelectedRoleName] = useState<MemberRoleNames>(role.name)

    const roles = [
        Roles.Administrator,
        Roles.Manager,
        Roles.Chef,
        Roles.Waitstaff,
        Roles.Bartender,
        Roles.Accountant
    ]

    return (
        (
            <div className="flex space-x-4">
                <Select defaultValue={role.name} disabled={isLoggedUser} value={selectedRoleName} onValueChange={(name) => setSelectedRoleName(name as MemberRoleNames)}>
                    <SelectTrigger>
                        <SelectValue placeholder={`${role.name}`}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                roles.map((r, index) =>
                                    <SelectItem value={r.name} key={index} className={`${r.name == role.name && "text-french_gray-300 font-poppins-semibold"}`}>
                                        {r.name}
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

