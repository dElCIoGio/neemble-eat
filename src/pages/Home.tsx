import {Link} from "react-router-dom";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import { Button } from "@/components/ui/button";
import Background from "@/components/ui/Background.tsx";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {AlignCenter} from "lucide-react"

export function Home() {

	const isMobile = useIsMobile()

	return (
		<div className="h-screen bg-cover">
			<Background className="bg-gradient-to-br from-slate-50 to-amethyst-800"/>
			<div className="w-full">
				<nav className="p-4 bg-opacity-50 flex justify-between items-center">
					<h1 className="text-xl font-bold">NEEMBLE EAT</h1>
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
							<Button asChild className="rounded-full">
								<Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
									Criar Conta
								</Link>
							</Button>

					</div>
					}

				</nav>
				<main className="max-w-[920px] w-full mx-auto py-16 px-4">
					<div className="text-center">
						<h1 className="text-6xl font-bold">
							Aumente o seu rendimento e performance com pedidos online
						</h1>
						<h2 className={"text-base mt-8 max-w-[700px] mx-auto text-gray-500"}>
							A nossa plataforma oferece uma solução robusta para automatizar as operações do seu
							restaurante e promover uma experiência ultra dinâmica para os seus clientes.
						</h2>
					</div>
					<div className="mt-8 mx-auto flex justify-center gap-4">
						<Button asChild className="rounded-full px-6 shadow-lg">
							<Link to={`${URL_PATH_PREFIX}/signup`} className="border-white">
								Comece agora e ganhe 10% de desconto
							</Link>
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
}

