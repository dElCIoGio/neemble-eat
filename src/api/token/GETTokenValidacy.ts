import {API, handleError} from "@/api/utils.ts";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {HOUR} from "@/lib/constants";


const GET_TOKEN_VALIDACY_STALETIME: number = HOUR
const GET_TOKEN_VALIDACY_CACHETIME: number = HOUR


interface props{
	token: string;
}
export async function getTokenValidacy({token}: props){
	try{
		const response = await API.get(`/token/check/${token}`);
		return response.data;
	} catch (error) {
        if (axios.isAxiosError(error)) {
            return handleError(error)
        }
        throw error;
    }
}


export function useGetTokenValidacy(attr: props){

	const { data, isLoading , error} = useQuery({
		queryKey: ["GET Token", attr],
		queryFn: () => getTokenValidacy(attr)
			.then(data => data),
		staleTime: GET_TOKEN_VALIDACY_STALETIME,
		gcTime: GET_TOKEN_VALIDACY_CACHETIME
	})

	return {
		data,
		error,
		isLoading
	}

}