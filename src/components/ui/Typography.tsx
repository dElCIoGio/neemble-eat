import {ReactNode} from "react";

interface Props {
	children: ReactNode
}

export function TypographyMuted({children}: Props) {
	return (
		<p className="text-sm text-muted-foreground">
			{children}
		</p>
	)
}


export function TypographyH2({children}: Props) {
	return (
		<h2 className="scroll-m-20 text-2xl font-poppins-semibold tracking-tight first:mt-0">
      {children}
    </h2>
	)
}

export function TypographyH3({children}: Props) {
	return (
		<h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
	)
}


export function TypographyH1({children}: Props) {
	return (
		<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
	)
}