import {Input} from "@/components/ui/input.tsx";
import {Upload} from "lucide-react"
import {useEffect, useState} from "react";
import {TypographyMuted} from "@/components/ui/Typography.tsx";
import {RestaurantConfigSchema} from "@/lib/zodSchema.ts";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {RequiredInput} from "@/components/wrappers/requiredInput"
import {Textarea} from "@/components/ui/textarea.tsx";
import {RestaurantBannerDisplay} from "@/components/Setup/RestaurantBannerDisplay.tsx";
import {PinIcon, PhoneIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";


type RestaurantConfigValues = z.infer<typeof RestaurantConfigSchema>;

export function RestaurantConfig() {

	const [selectedFile, setSelectedImageFile] = useState<File | null>(null);
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);

	useEffect(() => {
		const url = selectedFile ? URL.createObjectURL(selectedFile) : null
		setSelectedImageURL(url)
	}, [selectedFile]);


	const form = useForm<RestaurantConfigValues>({
		resolver: zodResolver(RestaurantConfigSchema),
		mode: 'onSubmit',
		defaultValues: {
			address: "",
			phoneNumber: "",
			restaurantName: "",
			description: ""
		}
	})

	function onSubmit(data: RestaurantConfigValues) {
		console.log(data.restaurantName)
		// Got to finish setting up the submit function nd direct the user to the next tab
	}

	function removeimage() {
		setSelectedImageFile(null)
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="mb-4">
						<TypographyMuted>Escolha uma imagem para o deu restaurante. Não se preocupe, poderá alterar à qualquer momento</TypographyMuted>
					</div>
					<FormField
						name="image"
						control={form.control}
						render={({field: {value, onChange, ...fieldProps}}) => (
							<FormItem>
								<FormMessage/>
								<FormControl>
									<div className={`flex space-x-4 items-start mb-8`}>
										<label
											className={`${!!selectedImageURL && "cursor-not-allowed"} mb-8 border border-gray-200 w-40 h-24 flex flex-col items-center justify-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-gray-100 transition-colors duration-300`}>
										<Upload/>
										<Input
											{...fieldProps}
											disabled={!!selectedImageURL}
											type="file"
											accept="image/*"
											className={`hidden ${!!selectedImageURL && "cursor-not-allowed"}`}
											onChange={(event) => {
												event.preventDefault()
												console.log(value)
												const files = event.target.files
												if (files) {
													onChange(files[0])
													setSelectedImageFile(files[0])
												} else {
													setSelectedImageFile(null)
												}
											}
											}/>
									</label>
									<RestaurantBannerDisplay
										removeImage={removeimage}
										selectedImage={selectedImageURL}/>
									</div>
								</FormControl>
							</FormItem>
						)}/>
					<div className={`space-y-4 laptop:w-[40%]`}>
						<FormField
							name="restaurantName"
							control={form.control}
							render={({field}) => (
								<FormItem>
								<RequiredInput>
									<FormLabel>Nome do Restaurante</FormLabel>
								</RequiredInput>
								<FormControl>
									<Input {...field}
									       placeholder={``}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
							)}/>
						<FormField
							name="phoneNumber"
							control={form.control}
							render={({field}) => (
								<FormItem>
									<div className={`flex items-center space-x-1`}>
										<PhoneIcon className={"mt-1 hidden"} size={12}/>
										<RequiredInput>
											<FormLabel className={""}>Número de Telefone</FormLabel>
										</RequiredInput>
									</div>
								<FormControl>
								<Input {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}/>
						<FormField
							name="address"
							control={form.control}
							render={({field}) => (
								<FormItem>
									<div className={`flex items-center space-x-1`}>
										<PinIcon className={"mt-1 hidden"} size={12}/>
										<RequiredInput>
											<FormLabel>Endereço</FormLabel>
										</RequiredInput>
									</div>

									<FormControl>
										<Input {...field}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}/>
						<FormField
							name="description"
							control={form.control}
							render={({field}) => (
								<FormItem>
								<RequiredInput>
									<FormLabel>Descrição sobre o restaurante</FormLabel>
								</RequiredInput>
								<FormControl>
									<Textarea {...field}/>
								</FormControl>
								<FormMessage/>
							</FormItem>
							)}/>
					</div>

					<div className="mt-8 space-x-4">
						<Button disabled
						        type={"button"}>
							Cancelar
						</Button>
						<Button type={"submit"}>
							Continuar
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

