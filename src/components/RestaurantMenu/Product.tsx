
import {useState, ReactNode, useCallback} from "react";
import {CartItem, MenuItem} from "@/schema.ts";
import {useCart} from "@/hooks/useCart.ts";
import {Button} from "@/components/ui/button.tsx";
import {ScrollArea} from "@radix-ui/react-scroll-area";
import {CartIcon} from "../../../public/icons/CartIcon.tsx";
import {PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Popover} from "@radix-ui/react-popover";
import {CartPopoverContent} from "@/components/RestaurantMenu/CartPopoverContent.tsx";
import {ProductContext, useProductContext} from "@/context/productContext.ts";
import {z} from 'zod';
import {AdditionalNoteSchema} from "@/lib/zodSchema.ts";
import {ProductAdditionalInfo} from "@/components/RestaurantMenu/ProductAdditionalInfo.tsx";
import {
	Sheet,
	SheetClose,
	SheetContent, SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet.tsx";
import {toast} from "sonner";


interface props {
	children: ReactNode;
	item: MenuItem;
}


export function Product({children, item}: props) {


	const {cart, addItem} = useCart()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [numberOfItems, setNumberOfItems] = useState(0);
	const [total, setTotal] = useState<number>(0);
	const [productAdded, setProductAdded] = useState<boolean>(false)
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)


	const showMessage = useCallback(() => {
		setProductAdded(true);
	}, []);

	const handleNumberOfItems = useCallback((operation: string) => {
		if (operation === '+') {
			setNumberOfItems(numberOfItems + 1);
		} else {
			setNumberOfItems(numberOfItems - 1);
		}
	}, [numberOfItems]);

	
	const handleTotal = useCallback((operation: string) => {
		if (item == null) {
			return;
		}
		if (operation === '+') {
			setTotal(total + item.price);
		} else {
			setTotal(total - item.price);
		}
	}, [item, total]);

	
	const handleQuantityChange = useCallback((operation: string) => {
		if (operation === '+') {
			handleNumberOfItems(operation);
			handleTotal(operation);
		} else {
			if (total) {
				handleNumberOfItems(operation);
				handleTotal(operation);
			}
		}
	}, [total, handleNumberOfItems, handleTotal]);

	
	function handleSubmit(data: z.infer<typeof AdditionalNoteSchema>) {
		const note = data.note
		if (!item) return
		if (item.id != undefined && item.imageURL != undefined) {
			const data: CartItem = {
				id: item.id,
				image: item.imageURL,
				name: item.name,
				price: item.price,
				quantity: numberOfItems,
				aditionalNote: note
			}
			if (note == "")
				data.aditionalNote = note
			addItem(data)
		}
		setNumberOfItems(0)
		setTotal(0)
		showMessage()
		setIsPopoverOpen(true)


		toast("Pedido adicionado ao carrinho!")

	}


	return (
		<ProductContext.Provider value={{
			item,
			productAdded,
			onSubmit: handleSubmit,
			onClickItemQuatity: handleQuantityChange,
			quantity: numberOfItems,
			total
		}}>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger>
					{children}
				</SheetTrigger>
				<SheetContent className="max-h-[90%] px-1 flex flex-col rounded-t-2xl" side={"bottom"}>
					<SheetHeader>
						<SheetTitle>
							<div className={"flex relative justify-between items-center px-2"}>
								<div className='flex-grow'/>
								<h1 className={"text-center flex-none"}>
									{item.name}
								</h1>
								<div className='flex-grow'/>
								<Popover open={isPopoverOpen} onOpenChange={(val) => setIsPopoverOpen(val)}>
									<PopoverTrigger className="hidden">
										<CartIcon/>
									</PopoverTrigger>
									<PopoverContent className={"m-2 hidden"}>
										<CartPopoverContent cart={cart} productAdded={productAdded}/>
									</PopoverContent>
								</Popover>
							</div>
						</SheetTitle>
						<SheetDescription>{undefined}</SheetDescription>
					</SheetHeader>
					<div className="overflow-y-auto">
						<ScrollArea className="overflow-y-auto">
						<ProductContent/>
					</ScrollArea>
					</div>
					<SheetFooter className="pt-2 ">
						<SheetClose asChild>
							<Button variant="outline" className={`w-full mx-4`}>Cancelar</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
		    </Sheet>
		</ProductContext.Provider>
	);
}

export function ProductContent() {

	const {item} = useProductContext()


	return <div>
		<div className='mx-auto rounded-md w-fit items-center overflow-hidden pb-4 px-5'>
                    {
	                    item && item.imageURL &&
                        <img src={item?.imageURL}
                             alt=""
                             className='rounded-md object-cover w-full max-h-52'/>
                    }

                </div>
		                <div>
                    <h1 className='ml-5 font-semibold text-lg'>
                        {item?.name}
                    </h1>
	                <div>
                    <p className='rounded-lg text-sm ml-3.5 px-2 py-2 font-poppins-light'>
                        {item?.description}
                    </p>
                </div>
                <div className='ml-6 mt-2'>
                    <p className='w-fit italic font-semibold'>
                        {item?.price}.00 Kz
                    </p>
                </div>
                </div>

		<div className='mt-7 mx-4 space-y-4'>
            <h1 className='font-poppins-semibold bg-gray-100 py-3 pl-5 rounded-lg'>
                Informação Adicional
            </h1>
			<ProductAdditionalInfo/>
		</div>
	</div>
}
