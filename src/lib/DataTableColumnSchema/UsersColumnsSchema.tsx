import {Role, Roles} from "@/schema.ts";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "@phosphor-icons/react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

import {Phone, At, User} from "@phosphor-icons/react"


export interface UserColumnSchemaProps {
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
    onDelete: (item: UserColumnSchemaProps) => void;
}

export const userColumnSchema = ({onDelete}: ItemActions): ColumnDef<UserColumnSchemaProps>[] => [
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
        cell: ({row}) => {
            const isLoggedUser: boolean = row.original.loggedUser
            const role: Role = row.getValue("role")
            const roles = [
                Roles.Administrator,
                Roles.Manager,
                Roles.Chef,
                Roles.Waitstaff,
                Roles.Bartender,
                Roles.Accountant
            ]

            return (
                <Select defaultValue={role.name} disabled={isLoggedUser}>
                    <SelectTrigger>
                        <SelectValue placeholder={`${role.name}`}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                roles.map((r, index) =>
                                    <SelectItem value={r.name} key={index}>
                                        {r.name}
                                    </SelectItem>
                                )
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {

            const isLoggedUser: boolean = row.original.loggedUser

            if (isLoggedUser)
                return <div></div>

            return (
                <Button size="icon" onClick={() => onDelete(row.original)} variant="ghost" className="hover:text-red-400">
                    <Trash className="text-zinc-500"/>
                </Button>
            )
        }
    }
]