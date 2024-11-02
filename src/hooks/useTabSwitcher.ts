import {useState} from "react";
import {SetUpTab} from "@/schema"

export const useTabSwitcher = () => {
	const tabs: SetUpTab[] = ["restaurant", "tables", "menu"];
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const nextTab = () => {
		setCurrentTabIndex((prevIndex) => (prevIndex + 1) % tabs.length);
	};

	const prevTab = () => {
		setCurrentTabIndex((prevIndex) =>
			prevIndex === 0 ? tabs.length - 1 : prevIndex - 1
		);
	};

	return {
		currentTab: tabs[currentTabIndex],
		nextTab,
		prevTab,
	};
};
