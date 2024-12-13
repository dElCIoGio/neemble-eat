import {OrderStatus, SessionStatus} from "@/schema.ts";
import {ID} from "@/types/types.ts";

export type Invoice = {
    id?: string,
    created_time?: string
    total?: number,
    generatedTime: string,
    sessionID: ID,
    orders?: ID[],
}


export type Menu = {
    id?: string,
    created_time?: string
    restaurantID: string,
    name: string,
    description?: string,
    categories?: Category[] | ID[],
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

export type Order = {
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

export type User = {
    id?: string,
    created_time?: string,
    UUID: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phoneNumber: string,
    restaurantID?: string
}

export type Restaurant = {
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

export type Table = {
    id?: string,
    created_time?: string,
    number?: number,
    currentSessionID?: string,
    sessionStatus?: SessionStatus,
    sessionOrders?: Array<string>,
    restaurantID: string,
    link: string
}

export type TableSession = {
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

export type Category = {
    id?: string,
    created_time?: string
    name: string,
    description?: string,
    menuID: string,
    items: MenuItem[] | ID[],
}
