import {FC} from "react";
import {Icon, UsersThree, BookOpenText, CreditCard, Headset, BookmarkSimple, ChartLine} from "@phosphor-icons/react";
import {TabDashboard} from "@/components/Dashboard/TabDashboard.tsx";
import {Home, QrCode, Settings} from "lucide-react";
import {TabMenu} from "@/components/Dashboard/TabMenu.tsx";
import {TabTables} from "@/components/Dashboard/TabTables.tsx";
import {TabStaff} from "@/components/Dashboard/TabStaff.tsx";
import {TabSettings} from "@/components/Dashboard/TabSettings.tsx";
import {TabSubscription} from "@/components/Dashboard/TabSubscription.tsx";
import {TabSupport} from "@/components/Dashboard/TabSupport.tsx";
import TabReservations from "@/components/Dashboard/TabReservations.tsx";
import TabAnalytics from "@/components/Dashboard/TabAnalytics.tsx";

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
        tab: TabReservations,
        title: "Reservas",
        tag: "bookings",
        icon: BookmarkSimple,
        level: 3
    },
    {
        tab: TabAnalytics,
        title: "Performance",
        tag: "analytics",
        icon: ChartLine,
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
        tab: TabSubscription,
        title: "Pagamento",
        tag: "subscription",
        icon: CreditCard,
        level: 3
    },
    {
        tab: TabSettings,
        title: "Definições",
        tag: "settings",
        icon: Settings,
        level: 3
    },
    {
        tab: TabSupport,
        title: "Suporte",
        tag: "support",
        icon: Headset,
        level: 3
    }

]