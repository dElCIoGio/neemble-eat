import {MemberRoleNames, Role} from "@/schema.ts";
import {ColumnDef} from "@tanstack/react-table";
import {Phone, At, User} from "@phosphor-icons/react"
import {RoleSelectionCell} from "@/components/Dashboard/RoleSelectionCell.tsx";
import {UsersColumnActions} from "@/components/Dashboard/UsersColumnActions.tsx";


export type UserColumnSchemaProps = {
    name: {
        firstName: string;
        lastName: string;
    },
    contact: {
        phoneNumber: string;
        email: string;
    },
    role: Role,
    id: string,
    loggedUser: boolean
}

interface ItemActions {
    onDelete: (user: UserColumnSchemaProps) => void;
    onRoleChange: (user: UserColumnSchemaProps, newRole: MemberRoleNames) => void;
}

export const userColumnSchema = (
    {
        onDelete,
        onRoleChange
    }: ItemActions): ColumnDef<UserColumnSchemaProps>[] => [
    {
        accessorKey: "name",
        header: () => (
            <div className="flex items-center space-x-2">
                <User/> <span>Nome</span>
            </div>
        ),
        cell: ({ row }) => {

            const name: {firstName: string, lastName: string} = row.getValue("name")
            const isLoggedUser: boolean = row.original.loggedUser

            return (
                <div className="flex space-x-1">
                    <p>
                        {isLoggedUser? "Tu": name.firstName}
                    </p>
                    <p>
                        {isLoggedUser? "": name.lastName}
                    </p>
                </div>
            )
        }
    },
    {
        accessorKey: "contact",
        header: "Contacto",
        cell: ({row}) => {
            const contact: {email: string, phoneNumber: string} = row.getValue("contact")
            return (
                <div className="flex flex-col">
                    <div className="flex items-center space-x-1.5">
                        <At className="text-amethyst-300" size={12}/>
                        <a href={`mailto:${contact.email}`}
                           className="text-sm pb-0.5 text-zinc-500 hover:underline hover:translate-x-1 transition-all ease-in-out duration-200">
                            {contact.email}
                        </a>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <Phone className="text-amethyst-300"/>
                        <a href={`tel:${contact.phoneNumber}`}
                           className="font-poppins-semibold pb-0.5 hover:underline hover:translate-x-1 transition-all ease-in-out duration-200">
                            {contact.phoneNumber}
                        </a>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Cargo",
        cell: ({row}) => <RoleSelectionCell row={row} onRoleChange={onRoleChange}/>

    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => <UsersColumnActions row={row} onDelete={onDelete}/>
    }
]