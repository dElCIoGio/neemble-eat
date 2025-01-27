import {NewLeadProps} from "@/api/general/types.ts";
import axios from "axios";


export async function registerNewLead({email}: NewLeadProps){
    const url = "https://hook.eu2.make.com/dq988wbscxitew3u8mzlnne3khdv0j06"
    await axios.post(url, {email: email})
}