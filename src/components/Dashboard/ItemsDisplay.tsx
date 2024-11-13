import {MenuItemWithCategory} from "@/schema.ts";
import {
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {Search} from "lucide-react";

import {Input} from "@/components/ui/input.tsx";
import {useEffect, useMemo, useState} from "react";
import * as React from "react";
import {Select, SelectItem} from "@/components/ui/select";
import {SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {EditItemContext} from "@/context/editItemContext.ts";
import EditItem from "@/components/Dashboard/EditItem.tsx";
import {useEditMenuContext} from "@/context/editMenuContext.ts";
import {menuColumnsSchema} from "@/lib/DataTableColumnSchema/MenuColumnsSchema.tsx";


interface ItemsDisplayProps {
    items: MenuItemWithCategory[];
}

export function ItemsDisplay({items}: ItemsDisplayProps) {

    const [editingItem, setEditingItem] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<MenuItemWithCategory | undefined>(undefined)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const {menu} = useEditMenuContext()

    const onEdit = (menuItemWithCategory: MenuItemWithCategory) => {
        setSelectedItem(menuItemWithCategory)
    };

    const onDelete = (menuItemWithCategory: MenuItemWithCategory) => {
        alert(`Delete item: ${menuItemWithCategory.name} - ${menuItemWithCategory.category}`);
    };

    const columns = useMemo(() => menuColumnsSchema({onEdit, onDelete}), [])

    const table = useReactTable({
        data: items,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            columnVisibility
        }
    })

    useEffect(() => {
        console.log(selectedItem)
        setEditingItem(!!selectedItem)
    }, [selectedItem])



    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-4 laptop:flex-row laptop:justify-between laptop:items-center">
                <Input
                    type="text"
                    variant="brand"
                    placeholder="Pesquisar"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    startIcon={Search}
                    className={"max-w-[200px] shadow-sm placeholder:text-zinc-400 placeholder:font-poppins-regular"}
                    onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}/>
                <Select onValueChange={(value) => value === "All"? table.getColumn("category")?.setFilterValue(undefined) : table.getColumn("category")?.setFilterValue(value)}
                        value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
                        defaultValue="">
                    <SelectTrigger className="shadow-sm max-w-36 ">
                        <SelectValue className="overflow-clip" placeholder="Selecione uma categoria"/>
                    </SelectTrigger>
                    <SelectContent className="overflow-y-scroll !h-[300px]">
                        <SelectGroup>
                            <SelectLabel>Categorias</SelectLabel>
                            <SelectItem value="All">Todas</SelectItem>
                            {
                                menu.categories &&
                                menu.categories.map((category, index) => (
                                    <SelectItem key={index}
                                                value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return <TableHead key={header.id}>
                                            {header.isPlaceholder ?
                                                null :
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    })}
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))):(
                                <TableRow>
                                    <TableCell colSpan={columns.length} className={"h-24 text-center"}>
                                        Nenhum resultado encontrado.
                                    </TableCell>
                                </TableRow>

                            )
                        }
                    </TableBody>
                </Table>
                <div className="space-y-2 py-4">
                    {(table.getColumn("name")?.getFilterValue() as string) &&
                        <div className="flex items-center justify-end space-x-2">
                            <div className="flex-1 text-sm text-muted-foreground">
                                Resultados para: {table.getColumn("name")?.getFilterValue() as string}
                            </div>
                        </div>
                    }

                    <div className="flex items-center justify-end space-x-2">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredRowModel().rows.length} itens.
                        </div>
                    </div>
                </div>

            </div>
            <EditItemContext.Provider value={{
                item: selectedItem,
                isOpened: editingItem,
                onOpenChange: (isOpened: boolean) => setEditingItem(isOpened),
            }}>
                <EditItem/>
            </EditItemContext.Provider>
        </div>
    )
}