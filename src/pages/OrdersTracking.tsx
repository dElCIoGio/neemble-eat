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
import {DESKTOP, Filter, FILTERS} from "@/lib/constants.ts";
import {OrdersDisplay} from "@/components/OrdersTracking/OrdersDisplay.tsx";
import {OrderInfo} from "@/components/OrdersTracking/OrderInfo.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {useMediaQuery} from "@/hooks/use-media-query.ts";
import {MobileOrderInfo} from "@/components/OrdersTracking/MobileOrderInfo.tsx";
import {useSelectedState} from "@/hooks/use-selected-state.ts";


export function OrdersTracking() {

    document.title = "Gestão de Pedidos"

    const {restaurantID} = useParams() as unknown as { restaurantID: string };

    const isDesktop = useMediaQuery(DESKTOP)

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const newOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/order`;
    const billedOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/billed`;

    const [filterMode, setFilterMode] = useState<Filter>(FILTERS[0])
    const [allTablesNumbers, setAllTablesNumbers] = useState<string[]>(["Todas"])
    const {selected: orderSelected, handleSelect} = useSelectedState<OrderJson | null>(null)

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
        <div>
            <Background className="bg-zinc-100" />
            {
                orders &&
                <OrdersTrackingContext.Provider value={{
                    orders,
                    filterMode,
                    handleFilterModeChange,
                    orderSelected,
                    handleOrderSelected: (order) => handleSelect(order),
                    handleOrderDeselected: () => handleSelect(null)
                }}>
                    <div className="p-4 laptop:h-screen laptop:flex laptop:flex-col">
                        <div className="mt-4 mb-8">
                            <TypographyH2>
                                Pedidos
                            </TypographyH2>
                        </div>
                        <div className="space-y-4 h-max laptop:flex laptop:flex-grow laptop:flex-col">
                            <Header/>
                            <div
                                className={`flex flex-grow rounded-2xl w-full laptop:bg-zinc-50 laptop:border laptop:border-zinc-200`}>
                                <div
                                    className={`transition-all laptop:flex overflow-y-hidden laptop:flex-grow duration-150 ease-in-out w-full ${orderSelected === null ? 'w-full' : 'laptop:w-3/5'}`}>
                                    <ScrollArea className="w-full rounded-l-2xl">
                                        <div className="laptop:max-h-[20rem]">
                                            <OrdersDisplay/>
                                        </div>
                                    </ScrollArea>
                                </div>
                                {
                                    isDesktop ?
                                        <div
                                            className={`w-2/5 transition-all duration-150 ease-in-out ${orderSelected === null ? 'laptop:hidden' : 'laptop:block'}`}>
                                            {orderSelected && <OrderInfo order={orderSelected}/>}
                                        </div> :
                                        <MobileOrderInfo order={orderSelected} setOrder={handleSelect}/>
                                }

                            </div>
                        </div>
                    </div>

                </OrdersTrackingContext.Provider>
            }
        </div>
    );
}

