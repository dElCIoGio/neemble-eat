import {Card} from "@/components/ui/card";
import {Grid} from "@/components/ui/grid";
import {Button} from "@/components/ui/button.tsx";

export function Overview() {
	return (
		<div>
			<div className="">
				<Grid>
					<Card className="p-4 col-span-12 laptop:col-span-6 bg-zinc-950 text-white space-y-3 flex flex-col justify-between">
						<h1 className="font-poppins-semibold border-l-2 px-2 border-amethyst-400">Pedidos</h1>
						<div className="w-full h-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-sm text-zinc-200 space-y-3 flex flex-col justify-between">
							<p>
								Veja em tempo real os pedidos feitos pelos clientes. Clique no botão abaixo para ver os pedidos.
							</p>
							<Button className="bg-amethyst-300 w-fit hover:bg-amethyst-200 border border-amethyst-400 hover:border-amethyst-300 text-white">
								Abrir Pedidos
							</Button>
						</div>
					</Card>

					<Card className="p-4 col-span-12 laptop:col-span-6 bg-zinc-950 text-white space-y-3">
						<h1 className="font-poppins-semibold border-l-2 px-2 border-amethyst-400">Mesas do restaurante</h1>
						<div className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-sm text-zinc-200 space-y-3">
							<p>
								Acompanhe em tempo real a atividade em cada mesa do seu restaurante. Clique no botão abaixo para acesssar a sau tela de gerenciamento das mesas.
							</p>
							<Button className="bg-amethyst-300 hover:bg-amethyst-200 border border-amethyst-400 hover:border-amethyst-300 text-white">
								Abrir Mesas
							</Button>
						</div>
					</Card>

				</Grid>
			</div>

		</div>
	);
}

