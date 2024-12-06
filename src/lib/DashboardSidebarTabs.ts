import {FC} from "react";
import {Icon, UsersThree, BookOpenText} from "@phosphor-icons/react";
import {TabDashboard} from "@/components/Dashboard/TabDashboard.tsx";
import {Home, QrCode, Settings} from "lucide-react";
import {TabMenu} from "@/components/Dashboard/TabMenu.tsx";
import {TabTables} from "@/components/Dashboard/TabTables.tsx";
import {TabStaff} from "@/components/Dashboard/TabStaff.tsx";
import {TabSettings} from "@/components/Dashboard/TabSettings.tsx";

export const DashboardSidebarTabs: {
    tab: FC,
    tag: string,
    icon: Icon,
    title: string,
    level: number,
}[] = [
    {
        tab: TabDashboard,
        title: "Dashboard",
        tag: "dashboard",
        icon: Home,
        level: 0
    },
    {
        tab: TabMenu,
        title: "Menu",
        tag: "menu",
        icon: BookOpenText,
        level: 3
    },
    {
        tab: TabTables,
        title: "Mesas e QR Code",
        tag: "tables",
        icon: QrCode,
        level: 3
    },
    {
        tab: TabStaff,
        tag: "staff",
        title: "Equipe do Restaurante",
        icon: UsersThree,
        level: 3
    },
    {
        tab: TabSettings,
        title: "Definições",
        tag: "settings",
        icon: Settings,
        level: 3
    },
]