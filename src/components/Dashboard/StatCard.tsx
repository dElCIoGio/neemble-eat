import {Card} from "@/components/ui/card.tsx";
import {TrendingUp, TrendingDown} from "lucide-react"
import {formatCurrency} from "@/lib/utils.ts";

interface StatCardProps {
	value: number;
	valueType?: "number" | "currency";
	pillText: string;
	trend: "up" | "down" | "steady";
	period: string;
}


export function StatCard({period, pillText, trend, value, valueType}: StatCardProps) {

	const formattedAmount = valueType == "currency"? formatCurrency(value): value

	return (
		<Card className="col-span-12 tablet:col-span-6 laptop:col-span-4 p-4 border-0 shadow-none">
			<div className="flex justify-between items-center">
				<h3 className="text-french_gray-300 font-poppins-semibold text-sm"></h3>
				{
					trend === "up" ? <TrendUp value={pillText}/> : <TrendDown value={pillText}/>
				}

			</div>
			<p className="text-3xl font-poppins-semibold mb-8">
				AOA&nbsp;{formattedAmount}
			</p>
			<p className="text-xs text-french_gray-400">
				{period}
			</p>
		</Card>
	);
}


export function StatCardWithIcon({value, trend, pillText, period, valueType}: StatCardProps) {

	const formattedAmount = valueType == "currency"? formatCurrency(value): value

	return(
	<div className={`space-y-4 p-4`}>
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-poppins-semibold text-center">
						<span className={`text-base font-poppins-medium text-zinc-400 mr-1 ${valueType !== "currency" && "hidden"}`}>
							AOA
						</span>
						{formattedAmount}
					</h2>
				</div>
				<div>
					{
						trend === "up" ? <TrendUp value={pillText}/> : <TrendDown value={pillText}/>
					}
				</div>
			</div>

			<div>
				<p className="text-xs text-zinc-400">
					{period}
				</p>
			</div>
		</div>
	)

}


interface TrendBadgeProps {
	value: string
}


function TrendUp({value}: TrendBadgeProps) {
	return <span
		className="rounded-md p-1 text-xs gap-1 flex font-poppins-semibold items-center bg-green-100 text-green-700">
		<TrendingUp size={15}/>
		{value}
	</span>
}

function TrendDown({value}: TrendBadgeProps) {
	return <span
		className="rounded-md p-1 text-xs gap-1 flex font-poppins-semibold items-center bg-red-100 text-red-700">
		<TrendingDown size={15}/>
		{value}
	</span>
}