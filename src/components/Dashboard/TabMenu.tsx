import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {useGetMenu} from "@/api/menu/getMenu.ts";
import {Loading} from "@/components/wrappers/Loading.tsx";
import ItemsTable from "@/components/Dashboard/ItemsTable.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel} from "@/components/ui/select";

export function TabMenu() {

	const [search, setSearch] = useState<string>("")
	const {restaurant} = useDashboardContext()
	const {menu, isMenuLoading} = useGetMenu({menuID: restaurant.menus[0]})
	const [selectedCategory, setSelectedCategory] = useState<string>("All")

	document.title = "Menu";

	return (
		<div>
			<div className={"flex flex-col space-y-4 laptop:flex-row laptop:justify-between laptop:items-center mb-8"}>
				<Input
					type="text"
					variant="brand"
					placeholder="Pesquisar"
					value={search}
					className={"max-w-[200px] shadow-sm placeholder:text-zinc-400 placeholder:font-poppins-regular"}
					onChange={(e) => setSearch(e.target.value)}/>
				<Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory} defaultValue={"All"}>
					<SelectTrigger className="w-fit">
						<SelectValue placeholder="Selecione uma categoria"/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Categorias</SelectLabel>
							<SelectItem value="All">Todas</SelectItem>
							{
								menu &&
								menu.categories &&
								menu.categories.map((category) => (
									<SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
								))
							}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Loading Fallback={() => <div></div>} loadingParams={[isMenuLoading]}>
				{
					menu && <div>
						<ItemsTable menu={menu} search={search} selectedCategory={selectedCategory}/>
					</div>
				}
			</Loading>
		</div>
	);
}

