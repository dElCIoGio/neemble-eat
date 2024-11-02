import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {LogInSchema} from "@/lib/zodSchema.ts";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl, FormMessage
} from "@/components/ui/form"
import {Input} from '@/components/ui/input'
import {Button} from "@/components/ui/button.tsx";
import {Eye, EyeClosed} from 'lucide-react'
import {useState} from "react";
import {z} from "zod"
import {Required} from "@/components/ui/required.tsx";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '@/service/firebase/firebase'
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {useNavigate} from "react-router-dom";


export function LogInForm() {

	const navigate = useNavigate();
	const [passwordShowing, setPasswordShowing] = useState<boolean>(false)
	const [error, setError] = useState<null | string>(null)

	const form = useForm({
		resolver: zodResolver(LogInSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const onSubmit = (data: z.infer<typeof LogInSchema>) => {
		const email: string = data.email
		const password: string = data.password
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const userID = userCredentials.user.uid
				navigate(`${URL_PATH_PREFIX}/user/${userID}`)
			}).catch(() => {
			setError("Houve um problema ao iniciar sessão. Tente novamente ou troque a sua palavra passe")
		})
	}


	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}
				      className="">
					<div className={`space-y-6`}>
						<FormField control={form.control}
						           name="email"
						           render={({field}) => (
							           <FormItem>
											<FormLabel>Email <Required/></FormLabel>
								           <FormControl>
									           <Input {...field}
									                  type="email"
									                  placeholder={"exemplo@mail.com"}
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
									           <div className={"flex items-center space-x-2"}>
										            <FormControl>
									                    <Input {...field}
									                           type={passwordShowing ? "text" : "password"}
									                           placeholder={"******"}
									                           className={"hover:bg-zinc-100 transition-all duration-150"}/>
													</FormControl>
										           <Button
											           className={"max-h-10"}
											           type="button"
											           onClick={() => setPasswordShowing(!passwordShowing)}
											           variant={"outline"}>
														{
															!passwordShowing ? <EyeClosed/> : <Eye/>
														}
													</Button>
									           </div>
								           <FormMessage/>
									   </FormItem>
						           )}/>
					</div>
					<div className={"flex justify-end"}>
						<Button variant={"link"} className={"p-0 m-0"}>Esqueci a palavra passe</Button>
					</div>
					<div className={`text-red-500 italic font-semibold`}>
						{error}
					</div>
					<Button type="submit" color="primary" className={"w-full py-4 my-4"}>
						Iniciar Sessão
					</Button>
				</form>
			</Form>
		</div>
	);
}
