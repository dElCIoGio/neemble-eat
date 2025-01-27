import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {RegisterSchema} from "@/lib/zodSchema.ts";
import {Required} from "@/components/ui/required.tsx";
import {Eye, EyeClosed} from "lucide-react";
import {useEffect, useState} from "react";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Role, UserJson} from "@/schema.ts";
import { FirebaseError } from '@firebase/util'
import {Spinner} from "@/components/ui/spinner.tsx";
import {signUp} from "@/service/signIn.ts";

interface SignUpFormValues {
	tab: "credentials" | "person";
	handleTabChange: (tab: "credentials" | "person") => void;
	submitAction: (user: UserJson) => void
	role: Role

}

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export function SignUpForm({tab, handleTabChange, submitAction, role}: SignUpFormValues) {


	const [passwordShowing, setPasswordShowing] = useState<boolean>(false)
	const [confirmPasswordShowing, setConfirmPasswordShowing] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)


	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onSubmit',
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: ""
		}
	});

	useEffect(() => {
		if (error != null){
			setTimeout(() => setError(null), 4000);
		}
	}, [error]);

	const onSubmit = (data: RegisterFormValues) => {
		// FIREBASE ERRORS: https://firebase.google.com/docs/reference/node/firebase.auth.Error
		signUp({
			firstName: data.firstName,
			lastName: data.lastName,
			phoneNumber: data.phoneNumber,
			email: data.email,
			password: data.password,
			role: role
		}).then((user) => {
			submitAction(user)
		}).catch((error) => {
			if (error instanceof FirebaseError){
				const message = error.message
				if (message.includes("auth/email-already-in-use")){
					console.error(message)
					setError("O email selecionado já está em uso")
				}
			}
		})
	};

	return (
		<Form {...form}>
			<form onSubmit={ tab === "person"? form.handleSubmit(onSubmit): undefined}
			      className={`flex justify-center items-center w-[80%] p-0`}>
				<Tabs defaultValue="credentials" value={tab} className="w-[100%] tablet:w-[100%] laptop:w-[500px]">
					<TabsContent value="person">
						<div className={""}>
							<div className="space-y-3">
								<FormField
									name="firstName"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Primeiro Nome</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Digite o seu primeiro nome"
													   variant="brand"
													   className={"hover:bg-zinc-100 transition-all duration-150"}/>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}/>
								<FormField
									name="lastName"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Último Nome</FormLabel>
											<FormControl>
												<Input {...field}
													   variant="brand"
													   placeholder="Digite o seu último nome"
													   className={"hover:bg-zinc-100 transition-all duration-150"}/>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}/>
								<FormField
									name="phoneNumber"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Número de Telefone</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Digite o seu número de telefone"
													   variant={"brand"}
													   className={"hover:bg-zinc-100 transition-all duration-150"}/>
											</FormControl>
											<FormMessage/>
										</FormItem>
									)}/>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="credentials">
						<div>
							<div className="space-y-3">
								<FormField name="email"
										   control={form.control}
										   render={({field}) => (
											   <FormItem>
												   <FormLabel>E-mail</FormLabel>
												   <FormControl>
													   <Input {...field} placeholder="Digite o seu e-mail"
															  variant={"brand"}
															  className={"hover:bg-zinc-100 transition-all duration-150"}/>
												   </FormControl>
												   <FormMessage/>
											   </FormItem>
										   )}/>
								<FormField control={form.control}
										   name="password"
										   render={({field}) => (
											   <FormItem>
												   <FormLabel>
													   Palavra-passe <Required/>
												   </FormLabel>
												   <div className={"flex space-x-2 h-fit"}>
													   <FormControl>
														   <Input {...field}
															   variant={"brand"}
																  type={passwordShowing ? "text" : "password"}
																  placeholder={"******"}
																  className={"hover:bg-zinc-100 transition-all duration-150"}/>
													   </FormControl>
													   <Button
														   size={"icon"}
														   type="button"
														   onClick={() => setPasswordShowing(!passwordShowing)}
														   variant="outline"
														   className="h-8 shadow-sm">
														   {
															   !passwordShowing ?
																   <EyeClosed className="w-8 h-8"/> :
																   <Eye/>
														   }
													   </Button>
												   </div>
												   <FormMessage/>
											   </FormItem>
										   )}/>
								<FormField control={form.control}
										   name="confirmPassword"
										   render={({field}) => (
											   <FormItem>
												   <FormLabel>
													   Confirmar Palavra-passe <Required/>
												   </FormLabel>
												   <div className={"flex items-center space-x-2"}>
													   <FormControl>
														   <Input{...field}
															   variant={"brand"}
																 type={confirmPasswordShowing ? "text" : "password"}
																 placeholder={"******"}
																 className={"hover:bg-zinc-100 transition-all duration-150"}/>
													   </FormControl>
													   <Button
														   size={"icon"}
														   type={"button"}
														   onClick={() => setConfirmPasswordShowing(!confirmPasswordShowing)}
														   variant={"outline"}
														   className="h-8 shadow-sm">
														   {
															   !confirmPasswordShowing ? <EyeClosed className="w-8 h-8"/> : <Eye className="w-8 h-8"/>
														   }
													   </Button>
												   </div>
												   <FormMessage/>
											   </FormItem>
										   )}/>
							</div>

						</div>
					</TabsContent>
					<div className="my-8">
						{
							tab === "credentials" ?
								<Button type={"button"} className={"w-full"} onClick={() => handleTabChange("person")}>
									Continuar
								</Button>:
								<div className={"space-y-2"}>
									{
										form.formState.isSubmitting?
											<Button type={tab == "person"? "submit": "button"} disabled className={"w-full bg-amethyst-400 hover:bg-amethyst-300"}>
												<Spinner/> Aguarde
											</Button>:
											<Button type={tab == "person"? "submit": "button"} className={"w-full bg-amethyst-400 hover:bg-amethyst-300"}>
												Registar
											</Button>
									}

									<Button className={"w-full"} type={"button"} variant={"ghost"} onClick={() => handleTabChange("credentials")}>
										Voltar
									</Button>
								</div>

						}

					</div>
				</Tabs>
			</form>
			<div className="text-red-500 text-sm italic font-poppins-semibold">
				{error != null && error}
			</div>
		</Form>
	);
}

