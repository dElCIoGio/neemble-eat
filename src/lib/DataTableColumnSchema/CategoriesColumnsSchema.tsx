import {ColumnDef} from "@tanstack/react-table";
import {Category} from "@/schema.ts";


export const categoryColumnSchema = (): ColumnDef<Category>[] => [
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => (
            <div>
                {row.original.name}
            </div>
        )
    },
    {
        accessorKey: "quantity",
        header: "Contém",
        cell: ({ row }) => {

            const quantity = row.original.items.length

            return (
                <div className="flex items-center space-x-1">
                    <span>{quantity}</span>
                    <span>{quantity == 1? "ítem": "ítens"}</span>
                </div>
            )

        }
    }
]