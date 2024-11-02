import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";
import {useProductContext} from "@/context/productContext.ts";

export function ProductQuantity() {

	const {quantity, onClickItemQuatity} = useProductContext()

	return (
		<div className='flex justify-center mt-8'>
            <div className='flex items-center'>
                <Button
	                type="button"
	                variant="outline"
	                onClick={quantity === 0 ?
		                () => {
		                } :
		                () => {
			                onClickItemQuatity('-')
		                }}>
					<Minus/>
                </Button>
                <p className='prevent-select px-7 min-w-5 max-w-5 flex justify-center'>
                    {quantity}
                </p>
                <Button
	                type="button"
	                variant="outline"
	                onClick={() => {
		                onClickItemQuatity('+')
	                }}>
						<Plus/>
				</Button>
            </div>
		</div>
	);
}

