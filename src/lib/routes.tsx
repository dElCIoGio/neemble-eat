import {Route} from "@/schema";
import RestaurantMenu from "@/pages/RestaurantMenu";
import {LoadingRestaurantMenu} from "@/components/RestaurantMenu/LoadingRestaurantMenu";
import Cart from "@/pages/Cart";
import {Orders} from "@/pages/Orders";
import {URL_PATH_PREFIX} from "@/lib/constants";
import AuthError from "@/pages/AuthError.tsx";
import Setup from "@/pages/Setup.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import {OrdersTracking} from "@/pages/OrdersTracking.tsx";
import {InvitationPage} from "@/pages/InvitationPage.tsx";
import TablesMapping from "@/pages/TablesMapping.tsx";


export const ROUTES: Route[] = [
	{
		path: `${URL_PATH_PREFIX}/menu/:tableNumber/:restaurantID/:menuID`,
		element: <RestaurantMenu/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/loading`,
		element: <LoadingRestaurantMenu/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/c/:restaurantID/:menuID/:tableNumber`,
		element: <Cart/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/o/:restaurantID/:menuID/:tableNumber`,
		element: <Orders/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/auth-error`,
		element: <AuthError/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/setup`,
		element: <Setup/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/user/:userID`,
		element: <Dashboard/>,
		requiresAuth: true
	},
	{
		path: `${URL_PATH_PREFIX}/orders-tracking/:restaurantID`,
		element: <OrdersTracking/>,
		requiresAuth: true
	},
	{
		path: `${URL_PATH_PREFIX}/tables-tracking/:restaurantID`,
		element: <TablesMapping/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/invite/:tokenId`,
		element: <InvitationPage/>,
		requiresAuth: false
	}
]