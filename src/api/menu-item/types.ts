import {UpdateMenuItem} from "@/schema.ts";

export interface UpdateItemProps {
    menuItemId: string;
    updates: UpdateMenuItem;
    restaurantId: string;
}