import {Grid} from "@/components/ui/grid";
import {TrackingCards} from "@/components/Dashboard/TrackingCards.tsx";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";
import {useDashboardContext} from "@/context/dashboardContext.ts";

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
				description={"Acompanhe em tempo real a atividade em cada mesa do seu restaurante. Clique no botão abaixo para acesssar a sau tela de gerenciamento das mesas."}
				buttonText={"Abrir Mesas"}
				buttonLink={`${URL_PATH_PREFIX}/tables-tracking/${restaurant.id}`}/>
		</Grid>
	);
}

