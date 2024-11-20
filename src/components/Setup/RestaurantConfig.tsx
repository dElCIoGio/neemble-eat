import {Input} from "@/components/ui/input.tsx";
import {Upload} from "lucide-react"
import {useCallback, useState} from "react";
import {TypographyMuted} from "@/components/ui/Typography.tsx";
import {MAX_IMAGE_SIZE, MB, RESTAURANT_BANNER_MAX_IMAGE_SIZE, RestaurantConfigSchema} from "@/lib/zodSchema.ts";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {RequiredInput} from "@/components/wrappers/requiredInput"
import {Textarea} from "@/components/ui/textarea.tsx";
import {PinIcon, PhoneIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useSetupContext} from "@/context/setupContext.ts";
import {useDropzone} from "react-dropzone";
import { toast } from "sonner"

type RestaurantConfigValues = z.infer<typeof RestaurantConfigSchema>;

export function RestaurantConfig() {

	const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
	const {nextTab} = useSetupContext()

	const form = useForm<RestaurantConfigValues>({
		resolver: zodResolver(RestaurantConfigSchema),
		mode: 'onSubmit',
		defaultValues: {
			image: undefined,
			address: "",
			phoneNumber: "",
			restaurantName: "",
			description: ""
		}
	})

	function onSubmit(data: RestaurantConfigValues) {
		console.log(data.image)
		toast.success(`Image uploaded successfully 🎉 ${data.image.name}`, {
			description: `Your image was uploaded successfully!`,
			action: {
				label: "View Image",
				onClick: () => {
					window.open(URL.createObjectURL(data.image))
				}
			}
		});
		nextTab()
		// Got to finish setting up the submit function nd direct the user to the next tab
	}

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const reader = new FileReader();
			try {
				reader.onload = () => setPreview(reader.result);
				reader.readAsDataURL(acceptedFiles[0]);
				form.setValue("image", acceptedFiles[0])
				form.clearErrors("image")

			} catch (error) {
				console.log(error);
				setPreview(null)
				form.resetField("image")

			}

		}, [form]
	);

	const { getRootProps, getInputProps, isDragActive, fileRejections } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			maxSize: RESTAURANT_BANNER_MAX_IMAGE_SIZE * MB,
			accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
		});





	return (
		<div>
			<div className="mb-4">
				<TypographyMuted>
					Configure o seu restaurante. Não se preocupe, poderá alterar as informações à qualquer
					momento
				</TypographyMuted>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={`space-y-4 laptop:w-[40%]`}>
						<FormField
							name="image"
							control={form.control}
							render={() => (
								<FormItem className="max-w-[430px]">
									<FormLabel
										className={`${
											fileRejections.length !== 0 && "text-destructive"}`}>
										<h2 className="font-semibold tracking-tight">
											Adicione uma imagem
											<span
												className={
													form.formState.errors.image || fileRejections.length !== 0
														? "text-destructive"
														: "text-muted-foreground"
												}
											></span>
										</h2>
									</FormLabel>
									<FormControl>
										<div
											{...getRootProps()}
											className={`mx-auto max-w-full flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed ${preview ? "border-amethyst-300 bg-zinc-100" : "border-zinc-300 bg-white hover:bg-zinc-100"} transition-all duration-150 p-4 `}>
											{preview && (
												<img
													src={preview as string}
													alt="Uploaded image"
													className="max-h-[150px] rounded-lg"
												/>
											)}
											<Upload
												className={`size-6 ${preview ? "hidden" : "block"} bg-zinc-200 rounded-full p-1 text-gray-800`}
											/>
											<Input {...getInputProps()} type="file"/>
											{
												isDragActive ? (
														<p className="text-center">Arraste a imagem para aqui!</p>) :
													preview != null ? <p>Imagem selecionada</p>
														:
														<div>
															<p className="text-center text-sm">Clique aqui ou arraste a
																imagem para fazer
																upload</p>
															<p className="text-center text-xs text-zinc-600">
																Formatos: JPG, JPEG ou PNG | Tamanho máximo
																de {MAX_IMAGE_SIZE}MB.
															</p>

														</div>
											}
										</div>
									</FormControl>

									<FormMessage>
										{fileRejections.length !== 0 && (
											<p>
												A imagem deve conter no maximo {MAX_IMAGE_SIZE}MB e ser dos tipos, jpg, ou
												jpeg.
											</p>
										)}
									</FormMessage>
								</FormItem>
							)}/>
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

