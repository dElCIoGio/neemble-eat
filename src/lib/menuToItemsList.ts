import {Menu, MenuItem, MenuItemWithCategory} from "@/schema.ts";


export function menuToItemsList(menu: Menu): Array<MenuItemWithCategory> {
    const items: Array<MenuItemWithCategory> = []
    menu.categories?.forEach(category => {
        category.items.forEach(item => {
            const parsedItem = parser({category: category.name, item})
            items.push(parsedItem)
        })
    })
    return items
}

interface props {
    item: MenuItem;
    category: string
}

function parser({category, item}: props): MenuItemWithCategory {
    return {
        category,
        ...item
    };
}