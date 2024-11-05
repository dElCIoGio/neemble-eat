import {TypographyH2, TypographyMuted} from "@/components/ui/Typography.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";
import {Analytics} from "@/components/Dashboard/Analytics.tsx";
import {Performance} from "@/components/Dashboard/Performance.tsx";
import {Overview} from "@/components/Dashboard/Overview.tsx";

export function TabDashboard() {

	const [section, setSection] = useState<"overview" | "analytics" | "performance">("overview")

	document.title = "Dashboard";

	return (
		<div>
			<div className="flex items-end space-x-2">
				<TypographyH2>
					Dashboard
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
				<Tabs defaultValue="overview">
					<TabsList className="rounded-lg">
						<TabsTrigger className="rounded-md prevent-select" onClick={() => setSection("overview")}
						             value="overview">
							Visão Geral
						</TabsTrigger>
						<TabsTrigger className="rounded-md prevent-select" onClick={() => setSection("analytics")}
						             value="analytics">
							Analítico
						</TabsTrigger>
						<TabsTrigger className="rounded-md prevent-select" onClick={() => setSection("performance")}
						             value="performance">
							Performance
						</TabsTrigger>
					</TabsList>
					<div>
						<TabsContent value="overview">
							<Overview/>
						</TabsContent>
						<TabsContent value="analytics">
							<Analytics/>
						</TabsContent>
						<TabsContent value="performance">
							<Performance/>
						</TabsContent>
					</div>

				</Tabs>
			</div>
		</div>
	);
}

