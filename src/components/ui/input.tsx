import * as React from "react"
import { LucideIcon } from "lucide-react";
import {cn} from "@/lib/utils"

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "default" | "brand";
	startIcon?: LucideIcon;
	endIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, startIcon, endIcon, variant, ...props }, ref) => {
		const StartIcon = startIcon;
		const EndIcon = endIcon;
		return (
			<div className="w-full relative">
				{StartIcon && (
					<div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
						<StartIcon size={18} className="text-zinc-300"/>
					</div>
				)}
				<input
					type={type}
					className={cn(
						`${variant == "brand" ? "focus-visible:ring-tropical_indigo-300 focus-visible:outline-[2px] focus-visible:outline-tropical_indigo-900 hover:outline-2 hover:outline-tropical_indigo-900" : "focus-visible:ring-ring"} hover:bg-zinc-100 transition-all duration-150 flex h-8 w-full rounded-md shadow-sm border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50`,
						startIcon ? "pl-8" : "",
						endIcon ? "pr-8" : "",
						className
					)}
					ref={ref}
					{...props}
				/>
				{EndIcon && (
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<EndIcon className="text-zinc-300" size={18} />
					</div>
				)}
			</div>

		)
	}
)
Input.displayName = "Input"

export {Input}
