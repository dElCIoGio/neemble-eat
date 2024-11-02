import React from "react";

interface props {

	children: React.ReactNode;
}


export function Layout({children}: props) {
	return (
		<div className={`min-h-svh px-4 font-poppins pt-4`}>
            {children}
        </div>
	);
}

