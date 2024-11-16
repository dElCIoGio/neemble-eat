
import {TopOrdersTable} from "@/components/Dashboard/TopOrdersTable.tsx";
import {StatCard} from "@/components/Dashboard/StatCard.tsx";
import {Grid} from "@/components/ui/grid"
import {Separator} from "@/components/ui/separator"

export function Analytics() {
	return (
		<div className="h-full w-full flex flex-col laptop:flex-row gap-2 ">
			<div className="flex flex-col gap-4 w-full rounded-lg border border-gray-200">
				<StatCard
					title="Ganhos"
					value={134000}
					pillText={"2.75%"}
					period="Dezembro 2024 - Outubro 2025"
					trend="up"/>
				<Separator/>
				<StatCard
					title="Mes anterior"
					value={1250000}
					pillText={"2.75%"}
					period="Dezembro 2024 - Outubro 2025"
					trend="up"/>
			</div>
			<div className="hidden">
				<Grid>
					<StatCard
						title="Gross Revenue"
						value={134000}
						pillText={"2.75%"}
						period="Dezembro 2024 - Outubro 2025"
						trend="up"/>
				</Grid>
			</div>
			<TopOrdersTable/>
		</div>
	);
}

