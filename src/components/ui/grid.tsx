import {ReactNode} from "react";

export function Grid({children}: { children: ReactNode }) {

	return <div className="grid gap-3 grid-cols-12">
		{children}
	</div>
}