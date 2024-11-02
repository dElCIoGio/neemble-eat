import {TypographyMuted} from "@/components/ui/Typography.tsx";
import {useCartContext} from "@/context/cartContext.ts";

export function NumberOfItems() {
	const {numberOfItems} = useCartContext()

	return (
		<div className='mt-5'>
			<TypographyMuted>
				{numberOfItems} {numberOfItems == 1 ? "item" : "itens"}
			</TypographyMuted>
        </div>
	);
}