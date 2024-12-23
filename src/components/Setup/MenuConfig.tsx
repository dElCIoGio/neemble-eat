import {useState} from "react";
import {CategoryCreate} from "@/schema.ts";
import {MenuConfigContext} from "@/context/menuConfigContext.ts";
import {Input} from "@/components/ui/input"
import {CategoriesTable} from "@/components/Setup/CategoriesTable.tsx";

import {AddCategorySheet} from "@/components/Setup/AddCategorySheet.tsx";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

interface SubmitProps {
	categories: CategoryCreate[];

}

async function handleRestaurantSetUp({categories}: SubmitProps){
	console.log(categories);
}

export function MenuConfig() {

	const [, setSortedCategories] = useState<"asc" | "desc" | "none">("none")
	const [categories, setCategories] = useState<CategoryCreate[]>([])
	const [search, setSearch] = useState<string>("")
	const [isAddCategorySheetOpen, setIsAddCategorySheetOpen] = useState<boolean>(false)

	function deleteCategory(index: number) {
		setCategories(prevCategories => prevCategories.filter((_, categoryIndex) => categoryIndex != index))
	}

	function addCategory(category: CategoryCreate){
		setCategories([...categories, category])
		setIsAddCategorySheetOpen(false)
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

	function handleSubmit(){
		handleRestaurantSetUp({
			categories
		}).then()
	}

	return (
		<MenuConfigContext.Provider value={{
			categories,
			deleteCategory,
			sortCategories,
			search
		}}>
			<Button type="button" onClick={handleSubmit}>
				Confirmar
			</Button>
			<div className="flex items-center laptop:justify-between my-4 space-x-2">
				<Input
					type="text"
					placeholder="Pesquisar"
					value={search}
					className={"max-w-[200px] shadow-sm border-b"}
					onChange={(e) => setSearch(e.target.value)}
					startIcon={Search}
				/>
				<AddCategorySheet onSubmitCategory={addCategory} isOpen={isAddCategorySheetOpen} onOpenChange={setIsAddCategorySheetOpen}/>
			</div>
			<CategoriesTable/>
		</MenuConfigContext.Provider>
	);
}

