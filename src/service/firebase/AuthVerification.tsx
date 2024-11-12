import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {URL_PATH_PREFIX} from "@/lib/constants.ts";

interface props {
	children: React.ReactNode;
}


export function AuthVerification({children}: props) {

	const {user} = useAuth();
	console.log(user)

	const navigate = useNavigate()

	if (!user)
		navigate(`${URL_PATH_PREFIX}/auth-error`)

	return (
		<div>
            {children}
        </div>
	);
}

