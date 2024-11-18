import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogTrigger,
	AlertDialogCancel
} from "@/components/ui/alert-dialog";
import {useCartContext} from "@/context/cartContext.ts";
import {Button} from "@/components/ui/button.tsx";


export function OrderAlert() {

	const {alertMessage, orderStatus, customerName, totalValue} = useCartContext()

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild className={`w-full pt-2`}>
				<Button className={`w-full ${totalValue === 0 && "cursor-not-allowed bg-zinc-600"}`}>
					Confirmar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{orderStatus == "Success" ? `Pedido confirmado${customerName ? `, ${customerName}` : ""}!` : "Aguarde"}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{orderStatus == "Success" ? alertMessage : "Confirmando o seu pedido"}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						className={"px-10 py-2 rounded-lg bg-black text-white hover:text-white hover:bg-zinc-800 transition-all duration-150"}>
						Fechar
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

