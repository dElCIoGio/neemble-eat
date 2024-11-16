import {ReactNode} from "react";

export function Grid({children}: { children: ReactNode }) {

	return <div className="grid gap-2 grid-cols-12">
		{children}
	</div>
}