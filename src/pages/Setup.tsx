import {Steps} from "@/components/Setup/Steps.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/Setup/Header.tsx";
import {useParams} from "react-router-dom";
import {RestaurantConfig} from "@/components/Setup/RestaurantConfig.tsx";

function Setup() {

	document.title = "Bem Vindo | Neemble Eat"

	const {name,} = useParams() as { name: string, userID: string }


	return (
		<div>
			<div className="max-w-[1080px] w-[90%] h-dvh mx-auto">
				<Header  name={name}/>
				<div className={"flex justify-center"}>
					<Steps/>
				</div>
				<div className="pb-8">
					<RestaurantConfig/>
						<div className="hidden my-4 space-x-4">
							<Button type="button">
								Previous
							</Button>
							<Button type="button">
								Next
							</Button>
						</div>
					</div>
				<div/>
			<div/>
		</div>
		</div>
	)
}
export default Setup;