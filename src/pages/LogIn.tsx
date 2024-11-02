import {LogInForm} from "@/components/LogIn/LogInForm.tsx";
import {TRANSPARENT_LOGO, URL_PATH_PREFIX} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {TypographyMuted} from "@/components/ui/Typography.tsx";
import Background from "@/components/ui/Background.tsx";
import {ChevronLeft} from "lucide-react";
import {Link} from "react-router-dom";
import {FullImage} from "@/components/ui/FullImage.tsx";
import image from '../../public/images/blackchef.png'

export function LogIn() {

	document.title = "Inicie Sessão"

	return (
		<div className={"flex items-center h-dvh"}>
			<Background className={"bg-neutral-100"}/>
			<div
				className={"relative flex justify-center items-center px-12 w-full tablet:w-full laptop:w-full desktop:w-2/6 desktop:2/6  h-full"}>
				<div className={"absolute top-0 left-0 mx-4 my-8"}>
					<Link to={"/home"}>
						<ChevronLeft/>
					</Link>
				</div>
				<div className={"absolute top-[1%]"}>
					<img src={TRANSPARENT_LOGO} className={"w-28"} alt=""/>
				</div>
				<div className={"w-full"}>
					<div className={"text-center space-y-1 my-6"}>
						<h1 className={"text-xl font-semibold tracking-tight"}>
							Bem-vindo(a) de volta
						</h1>
						<p className={"text-sm text-zinc-400 font-semibold"}>
							Inicie Sessão ou Crie uma conta para proceguir
						</p>
					</div>
					<LogInForm/>
					<div className={"flex w-full justify-center items-center mt-4"}>
						<TypographyMuted>Não tem uma conta?&nbsp;</TypographyMuted>
						<Button asChild variant={"link"} className={"m-0 p-0"}>
							<Link to={`${URL_PATH_PREFIX}/signup`}>
								Crie já!
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<div className={"w-4/6 h-full p-4 hidden tablet:hidden laptop:hidden desktop:block"}>
				<FullImage src={image}/>
			</div>
		</div>
	);
}

