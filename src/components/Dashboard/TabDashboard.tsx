import {TypographyH2, TypographyMuted} from "@/components/ui/Typography.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";
import {Analytics} from "@/components/Dashboard/Analytics.tsx";
import {Overview} from "@/components/Dashboard/Overview.tsx";
import {ChartLine, CardsThree} from "@phosphor-icons/react"

export function TabDashboard() {

	const [section, setSection] = useState<"overview" | "analytics" | "performance">("overview")

	document.title = "Painel do Restaurante";

	return (
		<div>
			<div className="flex items-end space-x-2">
				<TypographyH2>
					Painel do Restaurante
				</TypographyH2>
				<div className="font-poppins-semibold mb-[2px] opacity-70">
					<TypographyMuted>
					{
						section === "overview" ? "Visão Geral" : section === "analytics" ? "Analítico" : "Performance"
					}
				</TypographyMuted>
				</div>

			</div>
			<div className="py-8">
				<Tabs defaultValue="overview" className="">
					<TabsList className="rounded-lg mb-2">
						<TabsTrigger className="rounded-md prevent-select" onClick={() => setSection("overview")}
						             value="overview">
							<CardsThree className="mr-2"/> Visão Geral
						</TabsTrigger>
						<TabsTrigger className="rounded-md prevent-select" onClick={() => setSection("analytics")}
						             value="analytics">
							<ChartLine className="mr-2"/> Analítico
						</TabsTrigger>
					</TabsList>
					<div>
						<TabsContent value="overview">
							<Overview/>
						</TabsContent>
						<TabsContent value="analytics">
							<Analytics/>
						</TabsContent>
					</div>
				</Tabs>
			</div>
		</div>
	);
}

