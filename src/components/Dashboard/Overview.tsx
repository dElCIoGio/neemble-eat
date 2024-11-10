import {Card} from "@/components/ui/card";
import {Grid} from "@/components/ui/grid";

export function Overview() {
	return (
		<div>
			<Grid>
				<Card className="p-2 col-span-6 ">
					Access your orders
				</Card>

				<Card className="p-2 col-span-6 border-dashed shadow-none">
					Access your tables
				</Card>
			</Grid>
		</div>
	);
}

