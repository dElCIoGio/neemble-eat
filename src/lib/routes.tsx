import {Route} from "@/schema";
import RestaurantMenu from "@/pages/RestaurantMenu";
import {LoadingRestaurantMenu} from "@/components/RestaurantMenu/LoadingRestaurantMenu";
import Cart from "@/pages/Cart";
import {Orders} from "@/pages/Orders";
import {LogIn} from "@/pages/LogIn";
import {SignUp} from "@/pages/SignUp";

import {URL_PATH_PREFIX} from "@/lib/constants";
import AuthError from "@/pages/AuthError.tsx";
import Setup from "@/pages/Setup.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import {OrdersTracking} from "@/pages/OrdersTracking.tsx";
import {SessionsTracking} from "@/pages/SessionsTracking.tsx";
import {Test} from "@/pages/Test.tsx";
import {InvitationPage} from "@/pages/InvitationPage.tsx";
import {HomePage} from "@/pages/HomePage.tsx";
import {Test2} from "@/pages/Test2.tsx";

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
		path: `${URL_PATH_PREFIX}/login`,
		element: <LogIn/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/signup`,
		element: <SignUp/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/`,
		element: <HomePage/>,
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
		path: `/test`,
		element: <Test/>,
		requiresAuth: false
	},
	{
		path: `/redirect`,
		element:  <div>
			Para aceder ao menu, por favor escolha uma mesa e faça scan do nosso QR Code.
		</div>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/orders-tracking/:restaurantID`,
		element: <OrdersTracking/>,
		requiresAuth: true
	},
	{
		path: `${URL_PATH_PREFIX}/tables-tracking/:restaurantID`,
		element: <SessionsTracking/>,
		requiresAuth: false
	},
	{
		path: `${URL_PATH_PREFIX}/invite/:tokenId`,
		element: <InvitationPage/>,
		requiresAuth: false
	},
	{
		path: "/mytest",
		element: <Test2/>,
		requiresAuth: false
	}


]