import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {useSetupContext} from "@/context/setupContext.ts";

export function Steps() {

	const {currentTab} = useSetupContext()

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
			        <BreadcrumbPage
				        className={`${currentTab == "restaurant" && "font-poppins-semibold text-purple-900"}`}>Restaurante</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
					<BreadcrumbPage
						className={`${currentTab == "tables" && "font-poppins-semibold text-purple-900"}`}>Mesas</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
			        <BreadcrumbPage
				        className={`${currentTab == "menu" && "font-poppins-semibold text-purple-900"}`}>Menu</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

