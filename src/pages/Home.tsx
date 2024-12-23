import {Link} from "react-router-dom";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import { Button } from "@/components/ui/button";
import Background from "@/components/ui/Background.tsx";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {AlignCenter} from "lucide-react"
// import background from "@/../public/images/blackchef2.png";
import panel from "@/../public/images/dashboard.png";
import {QrCode, ChartNoAxesCombined, ChefHat} from "lucide-react"
import logo from "@/../public/neemble-eat-logo.png";

export function Home() {

	window.document.title = "Neemble Eat";

	const isMobile = useIsMobile()

	return (
		<div className="h-screen bg-cover" >
			{/*style={{backgroundImage: `url(${background})`}}*/}

			<Background className="bg-gradient-to-br from-slate-50 to-zinc-300"/>
			{/*<Background className="bg-gradient-to-br from-slate-50 to-amethyst-900"/>*/}
			<div className="w-full">
				<nav className="pr-4 laptop:px-4 bg-opacity-50 flex justify-between items-center">
					<img src={logo} className="max-w-36 p-0" alt=""/>
					{isMobile ? <Sheet>
							<SheetTrigger asChild><AlignCenter/></SheetTrigger>
							<SheetContent className="py-12">

								<div className="flex flex-col gap-3">
									<Link to={`${URL_PATH_PREFIX}/login`} className="font-poppins-semibold">
										Login
									</Link>
									<Link to={`${URL_PATH_PREFIX}/signup`} className="font-poppins-semibold">
										Criar Conta
									</Link>
								</div>

							</SheetContent>
						</Sheet> :
						<div className="flex items-center gap-3">
							<Button asChild className="rounded-full" variant="link">
								<Link to={`${URL_PATH_PREFIX}/login`} className="border-white">
									Login
								</Link>
							</Button>
							<Button asChild className="rounded-2xl px-5">
								<Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
									Criar Conta
								</Link>
							</Button>

						</div>
					}

				</nav>
				<main className="max-w-[920px] w-full mx-auto py-12 px-4">
					<div className="text-center">
						<h1 className="text-4xl laptop:text-6xl font-bold">
							Aumente o seu  rendimento e performance com <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent inline-block bg-clip-text">pedidos
							online</span>
						</h1>
						<h2 className={"text-sm laptop:text-base mt-8 max-w-[700px] mx-auto text-gray-500"}>
							A nossa plataforma oferece uma solução robusta para automatizar as operações do seu
							restaurante e promover uma experiência ultra dinâmica para os seus clientes.
						</h2>
					</div>
					<div className="mt-8 mx-auto flex justify-center gap-4">
						<Button asChild className="rounded-full px-6 shadow-lg bg-gradient-to-br hover:shadow-xl hover:-translate-y-1 from-black to-black hover:from-black hover:to-amethyst-300 transition-all duration-300">
							<Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
								Comece agora e ganhe 10% de desconto
							</Link>
						</Button>
					</div>
					<div className="mt-12">
						<div className="flex justify-between space-x-4 my-2">
							<QrCode className="bg-white p-1 text-amethyst-600 shadow-sm bg-opacity-30 rounded-md"/>
							<ChartNoAxesCombined className="bg-white p-1 text-amethyst-600 shadow-sm bg-opacity-30 rounded-md"/>
							<ChefHat className="bg-white p-1 text-amethyst-600 shadow-sm bg-opacity-30 rounded-md"/>
						</div>
						<img src={panel}
							 className=""
							 alt=""/>
					</div>

				</main>
			</div>
		</div>
	);
}

