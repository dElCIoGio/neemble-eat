import {useCallback, useState} from "react";
import {useGetAllOrders} from "@/service/api/restaurant.ts";
import {useParams} from "react-router-dom";
import useWebSocket from "@/hooks/use-web-socket.ts";
import {BASE_URL} from "@/api/utils.ts";
import {OrderJson} from "@/schema.ts";
import {OrdersTrackingContext} from "@/context/ordersTrackingContext.ts";
import {Header} from "@/components/OrdersTracking/Header.tsx";
import Background from "@/components/ui/Background.tsx";
import {TypographyH2} from "@/components/ui/Typography.tsx";
import {Filter, FILTERS} from "@/lib/constants.ts";
import {OrdersDisplay} from "@/components/OrdersTracking/OrdersDisplay.tsx";
import {OrderInfo} from "@/components/OrdersTracking/OrderInfo.tsx";


export function OrdersTracking() {

    document.title = "Gestão de Pedidos"

    const {restaurantID} = useParams() as unknown as { restaurantID: string };

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const newOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/order`;
    const billedOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/billed`;

    const [filterMode, setFilterMode] = useState<Filter>(FILTERS[0])
    const [allTablesNumbers, setAllTablesNumbers] = useState<string[]>(["Todas"])


    const {orders, addOrder, removeOrders} = useGetAllOrders({restaurantID: restaurantID})

    const handleMessageNewOrder = useCallback((event: MessageEvent) => {
        try {
            const order = JSON.parse(event.data);
            console.log('New order received:', order);
            addOrder(order);
            if (!allTablesNumbers.includes(order.tableNumber.toString())) {
                setAllTablesNumbers((prev) => [...prev, order.tableNumber.toString()]);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    }, [addOrder, allTablesNumbers]);

    const handleFilterModeChange = useCallback((filterMode: Filter) => {
        setFilterMode(filterMode);
        console.log(filterMode.tag);
    }, []);
    
    const handleMessageBilledOrder = useCallback((event: MessageEvent) => {
        const billedOrders: OrderJson[] = JSON.parse(event.data);
        const billedOrdersIDs = billedOrders.map((order) => order.id);
        removeOrders(billedOrdersIDs);
    }, [removeOrders]);

    useWebSocket(
        newOrdersWsUrl, {
            onMessage: handleMessageNewOrder,
            reconnectInterval: 2000,
        }
    )

    useWebSocket(
        billedOrdersWsUrl, {
            onMessage: handleMessageBilledOrder,
            reconnectInterval: 2000,
        }
    )

    if (orders === undefined) {
        return <div>Carregando...</div>
    }


    return (
        <div className="p-6">
            <Background className="bg-zinc-100" />
            {
                orders &&
                <OrdersTrackingContext.Provider value={{
                    orders,
                    filterMode,
                    handleFilterModeChange

                }}>
                    <div className="mt-4 mb-8">
                        <TypographyH2>
                            Pedidos
                        </TypographyH2>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Header/>
                        <div className={`bg-zinc-50 border border-zinc-200 rounded-xl p-4 `}>
                            <OrdersDisplay/>
                            <OrderInfo/>
                        </div>

                    </div>

                </OrdersTrackingContext.Provider>
            }
        </div>
    );
}

