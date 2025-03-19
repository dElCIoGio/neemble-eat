import {useEffect, useState} from "react";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {TypographyH2} from "@/components/ui/Typography.tsx";
import AddItem from "@/components/Dashboard/AddItem.tsx";
import {Plus} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {EditMenuContext} from "@/context/editMenuContext.ts";
import {menuToItemsList} from "@/lib/menuToItemsList.ts";
import {CategoryJson, Menu, MenuItem, MenuItemJson, Permissions, Sections} from "@/schema.ts";
import {ItemsDisplay} from "@/components/Dashboard/ItemsDisplay.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {hasPermission} from "@/lib/utils.ts";


const exampleMenuItems: MenuItem[] = [
	{
		id: "item-001",
		created_time: "2025-03-19T10:00:00Z",
		name: "Frango Grelhado",
		description: "Frango marinado e grelhado com ervas aromáticas.",
		categoryID: "cat-001",
		availability: true,
		price: 3500,
		imageURL: "https://example.com/images/frango-grelhado.jpg",
	},
	{
		id: "item-002",
		created_time: "2025-03-19T10:05:00Z",
		name: "Bife de Vaca",
		description: "Bife suculento grelhado com molho especial.",
		categoryID: "cat-002",
		availability: true,
		price: 4500,
		imageURL: "https://example.com/images/bife-de-vaca.jpg",
	},
	{
		id: "item-003",
		created_time: "2025-03-19T10:10:00Z",
		name: "Pizza Vegetariana",
		description: "Pizza de legumes frescos e queijo derretido.",
		categoryID: "cat-003",
		availability: true,
		price: 2800,
		imageURL: "https://example.com/images/pizza-vegetariana.jpg",
	},
	{
		id: "item-004",
		created_time: "2025-03-19T10:15:00Z",
		name: "Massa com Camarão",
		description: "Massa fettuccine com molho cremoso de camarão.",
		categoryID: "cat-004",
		availability: true,
		price: 5000,
		imageURL: "https://example.com/images/massa-com-camarao.jpg",
	},
	{
		id: "item-005",
		created_time: "2025-03-19T10:20:00Z",
		name: "Salada Caesar",
		description: "Salada fresca com alface, croutons e molho Caesar.",
		categoryID: "cat-005",
		availability: true,
		price: 2500,
		imageURL: "https://example.com/images/salada-caesar.jpg",
	},
	{
		id: "item-006",
		created_time: "2025-03-19T10:25:00Z",
		name: "Prato de Sushi",
		description: "Seleção de sushi tradicional japonês.",
		categoryID: "cat-006",
		availability: false,
		price: 7000,
		imageURL: "https://example.com/images/prato-de-sushi.jpg",
	},
	{
		id: "item-007",
		created_time: "2025-03-19T10:30:00Z",
		name: "Costelas de Churrasco",
		description: "Costelas suculentas grelhadas ao molho barbecue.",
		categoryID: "cat-007",
		availability: true,
		price: 6500,
		imageURL: "https://example.com/images/costelas-de-churrasco.jpg",
	},
	{
		id: "item-008",
		created_time: "2025-03-19T10:35:00Z",
		name: "Sopa de Lagosta",
		description: "Sopa cremosa de lagosta com temperos especiais.",
		categoryID: "cat-008",
		availability: false,
		price: 9000,
		imageURL: "https://example.com/images/sopa-de-lagosta.jpg",
	},
	{
		id: "item-009",
		created_time: "2025-03-19T10:40:00Z",
		name: "Cheeseburger",
		description: "Hambúrguer clássico com queijo, alface e tomate.",
		categoryID: "cat-009",
		availability: true,
		price: 3200,
		imageURL: "https://example.com/images/cheeseburger.jpg",
	},
	{
		id: "item-010",
		created_time: "2025-03-19T10:45:00Z",
		name: "Bolo de Chocolate Lava",
		description: "Bolo quente de chocolate com recheio cremoso.",
		categoryID: "cat-010",
		availability: true,
		price: 4000,
		imageURL: "https://example.com/images/bolo-de-chocolate-lava.jpg",
	},
];

const exampleMenu: Menu = {
	id: "menu-001",
	created_time: "2025-03-19T10:00:00Z",
	restaurantID: "resto-98765",
	name: "Menu Principal",
	description: "Um menu completo com entradas, pratos principais e sobremesas.",
	categories: [
		{
			id: "cat-001",
			created_time: "2025-03-19T10:05:00Z",
			name: "Entradas",
			description: "Pequenas porções para começar sua refeição.",
			menuID: "menu-001",
			items: [
				{
					id: "item-001",
					created_time: "2025-03-19T10:10:00Z",
					name: "Salada Caesar",
					description: "Salada fresca com alface, croutons e molho Caesar.",
					categoryID: "cat-001",
					availability: true,
					price: 2500,
					imageURL: "https://example.com/images/salada-caesar.jpg",
				},
				{
					id: "item-002",
					created_time: "2025-03-19T10:15:00Z",
					name: "Sopa de Lagosta",
					description: "Sopa cremosa de lagosta com temperos especiais.",
					categoryID: "cat-001",
					availability: false,
					price: 9000,
					imageURL: "https://example.com/images/sopa-de-lagosta.jpg",
				},
			],
		},
		{
			id: "cat-002",
			created_time: "2025-03-19T10:20:00Z",
			name: "Pratos Principais",
			description: "Os melhores pratos para satisfazer seu apetite.",
			menuID: "menu-001",
			items: [
				{
					id: "item-003",
					created_time: "2025-03-19T10:25:00Z",
					name: "Frango Grelhado",
					description: "Frango marinado e grelhado com ervas aromáticas.",
					categoryID: "cat-002",
					availability: true,
					price: 3500,
					imageURL: "https://example.com/images/frango-grelhado.jpg",
				},
				{
					id: "item-004",
					created_time: "2025-03-19T10:30:00Z",
					name: "Bife de Vaca",
					description: "Bife suculento grelhado com molho especial.",
					categoryID: "cat-002",
					availability: true,
					price: 4500,
					imageURL: "https://example.com/images/bife-de-vaca.jpg",
				},
			],
		},
		{
			id: "cat-003",
			created_time: "2025-03-19T10:35:00Z",
			name: "Sobremesas",
			description: "Os doces mais deliciosos para encerrar sua refeição.",
			menuID: "menu-001",
			items: [
				{
					id: "item-005",
					created_time: "2025-03-19T10:40:00Z",
					name: "Bolo de Chocolate Lava",
					description: "Bolo quente de chocolate com recheio cremoso.",
					categoryID: "cat-003",
					availability: true,
					price: 4000,
					imageURL: "https://example.com/images/bolo-de-chocolate-lava.jpg",
				},
			],
		},
	],
};


export function TabMenu() {

	document.title = "Menu";

	const {restaurant, user} = useDashboardContext()
	const canAdd: boolean = hasPermission(user, Sections.menu, Permissions.Create)

	// const [menuSelected, ] = useState<string>(restaurant.menus[0])

	// const {data: menu, isLoading: isMenuLoading, addCategory, updateItem, addItem} = useGetMenu({menuId: menuSelected})

	const [menu, setMenu] = useState<Menu>(exampleMenu)

	const isMenuLoading = false;


	const [items, setItems] = useState<Array<MenuItem>>(exampleMenuItems);


	useEffect(() => {
		if (menu) {
			setItems(menuToItemsList(menu));
		}
	}, [menu]);


	// Function to add a new category
	const addCategory = (category: CategoryJson): void => {
		setMenu(prevMenu => ({
			...prevMenu,
			categories: [...(prevMenu.categories || [])],
		}));
		console.log(`Categoria adicionada: ${category.name}`);
	};

	const updateItem = (categoryId: string, itemId: string, newMenuItem: MenuItemJson): void => {
		setMenu(prevMenu => ({
			...prevMenu,
			categories: prevMenu.categories?.map(category =>
				category.id === categoryId
					? {
						...category,
						items: category.items.map(item =>
							item.id === itemId ? newMenuItem : item
						),
					}
					: category
			),
		}));
		console.log(`Item ${itemId} atualizado com sucesso.`);
	};

	// Function to add a new item to a category
	const addItem = (categoryId: string, newMenuItem: MenuItemJson): void => {
		setMenu(prevMenu => ({
			...prevMenu,
			categories: prevMenu.categories?.map(category =>
				category.id === categoryId
					? { ...category, items: [...category.items, newMenuItem] }
					: category
			),
		}));
		console.log(`Item ${newMenuItem.name} adicionado à categoria ${categoryId}.`);
	};


	// if (!menu){
	// 	return <div className="flex justify-center items-center h-full">
	// 		<Loader2 className="animate-spin"/>
	// 	</div>
	// }

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

