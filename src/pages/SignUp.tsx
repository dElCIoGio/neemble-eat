import Background from "@/components/ui/Background.tsx";
import {Link} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {TypographyMuted} from "@/components/ui/Typography.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SignUpForm} from "@/components/SignUp/SignUpForm.tsx";

export function SignUp() {

	document.title = "Crie a sua conta"

	return (
		<div className={"flex bg-tropical_indigo-100 h-dvh p-2"}>
			<div className="text-white laptop:w-[25%]">
				<h2 className="text-amethyst-500">
					Comece agora
				</h2>
				<h1 className="text-2xl">
					Bem-vindo
				</h1>
				<p className="text-zinc-400 text-sm">
					Crie uma conta para continuar
				</p>
			</div>
			<div
				className={"flex justify-center w-full laptop:w-[75%] items-center laptop:px-12 rounded-lg h-full bg-white"}>
				<div className={"absolute hidden top-0 left-0 mx-4 my-8"}>
					<Link to={"/home"}>
						<ChevronLeft/>
					</Link>
				</div>
				<div className={"w-full"}>
					<div className={"text-center space-y-1 my-8"}>
					</div>
					<SignUpForm/>
					<div className={"flex w-full justify-center items-center text-sm"}>
						<TypographyMuted>Já possui uma conta?&nbsp;</TypographyMuted>
						<Button asChild className={"m-0 p-0"} variant="link">
							<Link to={`${URL_PATH_PREFIX}/login`}>
								Inicie Sessão
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

