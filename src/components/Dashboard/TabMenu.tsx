import {useEffect, useState} from "react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {useGetMenu} from "@/service/api/menu";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {TypographyH2} from "@/components/ui/Typography.tsx";
import AddItem from "@/components/Dashboard/AddItem.tsx";
import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {EditMenuContext} from "@/context/editMenuContext.ts";
import {menuToItemsList} from "@/lib/menuToItemsList.ts";
import {MenuItem, Permissions, Sections} from "@/schema.ts";
import {ItemsDisplay} from "@/components/Dashboard/ItemsDisplay.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {hasPermission} from "@/lib/utils.ts";


export function TabMenu() {

	document.title = "Menu";

	const {restaurant, user} = useDashboardContext()
	const canAdd: boolean = hasPermission(user, Sections.menu, Permissions.Create)

	const [menuSelected, ] = useState<string>(restaurant.menus[0])

	const {data: menu, isLoading: isMenuLoading, addCategory, updateItem, addItem} = useGetMenu({menuId: menuSelected})

	const [items, setItems] = useState<Array<MenuItem>>([]);

	useEffect(() => {
		if (menu) {
			setItems(menuToItemsList(menu));
		}
	}, [menu]);

	return (
		<div>
			<div className="mb-12">
				<TypographyH2>
					Edite o Menu | <span className="text-zinc-600">{restaurant.name}</span>
				</TypographyH2>
			</div>
			{
				menu &&
				<EditMenuContext.Provider value={{
					menu,
					addCategory,
					updateItem,
					addItem
				}}>

					<div className="mb-8">
						<AddItem>
							<Button
								disabled={!canAdd}
								variant={"outline"}
								className="shadow-sm">
								<Plus/> Adicionar Item
							</Button>
						</AddItem>
					</div>
					<Separator className="mb-8"/>
					<Loading Fallback={() => <div></div>}
							 loadingParams={[isMenuLoading]}>
						<ItemsDisplay items={items}/>
					</Loading>
				</EditMenuContext.Provider>
			}
		</div>

	);
}

