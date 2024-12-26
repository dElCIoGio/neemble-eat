export interface RemoveCategoryItemProps {
    categoryID: string,
    itemID: string,
}

export type AddItemProps = {
    availability: boolean;
    image: File;
    name: string;
    description: string;
    price: number;
    categoryID: string;
}