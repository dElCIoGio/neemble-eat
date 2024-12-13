import {ReactElement} from "react";


export enum MemberRoleNames {
	Administrator = "Administrator",
	Manager = "Manager",
	Chef = "Chef",
	Waitstaff = "Waitstaff",
	Bartender = "Bartender",
	Accountant = "Accountant"
}
export enum Permissions {
	View = "view",
	Delete = "delete",
	Update = "update",
	Create = "create"
}
export type SectionPermission = {
	section: string,
	permissions: Permissions[]
}

export type Role = {
	name: MemberRoleNames,
	description: string,
	permissions: SectionPermission[]
}

export const Roles: Record<MemberRoleNames, Role> = {
	[MemberRoleNames.Administrator]: {
		name: MemberRoleNames.Administrator,
		description: "Has full control over the system, including managing users, settings, and sensitive data.",
		permissions: [
			{
				section: "*",
				permissions: [
					Permissions.View,
					Permissions.Create,
					Permissions.Update,
					Permissions.Delete
				]
			},
		],
	},
	[MemberRoleNames.Manager]: {
		name: MemberRoleNames.Manager,
		description: "Oversees operations and manages staff activities.",
		permissions: [
			{
				section: "Staff",
				permissions: [
					Permissions.View,
					Permissions.Update
				]
			},
			{
				section: "Schedules",
				permissions: [
					Permissions.View,
					Permissions.Create,
					Permissions.Update
				]
			},
			{
				section: "Reports",
				permissions: [
					Permissions.View,
					Permissions.Create
				]
			},
		],
	},
	[MemberRoleNames.Chef]: {
		name: MemberRoleNames.Chef,
		description: "Responsible for managing kitchen operations and food preparation.",
		permissions: [
			{
				section: "Kitchen",
				permissions: [
					Permissions.View,
					Permissions.Update]
			},
			{
				section: "Inventory",
				permissions: [
					Permissions.View,
					Permissions.Update]
			},
			{
				section: "Recipes",
				permissions: [
					Permissions.View,
					Permissions.Create,
					Permissions.Update
				]
			},
		],
	},
	[MemberRoleNames.Waitstaff]: {
		name: MemberRoleNames.Waitstaff,
		description: "Handles customer interactions and table service.",
		permissions: [
			{
				section: "Orders",
				permissions: [
					Permissions.View,
					Permissions.Create
				]
			},
			{
				section: "Tables",
				permissions: [
					Permissions.View,
					Permissions.Update
				]
			},
		],
	},
	[MemberRoleNames.Bartender]: {
		name: MemberRoleNames.Bartender,
		description: "Prepares drinks and manages the bar area.",
		permissions: [
			{
				section: "Bar",
				permissions: [
					Permissions.View,
					Permissions.Create,
					Permissions.Update
				]
			},
			{
				section: "Inventory",
				permissions: [
					Permissions.View
				]
			},
		],
	},
	[MemberRoleNames.Accountant]: {
		name: MemberRoleNames.Accountant,
		description: "Manages financial records and reports.",
		permissions: [
			{
				section: "Finance",
				permissions: [
					Permissions.View,
					Permissions.Create,
					Permissions.Update
				]
			},
			{
				section: "Reports",
				permissions: [
					Permissions.View,
					Permissions.Create
				]
			},
		],
	},
};


export enum SessionStatus {
	Open = "Open",
	Billed = "Billed"
}

export enum OrderStatus {
	New = "New",
	InProgress = "In Progress",
	Done = "Done",
	Cancelled = "Cancelled"
}


export interface CategoryJson {
	id: string,
	created_time: string
	name: string,
	description?: string,
	menuID: string,
	items: string[],
}


export interface CategoryParsed {
	created_time?: string
	id: string,
	name: string,
	description?: string,
	menuID: string,
	items: MenuItemJson[]
}

export interface Invoice {
	id?: string,
	created_time?: string
	total?: number,
	generatedTime: string,
	sessionID: string,
	orders?: Array<string>,
}

export interface InvoiceJson {
	id: string,
	created_time: string
	total?: number,
	generatedTime: string,
	sessionID: string,
	orders?: Array<Order>,
}

export interface Menu {
	id?: string,
	created_time?: string
	restaurantID: string,
	name: string,
	description?: string,
	categories?: Array<Category>,
}

export interface Category {
	id?: string,
	created_time?: string
	name: string,
	description?: string,
	menuID: string,
	items: Array<MenuItem>,
}


export type MenuItem = {
	id?: string,
	created_time?: string,
	name: string,
	description?: string,
	categoryID: string,
	availability?: boolean,
	price: number,
	imageURL: string | null,
}

export type UpdateMenuItem = {
	name?: string,
	description?: string,
	categoryID?: string,
	availability?: boolean,
	price?: number,
	imageFile?: File,
}

export type InvitationToken = {
	id: string
	created_time: string
	expire: string,
	restaurant_id: string,
}

export interface MenuItemWithCategory extends MenuItem {
	category?: string
}


export interface MenuJson {
	id: string,
	created_time: string
	restaurantID: string,
	name: string,
	description?: string,
	categories?: Array<string> | null,
}

export interface MenuParsed {
	id: string,
	restaurantID: string,
	name: string,
	description?: string,
	categories: CategoryParsed[]
}



export interface item {
	categoryID: string,
	name: string,
	description: string,
	price: number,
	imageFile: File,
	availability: boolean,
}

export interface MenuItemJson {
	[key: string]: string | number | boolean | undefined | null | File;

	id: string,
	created_time: string,
	name: string,
	description?: string,
	categoryID: string,
	availability: boolean,
	price: number,
	imageURL: string,
	imageFile?: File | null
}


export interface Order {
	id?: string,
	created_time?: string,
	sessionID: string
	orderTime?: string,
	itemID: string,
	unitPrice?: number,
	total?: number,
	orderedItemName?: string,
	quantity: number,
	delivered?: boolean,
	prepStatus?: OrderStatus,
	tableNumber?: number,
	sessionStatus?: SessionStatus,
	additionalNote?: string

}

export interface OrderJson {
	[key: string]: string | number | boolean | undefined;

	id: string,
	created_time?: string,
	sessionID: string
	orderTime: string,
	itemID: string,
	unitPrice: number,
	total: number,
	orderedItemName: string,
	quantity: number,
	delivered?: boolean,
	prepStatus: OrderStatus,
	tableNumber: number,
	sessionStatus?: SessionStatus,
	additionalNote?: string
}


export interface User {
	id?: string,
	created_time?: string,
	UUID: string,
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	restaurantID?: string
	role?: Role
}

export interface UserJson {
	id: string,
	created_time: string,
	UUID: string,
	firstName: string,
	lastName: string,
	email: string,
	role: Role,
	phoneNumber: string,
	restaurantID?: string
}

export interface Restaurant {
	id?: string,
	created_time?: string,
	name: string,
	address: string,
	phoneNumber: string,
	users?: Array<string>,
	bannerFile: File,
	description: string,
	orders?: Array<string>,
	sessions?: Array<TableSession>
	menus?: Array<Menu>,
	tables?: Array<Table>
}

export interface RestaurantJson {
	id: string,
	created_time: string,
	name: string,
	address: string,
	phoneNumber: string,
	users?: string[],
	bannerURL: string,
	description: string,
	orders?: Array<string>,
	sessions?: Array<string>,
	menus: Array<string>,
	tables?: Array<string>
}


export interface Table {
	id?: string,
	created_time?: string,
	number?: number,
	currentSessionID?: string,
	sessionStatus?: SessionStatus,
	sessionOrders?: Array<string>,
	restaurantID: string,
	link: string
}

export interface TableJson {
	id: string,
	created_time: string,
	number?: number,
	currentSessionID?: string,
	sessionStatus?: SessionStatus,
	sessionOrders?: Array<string>,
	restaurantID: string,
	link: string
}

export interface TableSession {
	id: string,
	created_time: string,
	invoiceID?: string,
	startTime?: string,
	endTime?: string,
	tableID: string,
	tableNumber?: number,
	restaurantID: string,
	orders?: Array<Order>,
	status?: SessionStatus,
	total: number
}

export interface TableSessionJson {
	id: string,
	created_time: string,
	invoiceID?: string,
	startTime: string,
	endTime?: string,
	tableID: string,
	tableNumber: number,
	restaurantID: string,
	orders?: Array<string>,
	status: SessionStatus
	total: number
}

export interface CartItem {
	id: string,
	name: string,
	price: number,
	quantity: number;
	image: string;
	aditionalNote?: string;
}

export interface Route {
	path: string,
	element: ReactElement,
	requiresAuth: boolean,
}

export type SetUpTab = "restaurant" | "tables" | "menu"

export type DashboardPage = "dashboard" | "menu" | "settings"
