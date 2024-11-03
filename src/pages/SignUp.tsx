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
		<div className={"flex items-center"}>
			<Background className={"bg-gradient-to-r from-neutral-100 to-neutral-200"}/>
				<div
					className={"flex justify-center items-center laptop:px-12 w-full h-full"}>
				<div className={"absolute top-0 left-0 mx-4 my-8"}>
					<Link to={"/home"}>
						<ChevronLeft/>
					</Link>
				</div>
				<div className={"w-full"}>
					<div className={"text-center space-y-1 my-8"}>
						<h1 className={"text-lg font-semibold tracking-tight"}>
							Seja bem-vindo(a)
						</h1>
						<p className={"text-zinc-500 text-sm"}>
							Inicie Sessão ou Crie uma conta para proceguir
						</p>
					</div>
					<SignUpForm/>
					<div className={"flex w-full justify-center items-center  text-sm"}>
						<TypographyMuted>Já possui uma conta?&nbsp;</TypographyMuted>
						<Button asChild variant={"link"} className={"m-0 p-0"}>
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

