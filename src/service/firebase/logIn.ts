import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '@/service/firebase/firebase'



export async function logIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    if (user) {
        localStorage.setItem("loginTimestamp", Date.now().toString());
    }

    return user
}

