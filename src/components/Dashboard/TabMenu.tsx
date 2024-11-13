import {useEffect, useState} from "react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {useGetMenu} from "@/api/menu/getMenu.ts";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {TypographyH2} from "@/components/ui/Typography.tsx";
import AddItem from "@/components/Dashboard/AddItem.tsx";
import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {EditMenuContext} from "@/context/editMenuContext.ts";
import {menuToItemsList} from "@/lib/menuToItemsList.ts";
import {MenuItem} from "@/schema.ts";
import {ItemsDisplay} from "@/components/Dashboard/ItemsDisplay.tsx";
import {Separator} from "@/components/ui/separator.tsx";


export function TabMenu() {

	document.title = "Menu";

	const {restaurant} = useDashboardContext()
	const {menu, isMenuLoading} = useGetMenu({menuID: restaurant.menus[0]})

	const [items, setItems] = useState<Array<MenuItem>>([]);

	useEffect(() => {
		if (menu) {
			setItems(menuToItemsList(menu));
		}
	}, [menu]);

	return (
		<div>
			<div className="mb-4">
				<TypographyH2>
					Edite o Menu
				</TypographyH2>
			</div>
			{
				menu && <EditMenuContext.Provider value={{
					menu
				}}>

					<div className="mb-8">
						<AddItem>
							<Button
								variant={"outline"}
								className="shadow-sm">
								<Plus/> Adicionar Item
							</Button>
						</AddItem>
					</div>
					<Separator className="mb-8" />
					<Loading Fallback={() => <div></div>} loadingParams={[isMenuLoading]}>
							<ItemsDisplay items={items}/>
					</Loading>
				</EditMenuContext.Provider>
			}
		</div>

	);
}

