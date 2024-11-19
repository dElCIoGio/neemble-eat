
import {TopOrdersTable} from "@/components/Dashboard/TopOrdersTable.tsx";
import {StatCardWithIcon} from "@/components/Dashboard/StatCard.tsx";
import {Users, Coins, Receipt} from "@phosphor-icons/react"
import {AnalyticBox} from "@/components/Dashboard/AnalyticBox.tsx";

export function Analytics() {
	return (
		<div className="w-full space-y-4">
			<div className="grid grid-cols-1 gap-4 laptop:grid-cols-3 laptop:gap-3">
				<AnalyticBox
					title={"Ganhos"}
					icon={Coins}>
					<StatCardWithIcon
						value={134000}
						valueType={"currency"}
						pillText={"2.75%"}
						period="Novembro 2024 - Hoje"
						trend="up"/>
				</AnalyticBox>
				<AnalyticBox
					title="Media de clientes diarios"
					icon={Users}>
					<StatCardWithIcon
						value={130}
						pillText={"1.45%"}
						period="Novembro 2024 - Hoje"
						trend="up"/>
				</AnalyticBox>
				<AnalyticBox
					title="Gasto medio por pedido"
					icon={Receipt}>
					<StatCardWithIcon
						value={25000}
						valueType={"currency"}
						pillText={"3.14%"}
						period="Dezembro 2024 - Outubro 2025"
						trend="up"/>
				</AnalyticBox>
			</div>
			<AnalyticBox title={"Pedidos mais populares"} icon={Receipt}>
				<TopOrdersTable/>
			</AnalyticBox>

		</div>
	);
}

