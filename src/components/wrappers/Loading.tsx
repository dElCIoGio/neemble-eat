import React, {useEffect} from "react";

interface Props {
	Fallback: React.FC;
	loadingParams: boolean[];
	children: React.ReactNode;
}

export function Loading({loadingParams, Fallback, children}: Props) {
	const isLoading = loadingParams.some(param => param); // true if any param is true

	useEffect(() => {

		if (isLoading) {
			// Disable scrolling when loading
			document.body.style.overflow = "hidden";
		} else {
			// Restore scrolling when loading is complete
			document.body.style.overflow = "";
		}

		// Cleanup when component unmounts
		return () => {
			document.body.style.overflow = "";
		};
	}, [isLoading]);

	return (
		<div>
			{!isLoading ? (
				<div>{children}</div>
			) : (
				<Fallback/>
			)}
		</div>
	);
}
