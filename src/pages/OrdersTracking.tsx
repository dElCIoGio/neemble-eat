import {useCallback} from "react";
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
import {BowlFood} from "@phosphor-icons/react";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {LoadingOrdersTracking} from "@/components/Loading/LoadingOrdersTracking.tsx";


document.title = "Gestão de Pedidos"
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

export function OrdersTracking() {

    const {restaurantID} = useParams() as unknown as { restaurantID: string };

    const isDesktop = useMediaQuery(DESKTOP)
    
    const newOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/order`;
    const billedOrdersWsUrl = `${protocol}//${BASE_URL}/ws/${restaurantID}/billed`;

    const {state: filterMode, handleState: setFilterMode} = useSelectedState<Filter>(FILTERS[0])
    const {state: tableFilter, handleState: handleTableFilterChange} = useSelectedState<string | null>(null)
    const {state: orderSelected, handleState} = useSelectedState<OrderJson | null>(null)
    const {state: sorting, handleState: handleSortingChange} = useSelectedState<"asc" | "desc">("asc")

    const {orders, addOrder, removeOrders, updateOrderStatus, isLoading} = useGetAllOrders({restaurantID: restaurantID})

    const handleMessageNewOrder = useCallback((event: MessageEvent) => {
        try {
            const order = JSON.parse(event.data);
            addOrder(order);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    }, [addOrder]);

    const handleFilterModeChange = useCallback((filterMode: Filter) => {
        setFilterMode(filterMode);
    }, [setFilterMode]);
    
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

    return (
        <Loading loadingParams={[isLoading]} Fallback={LoadingOrdersTracking}>
            {
                orders != undefined &&
                <div>
                    <Background className="bg-zinc-100"/>
                    {
                        orders &&
                        <OrdersTrackingContext.Provider value={{
                            orders,
                            filterMode,
                            handleFilterModeChange,
                            orderSelected,
                            handleOrderSelected: (order) => handleState(order),
                            handleOrderDeselected: () => handleState(null),
                            tableFilter,
                            handleTableFilterChange,
                            updateOrderStatus,
                            sorting,
                            handleSortingChange
                        }}>
                            <div className="p-4 laptop:h-screen laptop:flex laptop:flex-col">
                                <div className="mt-4 mb-8 flex space-x-1.5 items-center">
                                    <div
                                        className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-300 flex justify-center items-center">
                                        <BowlFood className="w-6 h-6 text-zinc-800"/>
                                    </div>
                                    <TypographyH2>
                                        Pedidos
                                    </TypographyH2>
                                </div>
                                <div className="space-y-4 h-max laptop:flex laptop:flex-grow laptop:flex-col">
                                    <Header/>
                                    <div
                                        className={`flex flex-grow rounded-2xl w-full laptop:bg-zinc-50 laptop:border laptop:border-zinc-200`}>
                                        {
                                            orders.length == 0 ?
                                                <div
                                                    className="laptop:flex laptop:flex-col justify-center items-center overflow-y-hidden laptop:flex-grow w-full">
                                                    <h1 className="text-lg font-poppins-semibold ">
                                                        Nenhum pedido encontrado.
                                                    </h1>
                                                    <h2 className="text-sm font-poppins-regular text-zinc-500">
                                                        Assim que algum cliente efetuar algum pedido, podera encontrar
                                                        aqui.
                                                    </h2>
                                                </div> :
                                                <>
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
                                                            <MobileOrderInfo order={orderSelected}
                                                                             setOrder={handleState}/>
                                                    }
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>

                        </OrdersTrackingContext.Provider>
                    }
                </div>
            }

        </Loading>

)
    ;
}

