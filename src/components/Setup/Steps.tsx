import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

export function Steps() {


	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
			        <BreadcrumbPage
				        className={`text-zinc-400 transition-all duration-150 ease-in-out`}>Restaurante</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
					<BreadcrumbPage
						className={`text-zinc-400 transition-all duration-150 ease-in-out`}>Mesas</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
			        <BreadcrumbPage
				        className={`text-zinc-400 transition-all duration-150 ease-in-out`}>Menu</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

