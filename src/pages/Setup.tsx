import {Steps} from "@/components/Setup/Steps.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Setup/Header.tsx";
import {useParams} from "react-router-dom";
import {RestaurantConfig} from "@/components/Setup/RestaurantConfig.tsx";
import {useTabSwitcher} from "@/hooks/useTabSwitcher.ts";
import {SetupContext} from "@/context/setupContext.ts";


function Setup() {

	document.title = "Bem Vindo | Neemble Eat"

	const {nextTab, currentTab, prevTab} = useTabSwitcher()
	const {name,} = useParams() as { name: string, representantID: string }


	return (
		<SetupContext.Provider value={{
			currentTab
		}}>
			<div className="max-w-[1080px] w-[90%] h-dvh mx-auto">
			<Header tab={currentTab} name={name}/>
			<div className={"flex justify-center"}>
				<Steps/>
			</div>
			<div className="">
				<Tabs className="py-4" defaultValue="restaurant" value={currentTab}>
					<TabsContent className="" value="restaurant">
						<RestaurantConfig/>
					</TabsContent>
					<TabsContent className="" value="tables">
						tables
					</TabsContent>
					<TabsContent className="" value="menu">
						menu
					</TabsContent>
				</Tabs>
				<div className="fixed bottom-0 my-4 space-x-4">
					<Button onClick={prevTab} type="button">
						Previous
					</Button>
					<Button onClick={nextTab} type="button">
						Next
					</Button>
				</div>
			</div>
		</div>
		</SetupContext.Provider>
	);
}

export default Setup;