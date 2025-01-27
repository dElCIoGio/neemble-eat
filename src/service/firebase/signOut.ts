import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase.ts";

export const logout = async (
) => {
    try {
        await signOut(auth);
        console.log("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed: ", error);
    }
};