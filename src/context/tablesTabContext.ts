import {createContext, useContext} from "react";

type TablesTabContextType = {
    onRemoveTable?: (tableId: string) => void
}

export const TablesTabContext = createContext<TablesTabContextType | undefined>(undefined)

export function useTablesTabContext() {
    const context = useContext(TablesTabContext)

    if (!context) {
        throw new Error("useTablesTabContext must be used within a TablesTabProvider")
    }

    return context;
}