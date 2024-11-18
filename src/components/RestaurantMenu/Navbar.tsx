import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {useMenuContext} from "@/context/menuContext";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {ShoppingCart} from "lucide-react"

function Navbar() {

	const {menu, restaurant, tableNumber} = useMenuContext()

	return (
		<div className={"flex space-x-4 justify-end p-4"}>
			<Button asChild variant="secondary"
			        className={"text-zinc-600 hover:text-zinc-900"}>
				<Link to={`${URL_PATH_PREFIX}/o/${restaurant.id}/${menu.id}/${tableNumber}`}>
					Seus Pedidos
				</Link>
			</Button>
			<Button asChild variant="secondary"
			        className={"text-zinc-600 hover:text-zinc-900"}>
				<Link to={`${URL_PATH_PREFIX}/c/${restaurant.id}/${menu.id}/${tableNumber}`}
				      className={"flex items-center space-x-2"}>
					<ShoppingCart/>
					<p>
						Carrinho
					</p>
				</Link>
			</Button>
		</div>
	);
}

export default Navbar;