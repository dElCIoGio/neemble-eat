import Navbar from "@/components/RestaurantMenu/Navbar.tsx";
import {useGetRestaurant} from "@/api/restaurant/GET Restaurant.ts"
import {useGetMenu} from "@/api/menu/getMenu.ts";
import {MenuContext} from "@/context/menuContext.ts";
import {Banner} from "@/components/RestaurantMenu/Banner.tsx";
import {RestaurantInfo} from "@/components/RestaurantMenu/RestaurantInfo.tsx";
import {TableInfo} from "@/components/RestaurantMenu/tableInfo.tsx";
import {Categories} from "@/components/RestaurantMenu/Categories.tsx";
import {Footer} from "@/components/RestaurantMenu/Footer.tsx";
import {useEffect, useState} from "react";
import {MenuItem} from "@/schema.ts";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {LoadingRestaurantMenu} from "@/components/RestaurantMenu/LoadingRestaurantMenu.tsx";
import {useSearchParams} from "react-router-dom";

function RestaurantMenu() {

	const restaurantID: string = "FUHT4zQL5Umz99BN7dUI"
	const menuID: string = "B5xNBhl5n3DfSZPvkkG1"
	const tableNumber: number = 3

	const [searchParams, setSearchParams] = useSearchParams();
	const itemID = searchParams.get("item")
	const categoryID = searchParams.get("category")
	const {restaurant, isRestaurantLoading} = useGetRestaurant({restaurantID})
	const {menu, isMenuLoading} = useGetMenu({menuID})
	const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>()


	useEffect(() => {
		if (menu && menu.categories) {
			for (const category of menu.categories) {
				if (category.id === categoryID) {
					for (const item of category.items) {
						if (item.id == itemID) {
							setSelectedItem(item)
							break
						}
					}
					break
				}
			}
		}
	}, [menu]);

	const setUrlVariable = (key: string, value: string) => {
		setSearchParams(prevParams => {
			prevParams.set(key, value);
			return prevParams;
		});
	}

	function selectItem(item: MenuItem) {
		setSelectedItem(item)
		if (item.id) {
			setUrlVariable("item", item.id)
			setUrlVariable("category", item.categoryID)
		}

	}

	function unselectItem() {
		setSelectedItem(undefined)
		setSearchParams(prevParams => {
			prevParams.delete("item")
			prevParams.delete("category")
			return prevParams;
		});
	}


	document.title = restaurant ? `Menu | ${restaurant.name}` : "Carregando"

	if (!(menu || restaurant) && !isRestaurantLoading && !isRestaurantLoading) {
		return <div></div>
	}

	return (
		<div className="font-poppins">
			<Loading Fallback={LoadingRestaurantMenu}
			         loadingParams={[isMenuLoading, isRestaurantLoading]}>
				{menu && restaurant ?
					<MenuContext.Provider
						value={{
							menu,
							restaurant,
							open: true,
							tableNumber,
							setSelectedItem: selectItem,
							selectedItem,
							unselectItem
						}}>
						<Navbar/>
						<Banner/>
						<div className={"px-4"}>
							<RestaurantInfo/>
							<TableInfo/>
						</div>
						<Categories/>
						<Footer/>
					</MenuContext.Provider> :
					<div>
					</div>
				}
			</Loading>
		</div>
	);
}

export default RestaurantMenu;