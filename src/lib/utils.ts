import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {CartItem, Category} from "@/schema.ts";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getCartFromLocalStorage = () => {
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : [];
};

export const filterCart = (cart: CartItem[]) => {
	const newCart: Array<CartItem> = cart.filter((item: CartItem) => item != undefined || item != null);
	return newCart
}

export function getCart() {
	const existingCart = getCartFromLocalStorage();
	if (existingCart) {
		return existingCart;
	} else {
		return initializeCartInLocalStorage();
	}
}


export const saveCartToLocalStorage = (cart: Array<CartItem>) => {

	localStorage.setItem('cart', JSON.stringify(cart));
};

export const initializeCartInLocalStorage = () => {
	const cart: Array<CartItem> = [];
	localStorage.setItem('cart', JSON.stringify(cart));
	return cart;
};

export const getItemsInTheCartNumber = (cart: CartItem[]) => {
	let total = 0;
	if (cart.length == 0) {
		return 0;
	}
	for (let i = 0; i < cart.length; i++) {
		const item = cart[i];
		total += item.quantity
	}
	return total
}

export function isCategoryValid(category: Category): boolean {
	const gotNoItems = category.items.length == 0

	const gotNoItemsAvailble = category.items.every(item => item.availability === false)
	return !(gotNoItemsAvailble || gotNoItems)

}


// formatting dates

interface TranslationMapper {
	[key: string]: string
}

const weekDaysTranslationMapping: TranslationMapper = {
	"Sunday": "Domingo",
	"Monday": "Segunda-Feira",
	"Tuesday": "Terça-Feira",
	"Wednesday": "Quarta-Feira",
	"Thursday": "Quinta-Feira",
	"Friday": "Sexta-Feira",
	"Saturday": "Sábado",
}


const monthsTranslationMapping: TranslationMapper = {
	"January": "Janeiro",
	"February": "Fevereiro",
	"March": "Março",
	"April": "Abril",
	"May": "Maio",
	"June": "Junho",
	"July": "Julho",
	"August": "Agosto",
	"September": "Setembro",
	"October": "Outubro",
	"November": "Novembro",
	"December": "Dezembro"
};


function formatDateString(dateString: string) {
	// Create a Date object from the input date string
	const date = new Date(dateString);



	// Define options for date formatting
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long', // Full name of the day
		month: 'long', // Full name of the month
		day: 'numeric', // Numeric day
		hour: '2-digit', // 2-digit hour
		minute: '2-digit', // 2-digit minute
		timeZone: 'Europe/Lisbon', // Portugal's timezone
		hour12: false // 24-hour format
	};

	// Format the date using the options
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	// Extract the time part separately to format it correctly
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: '2-digit', // 2-digit hour
		minute: '2-digit', // 2-digit minute
		timeZone: 'Europe/Lisbon', // Portugal's timezone
		hour12: false // 24-hour format
	};

	const formattedTime = new Intl.DateTimeFormat('pt-PT', timeOptions).format(date);

	// Combine the date and time parts
	const [month, day,] = formattedDate.split(',')[1].trim().split(' ');

	return {
		day: day,
		month: monthsTranslationMapping[month],
		dayOfTheWeek: weekDaysTranslationMapping[formattedDate.split(",")[0]],
		time: formattedTime
	}

}

export default formatDateString