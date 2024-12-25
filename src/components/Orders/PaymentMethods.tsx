import {ReactNode} from "react";
import {SwipeToConfirmButton} from "@/components/ui/SwipeToConfirmButton.tsx";
import {useOrdersContext} from "@/context/ordersContext.ts";


interface Props {
	children: ReactNode;
}

export function PaymentMethods({children}: Props) {
	return (
		<div className='space-y-3'>
	        {children}
        </div>
	);
}

PaymentMethods.Confirm = function Confirm() {
	const {closeSessionMutation, refreshOrders} = useOrdersContext()

	return <SwipeToConfirmButton label="Confirmar"
	                             onConfirm={
		                             async () => {
			                             try {
				                             if (closeSessionMutation) {
					                             await closeSessionMutation()
					                             await refreshOrders()
				                             }
			                             } catch (error) {
				                             console.error(error)
			                             }
		                             }
	                             }
	                             color="bg-black"/>
}
