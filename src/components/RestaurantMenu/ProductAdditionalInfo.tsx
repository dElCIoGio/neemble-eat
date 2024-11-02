import {AdditionalNoteSchema} from "@/lib/zodSchema.ts";
import {z} from 'zod';
import {Form} from '@/components/ui/form'
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input";
import {ProductQuantity} from "@/components/RestaurantMenu/ProductQuantity.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useProductContext} from "@/context/productContext.ts";


type ProductAdditionalType = z.infer<typeof AdditionalNoteSchema>;

export function ProductAdditionalInfo() {

	const form = useForm<ProductAdditionalType>({
		resolver: zodResolver(AdditionalNoteSchema),
		mode: 'onSubmit',
		defaultValues: {
			note: ""
		}
	})


	const {total, onSubmit} = useProductContext()


	return (
		<div>
			<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="note"
					render={({field}) => (
						<FormItem>
						<FormControl>
							<Input
								{...field}
								disabled={total === 0}
								placeholder="Indique como quer o seu pedido..."
								className="text-base pb-28 pt-4"/>
						</FormControl>
						<FormMessage/>
					</FormItem>
					)}/>
				<div>

				</div>
				<ProductQuantity/>
				<div className='flex justify-center w-full mt-8 '>
					<Button type={total === 0 ? "button" : "submit"}
					        disabled={total === 0}
					        className={`self-center mx-auto prevent-select w-full`}>
								{total === 0 ? "Confirmar" : `Confirmar - ${total}.00 Kz`}
					</Button>
				</div>

			</form>
		</Form>

		</div>
	);
}

