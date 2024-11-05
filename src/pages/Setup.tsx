import {Steps} from "@/components/Setup/Steps.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Setup/Header.tsx";
import {useParams} from "react-router-dom";
import {RestaurantConfig} from "@/components/Setup/RestaurantConfig.tsx";
import {useTabSwitcher} from "@/hooks/useTabSwitcher.ts";
import {SetupContext} from "@/context/setupContext.ts";
import {TablesConfig} from "@/components/Setup/TablesConfig.tsx";
import {MenuConfig} from "@/components/Setup/MenuConfig.tsx";


function Setup() {

	document.title = "Bem Vindo | Neemble Eat"

	const {nextTab, currentTab, prevTab} = useTabSwitcher()
	const {name,} = useParams() as { name: string, representantID: string }


	return (
		<SetupContext.Provider value={{
			currentTab,
			nextTab,
			prevTab
		}}>
			<div className="max-w-[1080px] w-[90%] h-dvh mx-auto">
			<Header tab={currentTab} name={name}/>
			<div className={"flex justify-center"}>
				<Steps/>
			</div>
			<div className="pb-8">
				<Tabs className="py-4" defaultValue="restaurant" value={currentTab}>
					<TabsContent className="" value="restaurant">
						<RestaurantConfig/>
					</TabsContent>
					<TabsContent className="" value="tables">
						<TablesConfig/>
					</TabsContent>
					<TabsContent className="" value="menu">
						<MenuConfig/>
					</TabsContent>
				</Tabs>
				<div className="hidden my-4 space-x-4">
					<Button disabled={currentTab === "restaurant"}
					        onClick={currentTab === "restaurant" ? () => {
					        } : prevTab}
					        type="button">
						Previous
					</Button>
					<Button disabled={currentTab === "menu"}
					        onClick={currentTab === "menu" ? () => {
					        } : nextTab}
					        type="button">
						Next
					</Button>
				</div>
			</div>
		</div>
		</SetupContext.Provider>
	);
}

export default Setup;