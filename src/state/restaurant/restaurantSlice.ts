import { RestaurantJson } from "@/schema";
import { createSlice } from "@reduxjs/toolkit";

interface RestaurantState {
    restaurant: RestaurantJson | undefined
}

const initialState: RestaurantState = {
    restaurant: undefined
}

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
    }
});

export const { setRestaurant } = restaurantSlice.actions;

export { restaurantSlice };