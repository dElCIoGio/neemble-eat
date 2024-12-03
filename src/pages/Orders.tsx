import {useParams} from "react-router-dom";
import {Layout} from "@/components/wrappers/Layout.tsx";
import ReturnNav from "@/components/ui/ReturnNav.tsx";
import {useState} from "react";
import {useGetSessionOders} from "@/api/session/getAllSessionOrders.ts";
import {useGetOpenSession} from "@/api/session/getOpenSession.ts";
import {closeSession} from "@/api/session/closeSession.ts";
import {NoOrders} from "@/components/Orders/NoOrders.tsx";
import {OrdersContext} from "@/context/ordersContext.ts";
import {OrdersDisplay} from "@/components/Orders/OrdersDisplay.tsx";
import Background from "@/components/ui/Background.tsx";
import {Payment} from "@/components/Orders/Payment.tsx";
import {BillsAlert} from "@/components/Orders/BillsAlert.tsx";
import {Loading} from "@/components/wrappers/Loading.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export function Orders() {

	document.title = "Pedidos"

	const {
		restaurantID,
		tableNumber,
		menuID
	} = useParams() as unknown as {
		restaurantID: string,
		menuID: string,
		tableNumber: number
	};

	const [customerName, setCustomerName] = useState<string>("")
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);


	const {
		session,
		sessionError,
		isSessionLoading,
		closeSessionMutation,
	} = useGetOpenSession({
		restaurantID: restaurantID,
		tableNumber: tableNumber,
		closeSession: async () => handleGetBill()
	})

	const {
		orders,
		ordersError,
		// isOrdersLoading,
		isFetchingOrders,
		refreshOrders
	} = useGetSessionOders({
		sessionID: session ? session.id : null
	})

	function handleGetBill() {
		if (session == null) return;
		closeSession({sessionID: session.id, status: "Billed"})
			.then(() => {
				setIsPopupOpen(true)

				const customer = sessionStorage.getItem('CustomerName');
				if (customerName != "" && customer) {
					setCustomerName(customer)
				}
				// MAKE POP UP APPEAR
			})
			.catch((error) => console.error(error))
		const customer = sessionStorage.getItem('CustomerName');
		if (customerName != "" && customer) {
			setCustomerName(customerName)
		}
	}

	if (ordersError || sessionError) {
		return <div>
            {sessionError && <div>
                There was an error while fetchin the session: {sessionError.message}
            </div>
            }
			{ordersError && <div>
                There was an error while fetchin the orders: {ordersError.message}
            </div>
			}
        </div>
	}

	return (
		<OrdersContext.Provider value={{
			closeSessionMutation: closeSessionMutation,
			refreshOrders: refreshOrders,
			orders: orders,
			isFetchingOrders: isFetchingOrders,
			customerName
		}}>
			<Layout>
				<Background className={`bg-gray-100`}/>
				<ReturnNav path={`/menu/${tableNumber}/${restaurantID}/${menuID}`} title={"Pedidos"}/>
				<div>
		            <h1 className='text-lg font-semibold'>
		                Pedidos recentes
		            </h1>
		            <p className='text-sm text-zinc-600'>
		                Abaixo estão os seus pedidos
		            </p>
		        </div>
				<Loading Fallback={() => <Skeleton className={'h-20 w-full rounded-xl'}/>}
				         loadingParams={[isFetchingOrders, isSessionLoading]}>
					{
						orders ?
							orders.length === 0 ?
								<NoOrders/> :
								<>
							<OrdersDisplay/>
							<Payment/>
						</> :
							<NoOrders/>
					}
				</Loading>

			</Layout>
			<BillsAlert open={isPopupOpen} onOpenChange={(isOpen) => setIsPopupOpen(isOpen)}/>
		</OrdersContext.Provider>
	);
}

