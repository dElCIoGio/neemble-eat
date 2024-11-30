import {OrderStatus, SessionStatus} from "@/schema.ts";


export type CategoryResponse = {
    id: string,
    created_time: string
    name: string,
    description?: string,
    menuID: string,
    items: string[],
}

export type InvoiceResponse = {
    id: string,
    created_time: string
    total?: number,
    generatedTime: string,
    sessionID: string,
    orders?: string[],
}

export type MenuResponse = {
    id: string,
    created_time: string
    restaurantID: string,
    name: string,
    description?: string,
    categories?: string[] | null,
}

export type MenuItemResponse = {
    id: string,
    created_time: string,
    name: string,
    description?: string,
    categoryID: string,
    availability: boolean,
    price: number,
    imageURL: string,
}

export type OrderResponse = {
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

export type UserResponse =  {
    id: string,
    created_time: string,
    UUID: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phoneNumber: string,
    restaurantID?: string
}

export type RestaurantResponse = {
    id: string,
    created_time: string,
    name: string,
    address: string,
    phoneNumber: string,
    users?: string[],
    bannerURL: string,
    description: string,
    orders?: string[],
    sessions?: string[],
    menus: string[],
    tables?: string[]
}

export type TableResponse = {
    id: string,
    created_time: string,
    number?: number,
    currentSessionID?: string,
    sessionStatus?: SessionStatus,
    sessionOrders?: string[],
    restaurantID: string,
    link: string
}

export type TableSessionResponse = {
    id: string,
    created_time: string,
    invoiceID?: string,
    startTime: string,
    endTime?: string,
    tableID: string,
    tableNumber: number,
    restaurantID: string,
    orders?: string[],
    status: SessionStatus
    total: number
}