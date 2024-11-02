import {CartItem} from "@/components/Cart/CartItem.tsx";
import {useCartContext} from "@/context/cartContext.ts";

export function ItemsSection() {

	const {cart} = useCartContext()

	return (
		<div className='mx-0 mb-32 divide-y divide-gray-300'>
            {
	            cart.map((item, index: number) =>
		            item != undefined && <div key={index} className='mt-3'>
                            <CartItem itemIndex={index}/>
                        </div>
	            )
            }
        </div>
	);
}

