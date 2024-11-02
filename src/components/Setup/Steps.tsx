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
			        <BreadcrumbPage>Restaurante</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
					<BreadcrumbPage>Mesas</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator/>
				<BreadcrumbItem>
			        <BreadcrumbPage>Menu</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

