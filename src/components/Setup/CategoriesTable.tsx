import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,

	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Table,
	TableBody, TableCaption,
	TableCell, TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"


import {
	CaretSortIcon,
	DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {Button} from "@/components/ui/button.tsx";
import {useMenuConfigContext} from "@/context/menuConfigContext.ts";


export function CategoriesTable() {

	const {sortCategories, categories, deleteCategory, search} = useMenuConfigContext()


	return (
		<Table className={""}>
			<TableCaption>{categories.length} {categories.length == 1 ? "categoria adicionada." : "categorias adicionadas."}</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="flex items-center space-x-1 w-[80%]" onClick={sortCategories}>
						Categoria
						<CaretSortIcon className="ml-2 h-4 w-4"/>
					</TableHead>
					<TableHead className={"w-[10%]"}>Contém</TableHead>
					<TableHead className={"w-[10%]"}>&nbsp;</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{
					categories.map((category, index) =>
						category.name.toLowerCase().includes(search.toLowerCase()) &&
                        <TableRow key={index} className="font-poppins-semibold py-0 max-h-14">
							<TableCell className="truncate">{category.name}</TableCell>
							<TableCell>{category.items.length} {category.items.length === 1 ? "item" : "itens"}</TableCell>
							<TableCell>
								<DropdownMenu>
					                <DropdownMenuTrigger asChild>
					                    <Button variant="ghost" className="h-8 w-8 p-0">
					                        <DotsHorizontalIcon className="h-4 w-4"/>
					                    </Button>
					                </DropdownMenuTrigger>
					                <DropdownMenuContent sideOffset={-4}>
					                    <DropdownMenuItem>
					                        Editar
					                    </DropdownMenuItem>
					                    <DropdownMenuItem onClick={() => deleteCategory(index)}>
					                        Eliminar
					                    </DropdownMenuItem>
					                </DropdownMenuContent>
					            </DropdownMenu>
							</TableCell>
						</TableRow>
					)
				}
			</TableBody>
		</Table>
	);
}

