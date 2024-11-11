import {Route} from "@/schema";
import RestaurantMenu from "@/pages/RestaurantMenu";
import {LoadingRestaurantMenu} from "@/components/RestaurantMenu/LoadingRestaurantMenu";
import Cart from "@/pages/Cart";
import {Orders} from "@/pages/Orders";
import {LogIn} from "@/pages/LogIn";
import {Home} from "@/pages/Home";
import {SignUp} from "@/pages/SignUp";

import {URL_PATH_PREFIX} from "@/lib/constants";
import AuthError from "@/pages/AuthError.tsx";
import Setup from "@/pages/Setup.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";

export const ROUTES: Route[] = [
	{
		path: `${URL_PATH_PREFIX}/`,
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
		path: `${URL_PATH_PREFIX}/home`,
		element: <Home/>,
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
	}

]