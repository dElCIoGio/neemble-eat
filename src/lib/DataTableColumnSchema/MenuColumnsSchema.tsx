import {MenuItemWithCategory} from "@/schema.ts";
import {ColumnDef} from "@tanstack/react-table";
// import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import ItemRowActions from "@/components/Dashboard/ItemRowActions.tsx";

interface ItemActions {
    onEdit: (item: MenuItemWithCategory) => void;
    onDelete: (item: MenuItemWithCategory) => void;
}

export const menuColumnsSchema = ({ onEdit, onDelete }: ItemActions): ColumnDef<MenuItemWithCategory>[] => [
    {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => (
            <div className="capitalize font-poppins-semibold  max-w-[200px] text-nowrap truncate">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return <Button variant="ghost"
                           className="w-full content-start text-nowrap"
                           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Categoria
                <ArrowUpDown/>
            </Button>
        },
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "availability",
        header: () => (
            <div className="w-full text-center">Disponibilidade</div>
        ),
        cell: ({ row }) => (
            <div className="flex capitalize w-full mx-auto text-center">{
                row.getValue("availability") ?
                    <div className="mx-auto flex items-center space-x-1">
                        <span className="rounded-full w-2 h-2 inline-block mr-2 bg-green-500 "/>
                        Disponível
                    </div> :
                    <div className="mx-auto flex items-center space-x-1">
                        <span className="rounded-full w-2 h-2 inline-block mr-2 bg-red-500"/>
                        Indisponível
                    </div>
            }
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="text-left">Preço</div>,
        cell: ({row}) => {
            const price = parseFloat(row.getValue("price"));

            const formattedPrice = new Intl.NumberFormat("pt-PT", {
                style: "currency",
                currency: "AOA",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price);

            return <div className="text-left font-poppins-semibold text-zinc-600">{formattedPrice}</div>;
        }
    },
    {
        id: "actions",

        enableHiding: false,
        cell: ({row}) => <ItemRowActions row={row} onEdit={onEdit} onDelete={onDelete}/>
    }
]