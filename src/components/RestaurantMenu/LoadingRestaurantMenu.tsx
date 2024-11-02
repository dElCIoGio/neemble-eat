import {Skeleton} from "@/components/ui/skeleton.tsx";

export function LoadingRestaurantMenu() {
	return (
		<div>
			<div className="flex space-x-4 justify-end p-4">
				<Skeleton className={"h-10 w-24"}/>
				<Skeleton className={"h-10 w-24"}/>
			</div>
			<Skeleton className={"w-full h-40 laptop:h-60 rounded-none"}/>
			<div className={"px-4"}>
				<div className={"my-2 laptop:my-8 space-y-4"}>
					<Skeleton className={"h-20 w-[40%]"}/>
				</div>
				<div className={`hidden lg:block lg:w-[60%]`}>
					<Skeleton className={"w-full h-16"}/>
				</div>
			</div>
			<div className={"m-4 flex space-x-4"}>
				<Skeleton className={"h-10 w-24"}/>
				<Skeleton className={"h-10 w-24"}/>
				<Skeleton className={"h-10 w-28"}/>
			</div>
			<div className={"flex space-x-8"}>
				<Skeleton className={"h-8 w-16"}/>
			</div>
		</div>
	);
}

