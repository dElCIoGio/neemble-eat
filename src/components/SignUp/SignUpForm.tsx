import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {RegisterSchema} from "@/lib/zodSchema.ts";
import {Required} from "@/components/ui/required.tsx";
import {Eye, EyeClosed} from "lucide-react";
import {useState} from "react";
import {signUp} from '@/service/signIn'
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {useNavigate} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {User} from "lucide-react"


type RegisterFormValues = z.infer<typeof RegisterSchema>;

export function SignUpForm() {

	const navigate = useNavigate()
	const [passwordShowing, setPasswordShowing] = useState<boolean>(false)
	const [confirmPasswordShowing, setConfirmPasswordShowing] = useState<boolean>(false)

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

	const onSubmit = (data: RegisterFormValues) => {
		// FIREBASE ERRORS: https://firebase.google.com/docs/reference/node/firebase.auth.Error
		signUp({
			firstName: data.firstName,
			lastName: data.lastName,
			phoneNumber: data.phoneNumber,
			email: data.email,
			password: data.password
		}).then((user) => {
			navigate(`${URL_PATH_PREFIX}/setup/${user.id}`)
		})
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}
			      className={`flex justify-center items-center`}>
				<Tabs defaultValue="person" className="w-[100%] tablet:w-[80%] laptop:w-[500px] px-8">
					<TabsList className="grid w-full grid-cols-2 gap-2 bg-zinc-100 border shadow-sm">
						<TabsTrigger className="" value="person">Pessoal</TabsTrigger>
						<TabsTrigger className="" value="account">Conta</TabsTrigger>
					</TabsList>
					<TabsContent value="person">
						<Card className={""}>
							<CardHeader>
							<div className="flex items-center space-x-2">
								<User size={20}/>
								<CardTitle className="text-lg">Informação pessoal</CardTitle>
							</div>
								<CardDescription
									className="text-sm">Indique abaixo os seus dados pessoais</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<FormField
									name="firstName"
									control={form.control}
									render={({field}) => (
										<FormItem>
										<FormLabel>Primeiro Nome</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Digite o seu primeiro nome"
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
											       className={"hover:bg-zinc-100 transition-all duration-150"}/>
										</FormControl>
										<FormMessage/>
									</FormItem>
									)}/>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="account">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">Informação da conta</CardTitle>
								<CardDescription
									className="text-sm">Preencha os campos para a sua conta</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<FormField name="email"
								           control={form.control}
								           render={({field}) => (
									           <FormItem>
												<FormLabel>E-mail</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Digite o seu e-mail"
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
													                           type={passwordShowing ? "text" : "password"}
													                           placeholder={"******"}
													                           className={"hover:bg-zinc-100 transition-all duration-150"}/>
																	</FormControl>
														           <Button
															           size={"icon"}
															           type="button"
															           onClick={() => setPasswordShowing(!passwordShowing)}
															           variant="outline"
															           className="h-8">
																		{
																			!passwordShowing ?
																				<EyeClosed/> :
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
										                          type={confirmPasswordShowing ? "text" : "password"}
										                          placeholder={"******"}
										                          className={"hover:bg-zinc-100 transition-all duration-150"}/>
														</FormControl>
											           <Button
												           size={"icon"}
												           type={"button"}
												           onClick={() => setConfirmPasswordShowing(!confirmPasswordShowing)}
												           variant={"outline"}
												           className="h-8">
															{
																!confirmPasswordShowing ? <EyeClosed/> : <Eye/>
															}
														</Button>
												   </div>
									           <FormMessage/>
										   </FormItem>
								           )}/>
							</CardContent>
							<CardFooter>
								<Button type="submit" className="w-full">Registar</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>

				</form>
		</Form>
	);
}

