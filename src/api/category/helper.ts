import {AddItemProps} from "@/api/category/types.ts";

export function getFormData({name, price, description, availability, categoryID, image}:AddItemProps){
    const form = new FormData()
    form.append('name', name)
    form.append('description', description)
    form.append('image_file', image)
    form.append('category_id', categoryID)
    form.append('price', price.toString())
    form.append('availability', availability? "True": "False")
    return form
}