import {Menu} from "@/schema.ts";
import {createSlice} from "@reduxjs/toolkit";

interface MenuState {
    menu: Menu | undefined;
}

const initialState: MenuState = {
    menu: undefined
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenu: (state, action) => {
            state.menu = action.payload
        }
    }
});

export const { setMenu } = menuSlice.actions;

export { menuSlice }