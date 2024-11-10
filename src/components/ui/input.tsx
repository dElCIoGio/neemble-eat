import * as React from "react"

import {cn} from "@/lib/utils"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "default" | "brand"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({className, type, variant, ...props}, ref) => {
		return (
			<input
				type={type}
				className={cn(
					`${variant == "brand" ? "focus-visible:ring-tropical_indigo-300 focus-visible:outline-1 focus-visible:outline-tropical_indigo-900" : "focus-visible:ring-ring"} flex h-9 w-full rounded-md shadow-sm border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50`,
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = "Input"

export {Input}
