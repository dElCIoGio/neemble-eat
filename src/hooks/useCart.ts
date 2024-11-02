import {useCallback, useEffect, useState} from "react";
import {CartItem} from "@/schema.ts";
import {getCart, saveCartToLocalStorage} from "@/lib/utils.ts";


export function useCart() {
	const [cart, setCart] = useState<Array<CartItem>>(() => getCart());

	const itemCount = useCallback(() => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	}, [cart]);

	const [numberOfItems, setNumberOfItems] = useState<number>(itemCount)


	const getTotalValue = useCallback((cart: Array<CartItem>) => {
		return cart.reduce((total, item) => total + item.quantity * item.price, 0);
	}, []);

	const [totalValue, setTotalValue] = useState<number>(() => getTotalValue(cart));

	useEffect(() => {
		saveCartToLocalStorage(cart);
		setTotalValue(getTotalValue(cart));
		setNumberOfItems(cart.reduce((total, item) => total + item.quantity, 0))
	}, [cart]);

	const findCartItemIndexByID = useCallback((id: string) => {
		return cart.findIndex(item => item.id === id);
	}, [cart]);

	const deleteProduct = useCallback((index: number) => {
		if (index >= 0) {
			setCart(prevCart => prevCart.filter((_, itemIndex) => index !== itemIndex));
			return 1;
		}
		return 0;
	}, []);

	const addItem = useCallback((newItem: CartItem) => {
		let found = false
		setCart(prevCart => prevCart.map((item) => {
			if (item.id === newItem.id) {
				found = true
				return {
					...item,
					quantity: item.quantity + newItem.quantity
				}
			}
			return item;
		}))
		if (!found) {
			setCart(prevCart => [...prevCart, newItem])
		}
	}, []);

	const updateCartItem = useCallback((index: number, quantityChange: number) => {
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
	}, []);

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
