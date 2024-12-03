import Background from "@/components/ui/Background.tsx";
import ReturnNav from "@/components/ui/ReturnNav.tsx";
import {NumberOfItems} from "@/components/Cart/NumberOfItems.tsx";
import {Layout} from "@/components/wrappers/Layout"
import {CartContext} from "@/context/cartContext.ts";
import {useState} from "react";
import {Checkout} from "@/components/Cart/Checkout.tsx";
import {useCart} from "@/hooks/useCart.ts";
import {useParams} from "react-router-dom";
import {useGetOpenSession} from "@/api/session/getOpenSession.ts";
import {useQueryClient} from "@tanstack/react-query";
import {addOrder} from "@/api/session/addOrder.ts";
import {ItemsSection} from "@/components/Cart/ItemsSection.tsx";
import {getQueryKey} from "@/api/session/getAllSessionOrders.ts";

export function Cart() {

	document.title = "Carrinho"

	const {restaurantID, tableNumber, menuID} = useParams() as unknown as {
		restaurantID: string,
		menuID: string,
		tableNumber: number
	};

	const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false)
	const [orderStatus, setOrderStatus] = useState<"Success" | "Error" | "Idle">("Idle");
	const [alertMessage, setAlertMessage] = useState<string>('')
	const queryClient = useQueryClient()
	const [customerName, setCustomerName] = useState<string>('');
	const {
		cart,
		setCartEmpty,
		numberOfItems,
		totalValue,
		findCartItemIndexByID,
		incrementProduct,
		deleteProduct,
		decrementProduct
	} = useCart()
	const {
		session,
	} = useGetOpenSession({
		restaurantID: restaurantID,
		tableNumber: tableNumber
	})

	function invalidateOrdersKey(sessionID: string) {
		const key = getQueryKey(sessionID)
		queryClient.invalidateQueries({
			queryKey: key
		}).then()
	}

	function handleSubmit() {
		const items = cart.map((item) => item)

		if (session && session?.id) {
			for (const item of items) {
				addOrder({
					sessionID: session?.id,
					itemID: item.id,
					quantity: item.quantity,
					additionalNote: item.aditionalNote
				}).catch(() => {
					setOrderStatus("Error")
					setAlertMessage("Houve um erro com o seu pedido, um garçon irá confirmar o seu pedido em breve.")
				}).then(() => {
					setOrderStatus("Success")
					setAlertMessage(`O seu pedido será levado á sua mesa em breve!`)
					setCartEmpty()
				})
			}
			if (session && session.id)
				invalidateOrdersKey(session.id)
		}
		setCartEmpty()
	}

	return (
		<CartContext.Provider value={{
			orderConfirmed,
			setOrderConfirmed,
			customerName,
			alertMessage,
			setCustomerName,
			orderStatus,
			cart,
			numberOfItems,
			totalValue,
			findCartItemIndexByID,
			incrementProduct,
			deleteProduct,
			decrementProduct
		}}>
			<Layout>
				<Background className={"bg-gray-100"}/>
				<ReturnNav path={`/menu/${tableNumber}/${restaurantID}/${menuID}`} title={"Carrinho"}/>
				<NumberOfItems/>
				<ItemsSection/>
				<Checkout onSubmit={handleSubmit}/>
			</Layout>
		</CartContext.Provider>
	);
}

export default Cart;