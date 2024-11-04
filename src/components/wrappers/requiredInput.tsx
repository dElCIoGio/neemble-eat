import {ReactNode} from "react";
import {Required} from "@/components/ui/required.tsx";


interface Props {
	children: ReactNode
}

export function RequiredInput({children}: Props) {
	return (
		<div className={"leading-tight"}>
			{children} <Required/>
		</div>
	);
}

