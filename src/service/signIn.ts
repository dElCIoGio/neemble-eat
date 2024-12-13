import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/service/firebase/firebase.ts";
import {createUser} from "@/api/user/manager";
import {Role} from "@/schema.ts";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	role: Role
}


export async function signUp({password, phoneNumber, lastName, firstName, email, role}: Props) {
	const credentials = await createUserWithEmailAndPassword(auth, email, password)
	const UUID = credentials.user.uid
	return await createUser({
		email: email,
		phoneNumber: phoneNumber,
		firstName: firstName,
		lastName: lastName,
		UUID: UUID,
		role: role
	})
}