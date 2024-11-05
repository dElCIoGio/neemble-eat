import {useState} from "react";
import {Category} from "@/schema.ts";
import {MenuConfigContext} from "@/context/menuConfigContext.ts";
import {Input} from "@/components/ui/input"
import {CategoriesTable} from "@/components/Setup/CategoriesTable.tsx";
import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";

export function MenuConfig() {

	const [, setSortedCategories] = useState<"asc" | "desc" | "none">("none")
	const [categories, setCategories] = useState<Category[]>([{
		name: "Entradas",
		menuID: "",
		items: [
			{
				name: "teste",
				price: 0,
				categoryID: "",
				imageURL: null
			}
		]
	}])
	const [search, setSearch] = useState<string>("")

	function deleteCategory(index: number) {
		setCategories(prevCategories => prevCategories.filter((_, categoryIndex) => categoryIndex != index))
	}

	function sortCategories() {
		setSortedCategories(prevOrder => {
			switch (prevOrder) {
				case "desc":
					setCategories(prevCategories => prevCategories.sort())
					return "asc";
				case "asc":
					setCategories(prevCategories => prevCategories.sort())
					return "desc";
				case "none":
					setCategories(prevCategories => prevCategories.sort())
					return "asc"
			}
		})
	}

	return (
		<MenuConfigContext.Provider value={{
			categories,
			deleteCategory,
			sortCategories,
			search
		}}>
			<div className="flex items-center laptop:justify-between my-4 space-x-2">
				<Input
					type="text"
					placeholder="Pesquisar"
					value={search}
					className={"max-w-[200px] shadow-sm"}
					onChange={(e) => setSearch(e.target.value)}/>
				<Button className="max-h-8 max-w-8 laptop:max-w-fit tablet:max-w-fit shadow-md">
					<Plus size={18} className="m-0 p-0"/>
					<span className="hidden tablet:block laptop:block">Adicionar Categoria</span>
				</Button>
			</div>
			<CategoriesTable/>
		</MenuConfigContext.Provider>
	);
}

