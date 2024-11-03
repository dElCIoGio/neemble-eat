import {SetUpTab} from "@/schema.ts";
import {createContext, useContext} from "react";


interface SetupProps {
	currentTab: SetUpTab
}

export const SetupContext = createContext<SetupProps | undefined>(undefined)


export function useSetupContext() {

	const context = useContext(SetupContext)

	if (!context)
		throw new Error("useSetupContext must be used within the SetupContext");

	return context
}