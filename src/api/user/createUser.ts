import {RepresentantJson} from "@/schema.ts";
import axios from "axios";
import {API, handleError} from "@/api/utils.ts";
import {useMutation} from "@tanstack/react-query";

interface Props {
	UUID: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	role: string;

}

export async function createUser({
	UUID,
	firstName,
	lastName,
	email,
	phoneNumber,
	role
}: Props): Promise<RepresentantJson> {
	try {
		const response = await API.post("representant",
			{
				"UUID": UUID,
				"firstName": firstName,
				"lastName": lastName,
				"email": email,
				"phoneNumber": phoneNumber,
				"role": role
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleError(error)
		}
		throw error;
	}
}

export function useCreateUser(attr: Props) {

	return useMutation({
		mutationFn: () => createUser(attr),
		onSuccess: () => {
			console.log(`Account Created`);
		},
		onError: error => console.log(error)
	});

}


