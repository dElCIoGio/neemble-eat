import {StatCard} from "@/components/Dashboard/StatCard.tsx";
import {Grid} from "@/components/ui/grid"

export function Analytics() {
	return (
		<div className="h-full w-full">
			<Grid>
				<StatCard
					title="Gross Revenue"
					value={134000}
					pillText={"2.75%"}
					period="Dezembro 2024 - Outubro 2025"
					trend="up"/>
							<StatCard
								title="Gross Revenue"
								value={134000}
								pillText={"2.75%"}
								period="Dezembro 2024 - Outubro 2025"
								trend="up"/>
							<StatCard
								title="Gross Revenue"
								value={134000}
								pillText={"2.75%"}
								period="Dezembro 2024 - Outubro 2025"
								trend="up"/>
			</Grid>
		</div>
	);
}

