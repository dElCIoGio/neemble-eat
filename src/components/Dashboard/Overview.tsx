import {Grid} from "@/components/ui/grid";
import {TrackingCards} from "@/components/Dashboard/TrackingCards.tsx";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {useDashboardContext} from "@/context/dashboardContext.ts";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {openUrlInNewTab} from "@/lib/utils.ts";

export function Overview() {

	const {restaurant} = useDashboardContext()

	return (
		<Grid>
			<TrackingCards
				title={"Pedidos"}
				description={"Veja em tempo real os pedidos feitos pelos clientes. Clique no botão abaixo para ver os pedidos."}
				buttonText={"Abrir Pedidos"}
				buttonLink={`${URL_PATH_PREFIX}/orders-tracking/${restaurant.id}`}/>
			<TrackingCards
				title={"Mesas do restaurante"}
				description={"Acompanhe em tempo real a atividade em cada mesa do seu restaurante. Clique no botão abaixo para acesssar a sua tela de gerenciamento das mesas."}
				buttonText={"Abrir Mesas"}
				buttonLink={`${URL_PATH_PREFIX}/tables-tracking/${restaurant.id}`}/>
			<Card className="p-4 col-span-full bg-zinc-950 text-white space-y-3 flex flex-col justify-between">
				<h1 className="font-poppins-semibold border-l-2 px-2 border-amethyst-400">Novos Pedidos</h1>
				<div className="w-full h-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-sm text-zinc-200 space-y-3 flex flex-col justify-between">
					<p>
						Crie pedidos pelos clientes para qualquer mesa do seu restaurante e mantenha a organização
					</p>
					<Button className="bg-amethyst-300 w-fit hover:bg-amethyst-200 border border-amethyst-400 hover:border-amethyst-300 text-white"
							onClick={() => openUrlInNewTab("/custom-order")}>
						Novo Pedido
					</Button>
				</div>
			</Card>
		</Grid>
	);
}

