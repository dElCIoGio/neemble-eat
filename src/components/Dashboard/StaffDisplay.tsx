import {useMemo} from "react";
import {userColumnSchema, UserColumnSchemaProps} from "@/lib/DataTableColumnSchema/UsersColumnsSchema.tsx";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {UserJson} from "@/schema.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useDashboardContext} from "@/context/dashboardContext.ts";

interface StaffDisplayProps {
    users: UserJson[]
}

export function StaffDisplay({users}: StaffDisplayProps) {

    const {user} = useDashboardContext()

    function onDelete(user: UserColumnSchemaProps) {
        console.log(user)
    }

    const columns = useMemo(() => userColumnSchema({onDelete}), [])

    const table = useReactTable({
        data: users
            .map((u) => {
            return {
                name: {
                    firstName: u.firstName ,
                    lastName: u.lastName
                },
                contact: {
                    email: u.email,
                    phoneNumber: u.phoneNumber
                },
                role: u.role,
                id: u.id,
                loggedUser: u.id === user.id
            } as UserColumnSchemaProps
        }),
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        }
    })

    return (
        <Table className="mt-4">
            <TableHeader className="hover:bg-zinc-100">
                {
                    table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                        <TableHead className="text-amethyst-300" key={header.id}>
                                            {header.isPlaceholder ?
                                                null :
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                            })}
                        </TableRow>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className="bg-zinc-50"
                            data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    );
}
