import {LogInForm} from "@/components/LogIn/LogInForm.tsx";
import {TRANSPARENT_LOGO, URL_PATH_PREFIX} from "@/lib/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import {TypographyMuted} from "@/components/ui/Typography.tsx";
import {ChevronLeft} from "lucide-react";
import {Link} from "react-router-dom";
import {FullImage} from "@/components/ui/FullImage.tsx";
import image from '../../public/images/blackchef.png'

export function LogIn() {

	document.title = "Inicie Sessão"

	return (
		<div className={"flex items-center h-dvh"}>
			<div
				className={"relative flex justify-center items-center px-12 w-full tablet:w-full laptop:w-full desktop:w-1/2 desktop:1/2  h-full"}>
				<div className={"absolute top-0 left-0 mx-4 my-8"}>
					<Link to={"/home"}>
						<ChevronLeft/>
					</Link>
				</div>
				<div className={"absolute top-[5%]"}>
					<img src={TRANSPARENT_LOGO} className={"w-28"} alt=""/>
				</div>
				<div className={"w-full laptop:w-[60%]"}>
					<div className={"text-center space-y-1 my-6"}>
						<h1 className={"text-xl font-semibold tracking-tight"}>
							Log In
						</h1>
						<p className={"text-xs text-zinc-500"}>
							Bem-vindo(a) de volta
						</p>
					</div>
					<LogInForm/>
					<div className={"flex w-full justify-center items-center mt-4 text-xs"}>
						<TypographyMuted>Não tem uma conta?&nbsp;</TypographyMuted>
						<Button asChild variant={"link"} className={"m-0 p-0"}>
							<Link to={`${URL_PATH_PREFIX}/signup`} className="">
								Crie já!
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<div className={"w-1/2 h-full p-2 hidden tablet:hidden laptop:hidden desktop:block"}>
				<FullImage src={image}/>
			</div>
		</div>
	);
}

