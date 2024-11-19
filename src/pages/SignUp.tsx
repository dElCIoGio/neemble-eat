import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {SignUpForm} from "@/components/SignUp/SignUpForm.tsx";
import {useState} from "react";

export function SignUp() {

	document.title = "Neemble Eat | Cadastro";

	const [tab, setTab] = useState<"credentials" | "person">("credentials")

	function handleTabChange(tab: "credentials" | "person") {
		setTab(tab)
	}

	return (
		<div className={"flex h-dvh w-full"}>
			<div className="bg-gradient-to-br from-zinc-50 to-gray-100 hidden h-auto w-3/5 m-2 p-8 rounded-2xl laptop:flex flex-col justify-between">
				<h1 className="text-2xl font-bold text-zinc-600">
					Neemble Eat
				</h1>
				<div>
					<h2 className={"font-poppins-semibold text-lg"}>
						Transforme o seu restaurante em um negocio de alta rentabilidade com a Neemble Eat
					</h2>
				</div>
				<footer className={`flex justify-between items-center`}>
					<Button asChild variant={"ghost"} className={"px-0"}>
						<Link to={`${URL_PATH_PREFIX}/home`}>
							<ArrowLeft/> Voltar
						</Link>
					</Button>
					<Button asChild variant={"ghost"} className={"px-0"}>
						<Link to={`${URL_PATH_PREFIX}/login`}>
							Iniciar Sessao
						</Link>
					</Button>
				</footer>
			</div>
			<div className="relative w-full h-full flex flex-col items-center justify-center space-y-6">
				<nav className={`absolute w-full px-4 top-6 laptop:hidden flex justify-between items-center`}>
					<Button asChild variant={"ghost"} className={"px-0"}>
						<Link to={`${URL_PATH_PREFIX}/home`}>
							<ArrowLeft/> Voltar
						</Link>
					</Button>
					<Button asChild variant={"secondary"} className={""}>
						<Link to={`${URL_PATH_PREFIX}/login`}>
							Iniciar Sessao
						</Link>
					</Button>
				</nav>
				<div className="text-center">
					<h1 className="text-xl font-bold text-amethyst-300">
						Bem vindo ao Neemble Eat
					</h1>
					<h2 className={"text-md font-poppins-regular text-zinc-500"}>
						Crie uma conta gratuita
					</h2>
				</div>
				<SignUpForm handleTabChange={handleTabChange} tab={tab}/>
				<div className={"absolute bottom-8 flex items-center justify-center space-x-2"}>
					<div
						className={`h-1 w-16 rounded-full ${tab === "credentials" ? "bg-amethyst-300" : "bg-zinc-300"}`}/>
					<div className={`h-1 w-16 rounded-full ${tab === "person" ? "bg-amethyst-300" : "bg-zinc-100"}`}/>
				</div>
			</div>
		</div>
	);
}

