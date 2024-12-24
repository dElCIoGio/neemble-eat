import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {CartItem, Category, Menu, Sections, UpdateMenuItem, UserJson, Permissions} from "@/schema.ts";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getCartFromLocalStorage = (): CartItem[] => {
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

	const gotNoItemsAvailable = category.items.every(item => item.availability === false)
	return !(gotNoItemsAvailable || gotNoItems)

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

export function formatCurrency(value: number): string {
	const amount = parseInt(value.toString());
	const formattedAmount = new Intl.NumberFormat('de-DE', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		useGrouping: false,
	}).format(amount);
	return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


export function openUrlInNewTab(url: string): void {
	if (!url || !url.trim()) {
		throw new Error('Invalid URL');
	}
	const newWindow = window.open(url, '_blank');
	if (newWindow) {
		newWindow.focus();
	} else {
		throw new Error('Failed to open new tab');
	}
}

export default formatDateString


export async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
	// Step 1: Fetch the image
	const response = await fetch(url);
	if (!response.ok) throw new Error('Failed to fetch the image.');

	// Step 2: Create a blob from the response data
	const blob = await response.blob();

	// Step 3: Create and return the File object
	return new File([blob], filename, { type: mimeType });
}

export function getUpdateItemFormData(data: UpdateMenuItem, restaurantId: string): FormData{

	const formData = new FormData();

	formData.append("restaurant_id", restaurantId)
	if (data.name != undefined)
		formData.append('name', data.name);
	if (data.availability != undefined){
		const availability: "True" | "False" = data.availability === true? "True": "False";
		formData.append('availability', availability);
	}
	if (data.price != undefined)
		formData.append('price', data.price.toString())
	if (data.categoryID != undefined)
		formData.append('categoryID', data.categoryID)
	if (data.description != undefined)
		formData.append('description', data.description)
	if (data.imageFile != undefined)
		formData.append('imageFile', data.imageFile);

	return formData;
}


export function findCategoryIndex(menu: Menu, categoryId: string): number{

	const categories = menu.categories

	if (categories == undefined)
		return -1

	for (let i = 0; i < categories.length; i++) {
		if (categories[i].id == categoryId)
			return i;
	}
	return -1;
}

export function findMenuItemIndex(category: Category, menuItemId: string): number{
	const items = category.items

	for (let i = 0; i < items.length; i++) {
		if (items[i].id == menuItemId){
			return i;
		}
	}
	return -1;
}


export function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text)
}

export function hasPermission(user: UserJson, section: Sections,  permission: Permissions): boolean {
	for (const s of user.role.permissions){
		if (s.section === section || s.section == "*"){
			console.log(s)
			console.log(s.permissions)
			return s.permissions.includes(permission);
		}
	}
	return false;
}