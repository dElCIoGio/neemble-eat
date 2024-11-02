import {RestaurantJson} from "@/schema";
import axios from 'axios';

import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants.ts";
import {API, handleError} from "@/api/utils";


const GET_RESTAURANT_STALETIME: number = HOUR * 24
const GET_RESTAURANT_CACHETIME: number = HOUR * 36

interface props {
	restaurantID: string | null
}


async function getRestaurant({restaurantID}: props): Promise<RestaurantJson> {
	try {
		const response = await API.get(`/restaurants/${restaurantID}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}


function useGetRestaurant({restaurantID}: props) {

	const {
		data, isLoading, error
	} = useQuery({
		queryKey: ["GET Restaurant", restaurantID],
		queryFn: () => getRestaurant({restaurantID})
			.then(data => data),
		enabled: restaurantID != null,
		staleTime: GET_RESTAURANT_STALETIME,
		gcTime: GET_RESTAURANT_CACHETIME,
	});


	return {
		restaurant: data,
		isRestaurantLoading: isLoading,
		restaurantError: error,
		isRestaurantAvailable: !!data
	}
}

export {useGetRestaurant, getRestaurant};