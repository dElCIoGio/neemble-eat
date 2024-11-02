import {Steps} from "@/components/Setup/Steps.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Setup/Header.tsx";
import {useParams} from "react-router-dom";
import {RestaurantConfig} from "@/components/Setup/RestaurantConfig.tsx";
import {useTabSwitcher} from "@/hooks/useTabSwitcher.ts";


function Setup() {

	const {nextTab, currentTab, prevTab} = useTabSwitcher()
	const {name,} = useParams() as { name: string, representantID: string }


	return (
		<div className="max-w-[1080px] mx-auto">
			<Header tab={currentTab} name={name}/>
			<div className={"flex justify-center"}>
				<Steps/>
			</div>
			<Tabs defaultValue="restaurant" value={currentTab}>
				<TabsContent value="restaurant">
					<RestaurantConfig/>
				</TabsContent>
				<TabsContent value="tables">
					tables
				</TabsContent>
				<TabsContent value="menu">
					menu
				</TabsContent>

				<Button onClick={prevTab} type="button">
					Previous
				</Button>
				<Button onClick={nextTab} type="button">
					Next
				</Button>
			</Tabs>
		</div>
	);
}

export default Setup;