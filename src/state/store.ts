import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "@/state/menu/menuSlice.ts"
import { restaurantSlice } from "@/state/restaurant/restaurantSlice.ts"


export const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        restaurant: restaurantSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
