import * as React from "react"

import {cn} from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: "default" | "brand"
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({className, variant, ...props}, ref) => {

		return (
			<textarea
				className={cn(
					`${variant == "brand"? "transition-all duration-150 focus-visible:ring-tropical_indigo-300 focus-visible:outline-[2px] focus-visible:outline-tropical_indigo-900": "focus-visible:ring-ring focus-visible:outline-none"} flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = "Textarea"

export {Textarea}
