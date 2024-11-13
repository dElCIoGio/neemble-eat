import {MenuItem} from "@/schema.ts";


export function getEmptyItem(categoryID: string): MenuItem {
	return {
		name: "",
		price: 0,
		imageURL: null,
		categoryID
	}
}


export function getEmptyCategory(menuID: string) {
	return {
		menuID,
		name: "",
		items: []
	}
}
