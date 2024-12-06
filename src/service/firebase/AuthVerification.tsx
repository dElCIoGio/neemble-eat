import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import {HOUR, URL_PATH_PREFIX} from "@/lib/constants.ts";
import {logout} from "@/service/firebase/signOut.ts";

interface props {
	children: React.ReactNode;
}
const SESSION_DURATION_MS = 5 * HOUR;


export function AuthVerification({children}: props) {

	const {user} = useAuth();

	const loginTimestamp = localStorage.getItem("loginTimestamp");

	const navigate = useNavigate()

	const authError = () => navigate(`${URL_PATH_PREFIX}/auth-error`, { replace: true })

	if (!user)
		authError()

	if (loginTimestamp){
		const elapsedTime = Date.now() - parseInt(loginTimestamp, 10);
		if (elapsedTime > SESSION_DURATION_MS) {
			logout()
			localStorage.removeItem("loginTimestamp");
		}
	}

	return (
		<div>
            {children}
        </div>
	);
}

