import {createContext, useContext} from "react";
import {MenuItem} from "@/schema.ts";
import {z} from "zod";
import {AdditionalNoteSchema} from "@/lib/zodSchema.ts";


type ProductContextProps = {
	item: MenuItem;
	onClickItemQuatity: (operation: string) => void;
	onSubmit: (data: z.infer<typeof AdditionalNoteSchema>) => void;
	total: number;
	quantity: number;
	productAdded: boolean
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined)

export function useProductContext() {
	const context = useContext(ProductContext)

	if (!context)
		throw new Error("useProductContext must be used within the ProductContext");

	return context
}