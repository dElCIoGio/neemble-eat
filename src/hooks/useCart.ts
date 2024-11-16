import {useCallback, useEffect, useState} from "react";
import {CartItem} from "@/schema.ts";
import {getCart, saveCartToLocalStorage} from "@/lib/utils.ts";


export function useCart() {
	const [cart, setCart] = useState<CartItem[]>(() => getCart());

	const itemCount = () => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	};

	const [numberOfItems, setNumberOfItems] = useState<number>(itemCount)


	const getTotalValue = useCallback((cart: Array<CartItem>) => {
		return cart.reduce((total, item) => total + item.quantity * item.price, 0);
	}, []);

	const [totalValue, setTotalValue] = useState<number>(() => getTotalValue(cart));

	useEffect(() => {
		saveCartToLocalStorage(cart);
		setTotalValue(getTotalValue(cart));
		setNumberOfItems(cart.reduce((total, item) => total + item.quantity, 0))
	}, [cart, getTotalValue]);


	const findCartItemIndexByID = (id: string) => {
		return cart.findIndex(item => item.id === id);
	};

	const deleteProduct = (index: number) => {
		if (index >= 0) {
			setCart(prevCart => prevCart.filter((_, itemIndex) => index !== itemIndex));
			return 1;
		}
		return 0;
	};

	const addItem = (newItem: CartItem) => {

		console.log(newItem)

		setCart((prevCart) => {
			// Check if the item already exists in the cart by its id
			const existingItemIndex = prevCart.findIndex(item => item.id === newItem.id);
			console.log(existingItemIndex)
			console.log("PREV CART")
			console.log(prevCart)
			console.log(cart)

			if (existingItemIndex !== -1) {
				console.log("EXISTING ITEM")
				// Item found: update its quantity
				const updatedCart = [...prevCart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + newItem.quantity,
				};
				return updatedCart;
			}

			console.log("NEW ITEM")

			// Item not found: add it to the cart
			return [...getCart(), newItem];
		});
	};
	const updateCartItem = (index: number, quantityChange: number) => {
		setCart(prevCart =>
			prevCart.map((item, itemIndex) => {
				if (itemIndex === index) {
					return {
						...item,
						quantity: item.quantity + quantityChange
					};
				}
				return item;
			}).filter(item => item.quantity > 0) // Remove item if quantity reaches 0
		);
	};

	const decrementProduct = (index: number) => {
		if (index >= 0 && cart[index].quantity > 0) {
			if (cart[index].quantity === 1) {
				deleteProduct(index);
			} else {
				updateCartItem(index, -1);
			}
			return cart[index];
		}
		return null;
	};

	const incrementProduct = (index: number) => {
		if (index >= 0) {
			updateCartItem(index, 1);
			return cart[index];
		}
		return null;
	};
	

	const setCartEmpty = useCallback(() => {
		setCart([]);
	}, []);


	return {
		itemCount,
		numberOfItems,
		cart,
		addItem,
		findCartItemIndexByID,
		incrementProduct,
		decrementProduct,
		deleteProduct,
		setCartEmpty,
		totalValue,
	}
}
