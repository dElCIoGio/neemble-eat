import {Menu, RestaurantJson} from "@/schema.ts";

export interface GetRestaurantMenuPageResponse {
    menu: Menu
    restaurant: RestaurantJson
}


export interface GetRestaurantMenuPageProps {
    tableId: string | undefined
}